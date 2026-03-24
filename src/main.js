// クラスをインポート
import { CanvasManager } from "./CanvasManager.js";
import { PenTool } from "./PenTool.js";
import { EraseTool } from "./EraseTool.js";

// インスタンス作成
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

canvas.addEventListener("touchmove", (event) => {
  if (!isDrawing) return;

  const pos = canvasManager.getCanvasPosition(event.clientX, event.clientY);
  const x = pos.x;
  const y = pos.y;

  penTool.draw({ x: lastX, y: lastY }, { x, y });

  lastX = x;
  lastY = y;
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});
