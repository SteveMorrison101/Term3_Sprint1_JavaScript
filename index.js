const express = require('express');
const path = require('path');
const { VideoGames, Genres } = require('./utils/data');
const { getGameDetailsById, getGamesByGenre, getTopRatedGames, selectRandomGameId, getHiddenGems } = require('./utils/gameUtils');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/game/:id', (request, response) => {
    //For use with links like: /game/1
    const gameId = request.params.id;
});

//Add remaining routes here

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
