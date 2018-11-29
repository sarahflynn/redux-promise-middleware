const promiseMiddleware = store => next => action => {
  const { payload, type } = action;
  if(!payload) {
    return next(action);
  }

  if(isPromise(payload)) return next(action);

  store.dispatch({
    type: 'LOAD_START'
  });

  return payload
    .then(result => {
      store.dispatch({ type: 'LOAD_END' });
      store.dispatch({ type: type, payload: result });
    })
    .catch(err => {
      store.dispatch({ type: 'LOAD_END' });
      store.dispatch({ type: 'ERROR', payload: err });
    });
};

function isPromise(payload) {
  return typeof payload.then !== 'function';
}

export default promiseMiddleware;
