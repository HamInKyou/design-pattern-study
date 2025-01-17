import { ChromeGrimpan, Grimpan, IEGrimpan } from './Grimpan.ts';
import { GrimpanMenuBtn, GrimpanMenuInput } from './GrimpanMenuBtn.ts';

type BtnType = 'back' | 'forward' | 'color' | 'pipette' | 'pen' | 'circle' | 'rectangle' | 'eraser' | 'save';

// 타입을 정의하는 추상 클래스 ( Product Class )
export abstract class GrimpanMenu {
  protected grimpan: Grimpan;
  dom: HTMLElement;

  protected constructor(grimpan: Grimpan, dom: HTMLElement) {
    this.grimpan = grimpan;
    this.dom = dom;
  }

  abstract initialize(types: BtnType[]): void;

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}

// 구체 클래스 ( ConcreteProduct Class )
export class ChromeGrimpanMenu extends GrimpanMenu {
  protected static instance: ChromeGrimpanMenu;

  override initialize(types: BtnType[]) {
    types.forEach(this.drawButtonByType.bind(this));
  }

  drawButtonByType(type: BtnType) {
    switch (type) {
      case 'back': {
        const btn = new GrimpanMenuBtn.Builder(this, '뒤로').build();
        btn.draw();
        return btn;
      }
      case 'forward': {
        const btn = new GrimpanMenuBtn.Builder(this, '앞으로').build();
        btn.draw();
        return btn;
      }
      case 'color': {
        const btn = new GrimpanMenuInput.Builder(this, '색상').build();
        btn.draw();
        return btn;
      }
      case 'pipette': {
        const btn = new GrimpanMenuBtn.Builder(this, '빨간색').build();
        btn.draw();
        return btn;
      }
      case 'pen': {
        const btn = new GrimpanMenuBtn.Builder(this, '펜').build();
        btn.draw();
        return btn;
      }
      case 'circle': {
        const btn = new GrimpanMenuBtn.Builder(this, '원').build();
        btn.draw();
        return btn;
      }
      case 'rectangle': {
        const btn = new GrimpanMenuBtn.Builder(this, '사각형').build();
        btn.draw();
        return btn;
      }
      case 'eraser': {
        const btn = new GrimpanMenuBtn.Builder(this, '지우개').build();
        btn.draw();
        return btn;
      }
      case 'save': {
        const btn = new GrimpanMenuBtn.Builder(this, '저장').build();
        btn.draw();
        return btn;
      }
      default:
        throw new Error(`알 수 없는 타입 ${type}`);
    }
  }

  static override getInstance(grimpan: ChromeGrimpan, dom: HTMLElement) {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}

// 구체 클래스 ( ConcreteProduct Class )
export class IEGrimpanMenu extends GrimpanMenu {
  protected static instance: IEGrimpanMenu;

  override initialize() {}

  static override getInstance(grimpan: IEGrimpan, dom: HTMLElement) {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}
