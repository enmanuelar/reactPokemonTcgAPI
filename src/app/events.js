const axios = require("axios");
const cards = require("../utils/cards");

module.exports = function(socket) {
  this.printHello = () => console.log("hello");

  /**
   * Gets the cards limited by limit received by the socket event.
   *
   * @return {Array} An array of objects with the cards data
   *
   */
  this.onGetCards = () => {
    socket.on("getCards", limit => {
      console.log("client is subscribed to getCards limit", limit);
      axios
        .get(
          `https://api.pokemontcg.io/v1/cards?setCode=base1&pageSize=${limit}`
        )
        .then(response => {
          console.log("response", response);
          socket.emit("cardsResponse", response.data);
        })
        .catch(err => {
          socket.emit("cardsResponse", err);
        });
    });
  };

  this.onGetMockData = () => {
    socket.on("getMockData", () => {
      const deckData = cards.base1.cards.slice(0, 60);
      const graveyardData = [];
      const battleCards = deckData.splice(0, 1);
      const hand = deckData.splice(0, 6);
      const bench = deckData.splice(0, 5);
      const prizes = deckData.splice(0, 6);
      const topPlayerDeck = {
        deckData,
        graveyardData,
        battleCards,
        hand,
        bench,
        prizes
      };
      socket.emit("mockDataResponse", { data: topPlayerDeck });

      // axios
      //   .get(`https://api.pokemontcg.io/v1/cards?setCode=base1`)
      //   .then(response => {})
      //   .catch(err => {
      //     console.error(err);
      //     socket.emit("mockDataResponse");
      //   });
    });
  };
};
