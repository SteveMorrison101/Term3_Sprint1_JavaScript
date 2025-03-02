const express = require('express');
const app = express();
const path = require('path');
const { VideoGames } = require('./utils/data'); // Importing game data

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Function to get 9 random games
function getRandomGames() {
    const shuffled = [...VideoGames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
}

// Route for Home Page
app.get('/', (req, res) => {
    const games = getRandomGames();
    res.render('index', { games }); // ✅ Ensure games is passed to index.ejs
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
