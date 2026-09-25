import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, RotateCw, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { charactersByCategory } from '../data/mockData';
import { FandomWorldSelector3D } from '../components/visuals/FandomWorldSelector3D';
import './Summon.css';

const worlds = [
  { id: 'anime', label: 'Anime', accent: '#8B5CF6' },
  { id: 'gaming', label: 'Gaming', accent: '#3B82F6' },
  { id: 'movies', label: 'Movies', accent: '#EF4444' },
  { id: 'tv', label: 'TV Shows', accent: '#06B6D4' },
  { id: 'kpop', label: 'K-Pop', accent: '#EC4899' },
  { id: 'comics', label: 'Comics', accent: '#EAB308' },
  { id: 'manga', label: 'Manga', accent: '#DC2626' },
];

const summonLines = [
  'CONNECTING TO FANDOMVERSE...',
  'SEARCHING THE WORLDS...',
  'FANDOM SIGNATURE DETECTED...',
  'SUMMONING...',
];

const getRarity = (characterId) => {
  const hash = [...characterId].reduce((value, character) => Math.imul(value ^ character.charCodeAt(0), 16777619), 2166136261) >>> 0;
  const roll = hash / 4294967296;
  if (roll > 0.98) return 'Legendary';
  if (roll > 0.9) return 'Epic';
  if (roll > 0.66) return 'Rare';
  return 'Common';
};

