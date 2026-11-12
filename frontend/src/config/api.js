let rawBackendUrl = (process.env.REACT_APP_BACKEND_URL || "").trim();
if (!rawBackendUrl) {
  console.error("REACT_APP_BACKEND_URL is not set; the contact form is disabled.");
}

// Fix Render internal host reference if provided without .onrender.com
if (
  rawBackendUrl === "symstruo-backend" ||
  rawBackendUrl === "http://symstruo-backend" ||
  rawBackendUrl === "https://symstruo-backend"
) {
  rawBackendUrl = "https://symstruo-backend.onrender.com";
}

const formattedBackendUrl = rawBackendUrl.startsWith("http")
  ? rawBackendUrl
  : `https://${rawBackendUrl}`;

export const API = rawBackendUrl ? `${formattedBackendUrl.replace(/\/$/, "")}/api` : null;

export const IMG = {
  about: "https://images.unsplash.com/photo-1565371557106-c2abcc6fb36a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  process: "https://images.unsplash.com/photo-1520529890308-f503006340b4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  cta: "https://images.unsplash.com/photo-1615141328086-72a5a01b1b25?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
};

export const scrollToSection = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

