import css from "../../App.module.css";
import React from "react";
import { useSelector } from "react-redux";
import { FullBoardSelector } from "../../store";

export const BoardInfo = () => {
  const { turn, curPlayer, winPlayer, cellsToWin } =
    useSelector(FullBoardSelector);

  return (
    <section className={css.info}>
      <span>Cells to win: {cellsToWin}</span>
      <span>Amount turns: {turn}</span>
      <span>
        {winPlayer ? `Winner: ${winPlayer}` : `Current turn: ${curPlayer}`}
      </span>
    </section>
  );
};
