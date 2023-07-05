import { smart_get, exists, processResult } from "../utils.js";
import { load } from "cheerio";

export const coolmath = async () => {
	const results = [];

	const promises = [];
	const res = await smart_get(
		"https://www.coolmathgames.com/1-complete-game-list/view-all"
	);

	console.log("coolmath request done");
	const $ = load(res.data);

	$(".view-all-games:first")
		.find("> .views-row:not(:has(>.icon-gamethumbnail-all-game-pg))")
		.find(".game-title a:first-child")
		.each((_, elem) => {
			promises.push(
				(async (elem) => {
					const gametext = $(elem).text();
					const gamehref = $(elem).attr("href");
					const gameurl = `https://www.coolmathgames.com${gamehref}/play`;
					const pageurl = `https://www.coolmathgames.com${gamehref}`;

					if (await exists(gameurl)) {
						processResult(results, [gametext, gameurl], "Coolmath");
					} else if (await exists(pageurl)) {
						processResult(
							results,
							[gametext, pageurl],
							"Coolmath page"
						);
					}
				})(elem)
			);
		});
	await Promise.all(promises);
	console.log("done with coolmath");
	return results;
};
