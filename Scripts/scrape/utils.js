import axios from "axios";

export const smart_get = async (url, iter = 0) => {
	let res;

	try {
		res = await axios.get(url);
	} catch (error) {
		if (error.response.status != 404) {
			console.log(`NON-404: ${url} returned ${error}`);
			await new Promise((r) => setTimeout(r, 1000)); // wait 1 second
			if (iter >= 5) {
				console.log(`Fetching ${url} failed after ${iter} attempts.`);
				throw error;
			}
			return await smart_get(url, iter + 1); // call this function again and increase the iteration
		}
		console.log(`${url} returned ${error}`);
		throw error;
	}

	return res;
};

export const exists = async (url, iter = 0) => {
	if (iter >= 5) {
		console.log(`${url} failed after ${iter - 1} attempts.`);
		return false;
	}

	try {
		await axios.get(url);
	} catch (error) {
		// make sure it exists
		if (error.response) {
			if (error.response.status != 404) {
				console.log(`NON-404: ${url} returned ${error}`);
				await new Promise((r) => setTimeout(r, 1000)); // wait 1 second
				return await exists(url, iter + 1); // call this function again and increase the iteration
			} else {
				console.log(`${url} returned ${error}`);
				return false;
			}
		} else {
			console.log(`${url} errored without a status code ${error}`);
			return false;
		}
	}
	return true;
};

export const processResult = (resultslist, results, logtext) => {
	resultslist.push(results);
	console.log(`${logtext}: ${results}`);
};

export const lowerCaseSort = (a, b) => {
	return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
};
