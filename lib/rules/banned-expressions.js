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

    if ("string" !== typeof text || 0 === bannedExpressions.length) return;

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

    errors.forEach(() => {
      context.report({ node, messageId: "banned-exp" });
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

// eslint-disable-next-line eslint-plugin/require-meta-type, eslint-plugin/require-meta-schema
const meta = {
  messages: {
    "banned-exp": "expression is not allowed",
  },
};

module.exports = { create, meta };
