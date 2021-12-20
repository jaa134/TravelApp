describe('RandomLanguage', () => {
  test.todo('Shows page title');

  test.todo('Shows loading indicator when languages list is loading');

  test.todo('Shows error notififcation when languages list cannot be retrieved');

  test.todo('Shows random language information when languages query resolves and before navigation');

  test.todo('Renders navigation component after desired number of seconds to navigate user to a random language url');

  // TODO - mock Math.random function using jest. Make sure
  // to wrap in try/finally and return random function to
  // its original state
  test.todo('Randomness of the selected language should not be outside the bounds of the returned languages array');
});
