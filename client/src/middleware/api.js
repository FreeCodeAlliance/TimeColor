export const CALL_API = 'Call JQ API';

export default () => next => (action) => {
  const API = action[CALL_API];
  if (typeof API === 'undefined') {
    return next(action);
  }
  //console.log(action[CALL_API]);
  const { types, url, method, body } = action[CALL_API];
  const [requestType, successType, failureType] = types;

  next(Object.assign({}, action, {
    type: requestType
  }));

  let headers={
    "X-Authenticated-Userid": 1 //fixme: testCode
  };
  const withBody = method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT';
  fetch(url, {
      method,
      headers,
      body: withBody ? body: null,
  }).then(res => res.json())
    .then( (response)=> {
      console.log("successType", successType);
      return next(Object.assign({}, action, {
        response,
        type: successType
      }));
    }).catch((error) => {
      console.log(error);
      return next(Object.assign({}, action, {
        type: failureType,
        code: error.code || 'system.exception',
        error: error.message || 'unknown_error',
      }));
  });



  /*
  const { types, endpoint, method, body } = action[CALL_API];
  const withBody = method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT';
  const bodyTmp = body || {};
  if (!withBody) {
    bodyTmp.timeState = new Date().getTime();
  }
  let { isRequireAuth } = action[CALL_API];
  const [requestType, successType, failureType] = types;
  next(assign({}, action, {
    type: requestType,
  }));
  if (typeof isRequireAuth === 'undefined') {
    isRequireAuth = true;
  }
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const bodyString = withBody
    ? JSON.stringify(body)
    : null;
  const queryString = withBody
    ? ''
    : buildQueryString(bodyTmp);

  let promise = global.Promise.resolve(defaultHeaders);
  if (isRequireAuth) {
    promise = storage.load({
        key: 'refreshToken',
      })
      .then(refreshToken => storage.load({
        key: 'accessToken',
        syncInBackground: false,
        syncParams: {
          refreshToken,
        },
      }))
      .then((accessToken) => {
        if (!accessToken) {
          return next(assign({}, action, {
            type: failureType,
            code: 'token.timeout',
            error: '登录超时',
          }));
        }
        defaultHeaders.Authorization = `Bearer ${accessToken}`;
        return defaultHeaders;
      });
  }
  return promise
    .then((headers) => {
      return global.fetch(API_ROOT + endpoint + queryString, {
        method,
        headers,
        body: bodyString,
      });
    })
    .then(response => response.text().then((text) => {
      //saveLog(endpoint, queryString, bodyString, text);
      try {
        const json = JSON.parse(text);
        return { json, response };
      } catch (e) {
        return {
          json: text,
          response,
        };
      }
    }))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(response => next(assign({}, action, {
      response,
      type: successType,
    })))
    .catch((error) => {
      console.log(endpoint, queryString, bodyString, error);
      return next(assign({}, action, {
        type: failureType,
        code: error.code || 'system.exception',
        error: error.message || 'unknown_error',
      }));
    });
  */
};