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

//만약에 safari 브라우저가 추가된다면?
//기존코드를 건드리지 않고 SafariFactory를 추가하면 된다.
function main() {
  const grimpan = new ChromeGrimpanFactory().createGrimpan();
  grimpan.initialize();
  grimpan.initializeMenu();
}
