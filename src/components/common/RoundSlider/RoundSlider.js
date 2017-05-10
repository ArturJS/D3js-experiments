import React, {Component} from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import * as d3 from "d3";
import './RoundSlider.scss';

const width = 500;
const height = 300;
const radius = 100;

function initRoundSlider(componentId) {
  let container = d3.select(`.${componentId} svg`)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  container.append('circle')
    .attr('fill', '#ffffff')
    .attr('stroke', '#000000')
    .attr('r', radius)
    .attr('class', 'circumference');

  return container;
}

function getCircle(svgElement, handle) {
  return svgElement.append("g")
    .attr("class", "dot")
    .selectAll('circle')
    .data(handle)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    })
    .call(getDragHandler());
}

function getDragHandler() {
  return d3.drag()
    .subject(function (d) {
      return d;
    })
    .on("start", dragStart)
    .on("drag", drag)
    .on("end", dragEnd);

  function dragStart(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this)
      .classed("dragging", true);
  }

  function drag(d) {
    let x = d3.event.x;
    let y = d3.event.y;
    let d_from_origin = Math.sqrt(x * x + y * y);

    let alpha = Math.acos(x / d_from_origin); // value from 0 to 3,14

    d3.select(this)
      .attr("cx", d.x = radius * Math.cos(alpha))
      .attr("cy", d.y = y < 0 ? -radius * Math.sin(alpha) : radius * Math.sin(alpha));
  }

  function dragEnd(d) {
    d3.select(this)
      .classed("dragging", false);
  }
}

export default class RoundSlider extends Component {
  componentWillMount() {
    this.componentId = _.uniqueId('componentId');
  }

  componentDidMount() {
    const svgElement = initRoundSlider(this.componentId);

    getCircle(svgElement, [{
      x: -radius,
      y: 0
    }]);
  }

  render() {
    return (
      <div className={classNames('round-slider', this.componentId)}>
        <svg/>
      </div>
    );
  }
}
