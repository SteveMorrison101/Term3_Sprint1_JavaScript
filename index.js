const express = require('express');
const app = express();
const path = require('path');
const { VideoGames } = require('./utils/data'); // Import game data

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// function to get nine random games
function getRandomGames() {
    const shuffled = [...VideoGames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
}

// function to get games by title
function findGameById(gameId) {
    return VideoGames.find(game =>
        game.title.replace(/\s+/g, '-').toLowerCase() === gameId
    );
}

// Function to recommend games
function getRecommendedGames(game) {
    return VideoGames
        .filter(g => g.genre === game.genre && g.title !== game.title)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
}

// home page
app.get('/', (req, res) => {
    const games = getRandomGames();
    res.render('index', { games }); // ✅ Pass random games to index.ejs
});

// routing game details page
app.get('/game/:id', (req, res) => {
    const game = findGameById(req.params.id);
    if (!game) {
        return res.status(404).send("Game not found.");
    }
    const recommendations = getRecommendedGames(game);
    res.render('game', { game, recommendations });
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
