module.exports = {
  transform: {
    "^.+\\.svg$": "svg-jest",
    "\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
}