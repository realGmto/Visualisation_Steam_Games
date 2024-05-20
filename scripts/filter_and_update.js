function Filter_and_update(){
    if (filter instanceof String){
        filtered_data = all_data.filter(entry => entry);
    }
    else if(filter instanceof Int){
        filtered_data = all_data.filter(entry => entry.year === filter);
    }
    else{
        filtered_data = all_data;
    }
}