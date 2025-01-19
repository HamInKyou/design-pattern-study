import './index.css';
import GrimpanFactory, { ChromeGrimpanFactory } from './GrimpanFactory.ts';

function main(factory: GrimpanFactory) {
  const grimpan = factory.createGrimpan();
  grimpan.initialize({ menu: ['back', 'forward', 'color', 'pipette', 'pen', 'circle', 'rectangle', 'eraser', 'save'] });
}

main(new ChromeGrimpanFactory());
