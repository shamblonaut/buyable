import { describe, it, expect } from "vitest";

import { getRatingArray, toTitleCase } from "../helpers";

describe("getRatingArray function", () => {
  it("gives an error if rating value is higher than 5.0", () => {
    expect(() => getRatingArray(6.4)).toThrowError("Invalid Rating");
  });

  it("produces correct result", () => {
    expect(getRatingArray(5.0)).toStrictEqual([1, 1, 1, 1, 1]);
    expect(getRatingArray(4.8)).toStrictEqual([1, 1, 1, 1, 0.8]);
    expect(getRatingArray(3.5)).toStrictEqual([1, 1, 1, 0.5, 0]);
    expect(getRatingArray(0)).toStrictEqual([0, 0, 0, 0, 0]);
  });
});

describe("toTitleCase function", () => {
  it("produces correct result", () => {
    expect(toTitleCase("he's never gonna give you up")).toBe(
      "He's Never Gonna Give You Up",
    );
  });
});
