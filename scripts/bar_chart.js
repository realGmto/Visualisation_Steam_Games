
// Set dimensions for the bar chart
const width_bar = 600;
const height_bar = 750;
const margin_bar = { top: 20, right: 30, bottom: 50, left: 50 };
const innerWidth_bar = width_bar - margin_bar.left - margin_bar.right;
const innerHeight_bar = height_bar - margin_bar.top - margin_bar.bottom;

const svg_bar = d3.select("#bar_chart");

// Create a group element for the inner chart area
const g_bar = svg_bar.append("g")
                    .attr("transform", `translate(${margin_bar.left},${margin_bar.top})`);

const x_bar = d3.scaleLinear().range([0, innerWidth_bar]);
const y_bar = d3.scaleBand().range([0, innerHeight_bar]).padding(0.1);

const xAxis_bar = g_bar.append("g")
                .attr("class", "x-axis")
                .attr('class','Apply-white')
                .attr("transform", `translate(0,${innerHeight_bar})`);

const yAxis_bar = g_bar.append("g")
                .attr("class", "y-axis")
                .attr('class','Apply-white');


function Draw_Bar_Chart(){
    // Create scales
    x_bar.domain([0, d3.max(data_ratings, d => d.x)]).nice();
    y_bar.domain(data_ratings.map(d => d.y));

    const bars = g_bar.selectAll("rect").data(data_ratings);

    bars.enter().append("rect")
    .attr("x", 0)
    .attr("y", d => y_bar(d.y))
    .attr("width", d => x_bar(d.x))
    .attr("height", y_bar.bandwidth())
    .attr('fill', '#4E8CF6')
    .style('cursor','pointer')
    .on("mouseover", function(event, d) {
        d3.select("#tooltip")
            .html(`<b>Category:</b> ${d.y}<br><b>Number of Games:</b> ${d.x}`)
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
    .on("click", e => {
        if (filters.includes(e.srcElement.__data__.y)){
            alert("Filter is already added");
        }else{
            filters.push(e.srcElement.__data__.y);
            AddToFilterBar();
        }
    })
    .merge(bars)
    .transition().duration(750)
    .attr("x", 0)
    .attr("y", d => y_bar(d.y))
    .attr("width", d => x_bar(d.x))
    .attr("height", y_bar.bandwidth());

    bars.exit().transition().duration(750).remove();

    xAxis_bar.transition().duration(750).call(d3.axisBottom(x_bar));
    yAxis_bar.attr("class", "y-axis")
                .style('font-size','15px')
                .transition().duration(750)
                .call(d3.axisLeft(y_bar).tickSize(0).tickPadding(10))
                .selectAll("text")
                .style("text-anchor", "start");

    svg_bar.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width_bar / 2 + margin_bar.left)
        .attr("y", height_bar - 10)
        .text("Number of Games");

    svg_bar.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("x", -height_bar / 2 + margin_bar.top)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .style("font-size", '20px')
        .text("Steam User Review Rating Category");
}

function updateBarChart() {
    x_bar.domain([0, d3.max(data_ratings, d => d.x)]).nice();
    y_bar.domain(data_ratings.map(d => d.y));

    xAxis_bar.transition().duration(750).call(d3.axisBottom(x_bar));
    yAxis_bar.transition().duration(750).call(d3.axisLeft(y_bar).tickSize(0).tickPadding(10));

    const bars = g_bar.selectAll("rect").data(data_ratings);

    bars.enter().append("rect")
        .attr("x", 0)
        .attr("y", d => y_bar(d.y))
        .attr("width", d => x_bar(d.x))
        .attr("height", y_bar.bandwidth())
        .attr('fill', '#4E8CF6')
        .merge(bars)
        .transition().duration(750)
        .attr("x", 0)
        .attr("y", d => y_bar(d.y))
        .attr("width", d => x_bar(d.x))
        .attr("height", y_bar.bandwidth());

    bars.exit().transition().duration(750).remove();
}
