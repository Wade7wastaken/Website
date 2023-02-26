function getId(id) {
	return document.getElementById(id);
}

function getClass(className) {
	return document.getElementsByClassName(className);
}

function remove(arr, value) {
	var index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
}

function quickAppend(type, container, text) {
	const el = document.createElement(type);
	el.textContent = text;
	container.append(el);
}
