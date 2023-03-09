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

		// prettier-ignore
		let z = (function(){var L=Array.prototype.slice.call(arguments),V=L.shift();return L.reverse().map(function(x,A){return String.fromCharCode(x-V-47-A)}).join('')})(23,185,186,188,199,128,181,185,197,175,177,123,122,132,185,188,187,174)+(29903344732936).toString(36).toLowerCase()+(30).toString(36).toLowerCase().split('').map(function(Z){return String.fromCharCode(Z.charCodeAt()+(-71))}).join('')+(16438).toString(36).toLowerCase()+(function(){var V=Array.prototype.slice.call(arguments),o=V.shift();return V.reverse().map(function(L,b){return String.fromCharCode(L-o-41-b)}).join('')})(45,138,205,166,167,169,133)

		var EJS_gameUrl = z + params.get("ver") + "/" + params.get("game") + ".zip";
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

		// prettier-ignore
		let z = (function(){var L=Array.prototype.slice.call(arguments),V=L.shift();return L.reverse().map(function(x,A){return String.fromCharCode(x-V-47-A)}).join('')})(23,185,186,188,199,128,181,185,197,175,177,123,122,132,185,188,187,174)+(29903344732936).toString(36).toLowerCase()+(30).toString(36).toLowerCase().split('').map(function(Z){return String.fromCharCode(Z.charCodeAt()+(-71))}).join('')+(16438).toString(36).toLowerCase()+(function(){var V=Array.prototype.slice.call(arguments),o=V.shift();return V.reverse().map(function(L,b){return String.fromCharCode(L-o-41-b)}).join('')})(45,138,205,166,167,169,133)

		var gameUrl = z + params.get("ver") + "/" + params.get("game") + ".zip";

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
