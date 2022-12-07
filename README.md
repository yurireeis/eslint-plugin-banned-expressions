# eslint-plugin-banned-expressions

Set your regex expression to ban some undesired keyword and give a suggestion to replace

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-banned-expressions`:

```sh
npm install eslint-plugin-banned-expressions --save-dev
```

## Usage

Add `banned-expressions` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "banned-expressions"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "banned-expressions/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


