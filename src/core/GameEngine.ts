import { PhysicsEngine } from './physics/PhysicsEngine';
import { RenderEngine } from './render/RenderEngine';
import { AudioEngine } from './audio/AudioEngine';
import { InputManager } from './input/InputManager';
import { AccessibilityManager } from './accessibility/AccessibilityManager';

export class GameEngine {
  private physicsEngine: PhysicsEngine;
  private renderEngine: RenderEngine;
  private audioEngine: AudioEngine;
  private inputManager: InputManager;
  private accessibilityManager: AccessibilityManager;
  private isRunning: boolean = false;

  constructor() {
    this.physicsEngine = new PhysicsEngine();
    this.renderEngine = new RenderEngine();
    this.audioEngine = new AudioEngine();
    this.inputManager = new InputManager();
    this.accessibilityManager = new AccessibilityManager();
  }

  async initialize(): Promise<void> {
    console.log('Initializing Game Engine...');
    await this.renderEngine.initialize();
    await this.audioEngine.initialize();
    this.inputManager.initialize();
    this.accessibilityManager.initialize();
    this.physicsEngine.initialize();
  }

  start(): void {
    this.isRunning = true;
    this.gameLoop();
  }

  private gameLoop(): void {
    if (!this.isRunning) return;
    const deltaTime = 1 / 60;
    this.inputManager.update(deltaTime);
    this.physicsEngine.update(deltaTime);
    this.audioEngine.update(deltaTime);
    this.renderEngine.render(deltaTime);
    requestAnimationFrame(() => this.gameLoop());
  }

  stop(): void {
    this.isRunning = false;
  }

  getAccessibilityManager(): AccessibilityManager {
    return this.accessibilityManager;
  }
}
