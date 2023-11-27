import { buildRegexFromPath } from "../services/utils";

test("buildRegexFromPath", () => {
  const regex = buildRegexFromPath("/hello/:name");
  const expectedRegex = /^(\/hello\/(?<name>[^/]+))$/i;
  expect(regex).toEqual(expectedRegex);
  expect("/hello/world").toMatch(regex);
  expect("/hello/world/nested").not.toMatch(regex);
  expect("/hello/world".match(regex)?.groups).toEqual({
    name: "world",
  });
});
