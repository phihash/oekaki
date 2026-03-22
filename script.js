const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
//前の場所を保存する変数
let lastX = 0;
let lastY = 0;
//キャンバス設定
ctx.lineWidth = 2;
// 線の端の形
ctx.lineCap = "round";
// 線と線がつながるところの形
ctx.lineJoin = "round";
ctx.strokeStyle = "#000000";
// PC
canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;

  const rect = canvas.getBoundingClientRect();
  console.log(JSON.stringify(rect, null, 2));
  lastX = event.clientX - rect.x;
  lastY = event.clientY - rect.y;
});

canvas.addEventListener("mousemove", (event) => {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.x;
  const y = event.clientY - rect.y;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

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
