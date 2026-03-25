/**
 * ペンツールクラス
 */
export class PenTool {
  constructor(ctx) {
    this.ctx = ctx;
    this.setup();
  }

  setup() {
    this.ctx.globalCompositeOperation = "source-over";  // 通常の描画モードに戻す
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
