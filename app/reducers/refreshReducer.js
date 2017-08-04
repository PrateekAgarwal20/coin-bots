const refreshReducer = (
  state = {
      isFetching: false,
      didInvalidate: false,
      info: [],
      lastUpdated: ''
  },
  action
) => {
    switch (action.type) {
        case 'REFRESH_ERROR':
            return Object.assign({}, state, {didInvalidate: true});
        case 'REFRESH_REQUEST':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'REFRESH_RECEIVE':
            // update only if there is a price change
            const infoUpdate = [...state.info];
            // let mostRecent = null;
            // if(state.info.length > 0) {
            //     mostRecent = state.info[state.info.length - 1];
            // }
            //
            // if(!mostRecent ||
            //     mostRecent.buyPrice.amount !== action.newInfo.buyPrice.amount ||
            //     mostRecent.sellPrice.amount !== action.newInfo.sellPrice.amount) {
                infoUpdate.push(action.newInfo);
            // }

            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                info: infoUpdate,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
};

export default refreshReducer;
