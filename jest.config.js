module.exports = {
  preset: "react-native-web",
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  testEnvironment: "node",
  transformIgnorePatterns: [
    "./node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)",
  ],
};