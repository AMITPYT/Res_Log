const mongoose = require('mongoose');
const { Schema } = mongoose;

const DetailsSchema = new Schema({
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true,
        unique: true
    },
    dob:{
        type: Date,
        required: true,
        trim: true,
    },
    mobile_number:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  const details = mongoose.model('details',DetailsSchema);
  module.exports = details