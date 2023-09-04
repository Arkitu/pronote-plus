use std::{sync::{Arc, atomic::{AtomicU32, Ordering}}, path::PathBuf, fs::File, io::Write};

use aes::cipher::{KeyIvInit, BlockEncryptMut, block_padding::Pkcs7};
use headless_chrome::{Browser, browser::Tab, protocol::cdp::{Page::CaptureScreenshotFormatOption, Target::CreateTarget}};
use anyhow::{Result, anyhow};
use tokio::sync::RwLock;

type AES_CBC_encryptor = cbc::Encryptor<aes::Aes128>;

const PRONOTE_URL: &str = "https://0332768e.index-education.net/pronote/viescolaire.html";
const DEMO_PRONOTE_URL: &str = "https://demo.index-education.net/pronote/eleve.html";
const NORMAL_USER_AGENT: &str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36";

#[derive(PartialEq, Eq, Clone, Copy, Debug)]
pub enum Page {
    Login,
    Home,
    Homework(Option<time::Tm>) // date depuis laquelle les devoirs sont affichés
}

#[derive(Clone)]
pub struct HeadlessBrowserAPIClient {
    pub browser: Arc<Browser>,
    pub tab: Arc<Tab>,
    pub page: Arc<RwLock<Page>>
}
impl HeadlessBrowserAPIClient {
    pub fn new_browser() -> Result<Arc<Browser>> {
        Ok(Arc::new(Browser::default()?))
    }
    pub fn new(browser: Option<Arc<Browser>>, demo:bool) -> Result<Self> {
        let browser = match browser {
            Some(b) => b,
            None => Self::new_browser()?
        };
        let context = browser.new_context()?;
        let tab = browser.new_tab_with_options(CreateTarget {
            height: Some(1080),
            width: Some(1920),
            url: (if demo {DEMO_PRONOTE_URL} else {PRONOTE_URL}).to_string(),
            browser_context_id: Some(context.get_id().to_string()),
            enable_begin_frame_control: None,
            new_window: None,
            background: None
        })?;
        Ok(Self {
            browser,
            tab,
            page: Arc::new(RwLock::new(Page::Login))
        })
    }
    pub async fn auth(&self, username: &str, password: &str) -> Result<()> {
        let page = *self.page.read().await;
        if page != Page::Login {
            return Err(anyhow!("Trying to authenticate but page is not login (page={:?})", page))
        }
        self.tab.wait_for_element("input[placeholder=\"Identifiant\"]")?.click()?;
        self.tab.type_str(username)?
            .press_key("Tab")?
            .type_str(password)?
            .press_key("Enter")?;
        *self.page.write().await = Page::Home;
        Ok(())
    }
    pub async fn auth_demo(&self) -> Result<()> {
        let page = *self.page.read().await;
        if page != Page::Login {
            return Err(anyhow!("Trying to authenticate but page is not login (page={:?})", page))
        }
        self.tab.wait_for_element("button[title*=\"Se connecter\"]")?.click()?;
        *self.page.write().await = Page::Home;
        Ok(())
    }
    pub fn screenshot(&self, path: PathBuf) -> Result<()> {
        let data = self.tab.capture_screenshot(CaptureScreenshotFormatOption::Png, None, None, true)?;
        File::create(path)?.write_all(&data)?;
        Ok(())
    }
    pub async fn navigate_to_homework(&self) -> Result<()> {
        self.tab.wait_for_element("li[aria-label=\"Travail à faire à la maison\"][role=\"menuitem\"] .label-submenu")?.click()?;
        *self.page.write().await = Page::Homework(None);
        Ok(())
    }
    pub async fn homework_get_date(&self) -> Result<time::Tm> {
        // exemple de date : "lun. 15 mars"
        let date = self.tab.wait_for_elements("div[class=\"ocb-libelle ie-ellipsis\"][role=\"button\"]")?[1].get_inner_text()?;
        let mut date = date.split("\u{a0}");
        let date = time::Tm {
            tm_wday: match date.next() {
                None => return Err(anyhow!("Invalid date (missing day of week)")),
                Some("dim.") => 0,
                Some("lun.") => 1,
                Some("mar.") => 2,
                Some("mer.") => 3,
                Some("jeu.") => 4,
                Some("ven.") => 5,
                Some("sam.") => 6,
                Some(o) => return Err(anyhow!("Invalid date (invalid day of week) : {:?}", o))
            },
            tm_mday: match date.next() {
                None => return Err(anyhow!("Invalid date (missing day of month)")),
                Some(date) => match date.parse::<u32>() {
                    Err(_) => return Err(anyhow!("Invalid date (invalid day of month)")),
                    Ok(date) => {
                        if date < 1 || date > 31 {
                            return Err(anyhow!("Invalid date (day of month)"))
                        }
                        date.try_into().unwrap()
                    }
                }
            },
            tm_mon: match date.next() {
                None => return Err(anyhow!("Invalid date (missing month)")),
                Some("janv.") => 0,
                Some("févr.") => 1,
                Some("mars") => 2,
                Some("avr.") => 3,
                Some("mai") => 4,
                Some("juin") => 5,
                Some("juil.") => 6,
                Some("août") => 7,
                Some("sept.") => 8,
                Some("oct.") => 9,
                Some("nov.") => 10,
                Some("déc.") => 11,
                Some(o) => return Err(anyhow!("Invalid date (invalid month) : {:?}", o))
            },
            tm_year: 0,
            tm_hour: 0,
            tm_min: 0,
            tm_sec: 0,
            tm_nsec: 0,
            tm_utcoff: 0,
            tm_isdst: 0,
            tm_yday: 0
        };
        Ok(date)
    }
    pub async fn homework_go_to_date(&self, date: time::Tm) -> Result<()> {
        if self.homework_get_date().await? == date {
            return Ok(())
        }
        self.tab.wait_for_element("div[class=\"ocb_cont as-input as-date-picker ie-ripple\"]")?.click()?;

        let mut month = match date.tm_mon {
            0 => "Janvier",
            1 => "Février",
            2 => "Mars",
            3 => "Avril",
            4 => "Mai",
            5 => "Juin",
            6 => "Juillet",
            7 => "Août",
            8 => "Septembre",
            9 => "Octobre",
            10 => "Novembre",
            11 => "Décembre",
            _ => return Err(anyhow!("Invalid date"))
        }.to_string();
        month += " ";
        month += &(1900 + date.tm_year).to_string();
        let month = &month;

        println!("month = {}", month);

        let month_list = self.tab.wait_for_elements("div[role=\"option\"][class*=\"as-li c_1 ie-ellipsis\"]")?;

        let mut found = false;
        for month_item in month_list.iter() {
            println!("month_item = {}", month_item.get_inner_text()?);
            if &month_item.get_inner_text()? == month {
                found = true;
                self.screenshot(PathBuf::from("./screen_test.png"))?;
                println!("{:?}", month_item.get_attributes()?);
                //self.tab.wait_for_element(&("div[id=\"".to_string() + &month_item)? + "\"]")?.click()?;
                break;
            }
        }
        if !found {
            return Err(anyhow!("Date out of range"))
        }

        Ok(())
    }
}


