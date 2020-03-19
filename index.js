$(document).ready(function() {
  const DISPLAYS = {
    9: "9AM",
    10: "10AM",
    11: "11AM",
    12: "12PM",
    13: "1PM",
    14: "2PM",
    15: "3PM",
    16: "4PM",
    17: "5PM"
  };

  const now = moment();
  const currentHour = now.hours();

  $("#currentDay").text(now.format("L"));

  function makeTimeBlock(hour) {
    const hourAsNum = parseInt(hour);

    const block = $(
      '<div id="hour-' +
        hour +
        '" class="row time-block">' +
        '<div class="col-md-1 hour">' +
        DISPLAYS[hour] +
        "</div>" +
        '<textarea class="col-md-10 description">' +
        "</textarea>" +
        '<button class="btn saveBtn col-md-1"><i class="fas fa-save"></i></button>' +
        "</div>"
    );

    if (hourAsNum < currentHour) {
      block.addClass("past");
    } else if (hourAsNum === currentHour) {
      block.addClass("present");
    } else {
      block.addClass("future");
    }

    $(block)
      .find(".description")
      .val(window.localStorage.getItem(hour));

    $(block)
      .find(".saveBtn")
      .on("click", function() {
        const event = $(this)
          .siblings(".description")
          .val();

        window.localStorage.setItem(hour, event);
      });

    return block;
  }

  const html = Object.keys(DISPLAYS).map(makeTimeBlock);
  $(".container").append(html);
});
