const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/banned-expressions.js");

const settings = {
  bannedExpressions: [
    {
      value: ".forEach",
      exp: ".forEach",
      suggestion: "use map instead of forEach",
    },
    {
      value: "Date",
      exp: "new Date((.{0,}))",
      suggestion: "use map instead of forEach",
    },
  ],
};

const parserOptions = {
  ecmaVersion: 2015,
};

const ruleTester = new RuleTester({ settings, parserOptions });
const ruleTesterNoBannedExpression = new RuleTester({ parserOptions });

ruleTester.run("no-banned-expressions-check", rule, {
  valid: [
    {
      code: "// for each of us",
    },
    {
      code: "// today is a new date",
    },

    {
      code: "// avoid using .forEach",
    },
    {
      code: "// avoid using new Date()",
    },
  ],
  invalid: [
    {
      code: "new Date()",
      errors: [{ messageId: "banned-exp" }],
    },
    {
      code: "array.forEach",
      errors: [{ messageId: "banned-exp" }],
    },
  ],
});

ruleTesterNoBannedExpression.run("banned-expressions-check", rule, {
  valid: [
    {
      code: "new Date()",
    },
    {
      code: "array.forEach",
    },
  ],
  invalid: [],
});
