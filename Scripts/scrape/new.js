const axios = require("axios");
const cheerio = require("cheerio");

const data = {};

const layer1 = [];

layer1.push(
	(async () => {
		const res = await axios.get(
			"https://edit.coolmath-games.com/1-complete-game-list/view-all",
		);
		console.log("edit request done");
		const $ = cheerio.load(res.data);

		$(".view-all-games:first .views-row")
			.find(".game-title a:first-child")
			.each((i, elem) => {
				
			});
	})(),
)(async () => {
	await Promise.all(layer1);
})();
