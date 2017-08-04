import React from 'react';
import PropTypes from 'prop-types';
import  LiveGraph  from '../components/LiveGraph';
import { connect } from 'react-redux';
import { retrieveNewData } from '../actions/index.js';

let AppContainer = ({ updateDataFunc, info, lastUpdated }) => {
    return (
      <div>
          <input type="submit" value="Refresh" onClick={() => updateDataFunc()}/>
          <LiveGraph info={info} />
          <div>
            Last updated on: {lastUpdated}
          </div>
      </div>
    );
};

AppContainer.propTypes = {
    info: PropTypes.array,
    updateDataFunc: PropTypes.func,
    lastUpdated: PropTypes.string
};

const mapStateToProps = state => ({
    info: state.data.info,
    lastUpdated: state.data.lastUpdated.toLocaleString()
});

const mapDispatchToProps = dispatch => ({
    updateDataFunc: () => dispatch(retrieveNewData()),
});

AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppContainer);

export default AppContainer;
