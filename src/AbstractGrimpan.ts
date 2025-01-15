// 타입을 정의하는 추상 클래스
abstract class Grimpan {
  protected static instance: Grimpan;

  protected constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      throw new Error('Canvas element is required');
    }
  }

  abstract initialize(): void;
  abstract initializeMenu(): void;

  static getInstance() {}
}

export default Grimpan;
