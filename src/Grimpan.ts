import { BtnType, ChromeGrimpanMenu, GrimpanMenu } from './GrimpanMenu.ts';
import { ChromeGrimpanHistory, GrimpanHistory } from './GrimpanHistory.ts';
import GrimpanFactory, { ChromeGrimpanFactory, IEGrimpanFactory } from './GrimpanFactory.ts';
import { BackCommand, ForwardCommand } from './commands';
import { CircleMode, EraserMode, Mode, PenMode, PipetteMode, RectangleMode } from './modes';
import { BlurFilter, DefaultFilter, GrayscaleFilter, InvertFilter } from './filters';
import { SaveCompleteObserver, SubscriptionManager } from './Observer.ts';

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
  saveSetting = {
    blur: false,
    grayscale: false,
    invert: false,
  };

  protected constructor(canvas: HTMLElement | null, factory: GrimpanFactory) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas element is required');
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.color = '#000';
    this.active = false;
    this.setSaveStrategy('png');
    SubscriptionManager.getInstance().addEvent('saveComplete');
  }

  setSaveStrategy(imageType: 'png' | 'jpg' | 'webp') {
    switch (imageType) {
      case 'png':
        this.saveStrategy = () => {
          let imageData = this.ctx.getImageData(0, 0, 300, 300);
          const offscreenCanvas = new OffscreenCanvas(300, 300);
          const offscreenContext = offscreenCanvas.getContext('2d')!;
          offscreenContext.putImageData(imageData, 0, 0);
          const df = new DefaultFilter();
          let filter = df;
          if (this.saveSetting.blur) {
            const bf = new BlurFilter();
            filter = filter.setNext(bf);
          }
          if (this.saveSetting.grayscale) {
            const gf = new GrayscaleFilter();
            filter = filter.setNext(gf);
          }
          if (this.saveSetting.invert) {
            const ivf = new InvertFilter();
            filter = filter.setNext(ivf);
          }
          df.handle(offscreenCanvas).then(() => {
            const a = document.createElement('a');
            a.download = 'canvas.png';
            offscreenCanvas.convertToBlob().then((blob) => {
              const reader = new FileReader();
              reader.addEventListener('load', () => {
                const dataURL = reader.result as string;
                console.log('dataURL', dataURL);
                let url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream');
                a.href = url;
                a.click();
                SubscriptionManager.getInstance().publish('saveComplete');
              });
              reader.readAsDataURL(blob);
            });
          });
        };
        break;
      case 'jpg':
        this.saveStrategy = () => {
          if (this.saveSetting.blur) {
          }
          if (this.saveSetting.grayscale) {
          }
          if (this.saveSetting.invert) {
          }
        };
        break;
      case 'webp':
        this.saveStrategy = () => {
          if (this.saveSetting.blur) {
          }
          if (this.saveSetting.grayscale) {
          }
          if (this.saveSetting.invert) {
          }
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
