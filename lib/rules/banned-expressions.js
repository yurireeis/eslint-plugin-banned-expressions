// TODO: change project name to eslint-plugin-banned-expressions
// TODO: improve readme (how to set settings on .eslintrc and how to activate the rule)
// TODO: improve feedback message

const create = (context) => {
  const { settings: { bannedExpressions = [] } = {} } = context;
  const hasBannedExpressions = 0 !== bannedExpressions.length;
  const { text } = context.getSourceCode();

  if (!hasBannedExpressions || !text) {
    return {};
  }

  const checkErrors = (context, node) => {
    const text = context.getSourceCode().getText(node);
    const { settings: { bannedExpressions = [] } = {} } = context;
    const hasInvalidExp = bannedExpressions.some(
      ({ exp, suggestion, value }) => !exp || !suggestion || !value
    );

    if (
      "string" !== typeof text ||
      0 === bannedExpressions.length ||
      hasInvalidExp
    )
      return;

    const errors = bannedExpressions
      .reduce((acc, current) => {
        const value = acc.find(({ exp }) => exp === current.exp);
        if (!value) {
          acc = [...acc, current];
        }
        return acc;
      }, [])
      .filter(({ exp }) => {
        const regex = new RegExp(exp);
        return regex.test(text);
      });

    if (0 === errors.length) {
      return;
    }

    errors.forEach(({ value, suggestion }) => {
      context.report({
        node,
        messageId: "banned-exp",
        data: { value, suggestion },
      });
    });
  };

  return {
    VariableDeclarator(node) {
      checkErrors(context, node);
    },
    ExpressionStatement(node) {
      checkErrors(context, node);
    },
    FunctionDeclaration(node) {
      checkErrors(context, node);
    },
  };
};

const meta = {
  messages: {
    "banned-exp":
      "banned expression: '{{ value }}' - suggestion: '{{ suggestion }}'",
  },
};

module.exports = { create, meta };
