import { ChromeGrimpan, Grimpan, IEGrimpan } from './Grimpan.ts';
import { SubscriptionManager } from './Observer.ts';

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
    SubscriptionManager.getInstance().subscribe('saveComplete', {
      name: 'history',
      publish: this.afterSaveComplete.bind(this),
    });
  }

  afterSaveComplete() {
    console.log('history: save complete');
  }

  cancelSaveCompleteAlarm() {
    SubscriptionManager.getInstance().unsubscribe('saveComplete', 'history');
  }

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  abstract initialize(): void;

  abstract undo(): void;
  abstract redo(): void;

  static getInstance(grimpan: Grimpan) {}
}

// 구체 클래스 ( ConcreteProduct Class )
export class ChromeGrimpanHistory extends GrimpanHistory {
  protected static instance: ChromeGrimpanHistory;

  initialize() {}

  override undo() {}
  override redo() {}

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

  override undo() {}
  override redo() {}

  initialize() {}

  static override getInstance(grimpan: IEGrimpan) {
    if (!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}
