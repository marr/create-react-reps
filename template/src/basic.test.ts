import { describe, expect, it } from "vite-plus/test";

function decode(plainText: string): string {
  let cnt = 1;
  let lastChar;
  let ans = [];
  for (let i = 0; i < plainText.length; i++) {
    const char = plainText[i];
    if (char === lastChar) {
      cnt++;
    } else {
      if (lastChar) {
        ans.push(`${cnt}${lastChar}`);
      }
      cnt = 1;
    }
    lastChar = char;
  }

  return ans.join("") + (lastChar ? `${cnt}${lastChar}` : "");
}

describe("decode", () => {
  it("returns decoded message", () => {
    expect(decode("")).toBe("");
    expect(decode("h")).toBe("1h");
    expect(decode("hhh")).toBe("3h");
    expect(decode("hello")).toBe("1h1e2l1o");
    expect(decode("helloo")).toBe("1h1e2l2o");
  });
});
