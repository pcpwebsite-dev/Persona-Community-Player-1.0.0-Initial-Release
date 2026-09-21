import { db, doc, getDoc, onSnapshot } from "../../../PCP_Form_System/js/firebase.js";

const $ = (s) => document.querySelector(s);
const title = $("#maintenanceTitle");
const description = $("#maintenanceDescription");
const notice = $("#maintenanceNotice");
const clock = $("#clock");
const clockDisplay = $("#clockDisplay");
const dateDisplay = $("#dateDisplay");
const themeToggle = $("#themeToggle");

function applyTheme(t){
  const theme = t === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;
  localStorage.setItem("pcp-theme", theme);
}
applyTheme(localStorage.getItem("pcp-theme") || "dark");
themeToggle?.addEventListener("click", () => applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark"));

function updateClock(){
  const now = new Date();
  const time = now.toLocaleTimeString("id-ID", {hour12:false, timeZone:"Asia/Jakarta"});
  if(clock) clock.textContent = time;
  if(clockDisplay) clockDisplay.textContent = time;
  if(dateDisplay) dateDisplay.textContent = now.toLocaleDateString("id-ID", {weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Jakarta"}).toUpperCase();
}
updateClock(); setInterval(updateClock, 1000);

function apply(d = {}){
  const maintenance = d.releaseState === "maintenance" || d.enabled === true;
  if(!maintenance){
    location.replace("../../../index.html");
    return;
  }
  if(title) title.textContent = d.maintenanceTitle || "WEBSITE SEDANG DALAM MAINTENANCE";
  if(description) description.textContent = d.maintenanceDescription || "Kami sedang melakukan pemeliharaan sistem untuk meningkatkan layanan PCP.";
  if(notice){
    if(d.maintenanceUntil){
      const x = new Date(d.maintenanceUntil);
      notice.textContent = Number.isNaN(x.getTime()) ? "Estimasi selesai: " + d.maintenanceUntil : "Estimasi selesai: " + x.toLocaleString("id-ID", {dateStyle:"full",timeStyle:"short",timeZone:"Asia/Jakarta"}) + " WIB";
    } else notice.textContent = "Waktu maintenance tidak ditentukan.";
  }
}

const settingsRef = doc(db, "siteSettings", "general");
try {
  const s = await getDoc(settingsRef);
  apply(s.exists() ? s.data() : {});
} catch(e) {
  console.error("Failed to load maintenance state", e);
  if(notice) notice.textContent = "Waktu maintenance tidak ditentukan.";
}
onSnapshot(settingsRef, s => { if(s.exists()) apply(s.data()); }, e => console.error("Maintenance listener error", e));
