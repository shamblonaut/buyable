import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import useFetch from "./useFetch";

const successfulResponse = {
  ok: true,
  status: 200,
  json: () => Promise.resolve({ data: "Mock Data" }),
};
const notFoundResponse = {
  ok: false,
  status: 404,
  statusText: "Resource not found",
};

window.fetch = vi.fn();

describe("useFetch hook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("sets correct data for successful response", async () => {
    window.fetch = vi.fn(() => Promise.resolve(successfulResponse));

    const { result } = renderHook(() => useFetch("http://api.example.com"));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toStrictEqual({ data: "Mock Data" });
    expect(result.current.error).toBe(null);
  });

  it("sets correct data for not found response", async () => {
    window.fetch = vi.fn(() => Promise.resolve(notFoundResponse));

    const { result } = renderHook(() => useFetch("http://api.example.com"));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toStrictEqual(
      new Error("Error 404: Resource not found"),
    );
  });
});
