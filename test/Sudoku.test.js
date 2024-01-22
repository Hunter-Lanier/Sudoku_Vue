import { describe, it, expect } from "vitest";
import Sudoku from "../utils/Sudoku.js";

describe("Intialization", () => {
  // Test initializing the Sudoku board
  it("initializes with an empty board", () => {
    const sudoku = new Sudoku();
    expect(sudoku.board).toBeDefined();
    expect(sudoku.board.length).toBe(9);
    expect(sudoku.board.every((row) => row.length === 9)).toBe(true);
    expect(
      sudoku.board.every((row) => row.every((cell) => cell === null))
    ).toBe(true);
  });
});
