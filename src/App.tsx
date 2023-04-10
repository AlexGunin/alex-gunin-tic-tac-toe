import React from "react";
import { useSelector } from "react-redux";
import { FullBoardSelector, useAppDispatch } from "./store";
import { VariableSizeGrid as Grid } from "react-window";
import { useGridSize } from "./hooks/useGridSize";
import { checkIsFirstTurnRule, getCellId, getCellText } from "./store/helpers";
import { Cell } from "./components/Cell/Cell";
import { BoardInfo } from "./components/BoardInfo/BoardInfo";

const COLUMN_HEIGHT = 50;
const COLUMN_WIDTH = 50;

function App() {
  const { turn, playersCells, isFinished } = useSelector(FullBoardSelector);

  const { setHeight, setWidth, ...gridProps } = useGridSize({
    columnHeight: COLUMN_HEIGHT,
    columnWidth: COLUMN_WIDTH,
  });

  const dispatch = useAppDispatch();
  const handleClick = (row: number, col: number) => {
    if (checkIsFirstTurnRule(turn, row, col)) return;
    if (getCellText(playersCells, row, col)) return;
    if (isFinished) return;

    dispatch({
      type: "turn-action",
      payload: getCellId(row, col),
    });
  };

  return (
    <main>
      <BoardInfo />
      <Grid
        columnWidth={() => COLUMN_WIDTH}
        rowHeight={() => COLUMN_HEIGHT}
        {...gridProps}
      >
        {({ columnIndex, rowIndex, style }) => {
          return (
            <Cell
              onClick={() => handleClick(rowIndex, columnIndex)}
              style={style}
            >
              {getCellText(playersCells, rowIndex, columnIndex)}
            </Cell>
          );
        }}
      </Grid>
    </main>
  );
}

export default App;
