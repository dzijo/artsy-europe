/* var originGeo = [16.8286, 52.4200];
      var originName = 'POZ';
      var destinations = [
          {'coord': [20.9679, 52.1672], 'name': 'WAW'},
          {'coord': [23.9569, 49.8134], 'name': 'LWO'},
          {'coord': [30.4433, 50.4120], 'name': 'IEV'},
          {'coord': [13.3724, 55.5355], 'name': 'MMX'},
          {'coord': [12.6508, 55.6180], 'name': 'CPH'},
          {'coord': [16.9154, 58.7890], 'name': 'NYO'},
          {'coord': [10.2569, 59.1824], 'name': 'TRF'},
          {'coord': [9.1526, 55.7408], 'name': 'BLL'},
          {'coord': [8.5622, 50.0379], 'name': 'FRA'},
          {'coord': [11.7750, 48.3537], 'name': 'MUC'},
          {'coord': [5.3921, 51.4584], 'name': 'EIN'},
          {'coord': [2.1115, 49.4545], 'name': 'BVA'},
          {'coord': [-2.7135, 51.3836], 'name': 'BRS'},
          {'coord': [0.3717, 51.8763], 'name': 'LTN'},
          {'coord': [0.2389, 51.8860], 'name': 'STN'},
          {'coord': [-1.743507, 52.4524], 'name': 'BHX'},
          {'coord': [-2.8544, 53.3375], 'name': 'LPL'},
          {'coord': [-3.3615, 55.9508], 'name': 'EDI'},
          {'coord': [-1.010464, 53.480662], 'name': 'DSA'},
          {'coord': [-6.2499, 53.4264], 'name': 'DUB'},
          {'coord': [-0.560056, 38.285483], 'name': 'ALC'},
          {'coord': [0.065603, 40.207479], 'name': 'CDT'},
          {'coord': [-3.56795, 40.4839361], 'name': 'MAD'},
          {'coord': [2.071062, 41.288288], 'name': 'BCN'},
          {'coord': [2.766066, 41.898201], 'name': 'GRO'},
          {'coord': [14.483279, 35.854114], 'name': 'MLA'},
          {'coord': [23.9484, 37.9356467], 'name': 'ATH'},
          {'coord': [19.914486, 39.607645], 'name': 'CFU'},
          {'coord': [34.9362, 29.9511], 'name': 'VDA'},
          {'coord': [34.8854, 32.0055], 'name': 'TLV'}
      ]; */
var svg
var projection
var active = d3.select(null)
var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
// var color = d3.scale.category20a();
/* var speed = 2800;//km/sec
      var tooltip = d3.select('#map').append('div')
          .attr('class', 'tooltipDestination')
          .style('opacity', 0);
      function getArc(d, s) {
        var dx = d.destination.x - d.origin.x;
        var dy = d.destination.y - d.origin.y;
        var dr = Math.sqrt(dx * dx + dy * dy);
        var spath = s == false ? ' 0 0,0 ' : ' 0 0,1 ';
        return 'M' + d.origin.x + ',' + d.origin.y + 'A' + dr + ',' + dr + spath + d.destination.x + ',' + d.destination.y;
      }
      function calculateDistance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295;
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;
        return 12742 * Math.asin(Math.sqrt(a));
      }
      function calculateDuration(distance) {
        return (distance / this.speed) * 1000;
      } */
