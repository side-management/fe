import { it, expect } from "vitest";

import { add } from "./example";

it("배열 안의 숫자를 모두 더함", () => {
  const result = add([1, 2, 3, 4, 5]);
  expect(result).toBe(15);
});
