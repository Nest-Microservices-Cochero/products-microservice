module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended', // Reglas recomendadas para TypeScript
    'plugin:prettier/recommended', // Integración de Prettier
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'], // Archivos que no deben ser analizados
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off', // No requiere prefijo en nombres de interfaces
    '@typescript-eslint/explicit-function-return-type': 'off', // No obliga a declarar tipos de retorno
    '@typescript-eslint/explicit-module-boundary-types': 'off', // No obliga a declarar tipos de retorno en exportaciones
    '@typescript-eslint/no-explicit-any': 'off', // Permite el uso de `any`
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // Soluciona errores de salto de línea (LF vs CRLF)
        singleQuote: true, // Usa comillas simples
        semi: true, // Agrega punto y coma al final de las líneas
        trailingComma: 'es5', // Coma final en objetos y arreglos
      },
    ],
    'no-console': 'warn', // Advertencia en lugar de error para `console.log`
    'no-debugger': 'warn', // Advertencia en lugar de error para `debugger`
    'no-multiple-empty-lines': ['error', { max: 1 }], // Evita múltiples líneas vacías
  },
};
