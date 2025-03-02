const { VideoGames } = require("./data");

/**
 * Converts a game title into a URL-friendly slug format.
 * @param {string} title - The title of the game
 * @returns {string} - The slugified version of the title
 */
function slugify(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

/**
 * Get `x` games by genre
 * @param {string} genre - The genre of the games
 * @param {number} x - The number of games to retrieve
 * @returns {Array} - An array of games matching the genre
 */
function getGamesByGenre(genre, x) {
    return VideoGames.filter(game => game.genre === genre).slice(0, x);
}

/**
 * Get the `x` top-rated games, ordered by rating
 * @param {number} x - The number of top-rated games to retrieve
 * @returns {Array} - An array of top-rated games
 */
function getTopRatedGames(x = 15) {
    return [...VideoGames]
        .filter(game => game.averageRating !== null)
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, x);
}

/**
 * Get the details of a game by its slugified ID.
 * @param {string} id - The ID (slug) of the game
 * @returns {Object|null} - The game object or null if not found
 */
function getGameDetailsById(id) {
    return VideoGames.find(game => slugify(game.title) === id) || null;
}

/**
 * Select a random game ID
 * @returns {string} - A random game ID (slug)
 */
function selectRandomGameId() {
    const randomIndex = Math.floor(Math.random() * VideoGames.length);
    return slugify(VideoGames[randomIndex].title);
}

/**
 * Get "Hidden Gems" - games that are highly rated but not widely reviewed
 * @param {Array} data - The dataset to filter (default is VideoGames)
 * @returns {Array} - An array of hidden gem games
 */
function getHiddenGems(data = VideoGames) {
    return data.filter(game => game.averageRating >= 9.0 && game.numberOfReviews < 1000);
}

// Export the functions to be used in other modules
module.exports = {
    getGamesByGenre,
    getTopRatedGames,
    getGameDetailsById,
    selectRandomGameId,
    getHiddenGems,
    slugify, 
};
