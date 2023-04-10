import { BoardState } from "../../reducers/boardReducer";

type BoardSelector = (
  state: BoardState
) => BoardState[keyof BoardState] | BoardState;

type BoardKeySelectors = "cellsToWin" | "playersCells" | "isFinished";

export const BoardSelectors: Record<BoardKeySelectors, BoardSelector> = {
  cellsToWin: (state) => state.cellsToWin,
  playersCells: (state) => state.playersCells,
  isFinished: (state) => state.isFinished,
};

export const FullBoardSelector = (state: BoardState) => state;
