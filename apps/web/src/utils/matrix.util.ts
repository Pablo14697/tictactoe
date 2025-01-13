export function createEnumeratedMatrix(size: number) {
  let counter = 0;
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => counter++),
  );
}

export function getDiagonals(arr: number[][]) {
  const mainDiagonal: number[] = [];
  const secondaryDiagonal: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    mainDiagonal.push(arr[i][i]);
    secondaryDiagonal.push(arr[i][arr.length - i - 1]);
  }

  return [mainDiagonal, secondaryDiagonal];
}

export function createWinningCombinationMatrix(size: number) {
  const matrizBySize = createEnumeratedMatrix(size);

  const winningRowCombinations = matrizBySize.map((row) => row);
  const winningColumnCombinations = matrizBySize[0].map((_, colIndex) =>
    matrizBySize.map((row) => row[colIndex]),
  );

  const winningDiagonalCombinations = getDiagonals(matrizBySize);

  return [
    ...winningRowCombinations,
    ...winningColumnCombinations,
    ...winningDiagonalCombinations,
  ];
}
