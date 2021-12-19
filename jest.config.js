module.exports = {
  setupFilesAfterEnv: ["<rootDir>/test-setup.js"],
  transform: {
    "^.+\\.svg$": "svg-jest",
    "\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
}