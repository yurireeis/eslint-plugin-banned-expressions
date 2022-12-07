const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/banned-expressions.js");

const settings = {
  bannedExpressions: [{ exp: "Date", suggestion: "instead of using X use Y" }],
};

const ruleTester = new RuleTester();
const ruleTesterNoBannedExpressions = new RuleTester({ settings });

ruleTester.run("banned-expressions-check", rule, {
  valid: [
    {
      code: "try { foo() } catch (e) { bar() }",
    },
    {
      code: "try { foo() } catch (e) {}",
    },
  ],
  invalid: [],
});

ruleTesterNoBannedExpressions.run("no-banned-expressions-check", rule, {
  valid: [
    {
      code: "try { foo() } catch (e) { bar() }",
    },
  ],
  invalid: [
    {
      code: "try { foo() } catch (e) {}",
      errors: [{ messageId: "emptyCatch" }],
    },
  ],
});
