import { Tool } from './Tool.js';

export class EraseTool extends Tool {
  constructor(ctx) {
    super(ctx);
    this.setup();
  }

  setup() {
    this.ctx.globalCompositeOperation = "destination-out"; //透明に
    this.ctx.lineWidth = 20;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
  }

  draw(from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }
}
