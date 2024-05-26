function Draw_line_diagram(){
    const margin = { top: 10, right: 30, bottom: 15, left: 40 },
          width = 1200 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#line_diagram").append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
        .domain(d3.extent(data_line, d => d.time))
        .range([0, innerWidth]);

    const y = d3.scaleLinear()
        .domain([0, Math.max(...data_line.map(o => o.price))])   //DO NOT USE d3.max() for some reason it doesn't return correctly. ONLY ON THIS!
        .nice()
        .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .attr('class','Apply-white')
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .attr('class','Apply-white')
        .call(yAxis);

    const line = d3.line()
        .defined(d => !isNaN(d.price))
        .x(d => x(d.time))
        .y(d => y(d.price));

    svg.append("path")
        .datum(data_line)
        .attr("class", "line")
        .attr("d", line)
        .attr('fill','none')
        .style("stroke", "#01D1FF");

    // Adding circles to each data point
    svg.selectAll("circle")
        .data(data_line)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.time))
        .attr("cy", d => y(d.price))
        .attr("r", 5)
        .attr('fill','#E5C852')
        .on("mouseover", function(event, d) {
            d3.select("#tooltip")
                .html(`<b>Year:</b> ${d.time}<br><b>Average Price:</b> ${d.price}`)  //This will need to be updated
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
    
    // Add labels for the axes
    svg.append("text")
        .attr("class", "x-label")
        .attr("x", width / 2 + margin.left)
        .attr("y", height - 10)
        .text("Year");

    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("x", -height / 2)
        .attr("y", -22)
        .attr("transform", "rotate(-90)")
        .text("Average Price");
}

function update_line_diagram(data) {
    // Update scales
    x.domain([d3.min(data, d => d.date), d3.max(data, d => d.date)]);
    y.domain([0, d3.max(data, d => d.value)]).nice();

    const svg = d3.select("#line_diagram")
    // Update axes
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    // Update line path
    svg.select(".line")
        .datum(data)
        .attr("d", line);

    // Update circles
    const circles = svg.selectAll(".dot")
        .data(data);

    circles.enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .merge(circles)
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr('fill','#E5C852');

    circles.exit().remove();
}