// Global Variables
const linksperpage = 100; // 100 seems to be the max without causeing slowdowns on older computers
let linknames = [];
let emugames;
let page = 0; // the current page of links
let games = []; // the main array of games
let matches = []; // an array of games that meet the search criteria
let filteredsites = []; // an array of sites that are filtered out

console.log("Advanced features:");
console.log(
	'Set local storage "origin" to "0" to run the emulator hosted on this domain, and "1" to run it from GitHub.',
);
console.log(
	'Set local storage "emuWidth" and "emuHeight" to set a custom size for EmulatorJS.',
);

const mainPrm = (async () => {
	await fetchLinks();

	getLocalStorage();

	loadEmuGames();

	addSiteSelectors();

	sortLinks();

	renderLinks();

	updateTabs(localStorage.openTab);
})();

async function fetchLinks() {
	await Promise.all(
		((paths) => {
			let promises = [];
			paths.forEach((pathdata) => {
				promises.push(
					fetch(`./data/${pathdata[0]}.json`)
						.then((res) => {
							return res.json();
						})
						.then((data) => {
							//console.log(data);
							pathdata[1](data);
						})
						.catch((err) => {
							throw new Error(`Error fetching ${pathdata[0]}: ${err}`);
						}),
				);
			});
			return promises;
		})([
			["scrapelinks", processLinks],
			["customlinks", processLinks],
			[
				"emugames",
				(data) => {
					emugames = data;
				},
			],
		]),
	).then(() => {
		games.sort();

		linknames = linknames
			.concat(["Flash (Ruffle)", "Flash (WAFlash)"])
			.remove("flash")
			.sort();
		// Make sure other is at the end
		linknames.remove("Other");
		linknames.push("Other");
	});

	function processLinks(data) {
		const domain = document.createElement("a");
		for (const site in data) {
			linknames.push(site);
			const sitelist = data[site];
			if (site == "flash") {
				for (const game of sitelist) {
					// for makeshift comments
					if (typeof game === "string") continue;
					games.push([
						game[0],
						"./ruffle.html?game=" + game[1],
						"Flash (Ruffle)",
						"local",
					]);
					games.push([
						game[0],
						"./waflash.html?game=" + game[1],
						"Flash (WAFlash)",
						"local",
					]);
				}
			} else {
				for (const game of sitelist) {
					domain.href = game[1];
					games.push([game[0], game[1], site, domain.hostname]);
				}
			}
		}
	}
}

/**
 * Loads openTab, oldCores, and emu from localStorage
 */
function getLocalStorage() {
	// default openTab to NES
	if (!localStorage.openTab) localStorage.openTab = "Web";

	// set coretoggle to what is currently in localStorage (defaults to inactive)
	if (localStorage.oldCores == "1") getId("coretoggle").className += " active";

	// set emulatortoggle to what is currently in localStorage (defaults to EmulatorJS)
	switch (localStorage.emu) {
		case "EJS":
			getId("emulatortoggle").textContent = "EmulatorJS";
			break;
		case "NJS":
			getId("emulatortoggle").textContent = "NeptunJS";
			getId("coretoggle").style.display = "none";
			break;
		default:
			getId("emulatortoggle").textContent = "EmulatorJS";
			break;
	}
}

/**
 * Updates the tabs to the clicked on tab and shows/hides the proper content
 * @param {string} tab The new active tab
 */
async function updateTabs(tab) {
	await mainPrm;
	// updates the tabs and buttons
	localStorage.openTab = tab;
	let tabcontent = getClass("tabcontent");
	for (let i = 0; i < tabcontent.length; i++) {
		// hides all tabs
		tabcontent[i].style.display = "none";
	}
	getId(tab).style.display = "block"; // shows the correct tab
	let tabbuttons = getClass("tabbuttons");
	for (let i = 0; i < tabbuttons.length; i++) {
		// clears the active class from all tabs and adds the active class to the correct tab
		tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
		if (tabbuttons[i].className.includes(tab)) {
			tabbuttons[i].className += " active";
		}
	}
	let hidden = getClass("webhidden");
	let disp = tab == "Web" ? "none" : "inline";

	for (let el of hidden) {
		el.style.display = disp;
	}
}

/**
 * Loades all emulator games
 */
function loadEmuGames() {
	const buttonParent = getId("buttonparent");

	const button = document.createElement("button");

	let li = document.createElement("li");
	let link = document.createElement("a");

	li.append(link);

	let web = document.createElement("button");
	web.textContent = "Web";
	web.className = "tabbuttons Web";
	web.setAttribute("onclick", 'updateTabs("Web")');
	buttonParent.append(web);

	for (const system in emugames) {
		// Generate buttons
		let data = emugames[system];

		button.textContent = data.name;
		button.className = "tabbuttons " + system;
		button.setAttribute("onclick", `updateTabs("${system}")`);

		buttonParent.append(button.cloneNode(true));

		//Generate content
		const container = getId(system);

		quickAppend("h2", container, data.name);

		for (const title in data.games) {
			const gamedata = data.games[title];

			quickAppend("h3", container, title);

			for (const a in gamedata) {
				category = gamedata[a];

				if (a != "main") {
					quickAppend("h4", container, a);
				}

				let ul = document.createElement("ul");

				for (const game of category) {
					link.textContent = game.name;
					link.href = `game.html?ver=${data.consolename}&game=${game.rom}`;
					ul.append(li.cloneNode(true));
				}

				container.append(ul);
			}
		}
	}
}

