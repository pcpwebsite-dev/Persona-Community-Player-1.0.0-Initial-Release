import { db, doc, getDoc } from "../../../js/firebase.js";

const body = document.body;
const toggle = document.getElementById("themeToggle");
const clock = document.getElementById("clock");
const clockDisplay = document.getElementById("clockDisplay");
const dateDisplay = document.getElementById("dateDisplay");
const title = document.getElementById("maintenanceTitle");
const description = document.getElementById("maintenanceDescription");
const notice = document.getElementById("maintenanceNotice");

const DEFAULT_SETTINGS = {
  enabled: false,
  title: "WEBSITE SEDANG DALAM MAINTENANCE",
  description: "Kami sedang melakukan pemeliharaan sistem untuk meningkatkan performa dan stabilitas website PCP.",
  notice: "Mohon tunggu beberapa saat dan coba kembali nanti."
};

const saved = localStorage.getItem("pcp-theme");
if (saved === "light" || saved === "dark") body.dataset.theme = saved;

toggle.addEventListener("click", () => {
  const theme = body.dataset.theme === "dark" ? "light" : "dark";
  body.dataset.theme = theme;
  localStorage.setItem("pcp-theme", theme);
});

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("id-ID", { hour12: false });
  const date = now.toLocaleDateString("id-ID", { weekday:"long", day:"2-digit", month:"long", year:"numeric" });
  clock.textContent = time;
  if(clockDisplay) clockDisplay.textContent = time;
  if(dateDisplay) dateDisplay.textContent = date.toUpperCase();
}
updateClock();
setInterval(updateClock, 1000);

async function loadMaintenanceSettings() {
  try {
    const snap = await getDoc(doc(db, "siteSettings", "general"));
    const settings = snap.exists() ? { ...DEFAULT_SETTINGS, ...snap.data() } : DEFAULT_SETTINGS;

    const mode = new URLSearchParams(location.search).get("mode");
    const state = settings.releaseState || (settings.enabled ? "maintenance" : "live");
    const shouldLock = state === "maintenance" || state === "pre_release";
    if (!shouldLock) { location.replace("../../../"); return; }
    if (state === "pre_release" || mode === "prerelease") {
      if (title) title.textContent = "PCP IS PREPARING FOR RELEASE";
      if (description) description.textContent = "Persona Community Player sedang berada pada tahap final preparation sebelum dibuka secara resmi untuk publik.";
      if (notice) notice.textContent = settings.launchDate ? `Target release: ${settings.launchDate}` : "Official community access will be available soon.";
      document.querySelector(".maintenance-state")?.replaceChildren(document.createTextNode("PRE-RELEASE"));
      return;
    }

    if (title) title.textContent = String(settings.title || DEFAULT_SETTINGS.title);
    if (description) description.textContent = String(settings.description || DEFAULT_SETTINGS.description);
    if (notice) notice.textContent = String(settings.notice || DEFAULT_SETTINGS.notice);

  } catch (error) {
    // If the settings service cannot be reached, keep the maintenance page visible.
    console.error("Maintenance settings failed:", error);
  }
}

loadMaintenanceSettings();

// Keep the maintenance page synchronized when an admin changes the setting.
// A full reload is intentional so the page always follows the central setting.
setInterval(loadMaintenanceSettings, 15000);
