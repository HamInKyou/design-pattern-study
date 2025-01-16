import './index.css';
import GrimpanFactory, { ChromeGrimpanFactory } from './GrimpanFactory.ts';

function main(factory: GrimpanFactory) {
  const grimpan = factory.createGrimpan();
  grimpan.initialize();
  grimpan.initializeMenu();
}

main(new ChromeGrimpanFactory());
