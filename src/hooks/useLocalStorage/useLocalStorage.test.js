import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";

import useLocalStorage from "./useLocalStorage";

describe("useLocalStorage hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("creates a new localStorage item if not present", () => {
    vi.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(
      () => null,
    );
    const setItem = vi
      .spyOn(window.localStorage.__proto__, "setItem")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("test"));
    const [value] = result.current;

    expect(setItem).toHaveBeenCalledWith("test", "null");
    expect(value).toBe(null);
  });

  it("creates a new localStorage item with given initial value", () => {
    vi.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(
      () => null,
    );
    const setItem = vi
      .spyOn(window.localStorage.__proto__, "setItem")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("test", { 1: 6 }));
    const [value] = result.current;

    expect(setItem).toHaveBeenCalledWith("test", '{"1":6}');
    expect(value).toStrictEqual({ 1: 6 });
  });

  it("reads localStorage item value if present", () => {
    vi.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(
      () => '{"2":4}',
    );

    const { result } = renderHook(() => useLocalStorage("test"));
    const [value] = result.current;

    expect(value).toStrictEqual({ 2: 4 });
  });

  it("sets previous localStorage item value even if initial value is passed", () => {
    vi.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(
      () => '{"2":4}',
    );
    const setItem = vi
      .spyOn(window.localStorage.__proto__, "setItem")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("test", { 1: 6 }));
    const [value] = result.current;

    expect(setItem).not.toHaveBeenCalledWith("test", '{"1":6}');
    expect(value).toStrictEqual({ 2: 4 });
  });

  it("updates localStorage item value", () => {
    vi.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(
      () => '{"2":4}',
    );
    const setItem = vi
      .spyOn(window.localStorage.__proto__, "setItem")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("test"));
    let [value, setValue] = result.current;

    expect(value).toStrictEqual({ 2: 4 });

    act(() => {
      setValue({ 1: 6 });
    });

    [value] = result.current;

    expect(setItem).toHaveBeenCalledWith("test", '{"1":6}');
    expect(value).toStrictEqual({ 1: 6 });
  });
});
