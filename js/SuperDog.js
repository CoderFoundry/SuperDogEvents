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
  var eventDD = document.getElementById("eventDropDown");
  //discuss this statement
  let distinctEvents = [...new Set(events.map((event) => event.city))];

  let linkHTMLEnd =
    '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
  let resultHTML = "";

  for (var i = 0; i < distinctEvents.length; i++) {
    resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
  }
  resultHTML += linkHTMLEnd;
  eventDD.innerHTML = resultHTML;
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

    eventRow.getElementById("event").textContent = curEvents[i].event;
    eventRow.getElementById("city").textContent = curEvents[i].city;
    eventRow.getElementById("state").textContent = curEvents[i].state;
    eventRow.getElementById("attendance").textContent = curEvents[i].attendance;
    eventRow.getElementById("eventDate").textContent = new Date(
      curEvents[i].date
    ).toLocaleDateString();

    eventBody.appendChild(eventRow);
  }
}

function saveEventData() {
  //grab the events out of local storage
  let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

  document.getElementById("newEventName");
  let obj = {};
  obj["event"] = document.getElementById("newEventName").value;
  obj["city"] = document.getElementById("newEventCity").value;
  obj["state"] = document.getElementById("newEventState").value;
  obj["attendance"] = parseInt(
    document.getElementById("newEventAttendance").value,
    10
  );
  obj["date"] = new Date(
    document.getElementById("newEventDate").value
  ).toLocaleDateString();

  curEvents.push(obj);

  localStorage.setItem("eventsArray", JSON.stringify(curEvents));

  //Access the values from the form by ID and add an object to the array.
  displayData();
}