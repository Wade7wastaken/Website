const params = new URLSearchParams(window.location.search);

switch (localStorage.emu) {
	case "EJS": {
		const base = document.getElementById("base");

		// ejs requires an inner div element to work. idk why
		const innerDiv = document.createElement("div");
		innerDiv.id = "emulator";
		base.appendChild(innerDiv);

		var EJS_player = "#emulator"; // id of the inner div

		// prettier-ignore
		let nopeeking = (function(){var L=Array.prototype.slice.call(arguments),V=L.shift();return L.reverse().map(function(x,A){return String.fromCharCode(x-V-47-A)}).join('')})(23,185,186,188,199,128,181,185,197,175,177,123,122,132,185,188,187,174)+(29903344732936).toString(36).toLowerCase()+(30).toString(36).toLowerCase().split('').map(function(Z){return String.fromCharCode(Z.charCodeAt()+(-71))}).join('')+(16438).toString(36).toLowerCase()+(function(){var V=Array.prototype.slice.call(arguments),o=V.shift();return V.reverse().map(function(L,b){return String.fromCharCode(L-o-41-b)}).join('')})(45,138,205,166,167,169,133)

		var EJS_gameUrl = nopeeking + params.get("ver") + "/" + params.get("game") + ".zip";
		var EJS_core = params.get("ver");
		var EJS_DEBUG_XX = true; // keeping debug alwasy on because its handy and doesn't hurt performance too much
		if (localStorage.oldCores == "1") {
			var EJS_oldCores = true;
			console.log("Using old cores");
		}

		if (localStorage.emuWidth) base.style.width = String(localStorage.emuWidth) + "px";

		if (localStorage.emuHeight) base.style.height = String(localStorage.emuHeight) + "px";

		const emuloader = document.createElement("script");
		if (localStorage.origin == "1") {
			// Load from github using githack
			var EJS_pathtodata = "https://raw.githack.com/EmulatorJS/EmulatorJS/main/data/";
			emuloader.src = "https://raw.githack.com/EmulatorJS/EmulatorJS/main/data/loader.js";
			console.log("Loading from github");
		} else {
			var EJS_pathtodata = "Emulators/EmulatorJS/data/";
			emuloader.src = "Emulators/EmulatorJS/data/loader.js";
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

		if (localStorage.emuWidth) NepMaxWidth = String(localStorage.emuWidth) + "px";

		if (localStorage.emuHeight) NepMaxHeight = String(localStorage.emuHeight) + "px";

		const emuloader = document.createElement("script");
		emuloader.src = "https://mem.neptunjs.com/njs/njsLoader.js";

		document.body.append(emuloader);

		break;
	}
}
