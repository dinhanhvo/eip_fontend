export class Position {
  public static TOP: string = 'TOP';
  public static BOTTOM: string = 'BOTTOM';
  public static LEFT: string = 'LEFT';
  public static RIGHT: string = 'RIGHT';
  public static TOP_OR_LEFT: string = 'TOP_OR_LEFT';
  public static BOTTOM_OR_RIGHT: string = 'BOTTOM_OR_RIGHT';

  public static isLeft(pos: string) {
    return Position.LEFT == pos;
  }

  public static isRight(pos: string) {
    return Position.RIGHT == pos;
  }
}
