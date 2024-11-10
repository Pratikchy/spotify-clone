const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/spotifyClone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Schema
const UserSchema = new mongoose.Schema({ username: String, password: String });
const PlaylistSchema = new mongoose.Schema({
    name: String,
    userId: String,
    songs: [{ title: String, likes: Number, comments: [String] }],
});

const User = mongoose.model('User', UserSchema);
const Playlist = mongoose.model('Playlist', PlaylistSchema);

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) res.status(200).send({ userId: user._id });
    else res.status(404).send('User not found');
});

// Add Playlist Route
app.post('/playlists', async (req, res) => {
    const playlist = new Playlist(req.body);
    await playlist.save();
    res.status(201).send(playlist);
});

// Add Song to Playlist Route
app.post('/playlists/:id/addSong', async (req, res) => {
    const { title } = req.body;
    const playlist = await Playlist.findById(req.params.id);
    playlist.songs.push({ title, likes: 0, comments: [] });
    await playlist.save();
    res.status(200).send(playlist);
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
