import './index.css';
import GrimpanFactory, { ChromeGrimpanFactory } from './GrimpanFactory.ts';

function main(factory: GrimpanFactory) {
  const grimpan = factory.createGrimpan();
  const grimpanMenu = factory.createGrimpanMenu(grimpan);
  const grimpanHistory = factory.createGrimpanHistory(grimpan);
  grimpan.initialize();
  grimpanMenu.initialize();
  grimpanHistory.initialize();
}

main(new ChromeGrimpanFactory());
