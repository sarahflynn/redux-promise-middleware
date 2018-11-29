import promiseMiddleware from './index';
import { createStore, applyMiddleware } from 'redux';

describe('promise middleware', () => {
  it('calls next with the dispatched action if the the action is not a promise', () => {
    const reducer = jest.fn();
    const store = createStore(reducer, applyMiddleware(promiseMiddleware));

    const next = jest.fn();

    promiseMiddleware(store)(next)({ type: 'SOME_ACTION', payload: '123' });
    expect(next.mock.calls[0][0]).toEqual({
      type: 'SOME_ACTION',
      payload: '123'
    });
  });

  it('calls LOAD_START action with dispatch if it is a promise', () => {
    const reducer = jest.fn();
    const store = createStore(reducer, applyMiddleware(promiseMiddleware));
    const action = {
      type: 'fake',
      payload: Promise.resolve(123)
    };
    const next = jest.fn();

    promiseMiddleware(store)(next)(action);
    expect(next.mock.calls).toHaveLength(0);
    expect(reducer.mock.calls[1][1]).toEqual({ type: 'LOAD_START' });
  });

  it('calls LOAD_END action with dispatch if it is a promise', () => {
    const reducer = jest.fn();
    const store = createStore(reducer, applyMiddleware(promiseMiddleware));
    const action = {
      type: 'fake',
      payload: Promise.resolve(123)
    };
    const next = jest.fn();

    promiseMiddleware(store)(next)(action);
    expect(next.mock.calls).toHaveLength(0);
    expect(reducer.mock.calls[2][1]).toEqual({ type: 'LOAD_END' });
  });

  it('calls PROMISE_ACTION action with payload of the promise result if it is a promise', () => {
    const reducer = jest.fn();
    const store = createStore(reducer, applyMiddleware(promiseMiddleware));
    const action = {
      type: 'fake',
      payload: Promise.resolve(123)
    };
    const next = jest.fn();

    promiseMiddleware(store)(next)(action);
    expect(next.mock.calls[0]).toHaveLength(0);
    expect(reducer.mock.calls[3][1]).toEqual({ type: 'fake', payload: 123 });
  });
});
