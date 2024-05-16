const width_pie = 150;
const height_pie = 150;
const radius_pie = Math.min(width_pie, height_pie) / 2;

color_palette_pie = ['#0ED354','#C0324F']
const color_pie = d3.scaleOrdinal(color_palette_pie);


function Draw_pies(){

    // First pie_chart
    const svg1 = d3.select('#pie_charts1')
                .append('g')
                

const pie1 = d3.pie().value(d => d.value);
const arc1 = d3.arc().innerRadius(0).outerRadius(radius_pie);

const arcs1 = svg1.selectAll('arc')
  .data(pie1(win))
  .enter()
  .append('g')
  .attr('class', 'arc')
  .attr('transform',`translate(${width_pie / 2}, ${height_pie / 2})`);

arcs1.append('path')
  .attr('d', arc1)
  .attr('fill', d => color_pie(d.data.label));

// Add labels
arcs1.append('text')
  .attr('transform', d => `translate(${arc1.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .text(d => d.data.label);




// Second pie_chart
    const svg2 = d3.select('#pie_charts2')
                    .append('g')

    const pie2 = d3.pie().value(d => d.value);
    const arc2 = d3.arc().innerRadius(0).outerRadius(radius_pie);

    const arcs2 = svg2.selectAll('arc')
    .data(pie2(linux))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform',`translate(${width_pie / 2}, ${height_pie / 2})`);

    arcs2.append('path')
    .attr('d', arc2)
    .attr('fill', d => color_pie(d.data.label));

    // Add labels
    arcs2.append('text')
    .attr('transform', d => `translate(${arc2.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data.label);


    // Third pie_chart

    const svg3 = d3.select('#pie_charts3')
                    .append('g')

    const pie3 = d3.pie().value(d => d.value);
    const arc3 = d3.arc().innerRadius(0).outerRadius(radius_pie);

    const arcs3 = svg3.selectAll('arc')
    .data(pie3(mac))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform',`translate(${width_pie / 2}, ${height_pie / 2})`);

    arcs3.append('path')
    .attr('d', arc3)
    .attr('fill', d => color_pie(d.data.label));

    // Add labels
    arcs3.append('text')
    .attr('transform', d => `translate(${arc2.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data.label);
}