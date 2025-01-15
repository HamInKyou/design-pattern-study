import Grimpan from './AbstractGrimpan.ts';

// 구체 클래스 ( Concrete Class )
class IEGrimpan implements Grimpan {
  protected static instance: IEGrimpan;

  private constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      throw new Error('Canvas element is required');
    }
  }
  initialize() {}
  initializeMenu() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('#canvas'));
    }
    return this.instance;
  }
}

export default IEGrimpan;
