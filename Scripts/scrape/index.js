const axios = require("axios").default;
const cheerio = require("cheerio");
const fs = require("fs");

async function exists(url, iter = 0) {
	if (iter >= 5) {
		console.log(`${url} failed after ${iter - 1} attempts.`);
		return false;
	}

	try {
		await axios.get(url);
	} catch (error) {
		if (error.response.status != 404) {
			console.log(`NON-404: ${url} returned ${error}`);
			await new Promise((r) => setTimeout(r, 1000)); // wait 1 second
			return await exists(url, iter + 1); // call this function again and increase the iteration
		}
		console.log(`${url} returned ${error}`);
		return false;
	}
	return true;
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
	"Tyrone's Unblocked Games": [],
};

async function coolmath() {
	const layer1 = [];
	const res = await axios.get(
		"https://www.coolmathgames.com/1-complete-game-list/view-all"
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
						processResult(
							[gametext, gameurl],
							"Coolmath Games",
							"Coolmath"
						);
					} else if (await exists(pageurl)) {
						processResult(
							[gametext, pageurl],
							"Coolmath Games",
							"Coolmath page"
						);
					}
				})(elem)
			);
		});
	await Promise.all(layer1);
	console.log("done with coolmath");
}

async function edit() {
	const layer1 = [];
	const res = await axios.get(
		"https://edit.coolmath-games.com/1-complete-game-list/view-all"
	);

	console.log("edit request done");
	const $ = cheerio.load(res.data);

	$(".view-all-games:first .views-row")
		.find(".game-title a:first-child")
		.each((i, elem) => {
			layer1.push(
				(async (elem) => {
					const gameurl = `https://edit.coolmath-games.com${$(
						elem
					).attr("href")}/play`;

					// Some non-flash games still get filtered out by this (probably last thing to worry about)
					if (await exists(gameurl)) {
						processResult(
							[$(elem).text(), gameurl],
							"Coolmath Games Mirror",
							"Edit"
						);
					}
				})(elem)
			);
		});
	await Promise.all(layer1);
	console.log("done with edit");
}

async function unblocked66() {
	const ignoredgames = ["All Unblocked Games 66 EZ", "Feedback"];
	const layer1 = [];

	const res = await axios.get(
		"https://sites.google.com/site/unblockedgames66ez/home"
	);

	console.log("unblocked66 request done");
	const $ = cheerio.load(res.data);

	$(".aJHbb.dk90Ob.hDrhEe.HlqNPb").each((i, elem) => {
		layer1.push(
			(async (elem) => {
				const gamename = $(elem).text();
				const gameurl = `https://sites.google.com${$(elem).attr(
					"href"
				)}`;

				// filter out ignored games
				if (!ignoredgames.includes(gamename)) {
					if (await exists(gameurl)) {
						processResult(
							[gamename, gameurl],
							"Unblocked Games 66 EZ",
							"Unblocked 66"
						);
					} else {
						console.log(`${gamename} doesn't exist`);
					}
				}
			})(elem)
		);
	});
	await Promise.all(layer1);
	console.log("done with unblocked66");
}

async function tyrones() {
	const ignoredgames = ["Home"];
	const layer1 = [];

	const res = await axios.get(
		"https://sites.google.com/site/tyronesgameshack/home"
	);

	console.log("tyrones request done");
	const $ = cheerio.load(res.data);

	$(".aJHbb.dk90Ob.hDrhEe.HlqNPb").each((i, elem) => {
		layer1.push(
			(async (elem) => {
				const gamename = $(elem).text();
				const gameurl = `https://sites.google.com${$(elem).attr(
					"href"
				)}`;

				// filter out ignored games
				if (!ignoredgames.includes(gamename)) {
					if (await exists(gameurl)) {
						processResult(
							[gamename, gameurl],
							"Tyrone's Unblocked Games",
							"Tyrones"
						);
					} else {
						console.log(`${gamename} doesn't exist`);
					}
				}
			})(elem)
		);
	});
	await Promise.all(layer1);
	console.log("done with tyrones");
}

(async () => {
	await Promise.all([coolmath(), edit(), unblocked66(), tyrones()]);
	console.log("done fetching");
	data["Coolmath Games"].sort(lowerCaseSort);
	data["Coolmath Games Mirror"].sort(lowerCaseSort);
	data["Unblocked Games 66 EZ"].sort(lowerCaseSort);
	data["Tyrone's Unblocked Games"].sort(lowerCaseSort);
	console.log("done sorting");
	console.log(data);

	fs.writeFileSync(
		"./data/scrapelinks.json",
		JSON.stringify(data, Object.keys(data).sort())
	);

	console.log("done");

	debugger;
})();
