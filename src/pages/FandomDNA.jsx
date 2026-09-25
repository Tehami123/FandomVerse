import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, RotateCcw, Sparkles, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  clearFandomDnaProfile,
  createFandomDnaProfile,
  dnaCategories,
  readFandomDnaProfile,
  saveFandomDnaProfile,
} from '../utils/fandomDna';
import './FandomDNA.css';

const quizQuestions = [
  {
    id: 'hook',
    marker: '01 / THE PULL',
    prompt: 'What pulls you into a fandom?',
    choices: [
      { id: 'characters', title: 'Characters I remember', detail: 'The cast makes the world feel personal.' },
      { id: 'stories', title: 'Stories with layers', detail: 'Lore, reveals, and a thread worth following.' },
      { id: 'challenge', title: 'Worlds that push back', detail: 'Skill, stakes, and the thrill of a hard win.' },
      { id: 'worlds', title: 'A place to disappear', detail: 'An atmosphere I want to explore.' },
    ],
  },
  {
    id: 'energy',
    marker: '02 / YOUR CURRENT',
    prompt: 'Choose the energy you follow.',
    choices: [
      { id: 'action', title: 'ACTION', detail: 'Momentum, impact, and bold moves.' },
      { id: 'mystery', title: 'MYSTERY', detail: 'Clues, hidden motives, and the unknown.' },
      { id: 'chaos', title: 'CHAOS', detail: 'Unpredictable choices and electric turns.' },
      { id: 'emotion', title: 'EMOTION', detail: 'The bonds that make the story stay.' },
    ],
  },
  {
    id: 'moment',
    marker: '03 / THE MOMENT',
    prompt: 'Which moment feels most like you?',
    choices: [
      { id: 'battle', title: 'The impossible battle', detail: 'A plan, a team, one last chance.' },
      { id: 'clue', title: 'The clue that changes everything', detail: 'One detail reframes the whole world.' },
      { id: 'cast', title: 'The scene with the whole crew', detail: 'Chemistry, chemistry, and one honest beat.' },
      { id: 'map', title: 'The path no one has taken', detail: 'A new route through a world of secrets.' },
    ],
  },
  {
    id: 'balance',
    marker: '04 / YOUR LENS',
    prompt: 'What keeps you invested longer?',
    type: 'balance',
  },
  {
    id: 'world',
    marker: '05 / YOUR WORLD',
    prompt: 'Where does your signal feel strongest?',
    type: 'world',
  },
];

const analysisMessages = [
  'ANALYZING RESPONSES...',
  'SCANNING FANDOM SIGNATURE...',
  'CONNECTING TO THE FANDOMVERSE...',
  'DNA PROFILE COMPLETE',
];

