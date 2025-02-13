import { Grimpan, ChromeGrimpan, IEGrimpan } from './Grimpan.ts';
import { ChromeGrimpanMenu, GrimpanMenu, IEGrimpanMenu } from './GrimpanMenu.ts';
import { ChromeGrimpanHistory, GrimpanHistory, IEGrimpanHistory } from './GrimpanHistory.ts';

// 타입을 정의하는 추상 클래스 ( Factory Class )
export abstract class GrimpanFactory {
  abstract createGrimpan(): Grimpan;
  abstract createGrimpanMenu(grimpan: Grimpan, dom: HTMLElement): GrimpanMenu;
  abstract createGrimpanHistory(grimpan: Grimpan): GrimpanHistory;
}

// 구체 클래스 ( ConcreteFactory Class )
export class ChromeGrimpanFactory extends GrimpanFactory {
  override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }

  override createGrimpanMenu(grimpan: ChromeGrimpan, dom: HTMLElement) {
    return ChromeGrimpanMenu.getInstance(grimpan, dom);
  }

  override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

// 구체 클래스 ( ConcreteFactory Class )
export class IEGrimpanFactory extends GrimpanFactory {
  override createGrimpan() {
    return IEGrimpan.getInstance();
  }

  override createGrimpanMenu(grimpan: IEGrimpan, dom: HTMLElement) {
    return IEGrimpanMenu.getInstance(grimpan, dom);
  }

  override createGrimpanHistory(grimpan: IEGrimpan) {
    return IEGrimpanHistory.getInstance(grimpan);
  }
}

export default GrimpanFactory;
