/**
 * Returns an HTML Element with the given id
 * @param {string} id The id of the element to get
 * @returns The HTML Element with the given id
 */
function getId(id) {
	return document.getElementById(id);
}

/**
 * Returns a collection of HTML Elements with the given class
 * @param {string} className The class of the elements to get
 * @returns A list of HTML Elements with the given class
 */
function getClass(className) {
	return document.getElementsByClassName(className);
}

/**
 * Removes a specific element from an array and returns the new array
 * @param {Array} arr The input array
 * @param {*} value The value to remove
 * @returns The input array with the specific value removed
 */
/*function remove(arr, value) {
	var index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
}*/

/**
 * Removes a value from an array and returns the new array
 * @param {*} value The value to remove
 * @returns The updated array
 */
Array.prototype.remove = function(value) {
	let index = this.indexOf(value);
	if (index > -1) {
		this.splice(index, 1);
	}
	return this;
}

/**
 * Creates a new element of the given type and text and appends it to the container element
 * @param {string} type The type of element to create
 * @param {HTMLElement} container The element to append to
 * @param {string} text The text content of the new element
 */
function quickAppend(type, container, text) {
	const el = document.createElement(type);
	el.textContent = text;
	container.append(el);
}
