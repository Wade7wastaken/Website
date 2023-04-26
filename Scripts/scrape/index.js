const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function exists(url) {
	try {
		await axios.get(url);
	} catch (error) {
		//console.log(url + " returned " + error);
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

function processResult(result, location, logtext) {
	data[location].push(result);
	console.log(`${logtext}: ${result}`);
}

function lowerCaseSort(a, b) {
	return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
}

const data = {
	"Coolmath Games": [],
	"Coolmath Games Mirror": [],
	"Unblocked Games 66 EZ": [],
};

async function coolmath() {
	const layer1 = [];
	const res = await axios.get(
		"https://www.coolmathgames.com/1-complete-game-list/view-all",
	);

	console.log("coolmath request done");
	const $ = cheerio.load(res.data);

	$(".view-all-games:first")
		.find("> .views-row:not(:has(>.icon-gamethumbnail-all-game-pg))")
		.find(".game-title a:first-child")
		.each((i, elem) => {
			layer1.push(
				(async (elem) => {
					const gametext = $(elem).text();
					const gamehref = $(elem).attr("href");
					const gameurl = `https://www.coolmathgames.com${gamehref}/play`;
					const pageurl = `https://www.coolmathgames.com${gamehref}`;

					if (await exists(gameurl)) {
						processResult([gametext, gameurl], "Coolmath Games", "Coolmath");
					} else if (await exists(pageurl)) {
						processResult(
							[gametext, pageurl],
							"Coolmath Games",
							"Coolmath page",
						);
					}
				})(elem),
			);
		});
	await Promise.all(layer1);
	console.log("done with coolmath");
}

async function edit() {
	const layer1 = [];
	const res = await axios.get(
		"https://edit.coolmath-games.com/1-complete-game-list/view-all",
	);

	console.log("edit request done");
	const $ = cheerio.load(res.data);

	$(".view-all-games:first .views-row")
		.find(".game-title a:first-child")
		.each((i, elem) => {
			layer1.push(
				(async (elem) => {
					const gameurl =
						"https://edit.coolmath-games.com" + $(elem).attr("href") + "/play";

					if (await exists(gameurl)) {
						processResult(
							[$(elem).text(), gameurl],
							"Coolmath Games Mirror",
							"Edit",
						);
					}
					// Some non-flash games still get filtered out by this (probably last thing to worry about)
				})(elem),
			);
		});
	await Promise.all(layer1);
	console.log("done with edit");
}

async function unblocked66() {
	const ignoredgames = ["All Unblocked games 66 EZ", "Feedback"];
	const layer1 = [];

	const res = await axios.get(
		"https://sites.google.com/site/unblockedgames66ez/home",
	);

	console.log("unblocked66 request done");
	const $ = cheerio.load(res.data);

	$(".aJHbb.dk90Ob.hDrhEe.HlqNPb").each((i, elem) => {
		layer1.push(
			(async (elem) => {
				const gamename = $(elem).text();
				const gameurl = "https://sites.google.com" + $(elem).attr("href");

				// filter out ignored games
				if (!ignoredgames.includes(gamename)) {
					const res2 = await axios.get(gameurl);
					const $2 = cheerio.load(res2.data);

					const buttons = $2(".w536ob");
					const num = buttons.length;
					if (num == 1) {
						processResult(
							[gamename, gameurl],
							"Unblocked Games 66 EZ",
							"Unblocked 66 page",
						);
					} else if (num >= 2) {
						const $3 = cheerio.load(buttons[1].attribs["data-code"]);
						const spliced = $3("script:first").html().split(/\s+/);
						const foundindex = findSequenceIndex(["var", "url", "="], spliced);

						if (foundindex == -1) {
							console.log("error in " + gamename);
						} else {
							const embedurl = spliced[foundindex + 3].slice(1, -2);
							if (await exists(embedurl)) {
								processResult(
									[gamename, embedurl],
									"Unblocked Games 66 EZ",
									"Unblocked 66",
								);
							} else {
								processResult(
									[gamename, gameurl],
									"Unblocked Games 66 EZ",
									"Unblocked 66 page",
								);
							}
						}
					}
				}
			})(elem),
		);
	});
	await Promise.all(layer1);
	console.log("done with unblocked66");
}

(async () => {
	await Promise.all([coolmath(), edit(), unblocked66()]);
	console.log("done fetching");
	data["Coolmath Games"].sort(lowerCaseSort);
	data["Coolmath Games Mirror"].sort(lowerCaseSort);
	data["Unblocked Games 66 EZ"].sort(lowerCaseSort);
	console.log("done sorting");
	console.log(data);

	fs.writeFileSync(
		"./data/scrapelinks.json",
		JSON.stringify(data, Object.keys(data).sort()),
	);

	console.log("done");

	debugger;
})();
