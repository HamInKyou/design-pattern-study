import Grimpan from './AbstractGrimpan.ts';

// 구체 클래스 ( Concrete Class )
class ChromeGrimpan implements Grimpan {
  protected static instance: ChromeGrimpan;

  private constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      throw new Error('Canvas element is required');
    }
  }

  initialize() {}
  initializeMenu() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas'));
    }
    return this.instance;
  }
}

export default ChromeGrimpan;
