class Grimpan {
  private static instance: Grimpan;

  private constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      throw new Error('Canvas element is required');
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Grimpan(document.querySelector('#canvas'));
    }
    return this.instance;
  }
}

export default Grimpan;
