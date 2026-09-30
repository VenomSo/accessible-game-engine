import { GameEngine } from './core/GameEngine';
import { RobloxGameMode } from './games/roblox/RobloxGameMode';
import { FortniteGameMode } from './games/fortnite/FortniteGameMode';
import { RocketLeagueGameMode } from './games/rocket-league/RocketLeagueGameMode';
import { MovieEngine } from './movies/MovieEngine';

async function main() {
  const gameEngine = new GameEngine();
  await gameEngine.initialize();

  const robloxMode = new RobloxGameMode();
  const fortniteMode = new FortniteGameMode();
  const rocketLeagueMode = new RocketLeagueGameMode();

  await robloxMode.initialize();
  await fortniteMode.initialize();
  await rocketLeagueMode.initialize();

  const movieEngine = new MovieEngine();

  const a11yManager = gameEngine.getAccessibilityManager();
  a11yManager.setOptions({
    enableCaptions: true,
    enableAudioDescriptions: true,
    enableScreenReader: true,
    enableHighContrast: false,
    textSize: 'normal',
  });

  gameEngine.start();

  (window as any).gameEngine = gameEngine;
  (window as any).robloxMode = robloxMode;
  (window as any).fortniteMode = fortniteMode;
  (window as any).rocketLeagueMode = rocketLeagueMode;
  (window as any).movieEngine = movieEngine;

  console.log('Accessible Game Engine started!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
