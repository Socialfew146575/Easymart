const { app } = require("./app");
const connectToDB = require("./config/mongoConfig");

const PORT = process.env.PORT || 5173;
let server;

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  // console.log(`Error : ${err.message}`);
  // console.log("Shutting down the Server due to Uncaught  Exception");

  process.exit(1);
});

connectToDB()
  .then(() => {
    server = app.listen(PORT, () => {
      // console.log(`Server is listening at PORT ${PORT}`);
    });
  })
  .catch(() => {
    // console.log("Something went wrong while connecting to Database");
  });

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  // console.log(`Error : ${err.message}`);
  // console.log("Shutting down the Server due to Unhandled Promise Rejection");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
