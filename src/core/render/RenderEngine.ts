export class RenderEngine {
  private canvas: HTMLCanvasElement | null = null;
  private gl: WebGLRenderingContext | null = null;

  async initialize(): Promise<void> {
    this.setupCanvas();
    this.setupWebGL();
    console.log('Render Engine initialized');
  }

  private setupCanvas(): void {
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.id = 'game-canvas';
    document.body.appendChild(this.canvas);
  }

  private setupWebGL(): void {
    if (!this.canvas) return;
    this.gl = this.canvas.getContext('webgl') as WebGLRenderingContext;
  }

  render(deltaTime: number): void {
    if (!this.gl) return;
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
}
