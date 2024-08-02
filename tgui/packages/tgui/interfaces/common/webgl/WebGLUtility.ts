export class WebGLUtility {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;

  constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl = this.canvas.getContext("experimental-webgl") as WebGLRenderingContext;
    if (!this.gl) {
      throw new Error("WebGL not supported");
    }
  }

  public getContext(): WebGLRenderingContext {
    return this.gl;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}
