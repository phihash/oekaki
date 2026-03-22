/**
 * Canvasの要素の取得と管理を行う。
 */
export class CanvasManager {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
  }
  /**
   * @param {number} clientX 画面全体のX座標
   * @param {number} clientY 画面全体のY座標
   * Canvasのpositionを計算する
   */
  getCanvasPosition(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: clientX - rect.x,
      y: clientY - rect.y,
    };
  }
  /**
   * 描画コンテキストを取得
   */
  getContext() {
    return this.ctx;
  }
  /**
   * Canvas要素を取得
   */
  getElement() {
    return this.canvas;
  }
}
