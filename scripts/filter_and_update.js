function ApplyFilters(){
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    rating_levels = ['Overwhelmingly Positive','Very Positive','Positive','Mostly Positive','Mixed','Mostly Negative','Negative','Very Negative','Overwhelmingly Negative']
    years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

    let yearFilters = filters.filter(item => typeof item === 'number');
    let ratingFilters = filters.filter(item => typeof item === 'string');
    let osFilters = filters.filter(item => typeof item === 'object');

    yearFilters.sort((a,b) => a-b);

    if(yearFilters.length === 0){
        yearFilters = years;
    }
    if(ratingFilters.length === 0){
        ratingFilters = rating_levels;
    }

    filtered_data = all_data.filter(item => 
        yearFilters.includes(item.year) && 
        ratingFilters.includes(item.rating) && 
        (
            (
                osFilters.findIndex(filter => JSON.stringify(filter) === JSON.stringify({win: item.win})) !== -1 ||
                osFilters.findIndex(filter => JSON.stringify(filter) === JSON.stringify({linux: item.linux})) !== -1 ||
                osFilters.findIndex(filter => JSON.stringify(filter) === JSON.stringify({macOS: item.mac})) !== -1
            ) || osFilters.length === 0
        )
    );
    

    // Line Diagram
    data_line = [];
    yearFilters.forEach(year => {
        temp_data = filtered_data.filter(entry => entry.year === year);

        let sum = 0;
        temp_data.forEach( datum =>{
            sum += parseFloat(datum.price_final)
        })
        data_line.push({
            time: parseInt(year),
            price: (sum / temp_data.length).toFixed(2)
        });
    });

    // Bar-chart
    data_ratings= [];
    ratingFilters.forEach(rating =>{
        data_ratings.push({
            y: rating,
            x: filtered_data.filter(entry => entry.rating === rating).length
        })
    });

    // Histogram
    data_histogram = [];
    yearFilters.forEach(year => {
        temp_data = filtered_data.filter(entry => entry.year === year);
        data_histogram.push({
            x: parseInt(year),
            y: temp_data.length
        });
    });

    data_histogram.push({           // Have to add this otherwise last column would go outside of svg
        x: parseInt(yearFilters.slice(-1))+1,
        y: 0
    });

    // Pie Chart
    win[0].value = filtered_data.filter( entry => entry.win === 'True').length
    win[1].value = filtered_data.filter(entry => entry.win === 'False' ).length

    linux[0].value = filtered_data.filter( entry => entry.linux === 'True').length
    linux[1].value = filtered_data.filter(entry => entry.linux === 'False' ).length

    mac[0].value = filtered_data.filter( entry => entry.mac === 'True').length
    mac[1].value = filtered_data.filter(entry => entry.mac === 'False' ).length


    update_line_diagram();
    updateBarChart();
    updateHistogram();
    updatePies();
}