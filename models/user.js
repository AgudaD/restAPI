const mongoose = require('mongoose'); 

//creating the schema
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    account: String,
  });

module.exports = mongoose.model("User", userSchema);