import './App.css';
import { Board } from './Board';
import {GameProvider} from './GameContext';

function App() {
  return (
    <div className="App" >
      <GameProvider>
        <Board/>
      </GameProvider>
    </div>
  );
}

export default App;
