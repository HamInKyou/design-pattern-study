import Grimpan from './AbstractGrimpan.ts';

// 구체 클래스 ( Concrete Class )
class ChromeGrimpan extends Grimpan {
  protected static instance: ChromeGrimpan;

  initialize() {}
  initializeMenu() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas'));
    }
    return this.instance;
  }
}

export default ChromeGrimpan;
