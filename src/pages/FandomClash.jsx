import { useEffect, useRef, useState } from 'react';
import { ArrowLeftRight, ArrowUpRight, Crown, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, charactersByCategory } from '../data/mockData';
import { categoryDetails } from '../data/categoryData';
import { FandomClashScene } from './FandomClashScene';
import './FandomClash.css';

const scenarios = [
  { id: 'crossover', title: 'THE ULTIMATE CROSSOVER', prompt: 'Two fandoms collide in a brand-new shared universe.', weights: { creativity: 0.4, adventure: 0.35, energy: 0.25 } },
  { id: 'festival', title: 'THE FANDOM FESTIVAL', prompt: 'One night to build the most unforgettable fan event.', weights: { style: 0.45, energy: 0.35, creativity: 0.2 } },
  { id: 'last-world', title: 'THE LAST WORLD', prompt: 'A strange new universe needs a crew to find its way forward.', weights: { adventure: 0.45, creativity: 0.3, chaos: 0.25 } },
  { id: 'chaos', title: 'THE CHAOS EVENT', prompt: 'The rules disappear. The best plot twist wins the moment.', weights: { chaos: 0.6, energy: 0.4 } },
  { id: 'takeover', title: 'THE FANDOMVERSE TAKEOVER', prompt: 'A friendly takeover of the biggest screen in the multiverse.', weights: { adventure: 0.35, chaos: 0.35, energy: 0.3 } },
];

const simulationProfiles = {
  anime: { energy: 9, creativity: 9, chaos: 8, style: 8, adventure: 9 },
  gaming: { energy: 8, creativity: 8, chaos: 9, style: 7, adventure: 10 },
  movies: { energy: 8, creativity: 9, chaos: 6, style: 10, adventure: 8 },
  tv: { energy: 7, creativity: 8, chaos: 8, style: 8, adventure: 8 },
  kpop: { energy: 10, creativity: 9, chaos: 7, style: 10, adventure: 7 },
  comics: { energy: 9, creativity: 9, chaos: 8, style: 9, adventure: 9 },
  manga: { energy: 8, creativity: 10, chaos: 8, style: 8, adventure: 10 },
};

const traitLabels = {
  chaos: 'CHAOS',
  creativity: 'CREATIVITY',
  energy: 'ENERGY',
  style: 'STYLE',
  adventure: 'ADVENTURE',
};

const hash = (value) => [...value].reduce((total, character) => Math.imul(total ^ character.charCodeAt(0), 16777619), 2166136261) >>> 0;
const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];

