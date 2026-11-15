// Copies the static site to out/ and points the analytics script at this
// project's Vercel Web Analytics path (Vercel now uses a per-project path).
import fs from "node:fs";
let html = fs.readFileSync("index.html", "utf8");
try {
  const cfg = JSON.parse(process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG || "{}");
  if (cfg.analytics?.scriptSrc) {
    html = html.replace("/_vercel/insights/script.js", "/" + cfg.analytics.scriptSrc.replace(/^\//, ""));
    console.log("analytics script path set");
  }
} catch (e) { console.log("no analytics config:", e.message); }
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync("out/index.html", html);
for (const f of ["og.png", "favicon.svg"]) fs.copyFileSync(f, "out/" + f);
