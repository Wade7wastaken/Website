const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function exists(url) {
	try {
		await axios.get(url);
	} catch (error) {
		return false;
	}
	return true;
}

async function process() {
	await new Promise((r) => setTimeout(r, 5000));
	return "hi";
}

async function coolmath2() {
	let output = [];
	const url = "https://www.coolmathgames.com/1-complete-game-list/view-all";

	const mainprm = axios.get(url);

	let x = await mainprm.data;

	return 4;
}

async function coolmath() {
	let output = [];
	const url = "https://www.coolmathgames.com/1-complete-game-list/view-all";

	axios
		.get(url)
		.then((res) => {
			const $ = cheerio.load(res.data);
			$(".view-all-games:first > .views-row")
				.find(".game-title a:first-child")
				.each(async (i, elem) => {
					let gameurl = "https://www.coolmathgames.com" + $(elem).attr("href") + "/play";
					const gametext = $(elem).text();

					const existprm = exists(gameurl);
					if ($(elem).parent().siblings(".icon-gamethumbnail-all-game-pg").length != 0) return; // acts like continue
					let result = await existprm;

					if (!result) gameurl = "https://www.coolmathgames.com" + $(elem).attr("href");

					output.push([gametext, gameurl]);
				});
			//return output;
		})
		.finally(() => {
			return output;
		});
	//.catch((err) => {
	//console.log(err);
	//});
}

(async () => {
	let output = {};
	output.coolmath = await coolmath2();

	console.log(JSON.stringify(output));

	//fs.writeFile("./output.js", "const links = " + JSON.stringify(output), (err) => {
	//if (err) console.log(err);
	//});
})();
