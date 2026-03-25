// クラスをインポート
import { CanvasManager } from "./CanvasManager.js";
import { PenTool } from "./PenTool.js";
import { EraseTool } from "./EraseTool.js";

// インスタンス作成
const canvasManager = new CanvasManager("canvas");
const canvas = canvasManager.getElement();
const ctx = canvasManager.getContext();

const penTool = new PenTool(ctx);
const eraseTool = new EraseTool(ctx);

let currentTool = penTool;

let isDrawing = false;
//前の場所を保存する変数
let lastX = 0;
let lastY = 0;

// 描画開始処理
function handleStart(clientX, clientY) {
  isDrawing = true;
  const pos = canvasManager.getCanvasPosition(clientX, clientY);
  lastX = pos.x;
  lastY = pos.y;
}

// 描画中の処理
function handleMove(clientX, clientY) {
  if (!isDrawing) return;

  const pos = canvasManager.getCanvasPosition(clientX, clientY);
  const x = pos.x;
  const y = pos.y;

  currentTool.draw({ x: lastX, y: lastY }, { x, y });

  lastX = x;
  lastY = y;
}

// 描画終了処理
function handleEnd() {
  isDrawing = false;
}

// マウスイベント（PC）
canvas.addEventListener("mousedown", (e) => handleStart(e.clientX, e.clientY));
canvas.addEventListener("mousemove", (e) => handleMove(e.clientX, e.clientY));
canvas.addEventListener("mouseup", handleEnd);

// タッチイベント（スマホ・タブレット）
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  handleStart(touch.clientX, touch.clientY);
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  handleMove(touch.clientX, touch.clientY);
});

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  handleEnd();
});

const penBtn = document.querySelector(".pen-button");
const eraseBtn = document.querySelector(".erase-button");

penBtn.addEventListener("click", () => {
  currentTool = penTool;
  penBtn.classList.add("active");
  eraseBtn.classList.remove("active");
});

eraseBtn.addEventListener("click", () => {
  currentTool = eraseTool;
  eraseBtn.classList.add("active");
  penBtn.classList.remove("active");
});
