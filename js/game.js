const params = new URLSearchParams(window.location.search);
const origin = sessionStorage.getItem("origin");
const base = document.getElementById("base");

switch (localStorage.emu) {
	case "EJS": {
		const innerDiv = document.createElement("div");
		innerDiv.id = "emulator";
		base.appendChild(innerDiv);

		var EJS_player = "#emulator";
		var EJS_gameUrl = "ROMs/" + params.get("ver") + "/" + params.get("game") + ".zip";
		var EJS_core = params.get("ver");
		var EJS_DEBUG_XX = true;
		if (localStorage.oldCores == "1") {
			var EJS_oldCores = true;
			console.log("Using old cores");
		}

		if (localStorage.emuWidth) {
			base.style.width = String(localStorage.emuWidth) + "px";
		}
		if (localStorage.emuHeight) {
			base.style.height = String(localStorage.emuHeight) + "px";
		}

		const emuloader = document.createElement("script");
		if (localStorage.origin == "1") {
			var EJS_pathtodata = "https://raw.githack.com/EmulatorJS/EmulatorJS/main/data/";
			emuloader.src = "https://raw.githack.com/EmulatorJS/EmulatorJS/main/data/loader.js";
			console.log("Loading from github");
		} else {
			var EJS_pathtodata = "EmulatorJS/data/";
			emuloader.src = "EmulatorJS/data/loader.js";
			console.log("Loading locally");
		}
		document.body.append(emuloader);

		break;
	}
	case "NJS": {
		var NepPlayer = "#base";
		var NepLang = "en";
		var gameUrl = "ROMs/" + params.get("ver") + "/" + params.get("game") + ".zip";

		var NepEmu = params.get("ver");
		var NepZoom = "enable";

		if (localStorage.emuWidth) {
			NepMaxWidth = String(localStorage.emuWidth) + "px";
		}
		if (localStorage.emuHeight) {
			NepMaxHeight = String(localStorage.emuHeight) + "px";
		}

		const emuloader = document.createElement("script");
		emuloader.src = "https://mem.neptunjs.com/njs/njsLoader.js";

		document.body.append(emuloader);

		break;
	}
}
