import {useCallback, useMemo, useState} from "react";
import {useWindowSize, WindowSize} from "./useAllWindow";
import {Position, useResizeOnScroll} from "./useResizeOnScroll";

interface UseGridSizeProps {
  columnHeight: number;
  columnWidth: number;
  defaultHeight?: number;
  defaultWidth?: number;
}

export const useGridSize = ({
                              columnHeight,
                              columnWidth,
                              defaultWidth = 100,
                              defaultHeight = 100,
                            }: UseGridSizeProps) => {
  const [height, setHeight] = useState(defaultWidth);
  const [width, setWidth] = useState(defaultHeight);

  const columnCount = useMemo(() => Math.ceil(width / columnWidth), [width]);
  const rowCount = useMemo(() => Math.ceil(height / columnHeight), [height]);

  const handleWindowSize = (size: WindowSize) => {
    if (size.height > height) setHeight(size.height);
    if (size.width > width) setWidth(size.width);
  };
  useWindowSize(handleWindowSize);

  const onScroll = useCallback(
    (position: Position) => {
      if (position.y > height)
        setHeight((prev) => prev + columnHeight);
      if (position.x > width) setWidth((prev) => prev + columnWidth);
    },
    [height, width]
  );
  useResizeOnScroll(onScroll);

  return {
    height,
    setHeight,
    width,
    setWidth,
    rowCount,
    columnCount,
  };
};
