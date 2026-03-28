/**
 * ツールの基底クラス（抽象クラス）
 * すべてのツールはこのクラスを継承する必要がある
 */
export class Tool {
  constructor(ctx) {
    if (new.target === Tool) {
      throw new Error('Tool is abstract and cannot be instantiated directly');
    }
    this.ctx = ctx;
  }

  /**
   * 描画処理（サブクラスで実装必須）
   * @param {{x:number,y:number}} from - 開始点
   * @param {{x:number,y:number}} to - 終了点
   */
  draw(from, to) {
    throw new Error('Tool.draw() must be implemented by subclass');
  }

  /**
   * ツールの設定（サブクラスで実装必須）
   */
  setup() {
    throw new Error('Tool.setup() must be implemented by subclass');
  }
}