export function FandomDNA() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => readFandomDnaProfile());
  const [screen, setScreen] = useState(() => readFandomDnaProfile() ? 'result' : 'landing');
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [analysisIndex, setAnalysisIndex] = useState(0);

  const question = quizQuestions[questionIndex];
  const answer = answers[question?.id];
  const answerIsReady = question?.type === 'balance' ? Number.isFinite(answer) : Boolean(answer);

  useEffect(() => {
    if (screen !== 'analysis') return undefined;
    let messageIndex = 0;
    const messageTimer = window.setInterval(() => {
      messageIndex = (messageIndex + 1) % analysisMessages.length;
      setAnalysisIndex(messageIndex);
    }, 430);
    const resultTimer = window.setTimeout(() => {
      const nextProfile = createFandomDnaProfile(answers);
      saveFandomDnaProfile(nextProfile);
      setProfile(nextProfile);
      setScreen('result');
    }, 1740);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(resultTimer);
    };
  }, [screen, answers]);

  const startQuiz = () => {
    clearFandomDnaProfile();
    setProfile(null);
    setAnswers({});
    setQuestionIndex(0);
    setScreen('quiz');
  };

  const setAnswer = (value) => setAnswers((current) => ({ ...current, [question.id]: value }));

  const continueQuiz = () => {
    if (!answerIsReady) return;
    if (questionIndex === quizQuestions.length - 1) {
      setAnalysisIndex(0);
      setScreen('analysis');
      return;
    }
    setQuestionIndex((index) => index + 1);
  };

  const goBack = () => {
    if (questionIndex === 0) {
      setScreen('landing');
      return;
    }
    setQuestionIndex((index) => index - 1);
  };

  const retakeQuiz = () => {
    clearFandomDnaProfile();
    setProfile(null);
    setAnswers({});
    setQuestionIndex(0);
    setScreen('landing');
  };

  const summonMatch = () => {
    if (!profile?.character) return;
    navigate('/summon', {
      state: {
        fandomDNA: {
          category: profile.strongestCategory,
          characterId: profile.character.id,
          traits: profile.traitScores,
        },
      },
    });
  };

  return (
    <main className={`fv-dna fv-dna-screen-${screen}`}>
      <div className="fv-dna-atmosphere" aria-hidden="true" />
      <header className="fv-dna-header">
        <span className="fv-dna-brand-mark"><span /></span>
        <span>FANDOMVERSE <i>/</i> IDENTITY SYSTEMS</span>
        <span className="fv-dna-header-status"><i /> SIGNAL ONLINE</span>
      </header>

      {screen === 'landing' && (
        <section className="fv-dna-landing" aria-labelledby="fv-dna-title">
          <div className="fv-dna-landing-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="fv-dna-eyebrow"><Sparkles size={13} aria-hidden="true" /> PERSONAL FANDOM ANALYSIS</div>
          <h1 id="fv-dna-title">FANDOM<br /><span>DNA</span></h1>
          <p className="fv-dna-lede">Discover what kind of fan you really are.</p>
          <p className="fv-dna-support">Five quick signals. One profile built from the worlds, stories, and characters you gravitate toward.</p>
          <button type="button" className="fv-dna-primary" onClick={startQuiz}>
            DISCOVER MY DNA <ArrowRight size={17} aria-hidden="true" />
          </button>
          <div className="fv-dna-landing-foot"><span>05 QUESTIONS</span><i /> <span>01 PERSONAL SIGNATURE</span></div>
        </section>
      )}

      {screen === 'quiz' && (
        <section className="fv-dna-quiz" aria-labelledby="fv-dna-question">
          <div className="fv-dna-quiz-topline">
            <button type="button" className="fv-dna-back" onClick={goBack} aria-label="Go back">
              <ChevronLeft size={17} aria-hidden="true" /> BACK
            </button>
            <span>PROFILE SEQUENCE <b>0{questionIndex + 1}</b> / 05</span>
          </div>
          <div className="fv-dna-progress" aria-label={`Question ${questionIndex + 1} of ${quizQuestions.length}`}>
            <span style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }} />
          </div>
          <div className="fv-dna-question-heading">
            <span className="fv-dna-eyebrow">{question.marker}</span>
            <h1 id="fv-dna-question">{question.prompt}</h1>
          </div>

          {question.type === 'balance' ? (
            <div className="fv-dna-balance">
              <div className="fv-dna-balance-ends"><span>CHARACTERS</span><span>STORY</span></div>
              <label className="fv-dna-range-wrap" htmlFor="dna-balance">
                <input
                  id="dna-balance"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={Number.isFinite(answer) ? answer : 50}
                  onChange={(event) => setAnswer(Number(event.target.value))}
                  aria-label="Choose the balance between character and story focus"
                  style={{ '--range-fill': `${Number.isFinite(answer) ? answer : 50}%` }}
                />
              </label>
              <div className="fv-dna-balance-readout"><span>CHARACTER-DRIVEN</span><strong>{Number.isFinite(answer) ? answer : 50}</strong><span>STORY-DRIVEN</span></div>
              <p>A living cast or a world of carefully placed clues?</p>
            </div>
          ) : question.type === 'world' ? (
            <div className="fv-dna-world-grid" role="group" aria-label="Choose your fandom world">
              {dnaCategories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={answer === category.id ? 'is-selected' : ''}
                  style={{ '--dna-world-accent': category.accent }}
                  aria-pressed={answer === category.id}
                  onClick={() => setAnswer(category.id)}
                >
                  <i aria-hidden="true" />
                  <span>{category.name}</span>
                  <small>{category.id.toUpperCase()}</small>
                </button>
              ))}
            </div>
          ) : (
            <div className="fv-dna-choice-grid" role="group" aria-label={question.prompt}>
              {question.choices.map((choice, index) => (
                <button
                  type="button"
                  key={choice.id}
                  className={answer === choice.id ? 'is-selected' : ''}
                  aria-pressed={answer === choice.id}
                  onClick={() => setAnswer(choice.id)}
                >
                  <span className="fv-dna-choice-index">0{index + 1}</span>
                  <span className="fv-dna-choice-copy"><strong>{choice.title}</strong><small>{choice.detail}</small></span>
                  <span className="fv-dna-choice-check" aria-hidden="true" />
                </button>
              ))}
            </div>
          )}

          <div className="fv-dna-quiz-actions">
            <span>{answerIsReady ? 'SIGNAL CAPTURED' : 'SELECT ONE RESPONSE'}</span>
            <button type="button" className="fv-dna-next" onClick={continueQuiz} disabled={!answerIsReady}>
              {questionIndex === quizQuestions.length - 1 ? 'ANALYZE DNA' : 'CONTINUE'} <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
        </section>
      )}

      {screen === 'analysis' && (
        <section className="fv-dna-analysis" aria-live="polite" aria-label="Fandom DNA analysis in progress">
          <div className="fv-dna-analysis-core"><span /><span /><span /><Target size={29} aria-hidden="true" /></div>
          <span className="fv-dna-eyebrow">FANDOM SIGNATURE / IN PROGRESS</span>
          <h1>{analysisMessages[analysisIndex]}</h1>
          <div className="fv-dna-analysis-meter"><span /></div>
          <p>Cross-referencing your answers with the FandomVerse.</p>
        </section>
      )}

      {screen === 'result' && profile && (
        <section className="fv-dna-result" aria-labelledby="fv-dna-result-title">
          <div className="fv-dna-result-heading">
            <div>
              <span className="fv-dna-eyebrow"><Sparkles size={12} aria-hidden="true" /> YOUR FANDOM SIGNATURE</span>
              <h1 id="fv-dna-result-title">FANDOM DNA</h1>
            </div>
            <div className="fv-dna-resonance" style={{ '--resonance': `${profile.resonance}%` }}>
              <div><strong>{profile.resonance}<small>%</small></strong><span>SIGNAL<br />COHERENCE</span></div>
            </div>
          </div>

          <div className="fv-dna-profile-grid">
            <div className="fv-dna-profile-main">
              <div className="fv-dna-archetype">
                <span>ARCHETYPE / 0{profile.categoryBreakdown.findIndex((item) => item.id === profile.strongestCategory) + 1}</span>
                <h2>{profile.archetype}</h2>
                <p>{profile.summary}</p>
              </div>

              <div className="fv-dna-trait-section">
                <div className="fv-dna-section-title"><span>PERSONALITY FREQUENCY</span><i /></div>
                {profile.traitBreakdown.slice(0, 4).map((trait, index) => (
                  <div className="fv-dna-trait-row" key={trait.id}>
                    <span>{trait.id.toUpperCase()}</span>
                    <div className="fv-dna-trait-track"><i style={{ '--trait-value': `${trait.percentage}%`, '--trait-order': index }} /></div>
                    <b>{trait.percentage}%</b>
                  </div>
                ))}
              </div>

              <div className="fv-dna-world-section">
                <div className="fv-dna-section-title"><span>YOUR WORLDS</span><i /></div>
                {profile.topWorlds.map((world, index) => (
                  <div className="fv-dna-world-row" key={world.id}>
                    <span className="fv-dna-world-rank">0{index + 1}</span>
                    <span>{world.name.toUpperCase()}</span>
                    <i><b style={{ width: `${world.percentage}%` }} /></i>
                    <strong>{world.percentage}%</strong>
                  </div>
                ))}
                <div className="fv-dna-world-row is-other"><span className="fv-dna-world-rank">+</span><span>OTHER WORLDS</span><i><b style={{ width: `${profile.otherWorldPercentage}%` }} /></i><strong>{profile.otherWorldPercentage}%</strong></div>
              </div>
            </div>

            <aside className="fv-dna-match">
              <div className="fv-dna-match-label"><span>YOUR FANDOM MATCH</span><span>01 / 01</span></div>
              <div className="fv-dna-match-image">
                <img src={profile.character.image} alt={profile.character.name} />
                <span>{profile.character.category.toUpperCase()} / {profile.character.series || profile.character.franchise}</span>
              </div>
              <h2>{profile.character.name}</h2>
              <p>{profile.character.description || profile.character.biography}</p>
              <div className="fv-dna-match-traits">{profile.character.traits?.slice(0, 3).map((trait) => <span key={trait}>{trait}</span>)}</div>
              <button type="button" className="fv-dna-summon" onClick={summonMatch}>
                SUMMON MY MATCH <Sparkles size={16} aria-hidden="true" />
              </button>
            </aside>
          </div>

          <div className="fv-dna-result-actions">
            <button type="button" onClick={retakeQuiz}><RotateCcw size={14} aria-hidden="true" /> RETAKE DNA</button>
            <button type="button" onClick={() => navigate(`/category/${profile.strongestCategory}`)}>
              EXPLORE MY WORLD <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </section>
      )}

      <footer className="fv-dna-footer"><span>FV / ANALYSIS SYSTEM 01</span><span>YOUR SIGNAL. YOUR WORLDS.</span></footer>
    </main>
  );
}
