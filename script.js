/**
 * Canvasの要素の取得と管理を行う。
 */
class CanvasManager {
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

/**
 * ペンツールクラス
 */
class PenTool {
  constructor(ctx) {
    this.ctx = ctx;
    this.setup();
  }

  setup() {
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.strokeStyle = "#000000";
  }

  /**
   *
   * @param {{x:number,y:number}} from
   * @param {{x:number,y:number}}  to
   */
  draw(from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }
}

const canvasManager = new CanvasManager("canvas");
const canvas = canvasManager.getElement();
const ctx = canvasManager.getContext();

const penTool = new PenTool(ctx);

let isDrawing = false;
//前の場所を保存する変数
let lastX = 0;
let lastY = 0;

// PC
canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;

  const pos = canvasManager.getCanvasPosition(event.clientX, event.clientY);
  lastX = pos.x;
  lastY = pos.y;
});

canvas.addEventListener("mousemove", (event) => {
  if (!isDrawing) return;

  const pos = canvasManager.getCanvasPosition(event.clientX, event.clientY);
  const x = pos.x;
  const y = pos.y;

  penTool.draw({ x: lastX, y: lastY }, { x, y });

  lastX = x;
  lastY = y;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("touchstart", () => {
  isDrawing = true;
});

canvas.addEventListener("touchmove", () => {});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});

class DrawingApp {}