function getRoundResult(worldOne, worldTwo, scenario, roundNumber) {
  const attributes = Object.keys(traitLabels).map((id) => ({
    id,
    label: traitLabels[id],
    weight: scenario.weights[id] || 0,
    one: simulationProfiles[worldOne.id][id],
    two: simulationProfiles[worldTwo.id][id],
    oneContribution: simulationProfiles[worldOne.id][id] * (scenario.weights[id] || 0),
    twoContribution: simulationProfiles[worldTwo.id][id] * (scenario.weights[id] || 0),
  }));
  const baseOne = attributes.reduce((total, item) => total + item.oneContribution, 0);
  const baseTwo = attributes.reduce((total, item) => total + item.twoContribution, 0);
  const seed = `${worldOne.id}:${worldTwo.id}:${scenario.id}:${roundNumber}`;
  const varianceOne = ((hash(`${seed}:one`) % 29) - 14) / 100;
  const varianceTwo = ((hash(`${seed}:two`) % 29) - 14) / 100;
  const scoreOne = Math.round((baseOne + varianceOne) * 10);
  const scoreTwo = Math.round((baseTwo + varianceTwo) * 10);
  const tieWinner = hash(seed) % 2 === 0 ? worldOne : worldTwo;
  const winner = scoreOne === scoreTwo ? tieWinner : scoreOne > scoreTwo ? worldOne : worldTwo;
  const runnerUp = winner.id === worldOne.id ? worldTwo : worldOne;
  const scoreWinner = winner.id === worldOne.id ? scoreOne : scoreTwo;
  const scoreRunnerUp = runnerUp.id === worldOne.id ? scoreOne : scoreTwo;
  const decidingFactors = attributes.filter((attribute) => attribute.weight > 0)
    .sort((left, right) => Math.abs(right.oneContribution - right.twoContribution) - Math.abs(left.oneContribution - left.twoContribution))
    .slice(0, 3)
    .map((attribute, index) => {
      const winnerValue = winner.id === worldOne.id ? attribute.one : attribute.two;
      const runnerUpValue = runnerUp.id === worldOne.id ? attribute.one : attribute.two;
      const winnerContribution = winner.id === worldOne.id ? attribute.oneContribution : attribute.twoContribution;
      if (winnerValue > runnerUpValue) {
        return {
          ...attribute,
          rank: index + 1,
          text: `${winner.title}'s ${attribute.label.toLowerCase()} (${winnerValue}/10) added ${winnerContribution.toFixed(1)} weighted points at ${Math.round(attribute.weight * 100)}% scenario emphasis.`,
        };
      }
      if (winnerValue < runnerUpValue) {
        return {
          ...attribute,
          rank: index + 1,
          text: `${runnerUp.title} led ${attribute.label.toLowerCase()} (${runnerUpValue}/10), keeping the result close while other weighted factors favored ${winner.title}.`,
        };
      }
      return {
        ...attribute,
        rank: index + 1,
        text: `Both worlds matched on ${attribute.label.toLowerCase()} (${winnerValue}/10), contributing ${winnerContribution.toFixed(1)} weighted points apiece.`,
      };
    });

  return {
    winner,
    runnerUp,
    scores: { one: scoreOne, two: scoreTwo, winner: scoreWinner, runnerUp: scoreRunnerUp },
    attributes,
    decidingFactors,
    explanation: `${winner.title} edged this fictional scenario through its weighted attribute profile.`,
  };
}

