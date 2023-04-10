import { PlayersCells } from "../reducers/boardReducer";

export const getCellId = (row: number, col: number) => `${row}-${col}`;

export const getCellCoordsFromId = (
  cellId: string
): [Row: number, Col: number] =>
  cellId.split("-").map(Number) as [number, number];

export const checkIsFirstTurnRule = (turn: number, row: number, col: number) =>
  turn === 0 && (row !== 0 || col !== 0);

export const getCellText = (
  playersCells: PlayersCells,
  row: number,
  col: number
) => {
  const { X, O } = playersCells;

  if (X.has(getCellId(row, col))) return "X";
  if (O.has(getCellId(row, col))) return "O";

  return null;
};

export const getRange = (start: number, end: number) =>
  Array(end - start)
    .fill(null)
    .map((_, index) => end - index - 1);

export const getCellsToWin = () =>
  Number(process.env.REACT_APP_CELLS_TO_WIN) || 3;
