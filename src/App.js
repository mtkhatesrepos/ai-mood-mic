import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [moodText, setMoodText] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const generatePlaylist = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/generate-playlist', {
        moodText,
      });
      setPlaylists(res.data.playlists);
    } catch (error) {
      alert('Error generating playlist');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>AI Mood Playlist Generator</h1>
      <textarea
        rows="3"
        value={moodText}
        onChange={(e) => setMoodText(e.target.value)}
        placeholder="Describe your mood..."
        style={{ width: '100%', fontSize: '1.1em' }}
      />
      <button onClick={generatePlaylist} disabled={loading || !moodText}>
        {loading ? 'Generating...' : 'Generate Playlist'}
      </button>

      <div style={{ marginTop: 20 }}>
        {playlists.map((playlist) => (
          <div key={playlist.id} style={{ marginBottom: 15, border: '1px solid #ddd', padding: 10 }}>
            <img src={playlist.images[0]?.url} alt="cover" style={{ width: 100 }} />
            <a href={playlist.external_urls.spotify} target="_blank" rel="noreferrer">
              <h3>{playlist.name}</h3>
            </a>
            <p>{playlist.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