/**
 * Loads all links into games
 */
function loadLinks() {
	const domain = document.createElement("a");
	// loop over all keys in links
	for (const site in links) {
		let sitelist = links[site];
		// other logic for flash games
		if (site == "flash") {
			for (const game of sitelist) {
				games.push([
					game[0],
					"./ruffle.html?game=" + game[1],
					"Flash (Ruffle)",
					"local",
				]);
				games.push([
					game[0],
					"./waflash.html?game=" + game[1],
					"Flash (WAFlash)",
					"local",
				]);
			}
		} else {
			for (const game of sitelist) {
				domain.href = game[1];
				games.push([game[0], game[1], site, domain.hostname]);
			}
		}
	}

	games.sort();
}

/**
 * Adds site filter buttons
 */
function addSiteSelectors() {
	const main = document.getElementById("siteselector");
	const btn = document.createElement("button");
	btn.className = "buttonslim";
	btn.setAttribute("onclick", "togglesites(event);");
	linknames.forEach((element) => {
		btn.textContent = element;
		btn.setAttribute("data", element);
		main.appendChild(btn.cloneNode(true));
	});
}

/**
 * Sorts links based on the search parameters
 */
function sortLinks() {
	matches = [];

	for (const game of games) {
		if (
			game[0].toLowerCase().includes(getId("websearch").value.toLowerCase()) &&
			!filteredsites.includes(game[2])
		) {
			matches.push(game);
		}
	}
}

/**
 * Renders the sorted links (must be called after sortLinks())
 */
function renderLinks() {
	const main = getId("webgames");
	main.innerHTML = "";

	const div = document.createElement("div");
	div.className = "webcontent";
	const a = document.createElement("a");
	a.className = "weblinks";
	a.setAttribute("target", "_blank");
	const p = document.createElement("p");
	p.className = "domainname";

	div.appendChild(a);
	div.appendChild(p);

	const startvalue = page * linksperpage;

	for (const game of matches.slice(startvalue, startvalue + linksperpage)) {
		a.textContent = game[0] + " - " + game[2];
		a.href = game[1];
		a.style.color =
			"hsl(" +
			(360 / linknames.length) * linknames.indexOf(game[2]) +
			", 100%, 85%)";

		p.textContent = "(" + game[3] + ")";

		main.appendChild(div.cloneNode(true));
	}

	const disp = getClass("pagedisplay");

	Array.from(disp).forEach((element) => {
		element.textContent = `Page ${page + 1} of ${
			Math.floor(matches.length / linksperpage) + 1
		}`;
	});
}

async function toggleEmulator() {
	await mainPrm;
	let main = getId("emulatortoggle");

	if (main.textContent == "EmulatorJS") {
		localStorage.emu = "NJS";
		main.textContent = "NeptunJS";
		getId("coretoggle").style.display = "none";
	} else {
		localStorage.emu = "EJS";
		main.textContent = "EmulatorJS";
		getId("coretoggle").style.display = "inline-block";
	}
}

async function toggleoldcores() {
	await mainPrm;
	let toggle = getId("coretoggle");
	let classes = toggle.className.split(" ");

	if (classes.includes("active")) {
		classes.remove("active");
		localStorage.oldCores = "0";
	} else {
		localStorage.oldCores = "1";
		classes.push("active");
	}

	toggle.className = classes.join(" ");
}

async function togglesites(event) {
	await mainPrm;
	const el = event.currentTarget;

	let classes = el.className.split(" ");

	if (classes.includes("active")) {
		classes.remove("active");
		filteredsites.remove(el.attributes["data"].nodeValue);
	} else {
		classes.push("active");
		filteredsites.push(el.attributes["data"].nodeValue);
	}

	el.className = classes.join(" ");

	onSearchInput();
}

async function nextPage() {
	await mainPrm;
	if (page != Math.floor(matches.length / linksperpage)) {
		page += 1;
		renderLinks();
	}
}

async function prevPage() {
	await mainPrm;
	if (page != 0) {
		page -= 1;
		renderLinks();
	}
}

async function onSearchInput() {
	await mainPrm;
	page = 0;
	sortLinks();
	renderLinks();
}

async function randomGame() {
	await mainPrm;
	window.open(matches[Math.floor(Math.random() * matches.length)][1]);
}
