const validEmulators = ["EJS", "NJS"];

// get url queries (?game=)
const params = new URLSearchParams(window.location.search);

// set emu to EJS if it doesn't exist
if (!localStorage.emu) {
	localStorage.emu = "EJS";
}
// if emu isn't valid, set it to ejs
if (!validEmulators.includes(localStorage.emu)) {
	localStorage.emu = "EJS";
}

const gameFile = `http://david.thecallenders.com/ROMs/${params.get(
	"ver"
)}/${params.get("game")}.zip`;

switch (localStorage.emu) {
	case "EJS": {
		const base = getId("base");

		// make the div resizable
		base.style.resize = "both";
		base.style.overflow = "auto";

		// ejs requires an inner div element to work. idk why
		const innerDiv = document.createElement("div");
		innerDiv.id = "emulator";
		base.appendChild(innerDiv);

		var EJS_player = "#emulator"; // id of the inner div

		var EJS_gameUrl = gameFile;
		var EJS_core = params.get("ver");

		var EJS_DEBUG_XX = true; // turn off debugging if production

		if (localStorage.oldCores == "1") {
			var EJS_oldCores = true;
			console.log("Using old cores");
		}

		// if emuWidth and emuHeight are defined, set the base style to their values
		if (localStorage.emuWidth)
			base.style.width = String(localStorage.emuWidth) + "px";

		if (localStorage.emuHeight)
			base.style.height = String(localStorage.emuHeight) + "px";

		const emuloader = document.createElement("script");
		if (localStorage.origin == "1") {
			// Load from github using githack
			var EJS_pathtodata =
				"https://rawcdn.githack.com/EmulatorJS/EmulatorJS/main/data/";
			emuloader.src =
				"https://rawcdn.githack.com/EmulatorJS/EmulatorJS/main/data/loader.js";

			console.log("Loading from github with githack");
		} else {
			var EJS_pathtodata = "Emulators/EmulatorJS/data/";
			emuloader.src = "Emulators/EmulatorJS/data/loader.js";
		}
		document.body.append(emuloader);
		break;
	}
	case "NJS": {
		var NepPlayer = "#base";
		var NepLang = "en";

		var gameUrl = gameFile;

		var NepEmu = params.get("ver");
		var NepZoom = "enable";

		if (localStorage.emuWidth)
			NepMaxWidth = String(localStorage.emuWidth) + "px";

		if (localStorage.emuHeight)
			NepMaxHeight = String(localStorage.emuHeight) + "px";

		const emuloader = document.createElement("script");
		emuloader.src = "https://mem.neptunjs.com/njs/njsLoader.js";

		document.body.append(emuloader);

		break;
	}
}
