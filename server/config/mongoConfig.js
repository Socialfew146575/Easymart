const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    // console.log(
    //   `MongoDB connected with server : ${connection.connection.host}`
    // );
  } catch (error) {
    // console.log(error);
    throw error
  }
};

module.exports = connectToDB;
