export abstract class GameMode {
  protected name: string;
  protected isActive: boolean = false;

  constructor(name: string) {
    this.name = name;
  }

  abstract initialize(): Promise<void>;

  activate(): void {
    this.isActive = true;
    console.log(`${this.name} game mode activated`);
  }

  deactivate(): void {
    this.isActive = false;
    console.log(`${this.name} game mode deactivated`);
  }

  abstract getGameDescription(): string;

  getName(): string {
    return this.name;
  }
}
