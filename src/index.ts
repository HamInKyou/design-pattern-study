import './index.css';

let instance: Grimpan;

class Grimpan {
  constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      throw new Error('Canvas element is required');
    }
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

const g1 = new Grimpan(document.querySelector('#canvas'));
const g2 = new Grimpan(document.querySelector('#canvas'));
console.log(g1 === g2);
