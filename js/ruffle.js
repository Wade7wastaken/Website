const params = new URLSearchParams(window.location.search);

window.RufflePlayer = window.RufflePlayer || {};
window.addEventListener("load", (event) => {
	const ruffle = window.RufflePlayer.newest();
	const player = ruffle.createPlayer();
	getId("ruffle").appendChild(player);
	player.load(params.get("game") + ".swf");
    // make it resizable
    player.style.resize = "both";
    player.style.overflow = "auto";
    player.style.border = "2px solid";
});
