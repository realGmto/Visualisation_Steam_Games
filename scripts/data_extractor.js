// Data initialization needed for charts
fetch('data/games_data.json')
  .then(response => response.json())
  .then(data => {
    filtered_data = data;
    all_data = filtered_data;
    // Data for Pie charts
    win[0].value = filtered_data.filter( entry => entry.win === 'True').length
    win[1].value = filtered_data.filter(entry => entry.win === 'False' ).length

    linux[0].value = filtered_data.filter( entry => entry.linux === 'True').length
    linux[1].value = filtered_data.filter(entry => entry.linux === 'False' ).length

    mac[0].value = filtered_data.filter( entry => entry.mac === 'True').length
    mac[1].value = filtered_data.filter(entry => entry.mac === 'False' ).length


    // Data for Histogram
    years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    years.forEach(year => {
        temp_data = filtered_data.filter(entry => entry.year === year);
        data_histogram.push({
            x: year,
            y: temp_data.length
        });

        // Data for line_diagram
        let sum = 0;
        temp_data.forEach( datum =>{
            sum += parseFloat(datum.price_final)
        })
        data_line.push({
            time: year,
            price: (sum / temp_data.length).toFixed(2)
        });
    });
    data_histogram.push({           // Have to add this otherwise last column would go outside of svg
        x: 2024,
        y: 0
    });


    // Data for bar_chart
    rating_levels = ['Overwhelmingly Positive','Very Positive','Positive','Mostly Positive','Mixed','Mostly Negative','Negative','Very Negative','Overwhelmingly Negative']

    rating_levels.forEach(rating =>{
        data_ratings.push({
            y: rating,
            x: filtered_data.filter(entry => entry.rating === rating).length
        })
    });


    //Draw all graphs
    Draw_pies();
    Draw_Histogram();
    Draw_Bar_Chart();
    Draw_line_diagram();
  })
  .catch(error => console.error('Error fetching JSON:', error));