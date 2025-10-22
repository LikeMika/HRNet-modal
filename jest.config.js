/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: { "^.+\\.[jt]sx?$": "babel-jest" },
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },
  testMatch: ["**/__tests__/**/*.(test|spec).[jt]s?(x)", "**/*.(test|spec).[jt]s?(x)"],
  // Décommente si l'erreur vise un module ESM précis dans node_modules :
  // transformIgnorePatterns: ["node_modules/(?!(nom-du-module-esm-a-transpiler)/)"],
};
