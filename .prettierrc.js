module.exports = {
    $schema: "http://json.schemastore.org/prettierrc",
    trailingComma: "all",
    tabWidth: 4,
    singleQuote: false,
    quoteProps: "consistent",
    printWidth: 140,
    semi: true,
    overrides: [
        {
            files: "src/**/*.ts",
            options: {
                parser: "typescript",
            },
        },
    ],
};
