import './index.css';
import IEGrimpan from './IEGrimpan.ts';
import ChromeGrimpan from './ChromeGrimpan.ts';
import AbstractGrimpanFactory from './AbstractGrimpanFactory.ts';

class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }
}

class IEGrimpanFactory extends AbstractGrimpanFactory {
  override createGrimpan() {
    return IEGrimpan.getInstance();
  }
}

function main(factory: AbstractGrimpanFactory) {
  const grimpan = factory.createGrimpan();
  grimpan.initialize();
  grimpan.initializeMenu();
}

main(new ChromeGrimpanFactory());
