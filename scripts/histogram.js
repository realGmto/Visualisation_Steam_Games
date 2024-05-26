function Draw_Histogram(){
    // Set dimensions for the histogram
    const width = 600;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const svg = d3.select('#histogram');

    // Create scales
    const x = d3.scaleLinear()
    .domain(d3.extent(data_histogram, d => d.x))
    .range([margin.left, width-margin.right]);

    const y = d3.scaleLinear()
    .domain([0, d3.max(data_histogram, d => d.y)])
    .nice()
    .range([height - margin.bottom, margin.top]);

    // Draw bars
    svg.selectAll('rect')
    .data(data_histogram)
    .enter()
    .append('rect')
    .attr('x', d => x(d.x))
    .attr('width', 40)
    .attr('y', d => y(d.y))
    .attr('height', d =>(height - margin.bottom)-y(d.y))
    .attr('fill', '#01D1FF')
    .on("mouseover", function(event, d) {
        d3.select("#tooltip")
            .html(`<b>Year:</b> ${d.x}<br><b>Released Games:</b> ${d.y}`)  //This will need to be updated
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
                            // This gets year: e.srcElement.__data__.x
        data = [
            { date: new Date(2023, 0, 1), value: 25 },
            { date: new Date(2023, 1, 1), value: 15 },
            { date: new Date(2023, 2, 1), value: 55 },
            { date: new Date(2023, 3, 1), value: 45 },
            { date: new Date(2023, 4, 1), value: 75 },
            { date: new Date(2023, 5, 1), value: 60 },
        ];
        update_line_diagram(data);
    });

    // Add x-axis
    svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .attr('class','Apply-white')
    .call(d3.axisBottom(x));

    // Add y-axis
    svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .attr('class','Apply-white')
    .call(d3.axisLeft(y).ticks(10));

    // Add x-axis label
    svg.append('text')
    .attr('transform', `translate(${width/2},${height - margin.bottom/4})`)
    .style('text-anchor', 'middle')
    .attr('class','Apply-white')
    .text('Year');

    // Add y-axis label
    svg.append('text')
    .attr('class','Apply-white')
    .attr('x', 0 -height/2 )
    .attr('y', 0 + margin.left)
    .attr('transform', 'rotate(-90)')
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Released games');

}