const isPromise = store => next => action => {
  if(typeof action.then !== 'function') {
    return next(action);
  }

  store.dispatch({
    type: 'LOAD_START'
  });

  Promise.resolve(action).then(store.dispatch({
    type: 'LOAD_END'
  }));
};

export default isPromise;
