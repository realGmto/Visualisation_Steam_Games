const width_pie = 150;
const height_pie = 150;
const radius_pie = Math.min(width_pie, height_pie) / 2;

color_palette = ['#0ED354','#C0324F']
const color_pie = d3.scaleOrdinal(color_palette);

const svg1 = d3.select('#pie_charts1').append('g');
const svg2 = d3.select('#pie_charts2').append('g');
const svg3 = d3.select('#pie_charts3').append('g');

const arc = d3.arc().innerRadius(0).outerRadius(radius_pie);

let arcs1;
let arcs2;
let arcs3;


function Draw_pies(){
  const pie1 = d3.pie().value(d => d.value);
  const arc1 = d3.arc().innerRadius(0).outerRadius(radius_pie);

  arcs1 = svg1.selectAll('arc')
    .data(pie1(win))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform',`translate(${width_pie / 2}, ${height_pie / 2})`);

  arcs1.append('path')
    .attr('d', arc1)
    .attr('fill', d => color_pie(d.data.label))
    .on("mouseover", function(event, d) {
      d3.select("#tooltip")
          .html(`<b>OS: </b>Windows<br><b>Supports: </b>${d.data.label}<br><b>Count:</b> ${d.data.value}`)
          .transition()
          .duration(350)
          .style("opacity", 1);
    })
    .on("mousemove", function(event) {
        d3.select("#tooltip")
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        d3.select("#tooltip")
            .transition()
            .duration(350)
            .style("opacity", 0);
    })
    .on('click',(e,d) =>{       // On click event that will be needed later
        const object = {win: d.data.label === "Yes"? "True" : "False"};
        const filter_objects = filters.filter(filter => typeof filter === 'object')
        const final = filter_objects.findIndex(filter => JSON.stringify(filter) === JSON.stringify(object))

        if (final !== -1) {
          alert("Filter is already added");
      } else {
          filters.push(object);
          AddToFilterBar();
      }
    });

  // Add labels
  arcs1.append('text')
    .attr('transform', d => `translate(${arc1.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data.label);




  // Second pie_chart
      const pie2 = d3.pie().value(d => d.value);
      const arc2 = d3.arc().innerRadius(0).outerRadius(radius_pie);

      arcs2 = svg2.selectAll('arc')
      .data(pie2(linux))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform',`translate(${width_pie / 2}, ${height_pie / 2})`);

      arcs2.append('path')
      .attr('d', arc2)
      .attr('fill', d => color_pie(d.data.label))
      .on("mouseover", function(event, d) {
        d3.select("#tooltip")
            .html(`<b>OS: </b>Linux<br><b>Supports: </b>${d.data.label}<br><b>Count:</b> ${d.data.value}`)
            .transition()
            .duration(350)
            .style("opacity", 1);
      })
      .on("mousemove", function(event) {
          d3.select("#tooltip")
              .style("left", (event.pageX + 5) + "px")
              .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
          d3.select("#tooltip")
              .transition()
              .duration(350)
              .style("opacity", 0);
      })
      .on('click',e =>{
        const object = {linux: d.data.label === "Yes"? "True" : "False"};
        const filter_objects = filters.filter(filter => typeof filter === 'object')
        const final = filter_objects.findIndex(filter => JSON.stringify(filter) === JSON.stringify(object))

        if (final !== -1) {
          alert("Filter is already added");
      } else {
          filters.push(object);
          AddToFilterBar();
      }
      });

      // Add labels
      arcs2.append('text')
      .attr('transform', d => `translate(${arc2.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.label);


      // Third pie_chart
      const pie3 = d3.pie().value(d => d.value);
      const arc3 = d3.arc().innerRadius(0).outerRadius(radius_pie);

      arcs3 = svg3.selectAll('arc')
      .data(pie3(mac))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform',`translate(${width_pie / 2}, ${height_pie / 2})`);

      arcs3.append('path')
      .attr('d', arc3)
      .attr('fill', d => color_pie(d.data.label))
      .on("mouseover", function(event, d) {
        d3.select("#tooltip")
            .html(`<b>OS: </b>MacOS<br><b>Supports: </b>${d.data.label}<br><b>Count:</b> ${d.data.value}`)
            .transition()
            .duration(350)
            .style("opacity", 1);
      })
      .on("mousemove", function(event) {
          d3.select("#tooltip")
              .style("left", (event.pageX + 5) + "px")
              .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
          d3.select("#tooltip")
              .transition()
              .duration(350)
              .style("opacity", 0);
      })
      .on('click',e =>{
        const object = {mac: d.data.label === "Yes"? "True" : "False"};
        const filter_objects = filters.filter(filter => typeof filter === 'object')
        const final = filter_objects.findIndex(filter => JSON.stringify(filter) === JSON.stringify(object))

        if (final !== -1) {
          alert("Filter is already added");
      } else {
          filters.push(object);
          AddToFilterBar();
      }
      });

      // Add labels
      arcs3.append('text')
      .attr('transform', d => `translate(${arc2.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.label);
}

function updatePies(){
  // First Pie
  arcs1 = arcs1.data(win);

  // Update paths
  arcs1.select("path")
      .transition()
      .duration(750)
      .attrTween("d", function(d) {
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
              return arc(interpolate(t));
          };
      });
}