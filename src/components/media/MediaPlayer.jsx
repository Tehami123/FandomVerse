import { useState } from 'react';
import './MediaPlayer.css';

export function MediaPlayer({ src, sources = src ? [src] : [], type = 'video', title, poster }) {
  const [hasError, setHasError] = useState(false);
  const mediaSources = sources.filter(Boolean);

  if (!mediaSources.length || hasError) {
    return (
      <div className="fv-media-player fv-media-player-unavailable" role="status" aria-label={`Media unavailable for ${title}`}>
        <div className="fv-media-transmission-lost">
          <span className="fv-media-status-dot"></span>
          <strong>TRANSMISSION LOST</strong>
          <p>This transmission is not available in the current archive.</p>
          <div className="fv-media-timestamp">ARCHIVE.TIMESTAMP // {new Date().getFullYear()}</div>
        </div>
      </div>
    );
  }

  const mediaProps = { controls: true, preload: 'metadata', 'aria-label': title, onError: () => setHasError(true) };
  return (
    <div className="fv-media-player">
      {type === 'audio' ? <audio {...mediaProps} src={mediaSources[0]} /> : (
        <video {...mediaProps} poster={poster} playsInline>
          {mediaSources.map((source) => <source key={source} src={source} type="video/mp4" />)}
        </video>
      )}
    </div>
  );
}
