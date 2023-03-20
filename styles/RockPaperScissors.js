import { useState } from 'react';

function RockPaperScissors() {
  const [playerMove, setPlayerMove] = useState(null);
  const [result, setResult] = useState(null);

  const moves = ['rock', 'paper', 'scissors'];

  function play(playerMove) {
    const computerMove = moves[Math.floor(Math.random() * 3)];
    const wins = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };
    if (playerMove === computerMove) {
      setResult('tie');
    } else if (wins[playerMove] === computerMove) {
      setResult('win');
    } else {
      setResult('lose');
    }
  }

  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <div>
        <button onClick={() => play('rock')}>Rock</button>
        <button onClick={() => play('paper')}>Paper</button>
        <button onClick={() => play('scissors')}>Scissors</button>
      </div>
      <div>
        <p>You chose {playerMove}</p>
        {result && <p>You {result}!</p>}
      </div>
    </div>
  );
}

export default RockPaperScissors;
