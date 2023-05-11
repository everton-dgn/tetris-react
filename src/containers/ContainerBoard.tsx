import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import BoardContainer from '../components/BoardContainer';
import GridView from '../components/GridView';
import PieceView from '../components/PieceView';
import {
  handleCollision,
  handleFloatingsGoingDown,
  handleMatches,
  handlePieceGoingDown,
  handleResetPiece,
  handleUserInput,
} from '../handlers';
import { userController } from '../input/keyboardInput';
import { Block } from '../types';
import { BlocksState } from '../types/block';

type RootState = {
  blocks: BlocksState;
  ticks: number;
};

const mapStateToProps = (state: RootState): RootState => ({
  blocks: state.blocks,
  ticks: state.ticks,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type ContainerBoardProps = PropsFromRedux;

function ContainerBoard({ blocks, ticks, dispatch }: ContainerBoardProps) {
  useEffect(() => {
    try {
      handleMatches(blocks, ticks, dispatch);
      handleResetPiece(blocks, dispatch);
      handleFloatingsGoingDown(blocks, ticks, dispatch);
      handlePieceGoingDown(blocks, ticks, dispatch);
      handleUserInput(
        userController.current_input_x,
        userController.current_input_y,
        dispatch,
      );
    } catch (collision) {
      handleCollision(collision as Error, dispatch);
    }
  }, [ticks]);

  return (
    <BoardContainer>
      <GridView grid={blocks.limits}></GridView>

      <PieceView piece={blocks.piece} section="sides"></PieceView>
      <>
        {blocks.floating.map(
          (piece: Block, index: number): React.ReactElement => (
            <PieceView key={index} piece={piece} section="sides" />
          ),
        )}
      </>
      {/* <GridView grid={displayCurrentGrid(blocks.piece)}></GridView> isso aqui mostra grid do dados ajuda a debugar*/}
      <GridView grid={blocks.board} section="sides"></GridView>

      <PieceView piece={blocks.piece} section="front"></PieceView>
      <>
        {blocks.floating.map(
          (piece: Block, index: number): React.ReactElement => (
            <PieceView key={index} piece={piece} section="front" />
          ),
        )}
      </>
      {/* <GridView grid={displayCurrentGrid(blocks.piece)}></GridView> isso aqui mostra grid do dados ajuda a debugar*/}
      <GridView grid={blocks.board} section="front"></GridView>
    </BoardContainer>
  );
}

export default connector(ContainerBoard);
