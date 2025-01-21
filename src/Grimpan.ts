import { BtnType, ChromeGrimpanMenu, GrimpanMenu } from './GrimpanMenu.ts';
import { ChromeGrimpanHistory, GrimpanHistory } from './GrimpanHistory.ts';
import GrimpanFactory, { ChromeGrimpanFactory, IEGrimpanFactory } from './GrimpanFactory.ts';
import { BackCommand, ForwardCommand } from './commands';
import { CircleMode, EraserMode, Mode, PenMode, PipetteMode, RectangleMode } from './modes';

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
  mode!: Mode;
  color: string;
  active: boolean;
  saveStrategy!: () => void;

  protected constructor(canvas: HTMLElement | null, factory: GrimpanFactory) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas element is required');
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.color = '#000';
    this.active = false;
    this.setSaveStrategy('png');
  }

  setSaveStrategy(imageType: 'png' | 'jpg' | 'webp') {
    switch (imageType) {
      case 'png':
        this.saveStrategy = () => {
          const a = document.createElement('a');
          a.download = 'canvas.png';
          const dataURL = this.canvas.toDataURL('image/png');
          let url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream');
          a.href = url;
          a.click();
        };
        break;
      case 'jpg':
        this.saveStrategy = () => {
          const a = document.createElement('a');
          a.download = 'canvas.jpg';
          const dataURL = this.canvas.toDataURL('image/jpeg');
          let url = dataURL.replace(/^data:image\/jpeg/, 'data:application/octet-stream');
          a.href = url;
          a.click();
        };
        break;
      case 'webp':
        this.saveStrategy = () => {
          const a = document.createElement('a');
          a.download = 'canvas.webp';
          const dataURL = this.canvas.toDataURL('image/webp');
          let url = dataURL.replace(/^data:image\/webp/, 'data:application/octet-stream');
          a.href = url;
          a.click();
        };
        break;
    }
  }
  setMode(mode: GrimpanMode) {
    console.log('mode change', mode);
    switch (mode) {
      case 'pen':
        this.mode = new PenMode(this);
        break;
      case 'eraser':
        this.mode = new EraserMode(this);
        break;
      case 'pipette':
        this.mode = new PipetteMode(this);
        break;
      case 'rectangle':
        this.mode = new RectangleMode(this);
        break;
      case 'circle':
        this.mode = new CircleMode(this);
        break;
    }
  }

  setColor(color: string) {
    this.color = color;
  }

  changeColor(color: string) {
    this.setColor(color);
    if (this.menu.colorBtn) {
      this.menu.colorBtn.value = color;
    }
  }

  abstract initialize(option: GrimpanOption): void;
  abstract onMousedown(e: MouseEvent): void;
  abstract onMousemove(e: MouseEvent): void;
  abstract onMouseup(e: MouseEvent): void;

  static getInstance() {}
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

    this.canvas.addEventListener('mousedown', this.onMousedown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMousemove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseup.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseup.bind(this));
  }

  override onMousedown(e: MouseEvent): void {
    this.mode.mousedown(e);
  }

  override onMousemove(e: MouseEvent): void {
    this.mode.mousemove(e);
  }

  override onMouseup(e: MouseEvent): void {
    this.mode.mouseup(e);
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

  override onMousedown(e: MouseEvent): void {}
  override onMousemove(e: MouseEvent): void {}
  override onMouseup(e: MouseEvent): void {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('#canvas'), new IEGrimpanFactory());
    }
    return this.instance;
  }
}
