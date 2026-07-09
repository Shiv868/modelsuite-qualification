const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0, // MongoDB TTL index
  },
});

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);