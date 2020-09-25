// f84ef5063c2945efa425f9a031406685 API KEY for spoonacular

var foodStorage = JSON.parse(localStorage.getItem("storedFood")) || [];
var upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
appendSearch();

randomFoodResults = [];
randomResults = "";


//logs the input from searchBar element when the foodBtn is clicked

$("#foodBtn").on("click", function (e) {
    e.preventDefault();

    // make main box go blank with each click

    $("#mainBox").html("")

    //sets a variable that is equal to the value input into the searchBar
    var foodInput = $("#searchBar").val();

    //calls food function
    food(foodInput);

    store(foodInput);

    appendSearch();

});

//logs the input from searchBar element to the console when the foodBtn is clicked
$("#drinkBtn").on("click", function (e) {
    e.preventDefault();

    //sets a variable that is equal to the value input into the searchBar
    var drinkInput = $("#searchBar").val();

    //calls drink function
    drinks(drinkInput);


});

//logs a random recipe to the console when the pickBtn is picked 
$("#foodBtnR").on("click", function (e) {
    e.preventDefault();

    $("#mainBox").html("")

    //sets a variable that is equal to the value input into the searchBar
    var foodInput = $("#searchBar").val();

    //calls the randomFood function
    randomFood();
    store(foodInput);

})
//create a function the connects the searchBar input to the food function when foodBtnR is clicked
function randomFood(foodInput) {

    $.ajax({

        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/search.php?f=a"

    }).then(function (result) {

        console.log(result);
  
            
        }

    })
};

//logs a random recipe to the console when the pickBtn is picked 
$("#drinkBtnR").on("click", function (e) {
    e.preventDefault();

    //calls the randomFood function
    randomFood();

    //create a function the connects the searchBar input to the food function when foodBtn is clicked

})
//creates a function that calls the API and returns an object to the console
function food(foodInput) {

    $.ajax({

        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + foodInput

    }).then(function (response) {

        console.log(response);

        var foodResults = $("<p>");

        foodResults.text(response.meals[0].strIngredient1);

        $("#mainBox").append(foodResults);

        for (let index = 0; index <= 20; index++) {
            // to get full igredient list on page, added p tags to get in a list
            $('#mainBox').append('<p>' + response.meals[0]["strIngredient" + index] + '</p>');
        }

    })
};

//creates a function that calls the API and returns an object to the console
function drinks(drinkInput) {

    $.ajax({
        method: "GET",
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkInput

    }).then(function (data) {

        console.log(data);

    })
};

function store(foodInput) {
    // to prevent duplicates and to save food to local storage
    if (foodStorage.indexOf(foodInput) === -1) {
        foodStorage.push(foodInput);
        localStorage.setItem("storedFood", JSON.stringify(foodStorage));
    }
}

function appendSearch() {
    // to get text appended to the left side 
    $("#leftSide").html("");
    for (let i = 0; i < foodStorage.length; i++) {
        $("#leftSide").append("<p><button>" + foodStorage[i] + "</button></p>");

    }

} 