/* function drawConnection(index) {
        var destination = this.destinations[index];
        var originPos = projection(this.originGeo);
        var destinationPos = projection(destination.coord);
        var connection = [ originPos, destinationPos ];
        var destinationName = destination.name;
        var originGeo = this.originGeo;
        var destinationGeo = destination.coord;
        var svg = this.svg;
        var distance = calculateDistance(originGeo[1], originGeo[0], destinationGeo[1], destinationGeo[0]);
        var duration = calculateDuration(distance);
        var arc = svg
          .append('path')
          .datum(connection)
          .attr('class', 'arc' + index)
          .attr('d', function(coordinates) {
              var d = {
                  origin: { x: coordinates[0][0], y: coordinates[0][1]},
                  destination: { x: coordinates[1][0], y: coordinates[1][1]}
              };
              var s = false;
              if (d.destination.x > d.origin.x) {
                  s = true;
              }
              return getArc(d, s);
          })
          .style('stroke', 'steelblue')
          .style('stroke-width', 2)
          .style('fill', 'none')
          .transition()
          .duration(duration)
          .attrTween('stroke-dasharray', function() {
              var len = this.getTotalLength();
              return function(t) {
                return (d3.interpolate('0,' + len, len + ',0'))(t)
              };
          })
          .on('end', function(d) {
              var c = connection[1];
              svg.append('circle')
                .attr('cx', c[0])
                .attr('cy', c[1])
                .attr('r', 0)
                .attr('class', 'destCircleInner')
                .style('fill', 'steelblue')
                .style('fill-opacity', '1')
                .transition()
                .duration(300)
                .attr('r', '3px');
              svg.append('circle')
                .attr('cx', c[0])
                .attr('cy', c[1])
                .attr('r', 0)
                .attr('class', 'destCircleOuter')
                .style('fill', 'black')
                .style('fill-opacity', '0.05')
                .transition()
                .duration(300)
                .attr('r', '10px');
              svg.append('circle')
                .datum(c)
                .attr('cx', c[0])
                .attr('cy', c[1])
                .attr('r', 0)
                .style('class', 'destCircleMouse')
                .style('fill', 'steelblue')
                .style('fill-opacity', '1')
                .on('mouseover', function (d) {
                  tooltip.html('<span style="color:white">' + destinationName + '</span>')
                    .attr('class', 'tooltipDestination')
                    .style('left', d[0] + 12 + 'px')
                    .style('top', d[1] - 20 + 'px')
                    .transition()
                    .duration(700)
                    .style('opacity', 1)
                })
                .on('mouseout', function (d) {
                  tooltip.transition()
                  .duration(700)
                  .style('opacity', 0)
                })
                .transition()
                .duration(300)
                .attr('r', '3px')
                .on('end', function(d) {
                  d3.select(this)
                    .transition()
                    .duration(2000)
                    .attr('r', 20)
                    .style('fill-opacity', '0');
                  d3.select('.arc' + index)
                    .transition()
                    .duration(2000)
                    .style('stroke-opacity', '0')
                    .style('stroke-width', '1')
                    .on('end', function (d) {
                      if (index === destinations.length - 1) {
                        svg.selectAll('.destCircleInner').remove();
                        svg.selectAll('.destCircleOuter').remove();
                        svg.selectAll('.destCircleMouse').remove();
                        for (i = 0; i < destinations.length; i++) {
                          svg.selectAll('.arc' + i).remove();
                        }
                      }
                      var nextIndex = index + 1;
                      if (nextIndex < destinations.length) {
                        drawConnection(nextIndex);
                      } else {
                        drawConnection(0);
                      }
                    })
                });
          });
      }
      function drawConnections() {
        drawConnection(0);
      } */

