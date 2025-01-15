import Grimpan from './AbstractGrimpan.ts';

// 추상 팩토리 클래스
abstract class AbstractGrimpanFactory {
  abstract createGrimpan(): Grimpan;
}

export default AbstractGrimpanFactory;
