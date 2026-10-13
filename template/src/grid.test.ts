import { describe, it, expect } from "vite-plus/test";

function createGrid(size: number): number[][] {
  if (size <= 0) {
    throw new Error("Grid size must be greater than 0");
  }
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function testGrid(sudoku: string[][]): boolean {
  const set = new Set<string>();
  for (let i = 0; i < sudoku.length; i++) {
    for (let j = 0; j < sudoku[i].length; j++) {
      const value = sudoku[i][j];
      if (value === ".") continue;
      const row = `r${i}-${value}`;
      const col = `c${j}-${value}`;
      const boxNumber = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      const box = `b${boxNumber}-${value}`;
      if (set.has(row) || set.has(col) || set.has(box)) {
        return false;
      }
      set.add(row);
      set.add(col);
      set.add(box);
    }
  }
  return true;
}

const invalidGrid = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const validGrid = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

describe("grid", () => {
  it("returns early for invalid grid size", () => {
    expect(() => {
      createGrid(-1);
    }).toThrow();
  });

  it("returns false for invalid grid", () => {
    expect(testGrid(invalidGrid)).toBe(false);
  });
  it("returns true for valid grid", () => {
    expect(testGrid(validGrid)).toBe(true);
  });
});
