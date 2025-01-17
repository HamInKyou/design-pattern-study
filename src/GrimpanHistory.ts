import { ChromeGrimpan, Grimpan, IEGrimpan } from './Grimpan.ts';

interface Cloneable {
  clone(): Cloneable;
}

class HistoryStack extends Array implements Cloneable {
  clone() {
    return new HistoryStack(...this);
  }
}
// 타입을 정의하는 추상 클래스 ( Product Class )
export abstract class GrimpanHistory {
  protected grimpan: Grimpan;
  stack: HistoryStack;

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
    this.stack = new HistoryStack();
  }

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  abstract initialize(): void;

  static getInstance(grimpan: Grimpan) {}
}

// 구체 클래스 ( ConcreteProduct Class )
export class ChromeGrimpanHistory extends GrimpanHistory {
  protected static instance: ChromeGrimpanHistory;

  initialize() {}

  static override getInstance(grimpan: ChromeGrimpan) {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}

// 구체 클래스 ( ConcreteProduct Class )
export class IEGrimpanHistory extends GrimpanHistory {
  protected static instance: IEGrimpanHistory;

  initialize() {}

  static override getInstance(grimpan: IEGrimpan) {
    if (!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}
