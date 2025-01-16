// 타입을 정의하는 추상 클래스 ( Product Class )
export abstract class Grimpan {
  protected static instance: Grimpan;

  protected constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      throw new Error('Canvas element is required');
    }
  }

  abstract initialize(): void;
  abstract initializeMenu(): void;

  static getInstance() {}
}

// 구체 클래스 ( ConcreteProduct Class )
export class ChromeGrimpan extends Grimpan {
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

// 구체 클래스 ( ConcreteProduct Class )
export class IEGrimpan extends Grimpan {
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
