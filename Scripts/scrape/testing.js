const axios = require("axios");
const cheerio = require("cheerio");

axios
	.get("https://www.coolmathgames.com/1-complete-game-list/view-all")
	.then((res) => {
		console.log("request to edit done");
		const $ = cheerio.load(res.data);

		$(".view-all-games:first")
			.find("> .views-row:not(:has(>.icon-gamethumbnail-all-game-pg))")
			.find(".game-title a:first-child")
			.each((i, elem) => {
				console.log($(elem));
			});
	});
