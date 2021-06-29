const express = require("express");
const repoContext = require('./repository/repository-wrapper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log("Server started. Listening on port 3000.");
});

app.get('/api/music', (req, res) => {
    const music = repoContext.songs.findAllSongs();
    return res.send(music);
});

app.get('/api/music/:id', (req, res) => {
    const id = req.params.id;
    const music = repoContext.songs.findSongsById(id);
    return res.send(music);
});

app.post('/api/music', (req, res) => {
    const newMusic = req.body;
    const addedMusic = repoContext.songs.createSong(newMusic);
    return res.send(addedMusic);
});

app.put('/api/music/:id', (req, res) => {
    const id = req.params.id;
    const musicPropertiesToUpdate = req.body;
    const updatedMusic = repoContext.songs.updateSong(id, musicPropertiesToUpdate);
    return res.send(updatedMusic)
});

app.delete('/api/music/:id', (req, res) => {
    const id = req.params.id;
    const updatedDataSet = repoContext.songs.deleteSong(id);
    return res.send(updatedDataSet);
});