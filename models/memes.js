const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    meme: { type: String, required: true },
    motherKnow: Boolean,
    explain: { type: String}
});

const Meme = mongoose.model('Comic', memeSchema);

module.exports = Meme; 






// Name: <input type="text" name="name" /></br>
// Meme: <input type="text" name="meme" /></br>
// Check here if your Mother would understand this Meme (if she saw it): <input type="checkbox" name="motherKnow" /><br/>
// Meme explanation: <input type="text" name="explain" /></br>
// <input type="submit" value="Submit Meme">
// </form>