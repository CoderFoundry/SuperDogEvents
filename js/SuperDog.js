var events = [
    {event:'ComicCon', city:'New York', state:'New York', attendance:240000, date:"06/01/2017"},
    {event:'ComicCon', city:'New York', state:'New York', attendance:250000, date:"06/01/2018"},
    {event:'ComicCon', city:'New York', state:'New York', attendance:257000, date:"06/01/2019"},
    {event:'ComicCon', city:'San Diego', state:'California', attendance:130000, date:"06/01/2017"},
    {event:'ComicCon', city:'San Diego', state:'California', attendance:140000, date:"06/01/2018"},
    {event:'ComicCon', city:'San Diego', state:'California', attendance:150000, date:"06/01/2019"},
    {event:'ComicCon', city:'Charlotte', state:'North Carolina', attendance:40000, date:"06/01/2017"},
    {event:'ComicCon', city:'Charlotte', state:'North Carolina', attendance:45000, date:"06/01/2018"},
    {event:'ComicCon', city:'Charlotte', state:'North Carolina', attendance:50000, date:"06/01/2019"},
];

//the default display for all events
var filteredEvents = events;

//build a dropdown of specific cities
function buildDropDown(){
    let eventDD = document.getElementById("eventDropDown");
    //distinct events for the events array
    let distinctEvents = [...new Set(events.map(event => event.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultHTML = "";

    for (var i = 0; i < distinctEvents.length; i++){
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultHTML += linkHTMLEnd;
    eventDD.innerHTML = resultHTML;

}

function getEvents(element){
    let city = element.getAttribute("data-string");
    filteredEvents = events;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if ( city != 'All' ){
        filteredEvents = events.filter(function (item){
            if(item.city == city){
                return item;
            }
        })
    }

    displayStats();
}
//this will the displays
function displayStats(){
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;
    
    for (var i = 0;  i <filteredEvents.length; i++){
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance){
            most = currentAttendance;
        }

        if ( least > currentAttendance || least < 0){
            least = currentAttendance;
        }
    }

    average = total/filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString((undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}));
}