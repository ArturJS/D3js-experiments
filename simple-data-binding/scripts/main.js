(function () {
  'use strict';
  var svgEl,
    data,
    circles,
    loopId;


  init();

  function init() {
    svgEl = d3.select('body')
      .append('svg')
      .attr('class', 'wh100');

    data = getData(10);

    circles = svgEl.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return d.x;
      })
      .attr('cy', function (d) {
        return d.y;
      })
      .attr('r', function (d) {
        return d.r;
      })
      .attr('fill', function (d) {
        return d.fill;
      });

    loopId = startLoop();

    window.addEventListener('focus', function () {
      loopId = startLoop();
    });

    window.addEventListener('blur', function () {
      stopLoop(loopId);
    });
  }

  function stopLoop(intervalId) {
    clearInterval(intervalId);
  }

  function startLoop() {
    return setInterval(function () {
      data = getData(10);

      circles
        .data(data)
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

    }, 2000);
  }

  function getData(n) {
    var i,
      data = [];

    for (i = 0; i < n; i++) {
      data.push({
        x: getRandNum(50, 400),
        y: getRandNum(50, 400),
        r: getRandNum(10, 50),
        fill: getRandomHEX()
      });
    }

    return data;
  }

  function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomHEX() {
    return '#' + ((1 << 24) * Math.random() | 0).toString(16);
  }
}());
