var events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
  },
];

//the default display is all events
var filteredEvents = events;

//build a dropdown of specific cities
function buildDropDown() {

  //grab the select list we want to add city names to.
  var eventDD = document.getElementById("eventDropDown");

  //grab a template we want to use to populate the select list
  const template = document.getElementById("cityDD-template");



  //Pull the events from local storage if there are none pull form the
  //default data.
  curEvents = JSON.parse(localStorage.getItem("eventsArray"));
  if (curEvents == null) {
    curEvents = events;
  }

  let distinctEvents = [...new Set(curEvents.map((event) => event.city))];



  let ddItemNode = document.importNode(template.content, true);
  ddItem = ddItemNode.querySelector("a");
  ddItem.setAttribute("data-string", "All");
  ddItem.textContent = "All";
  eventDD.appendChild(ddItem);

  for (var i = 0; i < distinctEvents.length; i++) {
    ddItemNode = document.importNode(template.content, true);
    ddItem = ddItemNode.querySelector("a");
    ddItem.setAttribute("data-string", distinctEvents[i]);
    ddItem.textContent = distinctEvents[i];
    eventDD.appendChild(ddItem);
  }
  displayStats();
  displayData();
}

//show stats for a specific location
function getEvents(element) {
  let city = element.getAttribute("data-string");
  curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
  filteredEvents = curEvents;

  document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
  if (city != "All") {
    //Explain how array filtering works-
    filteredEvents = curEvents.filter(function (item) {
      if (item.city == city) {
        return item;
      }
    });
  }
  displayStats();
}

function displayStats() {
  let total = 0;
  let average = 0;
  let most = 0;
  let least = -1;
  let currentAttendance = 0;

  //display total attendance
  for (var i = 0; i < filteredEvents.length; i++) {
    currentAttendance = filteredEvents[i].attendance;
    total += currentAttendance;

    if (most < currentAttendance) {
      most = currentAttendance;
    }

    if (least > currentAttendance || least < 0) {
      least = currentAttendance;
    }
  }
  average = total / filteredEvents.length;

  document.getElementById("total").innerHTML = total.toLocaleString();
  document.getElementById("most").innerHTML = most.toLocaleString();
  document.getElementById("least").innerHTML = least.toLocaleString();
  document.getElementById("average").innerHTML = average.toLocaleString(
    undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  );
}

function displayData() {
  const template = document.getElementById("eventData-template");
  const eventBody = document.getElementById("eventBody");
  //clear table first
  eventBody.innerHTML = "";
  //grab the events from local storage
  let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];

  if (curEvents.length == 0) {
    curEvents = events;
    localStorage.setItem("eventsArray", JSON.stringify(curEvents));
  }

  for (var i = 0; i < curEvents.length; i++) {
    const eventRow = document.importNode(template.content, true);
    //grab only the columns in the template
    eventCols = eventRow.querySelectorAll("td");

    eventCols[0].textContent = curEvents[i].event;
    eventCols[1].textContent = curEvents[i].city;
    eventCols[2].textContent = curEvents[i].state;
    eventCols[3].textContent = curEvents[i].attendance;
    eventCols[4].textContent = new Date(
      curEvents[i].date
    ).toLocaleDateString();

    eventBody.appendChild(eventRow);
  }
}

function saveEventData() {
  //grab the events out of local storage
  let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

  //document.getElementById("newEventName");
  let obj = {};
  obj["event"] = document.getElementById("newEventName").value;
  obj["city"] = document.getElementById("newEventCity").value;
  obj["state"] = document.getElementById("newEventState").value;
  obj["attendance"] = parseInt(
    document.getElementById("newEventAttendance").value,
    10
  );

  let eventDate = document.getElementById("newEventDate").value;
  let eventDate2 = `${eventDate} 00:00`

  obj["date"] = new Date(eventDate2).toLocaleDateString();

  curEvents.push(obj);

  localStorage.setItem("eventsArray", JSON.stringify(curEvents));
  //clear the form
  //Access the values from the form by ID and add an object to the array.
  buildDropDown();
  displayData();
}