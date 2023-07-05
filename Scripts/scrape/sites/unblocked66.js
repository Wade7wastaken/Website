import { smart_get, exists, processResult } from "../utils.js";
import { load } from "cheerio";

export const unblocked66 = async () => {
	const results = [];

	const ignoredgames = ["All Unblocked Games 66 EZ", "Feedback"];
	const promises = [];

	const res = await smart_get(
		"https://sites.google.com/site/unblockedgames66ez/home"
	);

	console.log("unblocked66 request done");
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
						processResult(
							results,
							[gamename, gameurl],
							"Unblocked 66"
						);
					} else {
						console.log(`${gamename} doesn't exist`);
					}
				}
			})(elem)
		);
	});
	await Promise.all(promises);
	console.log("done with unblocked66");

	return results;
};
