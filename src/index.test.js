import isPromise from './index';
import { createStore, applyMiddleware } from 'redux';

describe('promise middleware', () => {
  const reducer = jest.fn();
  const store = createStore(reducer, applyMiddleware(isPromise));

  const next = jest.fn();

  it('calls next with the dispatched action if the the action is not a promise', () => {
    isPromise(store)(next)({ type: 'SOME_ACTION' });

    expect(next.mock.calls[0][0]).toEqual({ type: 'SOME_ACTION' });
  });
});
