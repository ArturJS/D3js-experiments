import React, {Component} from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import * as d3 from "d3";

const width = 500;
const height = 450;


function initBarChart(componentId) {
  const svgElement =  d3.select(`.${componentId} svg`)
    .style('overflow', 'visible')
    .attr('width', width)
    .attr('height', height);

  return svgElement;
}

function renderBarChart(svgElement, data) {
  let selection = svgElement.selectAll('circle').data(data);
  let entering = selection.enter();

  processData(selection);

  processData(
    entering.append('circle')
  );

  selection.exit().remove();
}

function processData(selection) {
  selection
    .transition()
    .duration(1500)
    .ease(d3.easeElastic)
    .attr('cx', function (d) {
      return d.x;
    })
    .attr('cy', function (d) {
      return d.y;
    })
    .attr('r', function (d) {
      return Math.abs(d.r) + 5;
    })
    .attr('fill', function (d) {
      return d.fill;
    });
}

function getRandomHEX() {
  return '#' + ((1 << 24) * Math.random() | 0).toString(16);
}

function getRandomArray(length) {
  let arr = [];

  _.times(length, () => arr.push({
    x: _.random(50, 400),
    y: _.random(50, 400),
    r: _.random(10, 50),
    fill: getRandomHEX()
  }));

  return arr;
}

export default class SimpleDataBinding extends Component {
  componentWillMount() {
    this.componentId = _.uniqueId('componentId');
  }

  componentDidMount() {
    const svgElement = initBarChart(this.componentId);

    renderBarChart(
      svgElement,
      getRandomArray(_.random(1, 10))
    );

    this.intervalId = setInterval(() => {
      renderBarChart(
        svgElement,
        getRandomArray(_.random(1, 10))
      );
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className={classNames('simple-data-binging', this.componentId)}>
        <svg/>
      </div>
    );
  }
}
