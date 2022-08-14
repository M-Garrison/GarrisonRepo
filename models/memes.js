const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    meme: { type: String, required: true },
    motherKnow: Boolean,
    explain: { type: String}
});

const Meme = mongoose.model('Comic', memeSchema);

module.exports = Meme; 
