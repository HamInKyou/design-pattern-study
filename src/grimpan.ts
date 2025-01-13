class Grimpan {
  constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      throw new Error('Canvas element is required');
    }
  }
}

export default new Grimpan(document.querySelector('#canvas'));
