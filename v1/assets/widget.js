const THEMES = {
  purple: { bg: "#f5f3ff", surface: "#ffffff", primary: "#7c3aed", secondary: "#4c1d95", accent: "#a855f7", text: "#2e1065", muted: "#6b7280" },
  chairapy: { bg: "#fff8f3", surface: "#fffdf9", primary: "#e75792", secondary: "#4d190a", accent: "#f1642f", text: "#4d190a", muted: "#a84860" },
  cookbook: { bg: "#fff8ed", surface: "#fffdf8", primary: "#c65d35", secondary: "#55311f", accent: "#73936c", text: "#402417", muted: "#8a6a57" },
  tech: { bg: "#faf5ff", surface: "#fffaff", primary: "#d946ef", secondary: "#4c1d95", accent: "#fb7185", text: "#3b1768", muted: "#7c6b91" },
  kenwood: { bg: "#f5f7ef", surface: "#fffdf7", primary: "#718c63", secondary: "#5b3527", accent: "#c97956", text: "#3f3129", muted: "#7f746c" },
  master: { bg: "#f6f3fa", surface: "#ffffff", primary: "#8656a7", secondary: "#33214d", accent: "#d18aae", text: "#2e2040", muted: "#756c80" },
  reading: { bg: "#fbf7fa", surface: "#fffdfd", primary: "#d27ea3", secondary: "#503746", accent: "#e8b7ca", text: "#3d2b35", muted: "#8a7380" },
  "breast-cancer": { bg: "#fff3f8", surface: "#ffffff", primary: "#ec4899", secondary: "#7a1f4d", accent: "#f7a8c4", text: "#4b1d32", muted: "#9b5c78" },
  boho: { bg: "#fbf5ea", surface: "#fffdf8", primary: "#b96545", secondary: "#4a3428", accent: "#89966f", text: "#3f3028", muted: "#8a7669" },
  autumn: { bg: "#fbf1e7", surface: "#fffaf4", primary: "#c65a2e", secondary: "#682f2f", accent: "#d59b2d", text: "#43251d", muted: "#8b6756" },
  neutral: { bg: "#f7f7f5", surface: "#ffffff", primary: "#4b5563", secondary: "#111827", accent: "#9ca3af", text: "#111827", muted: "#6b7280" },
  custom: { bg: "#fff8f3", surface: "#fffdf9", primary: "#e75792", secondary: "#4d190a", accent: "#f1642f", text: "#4d190a", muted: "#a84860" }
};

const params = new URLSearchParams(location.search);
const get = (name, fallback = "") => params.get(name) || fallback;
const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value)));

function applyTheme() {
  const theme = THEMES[get("theme", "purple")] || THEMES.purple;
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => root.style.setProperty(`--${key}`, value));
  ["bg","surface","primary","secondary","accent","text","muted"].forEach((key) => {
    const value = params.get(key);
    if (/^#[0-9a-f]{6}$/i.test(value || "")) root.style.setProperty(`--${key}`, value);
  });
  if (get("transparent") === "1") document.body.classList.add("transparent");
  if (get("compact") === "1") document.querySelector(".widget")?.classList.add("compact");
  document.querySelectorAll("[data-param]").forEach((node) => {
    const value = get(node.dataset.param, node.textContent.trim());
    node.textContent = value;
  });
}

function applyImage() {
  const source = get("image", "").trim();
  const mode = ["corner", "watermark", "background"].includes(get("imageMode", "")) ? get("imageMode") : "";
  const position = ["top-right", "top-left", "bottom-right", "bottom-left", "center"].includes(get("imagePosition", "")) ? get("imagePosition") : "top-right";
  if (!source || !mode) return;
  let url;
  try { url = new URL(source); } catch { return; }
  if (url.protocol !== "https:") return;
  const widget = document.querySelector(".widget");
  if (!widget) return;
  const image = document.createElement("img");
  image.className = `custom-image custom-image--${mode} custom-image--${position}`;
  image.src = url.href;
  image.alt = "";
  image.loading = "lazy";
  image.decoding = "async";
  image.referrerPolicy = "no-referrer";
  image.style.setProperty("--image-opacity", String(clamp(get("imageOpacity", "0.25"), 0.05, 1)));
  image.addEventListener("error", () => image.remove());
  widget.prepend(image);
  if (mode === "background") widget.classList.add("has-background-image");
}

applyTheme();
applyImage();
window.WidgetKit = { params, get, clamp, themes: THEMES };
