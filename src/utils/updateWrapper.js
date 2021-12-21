import { act } from 'react-dom/test-utils';

/**
 * updateWrapper is used to wait for the next process tick to wait for
 * async operations, such as Apollo queries or mutations to resolve and
 * then will update your enzyme ReactWrapper that you pass to is. You will
 * most likely need to call this after mounting a component that uses an apollo
 * operation or after simulating a user event, such as a click. If you see a warning
 * similar to `Warning: An update to Query inside a test was not wrapped in act(...).`
 * you most likely need to add a call to this function somewhere in your tests.
 *
 * this one function replaces the two lines:
 * ```
 * await waitForData()
 * wrapper.update()
 * ```
 */
const updateWrapper = async (wrapper, time = 0) => {
  await act(async () => {
    await new Promise((resolve) => { setTimeout(resolve, time); });
    wrapper.update();
  });
};

export default updateWrapper;
