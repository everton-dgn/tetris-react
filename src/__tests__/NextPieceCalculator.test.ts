import { EMPTY_GRID, PIECE_A_GRIDS, PIECE_B_GRIDS, PIECE_D_GRIDS } from '../constants';
import { wrap, wrapGrid } from '../controller';
import { getMaxY, getPossiveisX } from '../factories/NextPieceCalculator';
import { createPiece } from '../factories/PieceFactory';

test('calcula x possíveis adequadamente da peça z', () => {
  const piece_grids = PIECE_A_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, 6, 8)));
  const x_possiveis = getPossiveisX(piece);
  expect(x_possiveis).toEqual([-1, 0, 1, 2]);
});

test('calcula x possíveis adequadamente da peça l', () => {
  const piece_grids = PIECE_D_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, 6, 8)));
  const x_possiveis = getPossiveisX({ ...piece, rotations: 1 });
  expect(x_possiveis).toEqual([-1, 0, 1]);
});

test('calcula max y para peça L e tabuleiro vazio', () => {
  const width = 6;
  const height = 6;

  const piece_grids = PIECE_B_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, width, height)));
  const board = wrapGrid(EMPTY_GRID(), width, height);

  const max_y = getMaxY(piece, board);
  expect(max_y).toEqual(3);
});

test('calcula max y para peça z num tabuleiro exato', () => {
  const width = 6;
  const height = 6;

  const piece_grids = PIECE_A_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, width, height)));
  const b = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
  ];
  const board = wrapGrid(b, width, height);

  piece.rotations = 1;
  const max_y = getMaxY(piece, board);
  expect(max_y).toEqual(2);
});
