import { GameMode } from '../GameMode';

export class RocketLeagueGameMode extends GameMode {
  private teams: any[] = [];
  private score: [number, number] = [0, 0];
  private matchInProgress: boolean = false;

  constructor() {
    super('Rocket League');
  }

  async initialize(): Promise<void> {
    console.log('Initializing Rocket League Game Mode');
  }

  startMatch(teamSize: number): void {
    this.matchInProgress = true;
    this.score = [0, 0];
    console.log(`Starting Rocket League match with ${teamSize}v${teamSize}`);
  }

  applyBoost(carId: string, force: number): void {
    console.log(`Car ${carId} applied boost with force ${force}`);
  }

  scoreGoal(team: number): void {
    if (team === 0) {
      this.score[0]++;
    } else {
      this.score[1]++;
    }
    console.log(`Goal! Score: ${this.score[0]} - ${this.score[1]}`);
  }

  endMatch(): void {
    this.matchInProgress = false;
  }

  override getGameDescription(): string {
    return 'Rocket League: A sports game where teams of rocket-powered cars play soccer';
  }
}
