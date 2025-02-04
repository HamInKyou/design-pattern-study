import { GrimpanHistory } from '../GrimpanHistory.ts';
import { Grimpan } from '../Grimpan.ts';

export abstract class Command {
  abstract execute(): void;
}

export class BackCommand extends Command {
  public name = 'back';
  private history: GrimpanHistory;

  constructor(history: GrimpanHistory) {
    super();
    this.history = history;
  }

  override execute() {
    this.history.undo();
  }
}

export class ForwardCommand extends Command {
  public name = 'forward';
  private history: GrimpanHistory;

  constructor(history: GrimpanHistory) {
    super();
    this.history = history;
  }

  override execute() {
    this.history.redo();
  }
}

export class PenSelectCommand extends Command {
  public name = 'penSelect';
  private grimpan: Grimpan;

  constructor(grimpan: Grimpan) {
    super();
    this.grimpan = grimpan;
  }

  override execute() {
    this.grimpan.menu.setActiveBtn('pen');
  }
}

export class EraserSelectCommand extends Command {
  public name = 'eraserSelect';
  private grimpan: Grimpan;

  constructor(grimpan: Grimpan) {
    super();
    this.grimpan = grimpan;
  }

  override execute() {
    this.grimpan.menu.setActiveBtn('eraser');
  }
}

export class CircleSelectCommand extends Command {
  public name = 'circleSelect';
  private grimpan: Grimpan;

  constructor(grimpan: Grimpan) {
    super();
    this.grimpan = grimpan;
  }

  override execute() {
    this.grimpan.menu.setActiveBtn('circle');
  }
}

export class RectangleSelectCommand extends Command {
  public name = 'rectangleSelect';
  private grimpan: Grimpan;

  constructor(grimpan: Grimpan) {
    super();
    this.grimpan = grimpan;
  }

  override execute() {
    this.grimpan.menu.setActiveBtn('rectangle');
  }
}

export class PipetteSelectCommand extends Command {
  public name = 'pipetteSelect';
  private grimpan: Grimpan;

  constructor(grimpan: Grimpan) {
    super();
    this.grimpan = grimpan;
  }

  override execute() {
    this.grimpan.menu.setActiveBtn('pipette');
  }
}

export class SaveCommand extends Command {
  public name = 'save';
  private grimpan: Grimpan;

  constructor(grimpan: Grimpan) {
    super();
    this.grimpan = grimpan;
  }

  override execute() {
    this.grimpan.saveStrategy();
  }
}

export class SaveHistoryCommand extends Command {
  name = 'saveHistory';
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute(): void {
    // 그리기 끝난 후 현재 상태 저장
    this.grimpan.history.saveHistory();
  }
}
