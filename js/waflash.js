// This code is from unblockedgames66ez, but adapted to this website by me

let is_mobile = /Mobi/i.test(window.navigator.userAgent);
if (is_mobile) {
	function scrollToSubject() {
		try {
			window.scrollTo({ top: 100, left: 0, behavior: "smooth" });
		} catch (e) {}
	}
	scrollToSubject();
	window.addEventListener("orientationchange", function () {
		setTimeout(scrollToSubject, 100);
	});
} else {
	document.getElementById("canvas").focus();
}
document.getElementById("canvas").addEventListener("keydown", function (ev) {
	ev.preventDefault();
	ev.stopPropagation();
});
document.getElementById("canvas").addEventListener("click", function () {
	document.getElementById("canvas").focus();
});
document.addEventListener(
	"mousedown",
	(function () {
		const canvasElement = document.getElementById("canvas");
		let focused = false;
		return function (ev) {
			if (ev.target == canvasElement) {
				if (!focused) {
					canvasElement.focus();
					focused = true;
				}
			} else {
				if (focused) {
					focused = false;
				}
			}
			return true;
		};
	})()
);
import { createWaflash } from "https://cdn.jsdelivr.net/gh/AndreajnRcm4/b398dl2h74v@9a23fbb2373d743a564873251cbb57736ebc1f73/js/waflash-player.min.js";

const params = new URLSearchParams(window.location.search);

createWaflash(
	"https://rawcdn.githack.com/wade7wastaken/TrulyUnblockedGamesSWF/main/" +
		params.get("game") +
		".swf",
	window.wafOptions || {}
);
