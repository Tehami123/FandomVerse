import './MediaPlayer.css';

export function MediaPlayer({ src, type = 'video', title }) {
  if (!src) {
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

  const mediaProps = { controls: true, preload: 'metadata', 'aria-label': title };
  return (
    <div className="fv-media-player">
      {type === 'audio' ? <audio {...mediaProps} src={src} /> : <video {...mediaProps} src={src} />}
    </div>
  );
}
