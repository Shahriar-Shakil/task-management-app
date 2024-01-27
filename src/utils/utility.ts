import { Router } from "next/router";

export function extractFirstLetters(name: string): string {
  const words: string[] = name?.split(" ");

  const firstLetters: string[] = words.map((word) =>
    word.charAt(0).toUpperCase()
  );

  const result: string = firstLetters.join("");

  return result;
}
