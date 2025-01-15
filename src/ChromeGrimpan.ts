class ChromeGrimpan {
  private static instance: ChromeGrimpan;

  private constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      throw new Error('Canvas element is required');
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas'));
    }
    return this.instance;
  }

  initialize() {}
}

export default ChromeGrimpan;
