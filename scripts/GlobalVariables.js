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
let data_ratings = []
let data_line = [];
let all_data;



let filters=[];
let filtered_data;


function AddToFilterBar(){
    var newButton = document.createElement("button");

    newButton.className = "filter";
    newButton.classList.add('mx-1');
    if (typeof filters.slice(-1) === 'object'){
        newButton.textContent = JSON.stringify(filters.slice(-1))
        .replaceAll('[','')
        .replaceAll(']','')
        .replaceAll('{','')
        .replaceAll('}','')
        .replaceAll('"',' ');
    }else
        newButton.textContent = filters.slice(-1).toString();

    newButton.addEventListener("click",RemoveFilter);

    var filterBar = document.getElementById("filter-bar");
    var lastButton = filterBar.lastElementChild;

    // Insert the new button before the last button
    filterBar.insertBefore(newButton, lastButton);
}

function RemoveFilter(event){
    event.preventDefault();

    // Get the element that triggered the event
    const clickedButton = event.target

    const text_filter = clickedButton.textContent;

    filters = filters.filter(filter => { 
        if (typeof filter !== 'object') 
            return filter.toString() !== text_filter;
        else{
            temp = JSON.stringify(filter)
            .replaceAll('[','')
            .replaceAll(']','')
            .replaceAll('{','')
            .replaceAll('}','')
            .replaceAll('"',' ');
            return temp !== text_filter
        }
    });

    clickedButton.remove();
}