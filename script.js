//Place date at the top of page under title
var today = moment().format('MMM Do, YYYY');;
$('#currentDay').text(today);
console.log(today);

//save data put into time slots to the local storage so that it is saved when page is refreshed
var todos = [];

// This function is being called below and will run when the page loads.
//localStorage.setItem
localStorage.setItem("input", "text");
function init() {
    // Get stored todos from localStorage
    var storedTodos = JSON.parse(localStorage.getItem("todos"));

    renderTodos();
}
//create an if statement to check the current time against time slots 
var currentTime = moment().hour();
    
var allDescriptions = document.querySelectorAll(".description");

allDescriptions.forEach(function(timeBlock) {
    var timeBlockhHour = $(timeBlock).closest(".time-block").attr("hour");
    console.log(timeBlockhHour);
    if (currentTime > timeBlockhHour) {
        $(timeBlock).addClass("past");
    } else if (currentTime < timeBlockhHour) {
        $(timeBlock).addClass("future");
    } else if (currentTime == timeBlockhHour) {
        $(timeBlock).addClass("present");
    }
});

var allsaveBtn = document.querySelectorAll(".saveBtn");

allsaveBtn.forEach(function(saveBtn) {
   $(saveBtn).on("click", function() {
       //get id
       var hour = $(saveBtn).closest(".time-block").attr("hour");
       //get texrt
       var text = $(`[hour="${hour}"]`).find(".description").val();
       //build new data
       var newData = {
           hour: hour,
           text: text
       }
       //get old data
       var oldData = JSON.parse(localStorage.getItem("data")) || [];
       //update old data with new data
       oldData.push(newData);
       //stroe data
       localStorage.setItem("data",JSON.stringify(oldData));
   })
});

var data = JSON.parse(localStorage.getItem("data")) || [];
data.forEach(function(datum) {
    var query = `[hour="${datum.hour}"]`;
    $(query).find(".description").val(datum.text);
});