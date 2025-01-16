import { Grimpan, ChromeGrimpan, IEGrimpan } from './Grimpan.ts';

// 타입을 정의하는 추상 클래스 ( Creator Class )
export abstract class GrimpanFactory {
  abstract createGrimpan(): Grimpan;
}

// 구체 클래스 ( ConcreteCreator Class )
export class ChromeGrimpanFactory extends GrimpanFactory {
  override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }
}

// 구체 클래스 ( ConcreteCreator Class )
export class IEGrimpanFactory extends GrimpanFactory {
  override createGrimpan() {
    return IEGrimpan.getInstance();
  }
}

export default GrimpanFactory;
