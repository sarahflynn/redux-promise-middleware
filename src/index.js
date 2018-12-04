const promiseMiddleware = ({ dispatch }) => next => action => {
  const { payload, type } = action;
  
  if(!payload || isPromise(payload)){
    return next(action);
  }

  dispatch({
    type: 'LOAD_START'
  });

  return payload
    .then(result => {
      dispatch({ type: type, payload: result });
      dispatch({ type: 'LOAD_END' });
    })
    .catch(err => {
      dispatch({ type: 'LOAD_END' });
      dispatch({ type: 'ERROR', payload: err });
    });
};

function isPromise(payload) {
  return typeof payload.then !== 'function';
}

export default promiseMiddleware;
