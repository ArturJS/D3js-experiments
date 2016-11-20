(function () {
  var data,
    svg,
    bars,
    axis,
    width,
    height,
    widthScale,
    color;

  width = 500;
  height = 500;

  data = [5, 30, 50, 60];

  widthScale = d3.scaleLinear()
    .domain([0, 60])
    .range([0, width]);

  color = d3.scaleLinear()
    .domain([0, 60])
    .range(['#F00', '#0AA']);

  axis = d3.axisBottom()
    .ticks(10)
    .scale(widthScale);

  svg = d3.select('body')
    .append('svg')
    .style('overflow', 'visible')
    .attr('width', width)
    .attr('height', height);

  bars = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('height', 50)
    .attr('y', function (d, index) {
      return index * 70;
    })
    .attr('fill', function (d) {
      return '#FFF';
    })
    .transition()
    .duration(1000)
    .attr('fill', function (d) {
      return color(d);
    })
    .attr('width', function (d) {
      return widthScale(d);
    });

  svg.append('g')
    .attr('transform', 'translate(0, ' + 70 * data.length + ')')
    .call(axis);

}());
