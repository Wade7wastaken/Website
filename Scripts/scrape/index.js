// I'm letting this version go, I just found it to difficult. If someone wants to port the rest of the python code, that would be much appreciated

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

async function coolmath() {
	let promises = [];
	let output = [];

	const url = "https://www.coolmathgames.com/1-complete-game-list/view-all";
	const $ = cheerio.load((await axios.get(url)).data);
	$(".view-all-games:first > .views-row")
		.find(".game-title a:first-child")
		.each((i, elem) => {
			promises.push(
				(async (i, elem) => {
					let gameurl =
						"https://www.coolmathgames.com" + $(elem).attr("href") + "/play";

					const existprm = exists(gameurl);

					if (
						$(elem).parent().siblings(".icon-gamethumbnail-all-game-pg")
							.length != 0
					)
						return; // acts like continue
					const gametext = $(elem).text();

					let result = await existprm;

					if (!result)
						gameurl = "https://www.coolmathgames.com" + $(elem).attr("href");

					console.log([gametext, gameurl]);
					output.push([gametext, gameurl]);
				})(i, elem),
			);
		});
	await Promise.all(promises);

	return output;
}

async function edit() {
	let promises = [];
	let output = [];

	const url = "https://edit.coolmath-games.com/1-complete-game-list/view-all";
	const $ = cheerio.load((await axios.get(url)).data);

	$(".view-all-games:first .views-row")
		.find(".game-title a:first-child")
		.each((i, elem) => {
			promises.push(
				(async (i, elem) => {
					let gameurl =
						"https://edit.coolmath-games.com" + $(elem).attr("href") + "/play";

					const existprm = exists(gameurl);

					const gametext = $(elem).text();

					let result = await existprm;

					if (!result) return;

					console.log([gametext, gameurl]);
					output.push([gametext, gameurl]);
				})(i, elem),
			);
		});
	await Promise.all(promises);

	return output;
}

async function unblocked66() {
	let promises = [];
	let output = [];

	const url = "https://sites.google.com/site/unblockedgames66ez/home";
	const $ = cheerio.load((await axios.get(url)).data);

	$(".jYxBte.Fpy8Db:first")
		.children()
		.each((i, elem) => {
			promises.push(
				(async (i, elem) => {
					let gameurl = "https://sites.google.com" + $(elem).attr("href");
					const gametext = $(elem).text();

					promises.push(
						axios
							.get(url)
							.then((res) => {
								const $_ = cheerio.load(res.data);
								console.log(
									$_(".w536ob").each((i, elem) => {
										console.log($_(elem));
									}),
								);
								debugger;
							})
							.catch((err) => {}),
					);
				})(i, elem),
			);
		});
}

(async () => {
	Promise.all([unblocked66()]).then((results) => {
		results.forEach((result) => {
			console.log(JSON.stringify(result));
		});
	});

	//fs.writeFile("./output.js", "const links = " + JSON.stringify(output), (err) => {
	//if (err) console.log(err);
	//});
})();
