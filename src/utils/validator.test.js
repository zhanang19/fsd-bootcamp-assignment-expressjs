const { isValidEmail } = require("./validator");

test("it can validate valid email address", function () {
  expect(isValidEmail("email@example.com")).toBe(true);
});

test("it can validate invalid email address", () => {
  expect(isValidEmail("email@example")).toBe(false);
});
