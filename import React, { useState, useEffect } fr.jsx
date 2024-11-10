import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [playlistName, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [songTitle, setSongTitle] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (userId) {
            fetchFavorites();
        }
    }, [userId]);

    const handleLogin = async () => {
        const response = await axios.post('http://localhost:5000/login', { username, password });
        setUserId(response.data.userId);
    };

    const handleCreatePlaylist = async () => {
        const response = await axios.post('http://localhost:5000/playlists', {
            name: playlistName,
            userId,
            songs: [],
        });
        setPlaylists([...playlists, response.data]);
    };

    const handleAddSong = async (playlistId) => {
        const response = await axios.post(`http://localhost:5000/playlists/${playlistId}/addSong`, {
            title: songTitle,
        });
        setPlaylists(playlists.map(pl => (pl._id === playlistId ? response.data : pl)));
    };

    const addFavorite = async (songId) => {
        const response = await axios.post(`http://localhost:5000/favorites/${userId}/add`, { songId });
        setFavorites(response.data);
    };

    const removeFavorite = async (songId) => {
        const response = await axios.delete(`http://localhost:5000/favorites/${userId}/remove`, { data: { songId } });
        setFavorites(response.data);
    };

    const fetchFavorites = async () => {
        const response = await axios.get(`http://localhost:5000/favorites/${userId}`);
        setFavorites(response.data);
    };

    return (
        <div className="App">
            <h1>Spotify Clone</h1>
            {userId ? (
                <div>
                    <h2>Create Playlist</h2>
                    <input
                        type="text"
                        placeholder="Playlist Name"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    <button onClick={handleCreatePlaylist}>Create</button>

                    <h2>Your Playlists</h2>
                    {playlists.map((playlist) => (
                        <div key={playlist._id}>
                            <h3>{playlist.name}</h3>
                            <input
                                type="text"
                                placeholder="Song Title"
                                value={songTitle}
                                onChange={(e) => setSongTitle(e.target.value)}
                            />
                            <button onClick={() => handleAddSong(playlist._id)}>Add Song</button>
                            {playlist.songs.map((song, index) => (
                                <p key={index}>
                                    {song.title}
                                    {favorites.includes(song._id) ? (
                                        <button onClick={() => removeFavorite(song._id)}>Remove from Favorites</button>
                                    ) : (
                                        <button onClick={() => addFavorite(song._id)}>Add to Favorites</button>
                                    )}
                                </p>
                            ))}
                        </div>
                    ))}

                    <h2>Your Favorite Songs</h2>
                    {favorites.map((favorite) => (
                        <p key={favorite._id}>{favorite.title}</p>
                    ))}
                </div>
            ) : (
                <div>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
}

export default App;
