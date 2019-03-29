const io = require("socket.io")(8000);
const Events = require("./app/events");

io.on("connection", socket => {
  const events = new Events(socket);
  events.printHello();
  events.onGetCards();
  events.onGetMockData();
});

console.log("listening...");
