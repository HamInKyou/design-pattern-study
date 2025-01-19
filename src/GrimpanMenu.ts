import { ChromeGrimpan, Grimpan, GrimpanMode, IEGrimpan } from './Grimpan.ts';
import { GrimpanMenuBtn, GrimpanMenuInput } from './GrimpanMenuBtn.ts';
import {
  BackCommand,
  CircleSelectCommand,
  Command,
  EraserSelectCommand,
  ForwardCommand,
  PenSelectCommand,
  PipetteSelectCommand,
  RectangleSelectCommand,
} from './commands';

export type BtnType = 'back' | 'forward' | 'color' | 'pipette' | 'pen' | 'circle' | 'rectangle' | 'eraser' | 'save';

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

  setActiveBtn(type: GrimpanMode) {
    document.querySelector('.active')?.classList.remove('active');
    document.querySelector(`#${type}-btn`)?.classList.add('active');
    this.grimpan.setMode(type);
  }
}

// 구체 클래스 ( ConcreteProduct Class )
export class ChromeGrimpanMenu extends GrimpanMenu {
  protected static instance: ChromeGrimpanMenu;

  override initialize(types: BtnType[]) {
    types.forEach(this.drawButtonByType.bind(this));
    this.setActiveBtn('pen');
  }

  executeCommand(command: Command) {
    command.execute();
  }

  onClickBack() {
    this.executeCommand(new BackCommand(this.grimpan.history));
  }

  onClickForward() {
    this.executeCommand(new ForwardCommand(this.grimpan.history));
  }

  onClickPipette() {
    this.executeCommand(new PipetteSelectCommand(this.grimpan));
  }

  onClickPen() {
    this.executeCommand(new PenSelectCommand(this.grimpan));
  }

  onClickCircle() {
    this.executeCommand(new CircleSelectCommand(this.grimpan));
  }

  onClickRectangle() {
    this.executeCommand(new RectangleSelectCommand(this.grimpan));
  }

  onClickEraser() {
    this.executeCommand(new EraserSelectCommand(this.grimpan));
  }

  drawButtonByType(type: BtnType) {
    switch (type) {
      case 'back': {
        const btn = new GrimpanMenuBtn.Builder(this, '뒤로', type).setOnClick(this.onClickBack.bind(this)).build();
        btn.draw();
        return btn;
      }
      case 'forward': {
        const btn = new GrimpanMenuBtn.Builder(this, '앞으로', type).setOnClick(this.onClickForward.bind(this)).build();
        btn.draw();
        return btn;
      }
      case 'color': {
        const btn = new GrimpanMenuInput.Builder(this, '색상', type).setOnChange(() => {}).build();
        btn.draw();
        return btn;
      }
      case 'pipette': {
        const btn = new GrimpanMenuBtn.Builder(this, '스포이드', type)
          .setOnClick(this.onClickPipette.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case 'pen': {
        const btn = new GrimpanMenuBtn.Builder(this, '펜', type).setOnClick(this.onClickPen.bind(this)).build();
        btn.draw();
        return btn;
      }
      case 'circle': {
        const btn = new GrimpanMenuBtn.Builder(this, '원', type).setOnClick(this.onClickCircle.bind(this)).build();
        btn.draw();
        return btn;
      }
      case 'rectangle': {
        const btn = new GrimpanMenuBtn.Builder(this, '사각형', type)
          .setOnClick(this.onClickRectangle.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case 'eraser': {
        const btn = new GrimpanMenuBtn.Builder(this, '지우개', type).setOnClick(this.onClickEraser.bind(this)).build();
        btn.draw();
        return btn;
      }
      case 'save': {
        const btn = new GrimpanMenuBtn.Builder(this, '저장', type).build();
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
