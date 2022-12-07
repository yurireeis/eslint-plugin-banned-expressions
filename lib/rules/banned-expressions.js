const create = (context) => {
  const { settings: { bannedExpressions = [] } = {} } = context;
  const hasBannedExpressions = 0 !== bannedExpressions.length

  return {
    CatchClause(node) {
      if (hasBannedExpressions && node.body.body.length === 0) {
        context.report({ node: node.body, messageId: "emptyCatch" });
      }
    },
  };
};

// eslint-disable-next-line eslint-plugin/require-meta-type, eslint-plugin/require-meta-schema
const meta = {
  messages: {
    emptyCatch: "empty catch is not allowed",
  },
};

module.exports = { create, meta };
