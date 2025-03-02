const express = require('express');
const app = express();
const path = require('path');
const { VideoGames } = require('./utils/data'); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// FUNCTIONS

// function to get nine random games
function getRandomGames() {
    const shuffled = [...VideoGames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
}

// function to get a game by its title
function findGameById(gameId) {
    return VideoGames.find(game =>
        game.title.replace(/\s+/g, '-').toLowerCase() === gameId
    );
}

// function to recommend games by genre
function getRecommendedGames(game) {
    return VideoGames
        .filter(g => g.genre === game.genre && g.title !== game.title)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
}

// Function to get the hidden gems
function getHiddenGems() {
    return VideoGames.filter(game => game.averageRating >= 9.0 && game.numberOfReviews < 1000)
        .sort((a, b) => b.averageRating - a.averageRating); // Sort by rating
}

// Function to get top rated games
function getTopRatedGames() {
    return VideoGames
        .filter(game => game.averageRating !== null) 
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 15);
}

// Function to get upcoming games
function getUpcomingGames() {
    return VideoGames.filter(game => !game.released)
        .sort((a, b) => a.releaseYear - b.releaseYear); // Sort by release year
}

// ROUTES

app.get('/upcoming', (req, res) => {
    const upcomingGames = getUpcomingGames();
    res.render('upcoming', { upcomingGames });
});

app.get('/hidden-gems', (req, res) => {
    const hiddenGems = getHiddenGems();
    res.render('hidden-gems', { hiddenGems });
});

app.get('/', (req, res) => {
    const games = getRandomGames();
    res.render('index', { games }); 
});

app.get('/game/:id', (req, res) => {
    const game = findGameById(req.params.id);
    if (!game) {
        return res.status(404).send("Game not found.");
    }
    const recommendations = getRecommendedGames(game);
    res.render('game', { game, recommendations });
});

app.get('/top-rated', (req, res) => {
    const topGames = getTopRatedGames();
    res.render('top-rated', { topGames });
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

