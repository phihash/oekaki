/**
 * 入力（マウス/タッチ）を処理するクラス
 * 責任: イベント処理のみ（S - 単一責任原則）
 */
export class InputHandler {
  constructor(canvas, canvasManager, callbacks) {
    this.canvas = canvas;
    this.canvasManager = canvasManager;
    this.callbacks = callbacks;  // { onStart, onMove, onEnd }
    this.setupEvents();
  }

  setupEvents() {
    // マウスイベント
    this.canvas.addEventListener("mousedown", (e) => this.handleMouseStart(e));
    this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    this.canvas.addEventListener("mouseup", (e) => this.handleMouseEnd(e));

    // タッチイベント
    this.canvas.addEventListener("touchstart", (e) => this.handleTouchStart(e));
    this.canvas.addEventListener("touchmove", (e) => this.handleTouchMove(e));
    this.canvas.addEventListener("touchend", (e) => this.handleTouchEnd(e));
  }

  handleMouseStart(e) {
    const pos = this.canvasManager.getCanvasPosition(e.clientX, e.clientY);
    this.callbacks.onStart(pos.x, pos.y);
  }

  handleMouseMove(e) {
    const pos = this.canvasManager.getCanvasPosition(e.clientX, e.clientY);
    this.callbacks.onMove(pos.x, pos.y);
  }

  handleMouseEnd(e) {
    this.callbacks.onEnd();
  }

  handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const pos = this.canvasManager.getCanvasPosition(touch.clientX, touch.clientY);
    this.callbacks.onStart(pos.x, pos.y);
  }

  handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const pos = this.canvasManager.getCanvasPosition(touch.clientX, touch.clientY);
    this.callbacks.onMove(pos.x, pos.y);
  }

  handleTouchEnd(e) {
    e.preventDefault();
    this.callbacks.onEnd();
  }
}
