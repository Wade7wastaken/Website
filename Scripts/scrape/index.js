import { writeFileSync } from "fs";

import { lowerCaseSort } from "./utils.js";

import { coolmath } from "./sites/coolmath.js";
import { unblocked66 } from "./sites/unblocked66.js";
import { tyrones } from "./sites/tyrones.js";

const sites = [
	["Coolmath Games", coolmath()],
	["Unblocked Games 66 EZ", unblocked66()],
	["Tyrone's Unblocked Games", tyrones()],
];

(async () => {
	const results = {};

	for (const site of sites) {
		results[site[0]] = (await site[1]).sort(lowerCaseSort);
	}

	console.log("done fetching");
	console.log(results);

	writeFileSync(
		"./data/scrapelinks.json",
		JSON.stringify(results, Object.keys(results).sort())
	);

	console.log("done");

	debugger;
})();
