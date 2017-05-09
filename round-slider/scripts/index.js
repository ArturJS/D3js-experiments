(function () {
  'use strict';

  var width = 960,
    height = 500;

  var radius = 100;

  var dragHandler = getDragHandler();

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var container = svg.append("g");

  var circumference = container.append('circle')
    .attr('r', radius)
    .attr('class', 'circumference');

  var handle_circle1 = getCircle([{
    x: -radius,
    y: 0
  }]);

  var handle_circle2 = getCircle([{
    x: 0,
    y: -radius
  }]);

  var handle_circle3 = getCircle([{
    x: radius,
    y: 0
  }]);

  function getCircle(handle) {
    return container.append("g")
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
      .call(dragHandler);
  }

  function getDragHandler() {
    return d3.drag()
      .subject(function (d) {
        return d;
      })
      .on("start", dragstart)
      .on("drag", drag)
      .on("end", dragend);

    function dragstart(d) {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this)
        .classed("dragging", true);
    }

    function drag(d) {
      var x = d3.event.x;
      var y = d3.event.y;
      var d_from_origin = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

      var alpha = Math.acos(x / d_from_origin); // value from 0 to 3,14

      d3.select(this)
        .attr("cx", d.x = radius * Math.cos(alpha))
        .attr("cy", d.y = y < 0 ? -radius * Math.sin(alpha) : radius * Math.sin(alpha));
    }

    function dragend(d) {
      d3.select(this)
        .classed("dragging", false);
    }
  }


}());
