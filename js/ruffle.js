// get url queries (?game=)
const params = new URLSearchParams(window.location.search);

window.RufflePlayer = window.RufflePlayer || {};
window.addEventListener("load", (_e) => {
	const ruffle = window.RufflePlayer.newest();
	const player = ruffle.createPlayer();
	getId("ruffle").appendChild(player);
	player.load(
		"https://rawcdn.githack.com/wade7wastaken/TrulyUnblockedGamesSWF/main/" +
			params.get("game") +
			".swf"
	);
	// make it resizable (cant figure out how to get it to resize to the current window. Setting width and height to 100% doesn't work)
	player.style.resize = "both";
	player.style.overflow = "auto";
	player.style.border = "2px solid";
});
