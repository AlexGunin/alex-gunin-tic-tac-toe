import {CellId} from "../store/reducers/boardReducer";
import {getCellId, getRange} from "../store/helpers";

export class TicTacToe {
  private _cellsToWin = 3;

  constructor(cellsToWin: number) {
    this._cellsToWin = cellsToWin;
  }

  public get cellsToWin() {
    return this._cellsToWin;
  }

  public set cellsToWin(value) {
    this._cellsToWin = value;
  }

  private getSquareId = (bottomEdge: number, rightEdge: number) =>
    `${bottomEdge}-${rightEdge}`;

  private cacheSquares = new Map();

  public findSquares = (bottomEdge: number, rightEdge: number) => {
    const id = this.getSquareId(bottomEdge, rightEdge);
    const cached = this.cacheSquares.get(id);
    if (cached) return cached;
    const result = [];
    let row = 0;
    let col = 0;

    while (row + this._cellsToWin <= bottomEdge + 1) {
      if (col + this._cellsToWin > rightEdge + 1) {
        row++;
        col = 0;
        continue;
      }

      result.push(this.getSquareId(row, col));
      col++;
    }

    this.cacheSquares.set(id, result);
    return result;
  };

  public getSquareById = (squareId: string): [Row: number, Col: number] =>
    squareId.split("-").map(Number) as [number, number];

  public checkLeftDiagonal = (squareId: string, playerCells: Set<CellId>) => {
    const [row, col] = this.getSquareById(squareId);

    let result = true;
    for (let i = 0; i < this._cellsToWin; i++) {
      result = playerCells.has(getCellId(row + i, col + i));
      if (!result) break;
    }

    return result;
  };

  public checkRightDiagonal = (squareId: string, playerCells: Set<CellId>) => {
    const [row, col] = this.getSquareById(squareId);

    let result = true;
    for (let i = 0; i < this._cellsToWin; i++) {
      result = playerCells.has(getCellId(row + i, col + this._cellsToWin - i));
      if (!result) break;
    }

    return result;
  };

  public checkCols = (squareId: string, playerCells: Set<CellId>) => {
    const [row, col] = this.getSquareById(squareId);

    let result = false;
    for (let i = 0; i < this._cellsToWin; i++) {
      const range = getRange(col, col + this._cellsToWin);

      result = range.every((colValue) => {
        return playerCells.has(getCellId(row + i, colValue));
      });
      if (result) break;
    }

    return result;
  };

  public checkRows = (squareId: string, playerCells: Set<CellId>) => {
    const [row, col] = this.getSquareById(squareId);

    let result = false;
    for (let i = 0; i < this._cellsToWin; i++) {
      result = getRange(row, row + this._cellsToWin).every((rowValue) =>
        playerCells.has(getCellId(rowValue, col + i))
      );
      if (result) break;
    }

    return result;
  };

  public checkFinish = (
    bottomEdge: number,
    rightEdge: number,
    playerCells: Set<CellId>
  ) => {
    const squares = this.findSquares(bottomEdge, rightEdge);
    const checkers = [
      this.checkLeftDiagonal,
      this.checkRightDiagonal,
      this.checkCols,
      this.checkRows,
    ];

    let result = false;

    for (const square of squares) {
      result = checkers.some((checker) => checker(square, playerCells));
      if (result) break;
    }

    return result;
  };
}
