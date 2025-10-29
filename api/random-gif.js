export default async function handler(req, res) {
	try {
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
			"https://nekos.best/api/v2/dance",
		];
		const selectedSource = sources[Math.floor(Math.random() * sources.length)];
		const response = await fetch(selectedSource);
		const data = await response.json();

		let gifUrl =
			data.url ||
			(data.result && data.result[0]?.url) ||
			data.image ||
			"https://media.tenor.com/AlUkiGkR2j8AAAAC/anime-hello.gif";

		res.writeHead(302, { Location: gifUrl });
		res.end();
	} catch (error) {
		console.error("Error fetching anime gif:", error);
		res.writeHead(302, {
			Location: "https://media.tenor.com/AlUkiGkR2j8AAAAC/anime-hello.gif",
		});
		res.end();
	}
}
