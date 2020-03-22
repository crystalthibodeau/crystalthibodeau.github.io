"use strict";

//================================= FUNCTION TO DISPLAY COFFEE NAME & ROAST ==========================================//

function renderCoffee(coffee) {
    var html = '<body class="coffee">';

    html += '<div class="roastAndNameDiv">'
        + '<span class="name">'
        + coffee.name
        + '</span>'
        + " " + '<span class="roast">'
        + coffee.roast + '</span>' +'</div>';
    html += '</body>';

    return html;
}
// Added color to coffee.roast items in the array using a span tag with a style property of color.//

//====================== LOOPS ARRAY TO DISPLAY ALL COFFEE NAMES AND ROASTS (ASCENDING ORDER) ========================//

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

//=== Descending Order function ===//
// function renderCoffees(coffees) {
//     var html = '';
//     for(var i = coffees.length - 1; i >= 0; i--) {
//         html += renderCoffee(coffees[i]);
//     }
//     return html;
// }

//===================================== DISPLAYS COFFEE LIST PER SELECTION ===========================================//

function updateCoffees(e) {
    // alert("test");
    if (typeof e != "string") {//if coming in as an object(and NOT as a string), dont 'run' submit, just show results
        //above line not needed without the functionality of the submit button
        e.preventDefault();
        //alert("test-e");
        // don't submit the form, we just want to update the data
        // var selectedRoast = roastSelection.value; // === "light/dark" etc....
    }

    var filteredCoffees = [];
    var allCoffee = [];
    var filter = coffeeFilter.value.toUpperCase();


    //coffeeFilter.value attaches input from search to value property
    coffees.forEach(function(coffee) {
        var name = coffee.name.toUpperCase();
        //must match filter for even comparison
        if(coffee.roast === roastSelection.value && name.indexOf(filter) !== -1) {
            //indexOf === 'instance of' + value
            filteredCoffees.push(coffee); // adding to empty 'bucket'
            tbody.innerHTML = renderCoffees(filteredCoffees);
            //adds text to html via renderCoffees, but only passing in filtered coffees, showing in tbody area
        }
        else if(roastSelection.value === "All" && name.indexOf(filter) !== -1) {
            allCoffee.push(coffee);
            tbody.innerHTML = renderCoffees(allCoffee);
        }
        else if(coffee.roast === roastSelection.value && name.indexOf(filter) === -1) {
            tbody.innerHTML = renderCoffees(filteredCoffees);
        }
        else if(roastSelection.value === "All" && name.indexOf(filter) === -1) {
            tbody.innerHTML = renderCoffees(allCoffee);
        }

    });
}

// function updateCoffees(e) {
//
//     e.preventDefault(); // don't submit the form, we just want to update the data
//     // var selectedRoast = roastSelection.value; // === "light/dark" etc....
//     var filteredCoffees = [];
//     var allCoffee = [];
//     coffees.forEach(function(coffee) {
//
//         if(coffee.roast === roastSelection.value) {
//             filteredCoffees.push(coffee);
//             tbody.innerHTML = renderCoffees(filteredCoffees);
//         }
//         else if(coffee.roast === roastSelection.value){
//             filteredCoffees.push(coffee);
//             tbody.innerHTML = renderCoffees(filteredCoffees);
//         }
//         else if(coffee.roast === roastSelection.value){
//             filteredCoffees.push(coffee);
//             tbody.innerHTML = renderCoffees(filteredCoffees);
//         }
//         else if(roastSelection.value === "all") {
//             allCoffee.push(coffee);
//             tbody.innerHTML = renderCoffees(allCoffee)
//         }
//     });
//
// }

//============================================= COFFEE ARRAY =========================================================//

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'Light'},
    {id: 2, name: 'Half City', roast: 'Light'},
    {id: 3, name: 'Cinnamon', roast: 'Light'},
    {id: 4, name: 'City', roast: 'Medium'},
    {id: 5, name: 'American', roast: 'Medium'},
    {id: 6, name: 'Breakfast', roast: 'Medium'},
    {id: 7, name: 'High', roast: 'Dark'},
    {id: 8, name: 'Continental', roast: 'Dark'},
    {id: 9, name: 'New Orleans', roast: 'Dark'},
    {id: 10, name: 'European', roast: 'Dark'},
    {id: 11, name: 'Espresso', roast: 'Dark'},
    {id: 12, name: 'Viennese', roast: 'Dark'},
    {id: 13, name: 'Italian', roast: 'Dark'},
    {id: 14, name: 'French', roast: 'Dark'},
];


//=================================================ADDING A NEW COFFEE================================================//

function addCoffee(e) {
    e.preventDefault();

    var newRoast = document.getElementById('new-roast').value;
    var newName = document.getElementById('new-name').value;

    var coffee = {
        id: coffees.length + 1,
        name: newName,
        roast: newRoast
    };

    coffees.push(coffee);
    updateCoffees(e); // wipes out wish list, refills it with gifts array
    document.getElementById("new-name").value = "";
}
// function renderWishList() {
//     var giftString = "";
//     gifts.forEach(function(gift) {
//         giftString += "<li>" + gift + "</li>";
//     });
//     document.getElementById("wishList").innerHTML = giftString;
// }
// renderWishList();
//===================================== VARIABLES AND SUBMIT EVENT LISTENER ==========================================//

var tbody = document.getElementsByTagName('div')[4];
// THIS VAR WAS BEING USED BY THE EVENT LISTENER FOR 'submitButton'//
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeFilter = document.querySelector('#coffee-filter');
//#coffee-filter attaches ID to 'search/input' fields
roastSelection.addEventListener('change', updateCoffees);//next two lines update home page to display all coffees when refreshed
document.getElementById('roast-selection').value = 'All';
updateCoffees("");

submitButton.addEventListener('click', addCoffee);

// roastSelection.addEventListener('change', updateCoffees);

// THE SUBMIT BUTTON EVENT LISTENER DOESN'T NEED TO BE USED BE IS A GOOD REFERENCE//
// submitButton.addEventListener('click', updateCoffees);


