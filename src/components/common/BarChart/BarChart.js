import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import * as d3 from 'd3';

export default class BarChart extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string),
      dataset: PropTypes.shape({
        backgroundColor: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number)
      })
    }).isRequired
  };

  componentDidMount() {
    this.initBarChart();
  }

  componentDidUpdate() {
    this.updateBarChart()
  }

  initBarChart() {
    const {svgElement} = this;
    const {height} = this.props;

    svgElement.style('overflow', 'visible');

    svgElement
      .append('g')
      .attr('class', 'bar-chart__y-axis')
      .call(this.getYAxis());

    svgElement
      .append('g')
      .attr('class', 'bar-chart__datasets')
      .attr('transform', `translate(0, ${height}) scale(1, -1)`);

    this.updateBarChart();
  }

  updateBarChart() {
    let {data} = this.props.data.dataset;
    const barChartGroup = this.svgElement.selectAll('.bar-chart__datasets');

    let selectionRects = barChartGroup.selectAll('g.bar-chart__rect').data(data);
    let enteringRects = selectionRects.enter();

    this.applyData(selectionRects);

    this.applyData(
      enteringRects
        .append('g')
        .attr('class', 'bar-chart__rect'),
      true
    );

    selectionRects.exit().remove();

    // update yAxis
    this.svgElement
      .select('.bar-chart__y-axis')
      .transition()
      .duration(1000)
      .call(this.getYAxis());
  }

  applyData(selection, isEntering) {
    let rectEl = selection.select('rect');
    let textEl = selection.select('text');
    let {backgroundColor} = this.props.data.dataset;

    if (isEntering) {
      rectEl = selection.append('rect');
      textEl = selection.append('text');
    }

    rectEl
      .attr('width', 50)
      .attr('x', (d, index) => {
        return index * 60 + 10;
      })
      .attr('fill', backgroundColor)
      .transition()
      .duration(1000)
      .attr('height', (d) => {
        return this.props.height - this.getHeightScale()(d);
      });

    textEl
      .attr('text-anchor', 'middle')
      .attr('x', (d, index) => {
        return index * 60 + 35;
      })
      .attr('fill', 'red')
      .attr('transform', 'scale(1, -1)')
      .transition()
      .duration(1000)
      .attr('y', (d, index) => {
        return this.getHeightScale()(d) - this.props.height;
      })
      .tween('text', function (d) {
        let _thisEl = d3.select(this);
        let interpolate = d3.interpolate(+_thisEl.text(), d);
        return (t) => {
          _thisEl
            .text(
              Math.round(interpolate(t))
            );
        };
      });
  }

  getYAxis() {
    return d3.axisLeft(this.props.height)
      .ticks(10)
      .scale(this.getHeightScale())
  }

  getHeightScale() {
    const {
      height,
      data
    } = this.props;

    const upperBound = this.getDataMax(data);

    return d3.scaleLinear()
      .domain([upperBound, 0])
      .range([0, height]);
  }

  getDataMax = _.flow([
    ({dataset}) => dataset.data,
    _.flatten,
    _.max
  ]);

  render() {
    const {
      width,
      height,
      className
    } = this.props;

    return (
      <svg
        className={classNames('bar-chart', {[className]: !!className})}
        ref={node => this.svgElement = d3.select(node)}
        width={width}
        height={height}
      />
    );
  }
}
