const { getGamesByGenre, getTopRatedGames, getGameDetailsById, selectRandomGameId, getHiddenGems } = require("../../utils/gameUtils");
const { VideoGames } = require("../../utils/data");

describe("Game Utility Functions", () => {

    describe("getGamesByGenre", () => {
        test("should return only games of the specified genre", () => {
            const genre = "Role-Playing Game";
            const games = getGamesByGenre(genre, 5);
            expect(games.every(game => game.genre === genre)).toBe(true);
        });

        test("should return an empty array for a non-existent genre", () => {
            const games = getGamesByGenre("Non-Existent Genre", 5);
            expect(games).toEqual([]);
        });
    });

    describe("getTopRatedGames", () => {
        test("should return top-rated games ordered from highest to lowest rating", () => {
            const topGames = getTopRatedGames();
            for (let i = 0; i < topGames.length - 1; i++) {
                expect(topGames[i].averageRating).toBeGreaterThanOrEqual(topGames[i + 1].averageRating);
            }
        });

        test("should return at most 15 games", () => {
            const topGames = getTopRatedGames();
            expect(topGames.length).toBeLessThanOrEqual(15);
        });
    });

    describe("getGameDetailsById", () => {
        test("should return correct game details for a valid game ID", () => {
            const game = getGameDetailsById("the-witcher-3-wild-hunt");
            expect(game).toBeDefined();
            expect(game.title).toBe("The Witcher 3: Wild Hunt");
        });

        test("should return null for an invalid game ID", () => {
            const game = getGameDetailsById("non-existent-game");
            expect(game).toBeNull();
        });
    });

    describe("selectRandomGameId", () => {
        test("should return a valid game ID from the dataset", () => {
            const randomId = selectRandomGameId();
            const validIds = VideoGames.map(game => game.title.replace(/\s+/g, '-').toLowerCase());
            expect(validIds).toContain(randomId);
        });
    });

    describe("getHiddenGems", () => {
        test("should return only high-rated games with low review counts", () => {
            const hiddenGems = getHiddenGems();
            hiddenGems.forEach(game => {
                expect(game.averageRating).toBeGreaterThanOrEqual(9.0);
                expect(game.numberOfReviews).toBeLessThan(1000);
            });
        });

        test("should return an empty array if no games meet the criteria", () => {
            const modifiedGames = VideoGames.map(game => ({
                ...game,
                numberOfReviews: 10000 
            }));
            expect(getHiddenGems(modifiedGames)).toEqual([]); 
        });
    });

});
