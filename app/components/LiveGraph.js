import React from 'react';
import PropTypes from 'prop-types';

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	ScatterSeries,
	SquareMarker,
	TriangleMarker,
	CircleMarker,
	LineSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";


class LiveGraph extends React.Component {
    render() {
        return (
            <div>
              <table>
                {this.props.info.map((obj) =>
                    <tr>
                      <td>
                        {obj.time}
                      </td>
                      <td>
                        {obj.buyPrice.amount}
                      </td>
                      <td>
                        {obj.sellPrice.amount}
                      </td>
                    </tr>
                )}
              </table>
            </div>
        );
    }
}


LiveGraph.propTypes = {
    info: PropTypes.array
};

export default LiveGraph;
