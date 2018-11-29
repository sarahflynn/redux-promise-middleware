const promiseMiddleware = store => next => action => {
  if(!action.payload) {
    return next(action);
  }

  isPromise(next, action);

  store.dispatch({
    type: 'LOAD_START'
  });

  action.payload.then(result => {
    store.dispatch({ type: 'LOAD_END' });
    store.dispatch({ type: action.type, payload: result });
  });
};

function isPromise(next, action) {
  if(typeof action.payload.then !== 'function') {
    return next(action);
  }
}

export default promiseMiddleware;
