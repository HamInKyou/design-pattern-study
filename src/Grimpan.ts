import { BtnType, ChromeGrimpanMenu, GrimpanMenu } from './GrimpanMenu.ts';
import { ChromeGrimpanHistory, GrimpanHistory } from './GrimpanHistory.ts';
import GrimpanFactory, { ChromeGrimpanFactory, IEGrimpanFactory } from './GrimpanFactory.ts';
import { BackCommand, ForwardCommand } from './commands';

export interface GrimpanOption {
  menu: BtnType[];
}

export type GrimpanMode = 'pen' | 'eraser' | 'circle' | 'rectangle' | 'pipette';

// 타입을 정의하는 추상 클래스 ( Product Class )
export abstract class Grimpan {
  protected static instance: Grimpan;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  history!: GrimpanHistory;
  menu!: GrimpanMenu;
  mode!: GrimpanMode;

  protected constructor(canvas: HTMLElement | null, factory: GrimpanFactory) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas element is required');
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
  }

  abstract initialize(option: GrimpanOption): void;

  static getInstance() {}

  setMode(mode: GrimpanMode) {
    console.log('mode changed:', mode);
    this.mode = mode;
  }
}

// 구체 클래스 ( ConcreteProduct Class )
export class ChromeGrimpan extends Grimpan {
  protected static instance: ChromeGrimpan;
  override menu: ChromeGrimpanMenu;
  override history: ChromeGrimpanHistory;

  private constructor(canvas: HTMLElement | null, factory: ChromeGrimpanFactory) {
    super(canvas, factory);
    this.menu = factory.createGrimpanMenu(this, document.querySelector('#menu')!);
    this.history = factory.createGrimpanHistory(this);
  }

  initialize(option: GrimpanOption) {
    this.menu.initialize(option.menu);
    this.history.initialize();
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      console.log(e);
      if (e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
        this.menu.executeCommand(new ForwardCommand(this.history));
        return;
      }
      if (e.code === 'KeyZ' && e.ctrlKey) {
        this.menu.executeCommand(new BackCommand(this.history));
        return;
      }
    });
  }

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas'), new ChromeGrimpanFactory());
    }
    return this.instance;
  }
}

// 구체 클래스 ( ConcreteProduct Class )
export class IEGrimpan extends Grimpan {
  protected static instance: IEGrimpan;

  initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('#canvas'), new IEGrimpanFactory());
    }
    return this.instance;
  }
}
