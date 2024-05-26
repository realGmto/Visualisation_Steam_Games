const margin_line = { top: 10, right: 30, bottom: 15, left: 40 },
          width_line = 1250 - margin_line.left - margin_line.right,
          height_line = 300 - margin_line.top - margin_line.bottom;

const innerWidth_line = width_line - margin_line.left - margin_line.right;
const innerHeight_line = height_line - margin_line.top - margin_line.bottom;

const svg_line = d3.select("#line_diagram").append("g")
    .attr("transform", `translate(${margin_line.left},${margin_line.top})`);

let x_line;
let y_line;

const xAxis_line = svg_line.append("g")
            .attr("class", "x-axis")
            .attr('class','Apply-white')
            .attr("transform", `translate(0,${innerHeight_line})`);

const yAxis_line = svg_line.append("g")
            .attr("class", "y-axis")
            .attr('class','Apply-white');


let line;


function Draw_line_diagram(){
    x_line = d3.scaleTime()
        .domain(d3.extent(data_line, d => d.time))
        .range([0, innerWidth_line]);

    y_line = d3.scaleLinear()
        .domain([0, Math.max(...data_line.map(o => o.price))])   //DO NOT USE d3.max() for some reason it doesn't return correctly. ONLY ON THIS!
        .nice()
        .range([innerHeight_line, 0]);

    xAxis_line.transition().duration(750).call(d3.axisBottom(x_line));
    yAxis_line.transition().duration(750).call(d3.axisLeft(y_line).tickSize(0).tickPadding(10))

    line = d3.line()
        .defined(d => !isNaN(d.price))
        .x(d => x_line(d.time))
        .y(d => y_line(d.price));

    svg_line.append("path")
        .datum(data_line)
        .attr("class", "line")
        .attr("d", line)
        .attr('fill','none')
        .style("stroke", "#01D1FF");

    const circles = svg_line.selectAll(".dot")
        .data(data_line);

    // Adding circles to each data point
    circles.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x_line(d.time))
        .attr("cy", d => y_line(d.price))
        .attr("r", 5)
        .attr('fill','#E5C852')
        .style('cursor','pointer')
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
            if (filters.includes(e.srcElement.__data__.time)){
                alert("Filter is already added");
            }
            else{
                filters.push(e.srcElement.__data__.time);
                AddToFilterBar();
            }
        })
        .merge(circles)
        .transition().duration(750)
        .attr("cx", d => x_line(d.time))
        .attr("cy", d => y_line(d.price));
    
    // Add labels for the axes
    svg_line.append("text")
        .attr("class", "x-label")
        .attr("x", width_line / 2 + margin_line.left)
        .attr("y", height_line - 10)
        .text("Year");

    svg_line.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("x", -height_line / 2)
        .attr("y", -22)
        .attr("transform", "rotate(-90)")
        .text("Average Price");
}


function update_line_diagram() {
    // Update scales
    x_line.domain(d3.extent(data_line, d => d.time));
    y_line.domain([0, Math.max(...data_line.map(o => o.price))]).nice();

    const svg = d3.select("#line_diagram");

    // Update axes
    xAxis_line.transition().duration(750).call(d3.axisBottom(x_line));
    yAxis_line.transition().duration(750).call(d3.axisLeft(y_line).tickSize(0).tickPadding(10));

    // Define the line
    const line = d3.line()
        .defined(d => !isNaN(d.price))
        .x(d => x_line(d.time))
        .y(d => y_line(d.price));

    // Update line path
    svg.select(".line")
        .datum(data_line)
        .transition().duration(750)
        .attr("d", line);

    // Update circles
    const circles = svg.selectAll(".dot")
        .data(data_line);

    circles.enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", d => x_line(d.time))
        .attr("cy", d => y_line(d.price))
        .attr('fill','#E5C852')
        .merge(circles)
        .transition().duration(750)
        .attr("cx", d => x_line(d.time))
        .attr("cy", d => y_line(d.price));

    circles.exit().transition().duration(250).remove();
}