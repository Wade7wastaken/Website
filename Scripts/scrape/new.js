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

function findSequenceIndex(seq, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === seq[0]) {
			let match = true;
			for (let j = 1; j < seq.length; j++) {
				if (arr[i + j] !== seq[j]) {
					match = false;
					break;
				}
			}
			if (match) {
				return i;
			}
		}
	}
	return -1;
}

const data = {
	"Coolmath Games": [],
	"Coolmath Games Mirror": [],
	"Unblocked Games 66 EZ": [],
};

const layer1 = [];

layer1.push(
	(async () => {
		const layer2 = [];
		await axios
			.get("https://edit.coolmath-games.com/1-complete-game-list/view-all")
			.then((res) => {
				console.log("edit request done");
				const $ = cheerio.load(res.data);

				$(".view-all-games:first .views-row")
					.find(".game-title a:first-child")
					.each((i, elem) => {
						layer2.push(
							(async (i, elem) => {
								const gameurl =
									"https://edit.coolmath-games.com" +
									$(elem).attr("href") +
									"/play";

								if (await exists(gameurl)) {
									const result = [$(elem).text(), gameurl];
									data["Coolmath Games Mirror"].push(result);
									console.log("Edit: " + result);
								}
								// Some non-flash games still get filtered out by this (probably last thing to worry about)
							})(i, elem),
						);
					});
			});
		await Promise.all(layer2);
	})(),
	(async () => {
		const layer2 = [];
		await axios
			.get("https://www.coolmathgames.com/1-complete-game-list/view-all")
			.then((res) => {
				console.log("coolmath request done");
				const $ = cheerio.load(res.data);

				$(".view-all-games:first")
					.find("> .views-row:not(:has(>.icon-gamethumbnail-all-game-pg))")
					.find(".game-title a:first-child")
					.each((i, elem) => {
						layer2.push(
							(async (i, elem) => {
								const gameurl =
									"https://www.coolmathgames.com" +
									$(elem).attr("href") +
									"/play";

								const pageurl =
									"https://www.coolmathgames.com" + $(elem).attr("href");

								if (await exists(gameurl)) {
									const result = [$(elem).text(), gameurl];
									data["Coolmath Games"].push(result);
									console.log("Coolmath: " + result);
								} else if (await exists(pageurl)) {
									const result = [$(elem).text(), pageurl];
									data["Coolmath Games"].push(result);
									console.log("Coolmath page: " + result);
								}
							})(i, elem),
						);
					});
			});
		await Promise.all(layer2);
	})(),
	(async () => {
		const ignoredgames = ["All Unblocked games 66 EZ", "Feedback"];
		const layer2 = [];

		await axios
			.get("https://sites.google.com/site/unblockedgames66ez/home")
			.then((res) => {
				console.log("unblocked66 request done");
				const $ = cheerio.load(res.data);

				$(".aJHbb.dk90Ob.hDrhEe.HlqNPb").each((i, elem) => {
					layer2.push(
						(async (i, elem) => {
							const gamename = $(elem).text();
							const gameurl = "https://sites.google.com" + $(elem).attr("href");

							// filter out ignored games
							if (!ignoredgames.includes(gamename)) {
								const res2 = await axios.get(gameurl);
								const $2 = cheerio.load(res2.data);

								const buttons = $2(".w536ob");
								const num = buttons.length;
								if (num == 1) {
									const result = [gamename, gameurl];
									data["Unblocked Games 66 EZ"].push(result);
									console.log("Unblocked 66 page: " + result);
								} else if (num >= 2) {
									const $3 = cheerio.load(buttons[1].attribs["data-code"]);
									const spliced = $3("script:first").html().split(/\s+/);
									const foundindex = findSequenceIndex(
										["var", "url", "="],
										spliced,
									);

									if (foundindex == -1) {
										console.log("error in " + gamename);
									} else {
										const embedurl = spliced[foundindex + 3].slice(1, -2);
										if (await exists(embedurl)) {
											const result = [gamename, embedurl];
											data["Unblocked Games 66 EZ"].push(result);
											console.log("Unblocked 66: " + result);
										} else {
											const result = [gamename, gameurl];
											data["Unblocked Games 66 EZ"].push(result);
											console.log("Unblocked 66 page:" + result);
										}
									}
								}
							}
						})(i, elem),
					);
				});
			});
		await Promise.all(layer2);
	})(),
);

(async () => {
	await Promise.all(layer1);
	console.log("done fetching");
	data["Coolmath Games"].sort(function (a, b) {
		return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
	});
	data["Coolmath Games Mirror"].sort(function (a, b) {
		return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
	});
	data["Unblocked Games 66 EZ"].sort(function (a, b) {
		return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
	});
	console.log(data);

	fs.writeFileSync(
		"./data/scrapelinks.json",
		JSON.stringify(data, Object.keys(data).sort()),
	);

	console.log("done");

	debugger;
})();