export function Summon() {
  const location = useLocation();
  const dnaPreference = location.state?.fandomDNA;
  const [activeWorld, setActiveWorld] = useState(() => dnaPreference?.category || null);
  const [result, setResult] = useState(null);
  const [isSummoning, setIsSummoning] = useState(false);
  const [summonLine, setSummonLine] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [convergingWorld, setConvergingWorld] = useState(null);
  const [isDnaMatchQueued, setIsDnaMatchQueued] = useState(Boolean(dnaPreference?.characterId));
  const timers = useRef([]);
  const summonedByWorld = useRef(new Map());
  const dnaMatchRef = useRef(dnaPreference || null);

  const roster = activeWorld === 'all'
    ? Object.values(charactersByCategory).flat()
    : activeWorld ? charactersByCategory[activeWorld] || [] : [];

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const schedule = (callback, delay) => {
    timers.current.push(window.setTimeout(callback, delay));
  };

  const selectWorld = (worldId) => {
    if (isSummoning) return;
    if (dnaMatchRef.current?.category !== worldId) {
      dnaMatchRef.current = null;
      setIsDnaMatchQueued(false);
    }
    setActiveWorld(worldId);
    setResult(null);
    setIsRevealing(false);
    setConvergingWorld(worldId);
    schedule(() => setConvergingWorld((current) => current === worldId ? null : current), 850);
  };

  const beginSummon = () => {
    if (isSummoning || !activeWorld || roster.length === 0) return;
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setResult(null);
    setIsSummoning(true);
    setSummonLine(0);

    summonLines.slice(1).forEach((_, index) => {
      schedule(() => setSummonLine(index + 1), (index + 1) * 620);
    });

    schedule(() => {
      const history = summonedByWorld.current.get(activeWorld) || new Set();
      let available = roster.filter((character) => !history.has(character.id));
      if (!available.length) {
        history.clear();
        available = roster.filter((character) => character.id !== result?.id);
      }

      const dnaMatch = dnaMatchRef.current?.category === activeWorld
        ? roster.find((character) => character.id === dnaMatchRef.current.characterId)
        : null;
      const character = dnaMatch && !history.has(dnaMatch.id)
        ? dnaMatch
        : available[Math.floor(Math.random() * available.length)];
      dnaMatchRef.current = null;
      setIsDnaMatchQueued(false);
      history.add(character.id);
      summonedByWorld.current.set(activeWorld, history);
      setResult(character);
      setIsSummoning(false);
      setIsRevealing(true);
      schedule(() => setIsRevealing(false), 1000);
    }, 2480);
  };

  const changeWorld = () => {
    setResult(null);
    setIsSummoning(false);
    setIsRevealing(false);
  };

  return (
    <main className={`fv-summon${isSummoning ? ' is-summoning' : ''}${isRevealing ? ' is-revealing' : ''}`} data-world={activeWorld}>
      <div className="fv-summon-stars" aria-hidden="true" />
      <div className="fv-summon-orbit-glow" aria-hidden="true" />

      <header className="fv-summon-heading">
        <div className="fv-summon-kicker"><span /> FANDOMVERSE / CHARACTER TRANSMISSION</div>
        <h1>SUMMON</h1>
        <p>Call a character from the FandomVerse.</p>
      </header>

      <section className="fv-summon-chamber" aria-label="Character summoning chamber">
        {!result && (
          <>
            <FandomWorldSelector3D
              worlds={worlds}
              activeWorld={activeWorld}
              convergingWorld={convergingWorld}
              isSummoning={isSummoning}
              onSelect={selectWorld}
            />
            <div className="fv-summon-selection" aria-live="polite">
              <span className={`fv-summon-selection-status${activeWorld ? ' is-selected' : ''}`}>
                <i aria-hidden="true" />
                {activeWorld ? `${activeWorld === 'all' ? 'ALL WORLDS' : worlds.find((world) => world.id === activeWorld)?.label.toUpperCase()} WORLD SELECTED` : 'SELECT A WORLD TO ENTER'}
              </span>
              <div className="fv-summon-world-options" role="group" aria-label="Choose a fandom world">
                <button
                  type="button"
                  className={activeWorld === 'all' ? 'is-selected' : ''}
                  aria-pressed={activeWorld === 'all'}
                  onClick={() => selectWorld('all')}
                  disabled={isSummoning}
                >
                  ALL WORLDS
                </button>
                {worlds.map((world) => (
                  <button
                    type="button"
                    className={activeWorld === world.id ? 'is-selected' : ''}
                    style={{ '--world-accent': world.accent }}
                    aria-pressed={activeWorld === world.id}
                    onClick={() => selectWorld(world.id)}
                    disabled={isSummoning}
                    key={world.id}
                  >
                    {world.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className={`fv-summon-stage${result ? ' has-result' : ''}${isSummoning ? ' is-active' : ''}`} aria-live="polite">
          <div className="fv-summon-rings" aria-hidden="true">
            <span className="fv-summon-ring fv-summon-ring-outer" />
            <span className="fv-summon-ring fv-summon-ring-middle" />
            <span className="fv-summon-ring fv-summon-ring-inner" />
            <span className="fv-summon-core" />
            <span className="fv-summon-particles">
              {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--particle-index': index }} />)}
            </span>
          </div>

          {result ? (
            <article className="fv-summon-result" key={result.id}>
              <div className="fv-summon-portrait-frame">
                <img className="fv-summon-portrait" src={result.image} alt={result.name} />
              </div>
              <div className={`fv-summon-rarity rarity-${getRarity(result.id).toLowerCase()}`}>
                <Sparkles size={13} aria-hidden="true" /> {getRarity(result.id)} <span>· CEREMONIAL</span>
              </div>
              <p className="fv-summon-result-world">{result.category} <span>/</span> {result.franchise}</p>
              <h2>{result.name}</h2>
              <p className="fv-summon-description">{result.description || result.biography}</p>
              {result.traits?.length > 0 && (
                <div className="fv-summon-traits" aria-label="Character traits">
                  {result.traits.map((trait) => <span key={trait}>{trait}</span>)}
                </div>
              )}
              <div className="fv-summon-actions">
                <Link className="fv-summon-explore" to={`/character/${result.id}`}>
                  EXPLORE CHARACTER <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <button type="button" onClick={beginSummon}><RotateCw size={15} aria-hidden="true" /> SUMMON AGAIN</button>
                <button type="button" onClick={changeWorld}>CHANGE WORLD</button>
              </div>
            </article>
          ) : (
            <div className={`fv-summon-idle${isSummoning ? ' is-active' : ''}`}>
              <span className="fv-summon-emblem" aria-hidden="true"><Sparkles size={27} /></span>
              <span className="fv-summon-status">{isSummoning ? summonLines[summonLine] : isDnaMatchQueued ? 'FANDOM DNA MATCH LOCKED' : activeWorld ? 'WORLD CONNECTION ESTABLISHED' : 'AWAITING WORLD SELECTION'}</span>
              {!isSummoning && <span className="fv-summon-idle-copy">{isDnaMatchQueued ? 'Your profile signal is guiding this summon.' : activeWorld ? 'The signal is locked. Your world is ready.' : 'Select a world to begin your journey.'}</span>}
              {activeWorld && (
                <button type="button" className="fv-summon-button" onClick={beginSummon} disabled={isSummoning}>
                  <span className="fv-summon-button-icon"><Sparkles size={18} aria-hidden="true" /></span>
                  {isSummoning ? 'SUMMONING' : 'SUMMON'}
                </button>
              )}
              <span className="fv-summon-world-count">{activeWorld ? `${roster.length} CHARACTERS IN ${activeWorld === 'all' ? 'ALL WORLDS' : worlds.find((world) => world.id === activeWorld)?.label.toUpperCase()}` : '7 WORLDS / ONE FANDOMVERSE'}</span>
            </div>
          )}
        </div>

        <div className="fv-summon-footer-mark"><span /> THE MULTIVERSE IS LISTENING <span /></div>
      </section>
    </main>
  );
}