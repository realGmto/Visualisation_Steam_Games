function Draw_Bar_Chart(){
    
    // Set dimensions for the bar chart
    const width = 600;
    const height = 750;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#bar_chart");

     // Create a group element for the inner chart area
     const g = svg.append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleLinear()
        .domain([0, d3.max(data_ratings, d => d.x)])
        .nice()
        .range([0, innerWidth]);

    const y = d3.scaleBand()
        .domain(data_ratings.map(d => d.y))
        .range([0, innerHeight])
        .padding(0.1);

    // Create and append bars
    g.selectAll("rect")
        .data(data_ratings)
        .enter().append("rect")
        .attr("x", 0)
        .attr("y", d => y(d.y))
        .attr("width", d => x(d.x))
        .attr("height", y.bandwidth())
        .attr('fill', '#4E8CF6')
        .on("mouseover", function(event, d) {
            d3.select("#tooltip")
                .html(`<b>Category:</b> ${d.y}<br><b>Number of Games:</b> ${d.x}`)  //This will need to be updated
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
        });

    // Create and append axes
    g.append("g")
        .attr("class", "x-axis")
        .attr('class','Apply-white')
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x));
    
    g.append("g")
        .attr("class", "y-axis")
        .attr('class','Apply-white')
        .style('font-size','15px')
        .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
        .selectAll("text")
        .style("text-anchor", "start");

    // Add labels for the axes
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
        .attr("y", height - 10)
        .text("Number of Games");

    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("x", -height / 2 + margin.top)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .style("font-size",'20px')
        .text("Steam User Review Rating Category");
}