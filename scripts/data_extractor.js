// Data initialization needed for charts
let win = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 0 },
];

let linux = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 0 },
];

let mac = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 0 },
];

let data_histogram = []


fetch('data/games_data.json')
  .then(response => response.json())
  .then(data => {
    // Data for Pie charts
    win[0].value = data.filter( entry => entry.win === 'True').length
    win[1].value = data.filter(entry => entry.win === 'False' ).length

    linux[0].value = data.filter( entry => entry.linux === 'True').length
    linux[1].value = data.filter(entry => entry.linux === 'False' ).length

    mac[0].value = data.filter( entry => entry.mac === 'True').length
    mac[1].value = data.filter(entry => entry.mac === 'False' ).length

    // Data for Histogram
    years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    years.forEach(year => {
        data_histogram.push({
            x: year,
            y: data.filter(entry => entry.year === year).length
        })
    });
    data_histogram.push({
        x: 2024,
        y: 0
    });


    //Draw Pie charts
    Draw_pies()
    Draw_Histogram()
  })
  .catch(error => console.error('Error fetching JSON:', error));