function WorldSide({ side, selectedId, otherId, hoveredWorld, onChoose, onHover, reducedMotion, mobile }) {
  const selected = categories.find((category) => category.id === selectedId);
  const details = selected ? categoryDetails[selected.id] : null;
  const handleTilt = (event) => {
    if (reducedMotion || mobile) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${x * 3}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${y * -3}deg`);
  };

  return (
    <section
      className={`fv-clash-world fv-clash-world-${side}${selected ? ' is-selected' : ''}${hoveredWorld ? ' is-hovering' : ''}`}
      style={{ '--world-accent': selected ? `var(--color-${selected.id})` : '#858692' }}
      aria-label={`Select world ${side === 'one' ? 'one' : 'two'}`}
      onPointerMove={handleTilt}
      onPointerLeave={(event) => { event.currentTarget.style.removeProperty('--tilt-x'); event.currentTarget.style.removeProperty('--tilt-y'); onHover(null); }}
    >
      <div className="fv-clash-world-preview" style={details ? { '--world-image': `url(${details.heroImage})` } : undefined}>
        <span className="fv-clash-world-index">WORLD {side === 'one' ? 'ONE' : 'TWO'}</span>
        {selected ? (
          <>
            <span className="fv-clash-world-sigil" aria-hidden="true"><i /><i /><i /></span>
            <div className="fv-clash-world-copy">
              <span>{selected.id.toUpperCase()} / FANDOMVERSE</span>
              <h2>{selected.title}</h2>
            </div>
          </>
        ) : (
          <div className="fv-clash-world-empty"><Sparkles size={22} aria-hidden="true" /><span>CHOOSE A WORLD</span></div>
        )}
      </div>
      <div className="fv-clash-world-options" role="group" aria-label={`World ${side === 'one' ? 'one' : 'two'} options`}>
        {categories.map((category) => {
          const isSelected = selectedId === category.id;
          const isUnavailable = otherId === category.id;
          const categoryDetailsForWorld = categoryDetails[category.id];
          return (
            <button
              type="button"
              key={category.id}
              className={`fv-clash-world-option${isSelected ? ' is-selected' : ''}${isUnavailable ? ' is-unavailable' : ''}${hoveredWorld === category.id ? ' is-hovered' : ''}`}
              style={{
                '--option-accent': `var(--color-${category.id})`,
                '--option-image': `url(${categoryDetailsForWorld.heroImage})`,
              }}
              aria-pressed={isSelected}
              aria-label={`${isUnavailable ? 'Already selected for the other world: ' : 'Select '}${category.title}`}
              disabled={isUnavailable}
              onClick={() => onChoose(side, category.id)}
              onPointerEnter={() => onHover(category.id)}
              onFocus={() => onHover(category.id)}
              onBlur={() => onHover(null)}
            >
              <span>{category.title}</span>
              <i aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function CharacterFace({ world, character, side, winner = false }) {
  if (!world || !character) return null;
  return (
    <article className={`fv-clash-face fv-clash-face-${side}${winner ? ' is-winner' : ''}`} style={{ '--world-accent': `var(--color-${world.id})` }}>
      <span className="fv-clash-representative-label">REPRESENTATIVE CHARACTER</span>
      <div className="fv-clash-face-image">
        <img src={character.image} alt={character.name} />
        <span>{world.title.toUpperCase()} / {character.series || character.franchise}</span>
      </div>
      <h2>{character.name}</h2>
      <span className="fv-clash-face-category">{world.title.toUpperCase()}</span>
    </article>
  );
}

function SimulationLog({ lines }) {
  return (
    <div className="fv-clash-log" aria-label="Simulation log" aria-live="polite">
      <span>SIMULATION LOG</span>
      <ol>{lines.map((line, index) => <li key={`${line}-${index}`}>{line}</li>)}</ol>
    </div>
  );
}

export function FandomClash() {
  const pageRef = useRef(null);
  const [worldOne, setWorldOne] = useState(null);
  const [worldTwo, setWorldTwo] = useState(null);
  const [hoveredWorld, setHoveredWorld] = useState(null);
  const [phase, setPhase] = useState('select');
  const [scenario, setScenario] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [roundResult, setRoundResult] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [simulationLog, setSimulationLog] = useState([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(() => window.innerWidth <= 620);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const timers = useRef([]);
  const roundNumber = useRef(0);
  const previousScenario = useRef(null);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    const updateViewport = () => setMobile(window.innerWidth <= 620);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    window.addEventListener('resize', updateViewport);
    document.addEventListener('visibilitychange', updateVisibility);
    motionQuery.addEventListener('change', updateMotion);
    return () => {
      window.removeEventListener('resize', updateViewport);
      document.removeEventListener('visibilitychange', updateVisibility);
      motionQuery.removeEventListener('change', updateMotion);
    };
  }, []);

  const clearRoundTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  const chooseWorld = (side, categoryId) => {
    if (phase !== 'select') return;
    const chosen = side === 'one' ? worldOne : worldTwo;
    if (chosen === categoryId) {
      if (side === 'one') setWorldOne(null);
      else setWorldTwo(null);
      return;
    }
    if (side === 'one') setWorldOne(categoryId);
    else setWorldTwo(categoryId);
  };

  const addLog = (message) => setSimulationLog((current) => [...current, message].slice(-5));

  const schedulePhase = (callback, normalDelay, reducedDelay) => {
    timers.current.push(window.setTimeout(callback, reducedMotion ? reducedDelay : normalDelay));
  };

  const startRound = (firstWorld = worldOne, secondWorld = worldTwo) => {
    if (!firstWorld || !secondWorld || firstWorld === secondWorld) return;
    clearRoundTimers();

    const availableScenarios = scenarios.filter((candidate) => candidate.id !== previousScenario.current);
    const nextScenario = randomFrom(availableScenarios.length ? availableScenarios : scenarios);
    previousScenario.current = nextScenario.id;
    const firstCharacter = randomFrom(charactersByCategory[firstWorld]);
    const secondCharacter = randomFrom(charactersByCategory[secondWorld]);
    const firstCategory = categories.find((category) => category.id === firstWorld);
    const secondCategory = categories.find((category) => category.id === secondWorld);
    roundNumber.current += 1;

    setScenario(nextScenario);
    setCharacters({ one: firstCharacter, two: secondCharacter });
    setRoundResult(getRoundResult(firstCategory, secondCategory, nextScenario, roundNumber.current));
    setCountdown(null);
    setPhase('lock');
    setSimulationLog(['CONNECTING WORLDS...']);

    schedulePhase(() => { setPhase('reveal'); addLog('REPRESENTATIVE CHARACTERS DETECTED...'); }, 650, 100);
    schedulePhase(() => { setPhase('scenario'); addLog(`SCENARIO: ${nextScenario.title}`); }, 1350, 250);
    schedulePhase(() => { setCountdown(3); setPhase('countdown'); addLog('ANALYZING FICTIONAL ATTRIBUTES...'); }, 1700, 400);
    schedulePhase(() => { setCountdown(2); addLog('SCENARIO WEIGHTS APPLIED...'); }, 2300, 550);
    schedulePhase(() => { setCountdown(1); addLog('OUTCOME SEALED FOR THIS RUN...'); }, 2900, 700);
    schedulePhase(() => { setCountdown(null); setPhase('clash'); addLog('ENERGY PROFILES COLLIDING...'); }, 3500, 850);
    schedulePhase(() => { setPhase('result'); addLog('SIMULATION COMPLETE'); }, 4850, 1100);
  };

  const runAgain = () => {
    clearRoundTimers();
    setPhase('reset');
    setSimulationLog(['RESETTING THE ARENA...']);
    timers.current.push(window.setTimeout(() => startRound(), reducedMotion ? 80 : 380));
  };

  const changeWorlds = () => {
    clearRoundTimers();
    setWorldOne(null);
    setWorldTwo(null);
    setScenario(null);
    setCharacters(null);
    setRoundResult(null);
    setCountdown(null);
    setSimulationLog([]);
    setHoveredWorld(null);
    previousScenario.current = null;
    setPhase('select');
  };

  const handlePointerMove = (event) => {
    if (mobile || reducedMotion || !pageRef.current) return;
    const bounds = pageRef.current.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    pageRef.current.style.setProperty('--clash-parallax-x', `${offsetX * -7}px`);
    pageRef.current.style.setProperty('--clash-parallax-y', `${offsetY * -5}px`);
  };

  const handlePointerLeave = () => {
    pageRef.current?.style.removeProperty('--clash-parallax-x');
    pageRef.current?.style.removeProperty('--clash-parallax-y');
    setHoveredWorld(null);
  };

  const canStart = worldOne && worldTwo && worldOne !== worldTwo;
  const firstCategory = categories.find((category) => category.id === worldOne);
  const secondCategory = categories.find((category) => category.id === worldTwo);

  return (
    <main
      ref={pageRef}
      className={`fv-clash fv-clash-phase-${phase}${canStart ? ' has-both-worlds' : ''}`}
      data-world-one={worldOne || 'none'}
      data-world-two={worldTwo || 'none'}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <FandomClashScene
        hostRef={pageRef}
        worldOne={worldOne}
        worldTwo={worldTwo}
        hoveredWorld={hoveredWorld}
        phase={phase}
        mobile={mobile}
        reducedMotion={reducedMotion}
        pageVisible={pageVisible}
      />
      <div className="fv-clash-atmosphere" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <header className="fv-clash-heading">
        <span className="fv-clash-kicker"><Zap size={13} aria-hidden="true" /> FANDOMVERSE / CROSSOVER SIMULATION</span>
        <h1>FANDOM <span>FACE-OFF</span></h1>
        <p>Two worlds. One fictional scenario.</p>
      </header>

      {phase === 'select' ? (
        <section className="fv-clash-selection" aria-label="Choose two fandom worlds">
          <div className="fv-clash-arena">
            <WorldSide side="one" selectedId={worldOne} otherId={worldTwo} hoveredWorld={hoveredWorld} onChoose={chooseWorld} onHover={setHoveredWorld} reducedMotion={reducedMotion} mobile={mobile} />
            <div className={`fv-clash-vs-orb${canStart ? ' is-charged' : ''}`} aria-hidden="true"><span>VS</span><i /></div>
            <WorldSide side="two" selectedId={worldTwo} otherId={worldOne} hoveredWorld={hoveredWorld} onChoose={chooseWorld} onHover={setHoveredWorld} reducedMotion={reducedMotion} mobile={mobile} />
          </div>
          <div className="fv-clash-selection-actions">
            <span>{canStart ? 'SIMULATION READY' : 'CHOOSE TWO DIFFERENT WORLDS'}</span>
            <button type="button" className="fv-clash-start" onClick={() => startRound()} disabled={!canStart}>
              START FACE-OFF <ArrowLeftRight size={17} aria-hidden="true" />
            </button>
          </div>
        </section>
      ) : (
        <section className={`fv-clash-round fv-clash-round-${phase}`} aria-live="polite">
          {!['lock', 'reveal', 'reset'].includes(phase) && (
            <div className="fv-clash-scenario">
              <span>FANDOMVERSE SIMULATION / {phase === 'result' ? 'COMPLETE' : 'IN PROGRESS'}</span>
              <h2>{scenario?.title}</h2>
              <p>{scenario?.prompt}</p>
            </div>
          )}

          {phase === 'result' && roundResult ? (
            <div className="fv-clash-result">
              <div className="fv-clash-result-intro"><Crown size={18} aria-hidden="true" /><span>SIMULATION COMPLETE / FICTIONAL RESULT</span></div>
              <div className="fv-clash-result-winner" style={{ '--world-accent': `var(--color-${roundResult.winner.id})` }}>
                <span className="fv-clash-winner-tag">{roundResult.winner.title.toUpperCase()}</span>
                <h2>{roundResult.winner.title.toUpperCase()}</h2>
                <p className="fv-clash-wins-this">WINS THIS FICTIONAL SCENARIO</p>
                <div className="fv-clash-result-score">{roundResult.scores.winner}<small> / 100 SIMULATION SCORE</small></div>
                <div className="fv-clash-winner-character">
                  <span>REPRESENTATIVE CHARACTER</span>
                  <div className="fv-clash-result-image"><img src={characters[roundResult.winner.id === worldOne ? 'one' : 'two'].image} alt={characters[roundResult.winner.id === worldOne ? 'one' : 'two'].name} /></div>
                  <strong>{characters[roundResult.winner.id === worldOne ? 'one' : 'two'].name}</strong>
                  <small>{roundResult.winner.title}</small>
                  <p>This character represents the selected {roundResult.winner.title} world in this fictional simulation.</p>
                  <Link to={`/character/${characters[roundResult.winner.id === worldOne ? 'one' : 'two'].id}`}>VIEW CHARACTER PROFILE <ArrowUpRight size={13} aria-hidden="true" /></Link>
                </div>
                <p className="fv-clash-winner-explanation">{roundResult.explanation}</p>
              </div>
              <div className="fv-clash-result-rival">
                <CharacterFace
                  world={roundResult.runnerUp}
                  character={characters[roundResult.runnerUp.id === worldOne ? 'one' : 'two']}
                  side="rival"
                />
                <div><span>ALSO IN THE CROSSOVER / {roundResult.scores.runnerUp} SIMULATION SCORE</span><strong>{roundResult.runnerUp.title}</strong><p>Every world brought its own fictional strengths to the scenario.</p></div>
              </div>
              <div className="fv-clash-breakdown">
                <div className="fv-clash-breakdown-heading">
                  <span>WHY THE SIMULATION WENT THIS WAY</span>
                  <h3>FICTIONAL SIMULATION BREAKDOWN</h3>
                  <p>Illustrative category profiles only. Final scores use weighted averages plus a tiny seeded variation (up to 1.4 points).</p>
                </div>
                <div className="fv-clash-scoreline">
                  <strong>{firstCategory.title}<b>{roundResult.scores.one}</b></strong>
                  <span>VS</span>
                  <strong>{secondCategory.title}<b>{roundResult.scores.two}</b></strong>
                </div>
                <div className="fv-clash-attribute-list">
                  {roundResult.attributes.map((attribute) => (
                    <div className="fv-clash-attribute-row" key={attribute.id}>
                      <div className="fv-clash-attribute-title"><span>{attribute.label}</span><small>{attribute.weight ? `${Math.round(attribute.weight * 100)}% SCENARIO WEIGHT` : 'CONTEXT ONLY'}</small></div>
                      <div className="fv-clash-attribute-values">
                        <div className="fv-clash-attribute-value">
                          <span>{firstCategory.title}<b>{attribute.one.toFixed(1)}</b></span>
                          <i><b className="is-one" style={{ '--score-width': `${attribute.one * 10}%`, '--bar-accent': `var(--color-${firstCategory.id})` }} /></i>
                        </div>
                        <div className="fv-clash-attribute-value">
                          <span>{secondCategory.title}<b>{attribute.two.toFixed(1)}</b></span>
                          <i><b className="is-two" style={{ '--score-width': `${attribute.two * 10}%`, '--bar-accent': `var(--color-${secondCategory.id})` }} /></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="fv-clash-deciding-factors">
                  <h3>THE DECIDING FACTORS</h3>
                  {roundResult.decidingFactors.map((factor) => (
                    <div className="fv-clash-factor" key={factor.id}>
                      <span>0{factor.rank}</span>
                      <div><strong>{factor.label}</strong><p>{factor.text}</p></div>
                    </div>
                  ))}
                </div>
                <p className="fv-clash-disclaimer">Just for fun. This is not a canon ranking, power scale, or judgment of either fandom.</p>
              </div>
              <div className="fv-clash-result-actions">
                <button type="button" className="fv-clash-start" onClick={runAgain}>
                  RUN IT AGAIN <RotateCcw size={15} aria-hidden="true" />
                </button>
                <button type="button" className="fv-clash-secondary" onClick={changeWorlds}>CHANGE WORLDS</button>
                <Link className="fv-clash-secondary" to={`/character/${characters[roundResult.winner.id === worldOne ? 'one' : 'two'].id}`}>
                  EXPLORE CHARACTER <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link className="fv-clash-secondary" to={`/category/${roundResult.winner.id}`}>
                  EXPLORE WINNING WORLD <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {['lock', 'reset'].includes(phase) ? (
                <div className="fv-clash-lock-in">
                  <div className="fv-clash-lock-orb"><span>VS</span><i /><i /></div>
                  <span>{phase === 'reset' ? 'RECHARGING THE ARENA...' : 'WORLDS LOCKING IN...'}</span>
                </div>
              ) : (
                <div className={`fv-clash-faceoff${phase === 'clash' ? ' is-clashing' : ''}`}>
                  <CharacterFace world={firstCategory} character={characters?.one} side="one" />
                  <div className="fv-clash-impact">
                    <span className="fv-clash-impact-rays" aria-hidden="true" />
                    {countdown ? <strong className="fv-clash-countdown" key={countdown}>{countdown}</strong> : <strong>VS</strong>}
                    <span>{phase === 'clash' ? 'SIMULATION IN MOTION' : phase === 'countdown' ? 'GET READY' : phase === 'scenario' ? 'SCENARIO LOCKED' : 'CHARACTERS DETECTED'}</span>
                  </div>
                  <CharacterFace world={secondCategory} character={characters?.two} side="two" />
                </div>
              )}
              <SimulationLog lines={simulationLog} />
            </>
          )}
        </section>
      )}

      <footer className="fv-clash-footer">
        <span><i /> FICTIONAL FANDOMVERSE SIMULATION</span>
        <span>NO CANON RANKINGS / JUST FOR FUN</span>
      </footer>
    </main>
  );
}