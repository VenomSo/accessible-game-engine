export class InputManager {
  private keys: Map<string, boolean> = new Map();
  private mousePosition: [number, number] = [0, 0];

  initialize(): void {
    this.setupKeyboardListeners();
    this.setupMouseListeners();
    console.log('Input Manager initialized');
  }

  private setupKeyboardListeners(): void {
    document.addEventListener('keydown', (e) => {
      this.keys.set(e.key, true);
    });
    document.addEventListener('keyup', (e) => {
      this.keys.set(e.key, false);
    });
  }

  private setupMouseListeners(): void {
    document.addEventListener('mousemove', (e) => {
      this.mousePosition = [e.clientX, e.clientY];
    });
  }

  update(deltaTime: number): void {
    // Input update logic
  }

  isKeyPressed(key: string): boolean {
    return this.keys.get(key) || false;
  }

  getMousePosition(): [number, number] {
    return this.mousePosition;
  }
}
