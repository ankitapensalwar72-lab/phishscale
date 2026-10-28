const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({
    project: "PhishScale",
    message: "PhishScale backend is working!"
  });
});

app.get("/api/dashboard", (req, res) => {
  res.json({
    project: "PhishScale",
    status: "running",
    totalCampaigns: 0,
    totalTargets: 0,
    emailsSent: 0,
    clicks: 0,
    note: "These are demo placeholders, not real campaign statistics."
  });
});

app.post("/api/check-url", (req, res) => {
  const { url } = req.body || {};

  if (typeof url !== "string" || !url.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide a URL."
    });
  }

  const candidate = url.trim();
  const withScheme = /^https?:\\/\\//i.test(candidate) ? candidate : `https://${candidate}`;

  try {
    const parsed = new URL(withScheme);

    if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname) {
      return res.status(400).json({
        success: false,
        message: "Only valid HTTP and HTTPS URLs are supported."
      });
    }

    const warnings = [];
    if (parsed.protocol !== "https:") warnings.push("This URL does not use HTTPS.");
    if (parsed.username || parsed.password) warnings.push("The URL contains embedded login information.");
    if (parsed.hostname.toLowerCase().includes("xn--")) warnings.push("The domain uses encoded international characters; verify it carefully.");
    if (parsed.hostname.split(".").length > 5) warnings.push("The hostname has many subdomain levels; inspect the actual registered domain.");

    return res.json({
      success: true,
      url: parsed.href,
      warnings,
      message: warnings.length
        ? "Caution: one or more basic warning signs were detected."
        : "No basic warning detected. This does not mean the URL is safe."
    });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid URL."
    });
  }
});

app.listen(PORT, () => {
  console.log(`PhishScale server running at http://localhost:${PORT}`);
});
