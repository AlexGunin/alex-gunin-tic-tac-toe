import { getCellCoordsFromId, getCellsToWin } from "../helpers";
import { TicTacToe } from "../../services/TicTacToe";

export interface BoardState {
  turn: number;
  curPlayer: keyof Players;
  cellsToWin: number;
  isFinished: boolean;
  winPlayer: keyof Players | null;
  playersCells: PlayersCells;
  rightEdge: number;
  bottomEdge: number;
  boardController: TicTacToe;
}

interface Players {
  X: "X";
  O: "O";
}

export type PlayersCells = Record<keyof Players, Set<CellId>>;

export type CellId = string;

const PLAYERS: Players = {
  X: "X",
  O: "O",
};

const INITIAL_STATE: BoardState = {
  playersCells: {
    [PLAYERS.X]: new Set(),
    [PLAYERS.O]: new Set(),
  },
  turn: 0,
  curPlayer: PLAYERS.X,
  cellsToWin: getCellsToWin(),
  isFinished: false,
  winPlayer: null,
  rightEdge: getCellsToWin() - 1,
  bottomEdge: getCellsToWin() - 1,
  boardController: new TicTacToe(getCellsToWin()),
};

interface TurnAction {
  type: "turn-action";
  payload: CellId;
}

type Action = TurnAction;

export const boardReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case "turn-action": {
      const nextTurn = state.curPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
      const playerCells = new Set(state.playersCells[state.curPlayer]).add(
        action.payload
      );
      const playersCells = {
        ...state.playersCells,
        [state.curPlayer]: playerCells,
      };
      const [cellRow, cellCol] = getCellCoordsFromId(action.payload);
      const bottomEdge = Math.max(state.bottomEdge, cellRow);
      const rightEdge = Math.max(state.rightEdge, cellCol);
      const winPlayer = state.boardController.checkFinish(
        bottomEdge,
        rightEdge,
        playerCells
      )
        ? state.curPlayer
        : null;

      return {
        ...state,
        playersCells,
        curPlayer: nextTurn,
        turn: state.turn + 1,
        isFinished: !!winPlayer,
        winPlayer,
        bottomEdge,
        rightEdge,
      };
    }
    default:
      return state;
  }
};
