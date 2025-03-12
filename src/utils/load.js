/**
 *
 * @param {String} url
 * @returns {Promise<Object>}
 */
async function loadJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${response.statusText} ${response.url}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export { loadJson };
