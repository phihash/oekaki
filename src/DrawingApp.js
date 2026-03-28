import { CanvasManager } from "./CanvasManager.js";
import { InputHandler } from "./InputHandler.js";

/**
 * お絵描きアプリケーション全体を統合するクラス
 * 責任: アプリケーション全体の制御（S - 単一責任原則）
 * D（依存性逆転）: 具体的なツールではなく、抽象（Toolインターフェース）に依存
 */
export class DrawingApp {
  constructor(canvasId, tools) {
    // 各クラスのインスタンス作成
    this.canvasManager = new CanvasManager(canvasId);
    this.canvas = this.canvasManager.getElement();
    this.ctx = this.canvasManager.getContext();

    // ツールの作成（依存性注入）
    this.penTool = tools.pen;
    this.eraseTool = tools.erase;
    this.currentTool = this.penTool;
    this.penTool.setup(); // 初期設定

    // 描画状態
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;

    // InputHandlerの作成
    this.inputHandler = new InputHandler(this.canvas, this.canvasManager, {
      onStart: (x, y) => this.handleStart(x, y),
      onMove: (x, y) => this.handleMove(x, y),
      onEnd: () => this.handleEnd(),
    });

    // ツール切り替えボタンの設定
    this.setupToolButtons();
  }

  // 描画開始
  handleStart(x, y) {
    this.isDrawing = true;
    this.lastX = x;
    this.lastY = y;
  }

  // 描画中
  handleMove(x, y) {
    if (!this.isDrawing) return;

    this.currentTool.draw({ x: this.lastX, y: this.lastY }, { x, y });

    this.lastX = x;
    this.lastY = y;
  }

  // 描画終了
  handleEnd() {
    this.isDrawing = false;
  }

  // ツール切り替えボタンの設定
  setupToolButtons() {
    const penBtn = document.querySelector(".pen-button");
    const eraseBtn = document.querySelector(".erase-button");

    penBtn.addEventListener("click", () => {
      this.currentTool = this.penTool;
      this.penTool.setup();
      penBtn.classList.add("active");
      eraseBtn.classList.remove("active");
    });

    eraseBtn.addEventListener("click", () => {
      this.currentTool = this.eraseTool;
      this.eraseTool.setup();
      eraseBtn.classList.add("active");
      penBtn.classList.remove("active");
    });
  }
}
