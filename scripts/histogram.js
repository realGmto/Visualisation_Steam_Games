// Set dimensions for the histogram
const width_hist = 600;
const height_hist = 500;
const margin_hist = { top: 20, right: 30, bottom: 50, left: 60 };
const innerWidth_hist = width_hist - margin_hist.left - margin_hist.right;
const innerHeight_hist = height_hist - margin_hist.top - margin_hist.bottom;

const svg_hist = d3.select('#histogram').append('g')
    .attr("transform", `translate(${margin_hist.left},${margin_hist.top})`);

// Create scales
const x_hist = d3.scaleBand().range([0, innerWidth_hist]).padding(0.1);
const y_hist = d3.scaleLinear().range([innerHeight_hist, 0]);

const xAxis_hist = svg_hist.append("g")
    .attr("class", "x-axis Apply-white")
    .attr("transform", `translate(0,${innerHeight_hist})`);

const yAxis_hist = svg_hist.append("g")
    .attr("class", "y-axis Apply-white");



function Draw_Histogram() {
    // Set the domains of the scales based on data
    x_hist.domain(data_histogram.map(d => d.x));
    y_hist.domain([0, d3.max(data_histogram, d => d.y)]).nice();

    // Select and bind data to bars
    const bars = svg_hist.selectAll('rect').data(data_histogram);

    // Handle the exit selection (remove old bars)
    bars.exit().transition().duration(750).style("opacity", 0).remove();

    // Handle the enter selection (create new bars)
    bars.enter().append('rect')
        .attr('x', d => x_hist(d.x))
        .attr('y', d => y_hist(d.y))
        .attr('width', x_hist.bandwidth())
        .attr('height', d => innerHeight_hist - y_hist(d.y))
        .attr('fill', '#01D1FF')
        .style('cursor','pointer')
        .on("mouseover", function(event, d) {
            d3.select("#tooltip")
                .html(`<b>Year:</b> ${d.x}<br><b>Released Games:</b> ${d.y}`)
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
        .on('click', e => {
            const year = e.srcElement.__data__.x;
            if (filters.includes(year)) {
                alert("Filter is already added");
            } else {
                filters.push(year);
                AddToFilterBar();
            }
        })
        .merge(bars)
        .transition().duration(750)
        .attr('x', d => x_hist(d.x))
        .attr('y', d => y_hist(d.y))
        .attr('width', x_hist.bandwidth())
        .attr('height', d => innerHeight_hist - y_hist(d.y))

    xAxis_hist.transition().duration(750).call(d3.axisBottom(x_hist));
    yAxis_hist.transition().duration(750).call(d3.axisLeft(y_hist).tickSize(5).tickPadding(10));

    // Add x-axis label if not already present
    if (svg_hist.select('.x-axis-label').empty()) {
        svg_hist.append('text')
            .attr('class', 'x-axis-label Apply-white')
            .attr('x', innerHeight_hist / 2)
            .attr('y', height_hist-margin_hist.bottom/1.5)
            .style('text-anchor', 'middle')
            .text('Year');
    }

    // Add y-axis label if not already present
    if (svg_hist.select('.y-axis-label').empty()) {
        svg_hist.append('text')
            .attr('class', 'y-axis-label Apply-white')
            .attr('x', 0 - innerHeight_hist / 2)
            .attr('y', -margin_hist.left)
            .attr('transform', 'rotate(-90)')
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Released games');
    }
}

function updateHistogram(){
    x_hist.domain(data_histogram.map(d => d.x));
    y_hist.domain([0, d3.max(data_histogram, d => d.y)]).nice();

    xAxis_hist.transition().duration(750).call(d3.axisBottom(x_hist));
    yAxis_hist.transition().duration(750).call(d3.axisLeft(y_hist).tickSize(5).tickPadding(10));

    const bars = svg_hist.selectAll('rect').data(data_histogram);

    bars.enter().append('rect')
        .attr('x', d => x_hist(d.x))
        .attr('y', d => y_hist(d.y))
        .attr('width', x_hist.bandwidth())
        .attr('height', d => innerHeight_hist - y_hist(d.y))
        .attr('fill', '#01D1FF')
        .style('cursor','pointer')
        .on("mouseover", function(event, d) {                           //This must be added in case all filters are dropped and there are no more old rect
            d3.select("#tooltip")
                .html(`<b>Year:</b> ${d.x}<br><b>Released Games:</b> ${d.y}`)
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
        .on('click', e => {
            const year = e.srcElement.__data__.x;
            if (filters.includes(year)) {
                alert("Filter is already added");
            } else {
                filters.push(year);
                AddToFilterBar();
            }
        })
        .merge(bars)
        .transition().duration(750)
        .attr('x', d => x_hist(d.x))
        .attr('y', d => y_hist(d.y))
        .attr('width', x_hist.bandwidth())
        .attr('height', d => innerHeight_hist - y_hist(d.y))

        bars.exit().transition().duration(750).style("opacity", 0).remove();
}