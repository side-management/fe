import { useCallback, useState } from "react";

export function useCounter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

export function add(numbers: number[]) {
  let sum = 0;

  for (const number of numbers) {
    sum += number;
  }
  return sum;
}
