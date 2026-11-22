#!/usr/bin/env node
const readline = require('readline');

const CHOICES = ['rock', 'paper', 'scissors'];
const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
const ALIASES = { r: 'rock', p: 'paper', s: 'scissors' };

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

const score = { win: 0, lose: 0, tie: 0 };

async function main() {
  console.log('Rock Paper Scissors');
  console.log('Enter rock (r), paper (p), scissors (s), or quit (q).\n');

  rl.on('close', () => process.exit(0));

  while (true) {
    const input = (await ask('Your move: ')).trim().toLowerCase();
    if (input === 'q' || input === 'quit') break;

    const player = ALIASES[input] || input;
    if (!CHOICES.includes(player)) {
      console.log('Invalid choice. Try again.\n');
      continue;
    }

    const computer = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    console.log(`Computer chose ${computer}.`);

    if (player === computer) {
      score.tie++;
      console.log("It's a tie.");
    } else if (BEATS[player] === computer) {
      score.win++;
      console.log('You win!');
    } else {
      score.lose++;
      console.log('You lose.');
    }
    console.log(`Score: ${score.win} wins, ${score.lose} losses, ${score.tie} ties\n`);
  }

  console.log(`\nFinal score: ${score.win} wins, ${score.lose} losses, ${score.tie} ties. Thanks for playing!`);
  rl.close();
}

main();
