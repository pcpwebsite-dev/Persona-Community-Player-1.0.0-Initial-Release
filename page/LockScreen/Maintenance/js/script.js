import { db, doc, getDoc } from "../../../js/firebase.js";

const body = document.body;
const toggle = document.getElementById("themeToggle");
const progress = document.getElementById("progress");
const percent = document.getElementById("percent");
const clock = document.getElementById("clock");
const title = document.getElementById("maintenanceTitle");
const description = document.getElementById("maintenanceDescription");
const notice = document.getElementById("maintenanceNotice");

const DEFAULT_SETTINGS = {
  enabled: false,
  title: "WEBSITE SEDANG DALAM MAINTENANCE",
  description: "Kami sedang melakukan pemeliharaan sistem untuk meningkatkan performa dan stabilitas website PCP.",
  progress: 72,
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
  clock.textContent = new Date().toLocaleTimeString("id-ID", { hour12: false });
}
updateClock();
setInterval(updateClock, 1000);

async function loadMaintenanceSettings() {
  try {
    const snap = await getDoc(doc(db, "siteSettings", "general"));
    const settings = snap.exists() ? { ...DEFAULT_SETTINGS, ...snap.data() } : DEFAULT_SETTINGS;

    // Maintenance was switched off from Admin Dashboard.
    if (settings.enabled !== true) {
      location.replace("../../../index.html");
      return;
    }

    if (title) title.textContent = String(settings.title || DEFAULT_SETTINGS.title);
    if (description) description.textContent = String(settings.description || DEFAULT_SETTINGS.description);
    if (notice) notice.textContent = String(settings.notice || DEFAULT_SETTINGS.notice);

    const value = Math.max(0, Math.min(100, Number(settings.progress ?? DEFAULT_SETTINGS.progress)));
    progress.style.width = value + "%";
    percent.textContent = value + "%";
  } catch (error) {
    // If the settings service cannot be reached, keep the maintenance page visible.
    console.error("Maintenance settings failed:", error);
  }
}

loadMaintenanceSettings();

// Keep the maintenance page synchronized when an admin changes the setting.
// A full reload is intentional so the page always follows the central setting.
setInterval(loadMaintenanceSettings, 15000);
