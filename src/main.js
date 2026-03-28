import { DrawingApp } from './DrawingApp.js';
import { PenTool } from './PenTool.js';
import { EraseTool } from './EraseTool.js';
import { CanvasManager } from './CanvasManager.js';

// キャンバスコンテキストを取得
const canvasManager = new CanvasManager("canvas");
const ctx = canvasManager.getContext();

// ツールを作成（具体的なクラスに依存するのはここだけ）
const tools = {
  pen: new PenTool(ctx),
  erase: new EraseTool(ctx)
};

// アプリケーションを起動（依存性注入）
const app = new DrawingApp("canvas", tools);