pub struct APIClient {
    pub client: reqwest::Client,
    pub session_id: u32,
    pub numero_ordre: Arc<AtomicU32>,
    pub key_aes: [u8; 16],
    pub iv_aes: [u8; 16]
}
impl APIClient {
    pub fn new() -> Self {
        Self {
            client: reqwest::Client::new(),
            session_id: 0,
            numero_ordre: Arc::new(AtomicU32::new(1)),
            key_aes: [0; 16],
            // genera
            iv_aes: rand::random::<[u8; 16]>()
        }
    }
    pub fn encrypt<'a>(&self, chaine: &[u8]) -> Result<&'a [u8]> {
        let key = &md5::compute(self.key_aes).0;
        let iv = &md5::compute(self.iv_aes).0;

        let mut buf = [0u8; 48];
        buf[..chaine.len()].copy_from_slice(&chaine);
        
        let encrypted = AES_CBC_encryptor:: new(key.into(), iv.into())
            .encrypt_padded_mut::<Pkcs7>(&mut buf, chaine.len()).unwrap();

        Ok(&[0])
    }
    async fn get_session_id(&mut self) -> Result<()> {
        if self.session_id != 0 {
            return Ok(())
        }
        let eleve_html = self.client.get("https://demo.index-education.net/pronote/eleve.html")
            .header("User-Agent", NORMAL_USER_AGENT)
            .send().await?;
        let eleve_html = eleve_html.text().await?;
        self.session_id = eleve_html.split_once("h:'").ok_or(anyhow!("Invalide eleve.html"))?.1[..7].parse()?;
        Ok(())
    }
    pub async fn connect(&self) -> Result<()> {
        self.get_session_id().await?;
        println!("session_id = {}", self.session_id);

        let base64_iv = base64::encode(&self.iv_aes);

        let numero_ordre = self.numero_ordre.fetch_add(1, Ordering::SeqCst);
        self.client.post(format!("https://demo.index-education.net/pronote/appelfonction/3/{}/{}", self.session_id, ))

        Ok(())
    }
}