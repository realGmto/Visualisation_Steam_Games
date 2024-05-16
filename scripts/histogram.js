
// Set dimensions for the histogram
const width_histogram = 600;
const height_histogram = 500;
const margin_histogram = { top: 20, right: 30, bottom: 50, left: 50 };
const innerWidth_histogram = width_pie - margin_histogram.left - margin_histogram.right;
const innerHeight_histogram = height_pie - margin_histogram.top - margin_histogram.bottom;

function Draw_Histogram(){
    const svg = d3.select('#histogram');

    // Create scales
    const x = d3.scaleLinear()
    .domain([Math.min(...data_histogram.map(o => o.x)), Math.max(...data_histogram.map(o => o.x))])
    .range([margin_histogram.left, width_histogram-margin_histogram.right]);

    const y = d3.scaleLinear()
    .domain([0, Math.max(...data_histogram.map(o => o.y))])
    .nice()
    .range([height_histogram - margin_histogram.bottom, margin_histogram.top]);

    // Draw bars
    svg.selectAll('rect')
    .data(data_histogram)
    .enter()
    .append('rect')
    .attr('x', d => x(d.x))
    .attr('width', 40)
    .attr('y', d => y(d.y))
    .attr('height', d =>(height_histogram - margin_histogram.bottom)-y(d.y))
    .attr('fill', '#01D1FF')
    .on('click',e =>{       // On click event that will be needed later
        console.log(e.srcElement.__data__)
    });

    // Add x-axis
    svg.append('g')
    .attr('transform', `translate(0,${height_histogram - margin_histogram.bottom})`)
    .attr('class','Apply-white')
    .call(d3.axisBottom(x));

    // Add y-axis
    svg.append('g')
    .attr('transform', `translate(${margin_histogram.left},0)`)
    .attr('class','Apply-white')
    .call(d3.axisLeft(y).ticks(10));

    // Add x-axis label
    svg.append('text')
    .attr('transform', `translate(${width_histogram/2},${height_histogram - margin_histogram.bottom/4})`)
    .style('text-anchor', 'middle')
    .attr('class','Apply-white')
    .text('Year');

    // Add y-axis label
    svg.append('text')
    .attr('class','Apply-white')
    .attr('x', 0 -height_histogram/2 )
    .attr('y', 0 + margin_histogram.left)
    .attr('transform', 'rotate(-90)')
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Released games');

}