// models/todo.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });
  
  // models/todo.js
const customer = mongoose.model('Customer', customerSchema);
// export 
module.exports = customer;