function drawMap (originName, originGeo, destinations) {
  var countries, height, path, projection, scale, svg, width
  var width = 1000
  var height = 700
  var center = [4, 68.6]
  var scale = 550

  projection = d3
    .geoMercator()
    .scale(scale)
    .translate([width / 2, 0])
    .center(center)
  path = d3.geoPath().projection(projection)
  svg = d3
    .select('#map')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .style('background', '#C1E1EC')
  countries = svg.append('g')

  d3.json('europe.json', function (data) {
    var boxes = boundingExtent(
      topojson.feature(data, data.objects.europe).features,
      path
    )

    countries
      .selectAll('.country')
      .data(topojson.feature(data, data.objects.europe).features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)
      // .style("fill", "blue")
      .style('stroke', 'white')
      .style('stroke-width', '0.1px')
      .style('fill', function (d, i) {
        if (d.properties.ImgUrl != '') {
          svg
            .append('defs')
            .append('pattern')
            .attr('id', d.properties.Artist)
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 1000)
            .attr('height', 800)
            .append('image')
            .attr('xlink:href', d.properties.ImgUrl)
            .attr('x', d.properties.x)
            .attr('y', d.properties.y)
            .attr('width', d.properties.width)
            .attr('height', d.properties.height)
            .style('object-fit', 'cover')

          return 'url(#' + d.properties.Artist + ')'
        }
        return colorScale(i)
      })
      .on('click', function (x, y) {
        zoomIn(this)
      })
      .on('mouseover', function (d, i) {
        d3.select(this).style('opacity', 0.8)
        console.log(boxes[i])
      })
      .on('mouseout', function () {
        d3.select(this).style('opacity', 1)
      })
    // .on("click", clicked)
    return
    var zoomInBool = false
    var transX, transY
    function zoomIn (polygon) {
      var bbox = d3
        .select(polygon)
        .node()
        .getBBox()
      console.log('bbox', bbox)
      var rectAttr = {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height
      }

      if (!zoomInBool) {
        countries
          .transition()
          .duration(1000)
          .attr('transform', function (d) {
            var testScale = Math.max(rectAttr.width, rectAttr.height)
            var widthScale = width / testScale
            var heightScale = height / testScale
            var scale = Math.max(widthScale, heightScale)
            // console.log('scale',rectAttr)
            const factor = 1.8
            const factor2 = 130
            transX = (-(rectAttr.x + 0) * scale) / factor + factor2
            transY = (-(rectAttr.y + 0) * scale) / factor + factor2

            return (
              'translate(' +
              transX +
              ',' +
              transY +
              ')scale(' +
              scale / factor +
              ')'
            )
          })

        zoomInBool = true
      } else {
        countries
          .transition()
          .duration(1000)
          .attr('transform', function (d) {
            return 'translate(' + 0 + ',' + 0 + ')scale(' + 1 + ')'
          })
        zoomInBool = false
      }
    }
  })
  /* var source = svg.selectAll('circleOrigin');
          source
          .data([originGeo]).enter()
          .append('circle')
          .attr('cx', function (d) { return projection(d)[0]; })
          .attr('cy', function (d) { return projection(d)[1]; })
          .attr('r', '3px')
          .style('opacity', 1)
          .attr('fill', 'green')
          .attr('class', 'circleOrigin')
          source
          .data([originGeo]).enter()
          .append('circle')
          .attr('cx', function (d) { return projection(d)[0]; })
          .attr('cy', function (d) { return projection(d)[1]; })
          .attr('r', '10px')
          .style('opacity', 0.05)
          .attr('fill', 'black')
          .attr('class', 'circleOrigin')
          .on('mouseover', function (d) {
            tooltip.html('<span style="color:white">' + originName + '</span>')
              .attr('class', 'tooltipOrigin')
              .style('left', projection(d)[0] + 12 + 'px')
              .style('top', projection(d)[1] - 20 + 'px')
              .transition()
              .duration(700)
              .style('opacity', 1)
          })
          .on('mouseout', function (d) {
            tooltip.transition()
              .duration(700)
              .style('opacity', 0)
          }); */
  this.svg = svg
  this.projection = projection
  // this.drawConnections();
}
this.drawMap(this.originName, this.originGeo, this.destinations)
function clicked (d) {
  if (active.node() === this) return reset()
  active.classed('active', false)
  active = d3.select(this).classed('active', true)

  setTimeout(reset, 10000)

  var bounds = path.bounds(d)

  var dx = bounds[1][0] - bounds[0][0]

  var dy = bounds[1][1] - bounds[0][1]

  var x = (bounds[0][0] + bounds[1][0]) / 2

  var y = (bounds[0][1] + bounds[1][1]) / 2

  var scale = 0.9 / Math.max(dx / width, dy / height)

  var translate = [width / 2 - scale * x, height / 2 - scale * y]

  g.transition()
    .duration(750)
    .style('stroke-width', 1.5 / scale + 'px')
    .attr('transform', 'translate(' + translate + ')scale(' + scale + ')')

  g.transition()
    .duration(750)
    .delay(10000)
    .attr('transform', '')

  console.log(d.properties.name)
}

function reset () {
  g.transition()
    .duration(750)
    .style('stroke-width', '1.5px')
    .attr('transform', '')

  active.classed('active', false)
  active = d3.select(null)
}

function boundingExtent (features, myPath) {
  var bounds = []
  for (var x in features) {
    var boundObj = {}
    thisBounds = myPath.bounds(features[x])
    console.log(thisBounds)
    boundObj.id = features[x].id
    boundObj.x = thisBounds[0][0]
    boundObj.y = thisBounds[0][1]
    boundObj.width = thisBounds[1][0] - thisBounds[0][0]
    boundObj.height = thisBounds[1][1] - thisBounds[0][1]
    boundObj.path = thisBounds
    bounds.push(boundObj)
  }
  return bounds
}
