import { useState, useEffect } from 'react';
import { stages, getDifficultyColor, getDifficultyBg, type Choice } from './gameData';

type GameScreen = 'start' | 'suspense' | 'stage-intro' | 'event' | 'boss' | 'stage-complete' | 'game-over' | 'victory';

interface GameState {
  screen: GameScreen;
  currentStage: number;
  capital: number;
  team: number;
  reputation: number;
  currentEventIndex: number;
  lastOutcome: string;
  showOutcome: boolean;
  animating: boolean;
  suspenseText: string;
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    screen: 'start',
    currentStage: 0,
    capital: 100,
    team: 70,
    reputation: 50,
    currentEventIndex: 0,
    lastOutcome: '',
    showOutcome: false,
    animating: false,
    suspenseText: '',
  });

  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [flashColor, setFlashColor] = useState<string | null>(null);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const currentStage = stages[gameState.currentStage];

  const startGame = () => {
    setGameState({
      screen: 'suspense',
      currentStage: 0,
      capital: 100,
      team: 70,
      reputation: 50,
      currentEventIndex: 0,
      lastOutcome: '',
      showOutcome: false,
      animating: false,
      suspenseText: 'Your journey begins in the Silicon Valley of India...',
    });
    // Transition to stage-intro after suspense
    setTimeout(() => {
      setGameState(prev => ({ ...prev, screen: 'stage-intro' }));
    }, 3000);
  };

  const startStage = () => {
    setGameState(prev => ({ ...prev, screen: 'event', currentEventIndex: 0 }));
  };

  const makeChoice = (choice: Choice, isBoss: boolean = false) => {
    setShakeScreen(true);
    setTimeout(() => setShakeScreen(false), 500);

    const newCapital = gameState.capital + choice.effects.capital;
    const newTeam = Math.max(0, Math.min(100, gameState.team + choice.effects.team));
    const newReputation = Math.max(0, Math.min(100, gameState.reputation + choice.effects.reputation));

    // Flash based on outcome
    if (choice.effects.capital < -15 || choice.effects.reputation < -10) {
      setFlashColor('red');
    } else if (choice.effects.capital > 10 || choice.effects.reputation > 10) {
      setFlashColor('green');
    }
    setTimeout(() => setFlashColor(null), 800);

    setGameState(prev => ({
      ...prev,
      capital: newCapital,
      team: newTeam,
      reputation: newReputation,
      lastOutcome: choice.outcome,
      showOutcome: true,
      animating: true,
    }));

    // Check for game over
    if (newCapital <= 0 || newTeam <= 0 || newReputation <= 0) {
      setTimeout(() => {
        setGameState(prev => ({ ...prev, screen: 'game-over', showOutcome: false }));
      }, 2500);
      return;
    }

    // Determine next screen
    setTimeout(() => {
      if (isBoss) {
        // Stage complete
        if (newCapital >= currentStage.targetCapital) {
          if (gameState.currentStage >= stages.length - 1) {
            setGameState(prev => ({ ...prev, screen: 'victory', showOutcome: false }));
          } else {
            setGameState(prev => ({ ...prev, screen: 'stage-complete', showOutcome: false }));
          }
        } else {
          setGameState(prev => ({ ...prev, screen: 'game-over', showOutcome: false }));
        }
      } else {
        // Next event or boss
        const nextEventIndex = gameState.currentEventIndex + 1;
        if (nextEventIndex >= currentStage.events.length) {
          setGameState(prev => ({ ...prev, screen: 'boss', currentEventIndex: nextEventIndex, showOutcome: false }));
        } else {
          setGameState(prev => ({ ...prev, currentEventIndex: nextEventIndex, showOutcome: false }));
        }
      }
    }, 2500);
  };

  const nextStage = () => {
    const nextStageIndex = gameState.currentStage + 1;
    const suspenseMessages = [
      'The financial capital awaits... Can you survive Mumbai?',
      'Delhi NCR - where commerce never sleeps. Are you ready?',
      'Hyderabad\'s pharma industry... One wrong move costs lives.',
      'Chennai - the electric revolution begins. Lead or perish.',
    ];
    
    setGameState(prev => ({
      ...prev,
      screen: 'suspense',
      currentStage: nextStageIndex,
      currentEventIndex: 0,
      suspenseText: suspenseMessages[nextStageIndex - 1] || 'A new challenge awaits...',
    }));
    
    setTimeout(() => {
      setGameState(prev => ({ ...prev, screen: 'stage-intro' }));
    }, 3000);
  };

  const restartGame = () => {
    setGameState({
      screen: 'start',
      currentStage: 0,
      capital: 100,
      team: 70,
      reputation: 50,
      currentEventIndex: 0,
      lastOutcome: '',
      showOutcome: false,
      animating: false,
      suspenseText: '',
    });
  };

  const renderStats = () => (
    <div className="flex gap-4 md:gap-6 items-center justify-center flex-wrap">
      <StatBar icon="💰" label="Capital" value={gameState.capital} max={500} color="from-yellow-500 to-amber-600" />
      <StatBar icon="👥" label="Team" value={gameState.team} max={100} color="from-blue-500 to-cyan-600" />
      <StatBar icon="⭐" label="Reputation" value={gameState.reputation} max={100} color="from-purple-500 to-pink-600" />
    </div>
  );

  const renderStartScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 opacity-30">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${2 + p.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Indian flag colors accent */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-1">
            <div className="w-12 h-1.5 bg-orange-500 rounded-full" />
            <div className="w-12 h-1.5 bg-white rounded-full" />
            <div className="w-12 h-1.5 bg-green-500 rounded-full" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400 mb-4 tracking-tight">
          STARTUP INDIA
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-white/90 mb-2">
          The Tycoon Challenge
        </h2>
        <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto">
          Build your empire across India's biggest cities. Navigate crises, outsmart competitors, and prove you have what it takes to become India's next business legend.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10 max-w-2xl mx-auto">
          {stages.map((stage, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">{['💻', '💳', '🛒', '💊', '🚗'][i]}</div>
              <div className="text-xs text-white/70">{stage.city}</div>
            </div>
          ))}
        </div>

        <button
          onClick={startGame}
          className="group relative px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white font-bold text-xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
        >
          <span className="relative z-10">🚀 BEGIN YOUR JOURNEY</span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <p className="mt-6 text-white/40 text-sm">
          5 Cities • 5 Industries • Infinite Challenges
        </p>
      </div>
    </div>
  );

  const renderSuspense = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />
      
      {/* Pulsing vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black opacity-50 animate-pulse" style={{ background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.5) 70%, black 100%)' }} />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.slice(0, 10).map(p => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-orange-400/60 rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `float ${3 + p.delay}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* Loading bar */}
        <div className="mb-8">
          <div className="w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-loading-bar" />
          </div>
        </div>

        {/* Suspense text */}
        <div className="animate-fadeIn">
          <div className="text-orange-500/60 text-sm font-bold tracking-widest mb-4">⚡ INCOMING TRANSMISSION ⚡</div>
          <p className="text-2xl md:text-3xl text-white font-bold leading-relaxed animate-pulse">
            {gameState.suspenseText}
          </p>
        </div>

        {/* Next city preview */}
        <div className="mt-12 opacity-50">
          <div className="text-white/30 text-sm">Preparing Stage {stages[gameState.currentStage]?.id}...</div>
          <div className="text-white/50 text-lg font-semibold mt-1">{stages[gameState.currentStage]?.city}</div>
        </div>
      </div>
    </div>
  );

  const renderStageIntro = () => (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentStage.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

      <div className="relative z-10 flex flex-col min-h-screen justify-end p-6 md:p-12">
        {/* Progress bar */}
        <div className="absolute top-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white/40 text-xs">JOURNEY PROGRESS</span>
            <span className="text-white/60 text-xs ml-auto">{gameState.currentStage + 1}/{stages.length} Cities</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 rounded-full transition-all duration-1000"
              style={{ width: `${((gameState.currentStage) / stages.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            {stages.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full border-2 ${
                i < gameState.currentStage ? 'bg-green-500 border-green-400' :
                i === gameState.currentStage ? 'bg-orange-500 border-orange-400 animate-pulse' :
                'bg-white/10 border-white/20'
              }`} />
            ))}
          </div>
        </div>

        {/* Stage number badge */}
        <div className="mb-4 mt-16">
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${getDifficultyBg(currentStage.difficulty)} ${getDifficultyColor(currentStage.difficulty)}`}>
            STAGE {currentStage.id} • {currentStage.difficulty.toUpperCase()}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-2">
          {currentStage.city}
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white/80 mb-4">
          {currentStage.industry}
        </h2>
        <h3 className="text-xl md:text-2xl text-orange-400 font-semibold mb-4">
          "{currentStage.title}"
        </h3>
        <p className="text-lg text-white/70 max-w-2xl mb-8">
          {currentStage.description}
        </p>

        {/* Target */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 mb-6 max-w-md">
          <div className="text-white/60 text-sm">Target Capital to Advance</div>
          <div className="text-3xl font-black text-yellow-400">₹{currentStage.targetCapital} Cr</div>
          <div className="text-white/40 text-sm mt-1">Current: ₹{gameState.capital} Cr</div>
        </div>

        {renderStats()}

        <button
          onClick={startStage}
          className="mt-8 px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 self-start"
        >
          ⚔️ Enter the Arena
        </button>
      </div>
    </div>
  );

  const renderEvent = () => {
    const event = currentStage.events[gameState.currentEventIndex];
    if (!event) return null;

    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${currentStage.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900/95" />

        <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{['💻', '💳', '🛒', '💊', '🚗'][gameState.currentStage]}</span>
              <div>
                <div className="text-white/60 text-sm">{currentStage.city} • {currentStage.industry}</div>
                <div className="text-white font-bold">Stage {currentStage.id}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-sm">Event {gameState.currentEventIndex + 1}/{currentStage.events.length}</div>
            </div>
          </div>

          {renderStats()}

          {/* Event Card */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-3xl w-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
                <div className="text-orange-400 text-sm font-bold mb-2 tracking-wider">⚡ DECISION POINT</div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">{event.title}</h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">{event.description}</p>

                <div className="space-y-4">
                  {event.choices.map((choice, i) => (
                    <ChoiceButton key={i} choice={choice} onClick={() => makeChoice(choice)} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outcome Modal */}
        {gameState.showOutcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-800 border border-white/20 rounded-3xl p-8 max-w-lg mx-4 text-center shadow-2xl animate-scaleIn">
              <div className="text-4xl mb-4">
                {gameState.lastOutcome.includes('DISASTER') || gameState.lastOutcome.includes('CATASTROPHIC') ? '💀' :
                 gameState.lastOutcome.includes('Genius') || gameState.lastOutcome.includes('Legendary') || gameState.lastOutcome.includes('Heroic') ? '🏆' : '⚡'}
              </div>
              <p className="text-xl text-white font-semibold leading-relaxed">{gameState.lastOutcome}</p>
              <div className="mt-6 flex justify-center gap-4 text-sm">
                <span className="text-yellow-400">💰 {gameState.capital} Cr</span>
                <span className="text-blue-400">👥 {gameState.team}%</span>
                <span className="text-purple-400">⭐ {gameState.reputation}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderBoss = () => {
    const boss = currentStage.bossChallenge;

    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${currentStage.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/90 via-slate-900/90 to-slate-900/95" />

        {/* Pulsing red border */}
        <div className="absolute inset-0 border-4 border-red-500/30 animate-pulse rounded-none pointer-events-none" />

        <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block px-6 py-2 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 font-bold text-sm tracking-wider animate-pulse">
              🔥 BOSS CHALLENGE 🔥
            </div>
          </div>

          {renderStats()}

          {/* Boss Card */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-3xl w-full">
              <div className="bg-red-950/30 backdrop-blur-xl border-2 border-red-500/30 rounded-3xl p-6 md:p-10 shadow-2xl shadow-red-500/10">
                <h2 className="text-2xl md:text-3xl font-black text-red-400 mb-4 text-center">{boss.title}</h2>
                <p className="text-lg text-white/80 mb-8 leading-relaxed text-center">{boss.description}</p>

                <div className="space-y-4">
                  {boss.choices.map((choice, i) => (
                    <ChoiceButton key={i} choice={choice} onClick={() => makeChoice(choice, true)} index={i} isBoss />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outcome Modal */}
        {gameState.showOutcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-800 border border-white/20 rounded-3xl p-8 max-w-lg mx-4 text-center shadow-2xl animate-scaleIn">
              <div className="text-5xl mb-4">
                {gameState.lastOutcome.includes('DISASTER') || gameState.lastOutcome.includes('CATASTROPHIC') ? '💀' :
                 gameState.lastOutcome.includes('Legendary') || gameState.lastOutcome.includes('Heroic') || gameState.lastOutcome.includes('Masterful') ? '👑' : '⚡'}
              </div>
              <p className="text-xl text-white font-semibold leading-relaxed">{gameState.lastOutcome}</p>
              <div className="mt-6 flex justify-center gap-4 text-sm">
                <span className="text-yellow-400">💰 {gameState.capital} Cr</span>
                <span className="text-blue-400">👥 {gameState.team}%</span>
                <span className="text-purple-400">⭐ {gameState.reputation}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStageComplete = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-slate-900 to-indigo-950" />
      <div className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${1 + p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <div className="text-7xl mb-6 animate-bounce">🎉</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">STAGE CLEARED!</h1>
        <h2 className="text-2xl text-green-400 font-bold mb-2">{currentStage.city} Conquered!</h2>
        <p className="text-white/70 text-lg mb-8">
          You've proven yourself in the {currentStage.industry} arena. But the next city awaits...
        </p>

        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-black text-yellow-400">₹{gameState.capital}Cr</div>
              <div className="text-white/50 text-sm">Capital</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-400">{gameState.team}%</div>
              <div className="text-white/50 text-sm">Team</div>
            </div>
            <div>
              <div className="text-3xl font-black text-purple-400">{gameState.reputation}%</div>
              <div className="text-white/50 text-sm">Reputation</div>
            </div>
          </div>
        </div>

        {/* Next stage teaser */}
        <div className="bg-white/5 backdrop-blur-md border border-orange-500/30 rounded-2xl p-6 mb-8">
          <div className="text-orange-400 text-sm font-bold mb-2">⚠️ NEXT CHALLENGE AWAITS</div>
          <div className="text-white text-xl font-bold">
            {stages[gameState.currentStage + 1]?.city} • {stages[gameState.currentStage + 1]?.industry}
          </div>
          <div className={`text-sm mt-1 ${getDifficultyColor(stages[gameState.currentStage + 1]?.difficulty || '')}`}>
            Difficulty: {stages[gameState.currentStage + 1]?.difficulty}
          </div>
        </div>

        <button
          onClick={nextStage}
          className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
        >
          🏙️ Advance to {stages[gameState.currentStage + 1]?.city}
        </button>
      </div>
    </div>
  );

  const renderGameOver = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-slate-900 to-black" />
      <div className="absolute inset-0 bg-[url('https://image.qwenlm.ai/generated-images/dc019d2e-838a-4c19-80e4-88059626ae4a/_result.png')] bg-cover bg-center opacity-20" />

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <div className="text-7xl mb-6">💀</div>
        <h1 className="text-4xl md:text-5xl font-black text-red-400 mb-4">GAME OVER</h1>
        <h2 className="text-xl text-white/70 mb-2">
          {gameState.capital <= 0 ? "You ran out of capital. The investors pulled out." :
           gameState.team <= 0 ? "Your entire team quit. You're alone now." :
           "Your reputation is destroyed. No one trusts you."}
        </h2>
        <p className="text-white/50 mb-8">
          Stage {currentStage.id}: {currentStage.city} • {currentStage.industry}
        </p>

        <div className="bg-white/5 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 mb-8">
          <div className="text-white/60 text-sm mb-2">Your Final Stats</div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-yellow-400">₹{Math.max(0, gameState.capital)}Cr</div>
              <div className="text-white/50 text-xs">Capital</div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-400">{Math.max(0, gameState.team)}%</div>
              <div className="text-white/50 text-xs">Team</div>
            </div>
            <div>
              <div className="text-2xl font-black text-purple-400">{Math.max(0, gameState.reputation)}%</div>
              <div className="text-white/50 text-xs">Reputation</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
          <p className="text-white/60 italic">"Every failure is a lesson. India's biggest entrepreneurs failed multiple times before succeeding. Try again?"</p>
        </div>

        <button
          onClick={restartGame}
          className="px-10 py-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );

  const renderVictory = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-950 via-slate-900 to-purple-950" />
      <div className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ping"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay * 0.5}s`,
              animationDuration: `${1 + p.delay * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="text-8xl mb-6 animate-bounce">👑</div>
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-4">
          LEGENDARY!
        </h1>
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-4">
          You are India's Ultimate Business Tycoon!
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
          From a garage in Bangalore to ruling industries across the nation. You've conquered every challenge, survived every crisis, and built an empire that will be remembered for generations.
        </p>

        <div className="bg-white/5 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-6 mb-8">
          <div className="text-yellow-400 font-bold mb-4">🏆 Final Empire Stats</div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-black text-yellow-400">₹{gameState.capital}Cr</div>
              <div className="text-white/50 text-sm">Empire Value</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-400">{gameState.team}%</div>
              <div className="text-white/50 text-sm">Team Strength</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-400">{gameState.reputation}%</div>
              <div className="text-white/50 text-sm">Legacy Score</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-8">
          {stages.map((stage, i) => (
            <div key={i} className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
              <div className="text-xl">✅</div>
              <div className="text-xs text-white/70">{stage.city}</div>
            </div>
          ))}
        </div>

        <button
          onClick={restartGame}
          className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
        >
          🔄 Play Again (Harder?)
        </button>
      </div>
    </div>
  );

  // Main render
  const screenClass = shakeScreen ? 'animate-shake' : '';

  return (
    <div className={`min-h-screen ${screenClass}`}>
      {/* Flash overlay */}
      {flashColor && (
        <div className={`fixed inset-0 z-40 pointer-events-none animate-flash opacity-30 ${
          flashColor === 'red' ? 'bg-red-500' : 'bg-green-500'
        }`} />
      )}

      {gameState.screen === 'start' && renderStartScreen()}
      {gameState.screen === 'suspense' && renderSuspense()}
      {gameState.screen === 'stage-intro' && renderStageIntro()}
      {gameState.screen === 'event' && renderEvent()}
      {gameState.screen === 'boss' && renderBoss()}
      {gameState.screen === 'stage-complete' && renderStageComplete()}
      {gameState.screen === 'game-over' && renderGameOver()}
      {gameState.screen === 'victory' && renderVictory()}
    </div>
  );
}

// Sub-components
function StatBar({ icon, label, value, max, color }: { icon: string; label: string; value: number; max: number; color: string }) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 min-w-[140px]">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-white/60 text-xs">{label}</span>
          <span className="text-white font-bold text-sm">{value}</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ChoiceButton({ choice, onClick, index, isBoss = false }: { choice: Choice; onClick: () => void; index: number; isBoss?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 transform hover:scale-[1.02] ${
        isBoss
          ? 'bg-red-950/30 border-red-500/30 hover:border-red-400/60 hover:bg-red-950/50'
          : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-3">
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          isBoss ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/70'
        }`}>
          {String.fromCharCode(65 + index)}
        </span>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm md:text-base leading-relaxed">{choice.text}</p>
          {hovered && (
            <div className="mt-2 flex gap-3 text-xs animate-fadeIn">
              <span className={choice.effects.capital >= 0 ? 'text-green-400' : 'text-red-400'}>
                💰 {choice.effects.capital > 0 ? '+' : ''}{choice.effects.capital}
              </span>
              <span className={choice.effects.team >= 0 ? 'text-green-400' : 'text-red-400'}>
                👥 {choice.effects.team > 0 ? '+' : ''}{choice.effects.team}
              </span>
              <span className={choice.effects.reputation >= 0 ? 'text-green-400' : 'text-red-400'}>
                ⭐ {choice.effects.reputation > 0 ? '+' : ''}{choice.effects.reputation}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

export default App;
