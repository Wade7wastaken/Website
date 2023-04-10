const axios = require("axios");
const cheerio = require("cheerio");

async function exists(url) {
	try {
		await axios.get(url);
	} catch (error) {
		return false;
	}
	return true;
}

const links = {};

const functions = [
	async () => {
		// EDIT COOLMATH GAMES
		const promises = [];

		await axios
			.get("https://edit.coolmath-games.com/1-complete-game-list/view-all")
			.then((res) => {
				console.log("request to edit done");
				const $ = cheerio.load(res.data);

				$(".view-all-games:first .views-row")
					.find(".game-title a:first-child")
					.each((i, elem) => {
						const promise = new Promise((resolve, reject) => {
							const gameurl =
								"https://edit.coolmath-games.com" +
								$(elem).attr("href") +
								"/play";

							exists(gameurl).then((res) => {
								const gametext = $(elem).text();
								console.log([gametext, gameurl]);
								resolve([gametext, gameurl]);
							});
						});
						promises.push(promise);
					});
			});

		links.edit = await Promise.all(promises);
	},
	async () => {
		// COOLMATH GAMES
		const promises = [];

		await axios
			.get("https://www.coolmathgames.com/1-complete-game-list/view-all")
			.then((res) => {
				console.log("request to edit done");
				const $ = cheerio.load(res.data);

				$(".view-all-games:first")
					.find("> .views-row:not(:has(>.icon-gamethumbnail-all-game-pg))")
					.find(".game-title a:first-child")
					.each((i, elem) => {
						const promise = new Promise((resolve, reject) => {
							const gameurl =
								"https://www.coolmathgames.com" +
								$(elem).attr("href") +
								"/play";

							exists(gameurl).then((res) => {
								const gametext = $(elem).text();
								console.log([gametext, gameurl]);
								resolve([gametext, gameurl]);
							});
						});
						promises.push(promise);
					});
			});

		links.coolmath = "hi";
	},
];

functions.forEach((fnc) => {
	fnc()
		.then((res) => {
			if (functions.length == Object.keys(links).length) {
				console.log(links);

				process.exit(); // exit so it doesn't get printed twice if two functions finish at the same time
			}
			//console.log(res);
		})
		.catch((err) => {
			throw new Error(err);
		});
});

/*

// basically we push promises to this array, then use promise.all to wait for all of them to finish
let promises = [];

let links = {
	edit: [],
};

async function exists(url) {
	try {
		await axios.get(url);
	} catch (error) {
		return false;
	}
	return true;
}

async function edit() {
	await axios
		.get("https://edit.coolmath-games.com/1-complete-game-list/view-all")
		.then((res) => {
			console.log("request done");
			const $ = cheerio.load(res.data);
			let promises1 = [];
			const games = $(".view-all-games:first .views-row")
				.find(".game-title a:first-child")
				.each((i, elem) => {
					promises1.push(
						(async (i, elem) => {
							const gameurl =
								"https://edit.coolmath-games.com" +
								$(elem).attr("href") +
								"/play";

							await exists(gameurl).then((res) => {
								const gametext = $(elem).text();
								console.log([gametext, gameurl]);
								links.edit.push([gametext, gameurl]);
							});
						})(i, elem),
					);
				});
		})
		.catch((err) => {
			throw new Error(err);
		});
}

edit();

/* 
Promise.all(promises)
	.then((res) => {
		//console.log(res);
		console.log(links);
	})
	.catch((err) => {
		throw new Error(err);
	});
*/
