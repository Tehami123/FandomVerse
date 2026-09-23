import React from 'react';
import './MediaPlayer.css';

export function MediaPlayer({ src, type = 'video', title }) {
  if (!src) {
    return (
      <div className="fv-media-player fv-media-player-unavailable" role="status" aria-label={`Media unavailable for ${title}`}>
        <div>
          <strong>Media preview unavailable</strong>
          <p>No local {type} source is included for this title.</p>
        </div>
      </div>
    );
  }

  const mediaProps = { controls: true, preload: 'metadata', 'aria-label': title };
  return (
    <div className="fv-media-player">
      {type === 'audio' ? <audio {...mediaProps} src={src} /> : <video {...mediaProps} src={src} />}
    </div>
  );
}
