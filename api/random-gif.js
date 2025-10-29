export default async function handler(req, res) {
  try {
    // ✅ SFW-only & stable sources (no Tenor)
    const sources = [
      "https://api.waifu.pics/sfw/waifu",
      "https://api.waifu.pics/sfw/smile",
      "https://api.waifu.pics/sfw/wave",
      "https://api.waifu.pics/sfw/wink",
      "https://api.waifu.pics/sfw/dance",
      "https://api.catboys.com/img",
      "https://nekos.best/api/v2/waifu",
      "https://nekos.best/api/v2/smile",
      "https://nekos.best/api/v2/wave",
      "https://nekos.best/api/v2/dance"
    ];

    const selected = sources[Math.floor(Math.random() * sources.length)];
    const response = await fetch(selected);
    const data = await response.json();

    // ✅ Extract URL (supporting all API formats)
    const gifUrl =
      data.url ||
      data.image ||
      (data.results && data.results[0]?.url) ||
      (data.results && data.results[0]?.image_url) ||
      "https://i.waifu.pics/ZOkB2_x.gif"; // fallback (Waifu CDN, TLS-safe)

    // ✅ No caching → always new image
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    // ✅ Redirect safely
    res.writeHead(302, { Location: gifUrl });
    res.end();
  } catch (error) {
    console.error("Error fetching anime gif:", error);

    // 🩵 Safe backup GIF from Waifu CDN (not Tenor)
    res.setHeader("Cache-Control", "no-store");
    res.writeHead(302, {
      Location: "https://i.waifu.pics/2E6Zbwv.gif"
    });
    res.end();
  }
}
