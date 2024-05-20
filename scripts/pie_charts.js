function Draw_pies(){

  const width = 150;
  const height = 150;
  const radius = Math.min(width, height) / 2;

  color_palette = ['#0ED354','#C0324F']
  const color = d3.scaleOrdinal(color_palette);

    // First pie_chart
  const svg1 = d3.select('#pie_charts1')
                  .append('g')
                

  const pie1 = d3.pie().value(d => d.value);
  const arc1 = d3.arc().innerRadius(0).outerRadius(radius);

  const arcs1 = svg1.selectAll('arc')
    .data(pie1(win))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform',`translate(${width / 2}, ${height / 2})`);

  arcs1.append('path')
    .attr('d', arc1)
    .attr('fill', d => color(d.data.label))
    .on("mouseover", function(event, d) {
      d3.select("#tooltip")
          .html(`<b>Count:</b> ${d.data.value}`)  //This will need to be updated
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
    .on('click',e =>{       // On click event that will be needed later
        console.log(e.srcElement.__data__)
    });

  // Add labels
  arcs1.append('text')
    .attr('transform', d => `translate(${arc1.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data.label);




  // Second pie_chart
      const svg2 = d3.select('#pie_charts2')
                      .append('g')

      const pie2 = d3.pie().value(d => d.value);
      const arc2 = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs2 = svg2.selectAll('arc')
      .data(pie2(linux))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform',`translate(${width / 2}, ${height / 2})`);

      arcs2.append('path')
      .attr('d', arc2)
      .attr('fill', d => color(d.data.label))
      .on("mouseover", function(event, d) {
        d3.select("#tooltip")
            .html(`<b>Count:</b> ${d.data.value}`)  //This will need to be updated
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
      .on('click',e =>{       // On click event that will be needed later
          console.log(e.srcElement.__data__)
      });

      // Add labels
      arcs2.append('text')
      .attr('transform', d => `translate(${arc2.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.label);


      // Third pie_chart

      const svg3 = d3.select('#pie_charts3')
                      .append('g')

      const pie3 = d3.pie().value(d => d.value);
      const arc3 = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs3 = svg3.selectAll('arc')
      .data(pie3(mac))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform',`translate(${width / 2}, ${height / 2})`);

      arcs3.append('path')
      .attr('d', arc3)
      .attr('fill', d => color(d.data.label))
      .on("mouseover", function(event, d) {
        d3.select("#tooltip")
            .html(`<b>Count:</b> ${d.data.value}`)  //This will need to be updated
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
      .on('click',e =>{       // On click event that will be needed later
          console.log(e.srcElement.__data__)
      });

      // Add labels
      arcs3.append('text')
      .attr('transform', d => `translate(${arc2.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.label);
}