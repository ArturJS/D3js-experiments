import React, {Component} from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import * as d3 from "d3";

const width = 500;
const height = 300;

const widthScale = d3.scaleLinear()
  .domain([0, 60])
  .range([0, width]);

const colorScale = d3.scaleLinear()
  .domain([0, 60])
  .range(['#F00', '#0F0']);

const axisX = d3.axisBottom()
  .ticks(10)
  .scale(widthScale);


function initBarChart(componentId, data) {
  const svgElement =  d3.select(`.${componentId} svg`)
    .style('overflow', 'visible')
    .attr('width', width)
    .attr('height', height);

  svgElement
    .append('g')
    .attr('transform', 'translate(0, ' + 70 * data.length + ')')
    .call(axisX);

  return svgElement;
}

function renderBarChart(svgElement, data) {
  let selectionRects = svgElement.selectAll('rect').data(data);
  let enteringRects = selectionRects.enter();

  processData(selectionRects);

  processData(
    enteringRects.append('rect')
  );

  selectionRects.exit().remove();
}

function processData(selection) {
  selection
    .attr('height', 50)
    .attr('y', function (d, index) {
      return index * 70;
    })
    .transition()
    .duration(1000)
    .attr('fill', function (d) {
      return colorScale(d);
    })
    .attr('width', function (d) {
      return widthScale(d);
    });
}

function getRandomArray(length, start, end) {
  let arr = [];

  _.times(length, () => arr.push(_.random(start, end)));

  return arr;
}

export default class FirstBarChart extends Component {
  componentWillMount() {
    this.componentId = _.uniqueId('componentId');
  }

  componentDidMount() {
    const svgElement = initBarChart(this.componentId, getRandomArray(4, 1, 60));

    renderBarChart(
      svgElement,
      getRandomArray(4, 1, 60)
    );

    this.intervalId = setInterval(() => {
      renderBarChart(
        svgElement,
        getRandomArray(4, 1, 60)
      );
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className={classNames('first-bar-chart', this.componentId)}>
        <svg/>
      </div>
    );
  }
}
