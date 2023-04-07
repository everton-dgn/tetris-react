import { useAnimationControls } from 'framer-motion';
import { Dispatch, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import BoardContainer from '../components/BoardContainer';
import GridView from '../components/GridView';
import PieceView from '../components/PieceView';
import { displayCurrentGrid, isEmptyPiece } from '../controller';
// import { keyboardInput, userController } from '../input/keyboardInput';
import { Block, Grid } from '../types';

type ContainerBoardProps = {
  piece: Block;
  board: Grid;
  limits: Grid;
  dispatch: Dispatch<any>;
};

import {
  handleCollision,
  handlePieceGoingDown,
  handleResetPiece,
  handleUserInput,
} from '../handlers';
import { userController } from '../input/keyboardInput';

function ContainerBoard({ blocks, ticks, dispatch }: ContainerBoardProps) {
  useEffect(() => {
    try {
      handleResetPiece(blocks, dispatch);
      handlePieceGoingDown(ticks, dispatch);
      handleUserInput(
        userController.current_input_x,
        userController.current_input_y,
        dispatch,
      );
    } catch (error) {
      handleCollision(error as Error, dispatch);
    }
  }, [ticks]);

  return (
    <BoardContainer>
      <PieceView piece={blocks.piece}></PieceView>
      {/* <GridView grid={displayCurrentGrid(blocks.piece)}></GridView> isso aqui mostra grid do dados ajuda a debugar*/}
      <GridView grid={blocks.board}></GridView>
      <GridView grid={blocks.limits}></GridView>
    </BoardContainer>
  );
}
const mapStateToProps = (state) => ({
  blocks: state.blocks,
  ticks: state.ticks,
});

export default connect(mapStateToProps)(ContainerBoard);
