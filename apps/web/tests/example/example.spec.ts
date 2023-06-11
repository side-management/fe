import { it, expect, describe } from "vitest";
import { act, renderHook } from "@testing-library/react-hooks";

import { add, useCounter } from "./example";

describe("add", () => {
  it("배열 안의 숫자를 모두 더함", () => {
    const result = add([1, 2, 3, 4, 5]);
    expect(result).toBe(15);
  });
});

describe("useCounter", () => {
  it("should increment counter", () => {
    const { result } = renderHook(() => useCounter());
    console.log(result);
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
