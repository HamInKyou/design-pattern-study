import Grimpan from './AbstractGrimpan.ts';

// 구체 클래스 ( Concrete Class )
class IEGrimpan extends Grimpan {
  protected static instance: IEGrimpan;

  initialize() {}
  initializeMenu() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('#canvas'));
    }
    return this.instance;
  }
}

export default IEGrimpan;
