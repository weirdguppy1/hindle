import { GameProvider } from "./contexts/GameContext";
import Game from "./Game";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <h1 className="font-mono text-6xl">Hindle!</h1>
      <p className="mb-24">Guess the word based on hints.</p>
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;
