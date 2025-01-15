import './index.css';
import IEGrimpan from './IEGrimpan.ts';
import ChromeGrimpan from './ChromeGrimpan.ts';

function grimpanFactory(type: string) {
  if (type === 'ie') {
    return IEGrimpan.getInstance();
  } else if (type === 'chrome') {
    return ChromeGrimpan.getInstance();
  } else {
    throw new Error('Invalid type');
  }
}

function main() {
  const grimpan = grimpanFactory('chrome');
  grimpan.initialize();
}
