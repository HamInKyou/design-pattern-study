import { ChromeGrimpan, Grimpan, IEGrimpan } from './Grimpan.ts';

// 타입을 정의하는 추상 클래스 ( Product Class )
export abstract class GrimpanMenu {
  protected grimpan: Grimpan;

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
  }

  abstract initialize(): void;

  static getInstance(grimpan: Grimpan) {}
}

// 구체 클래스 ( ConcreteProduct Class )
export class ChromeGrimpanMenu extends GrimpanMenu {
  protected static instance: ChromeGrimpanMenu;

  initialize() {}

  static override getInstance(grimpan: ChromeGrimpan) {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan);
    }
    return this.instance;
  }
}

// 구체 클래스 ( ConcreteProduct Class )
export class IEGrimpanMenu extends GrimpanMenu {
  protected static instance: IEGrimpanMenu;

  initialize() {}

  static override getInstance(grimpan: IEGrimpan) {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan);
    }
    return this.instance;
  }
}
