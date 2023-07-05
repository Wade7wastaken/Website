import { smart_get, exists, processResult } from "../utils.js";
import { load } from "cheerio";

export const tyrones = async () => {
	const results = [];

	const ignoredgames = ["Home"];
	const promises = [];

	const res = await smart_get(
		"https://sites.google.com/site/tyronesgameshack/home"
	);

	console.log("tyrones request done");
	const $ = load(res.data);

	$(".aJHbb.dk90Ob.hDrhEe.HlqNPb").each((i, elem) => {
		promises.push(
			(async (elem) => {
				const gamename = $(elem).text();
				const gameurl = `https://sites.google.com${$(elem).attr(
					"href"
				)}`;

				// filter out ignored games
				if (!ignoredgames.includes(gamename)) {
					if (await exists(gameurl)) {
						processResult(results, [gamename, gameurl], "Tyrones");
					} else {
						console.log(`${gamename} doesn't exist`);
					}
				}
			})(elem)
		);
	});
	await Promise.all(promises);
	console.log("done with tyrones");

	return results;
};
