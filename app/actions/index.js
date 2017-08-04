import data from '../../backend/data.js';

export function refreshRequest() {
    return {
        type: 'REFRESH_REQUEST'
    };
}

export function refreshReceive(newInfo) {
    console.log(newInfo);
    return {
        type: 'REFRESH_RECEIVE',
        newInfo,
        receivedAt: new Date(Date.now())
    };
}

export function refreshError(err) {
    return {
        type: 'REFRESH_ERROR',
        err
    };
}


// Thunk Middleware
export function retrieveNewData() {
    return function(dispatch) {
        // 'REFRESH_REQUEST' action is made, updating state isFetching
        // to true
        dispatch(refreshRequest());
        // return the promise given by data.
        return data.getInfoCB()
          .then((resp) => {
              dispatch(refreshReceive(resp));
          })
          .catch((err) => {
              dispatch(refreshError(err));
          });
    };
}
