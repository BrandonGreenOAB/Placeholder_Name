// f84ef5063c2945efa425f9a031406685 API KEY for spoonacular
// removed by erika
// var foodStorage = [];

var foodStorage = JSON.parse(localStorage.getItem("storedFood")) || [];
appendSearch();

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
$("#pickBtn").on("click", function (e) {
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

        for (let index = 1; index <= 20; index++) {
            // erika edited to get full igredient list on page, added p tags to get in a list
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

//creates a function that calls a random food API and logs the result in the console 
function randomFood() {

    $.ajax({
        method: "GET",
        url: "https://api.spoonacular.com/recipes/random?apiKey=f84ef5063c2945efa425f9a031406685"

    }).then(function (result) {

        console.log(result);

    })
};

function store(foodInput) {
    // //stores searcHistory array in local storage under the key name recentSearch
    // localStorage.setItem("foodStorage", foodInput);

    // // 
    // localStorage.setItem("foodStorage", JSON.stringify(foodStorage));

    // var searchlocal = JSON.parse(localStorage.getItem("foodStorage"))
    // console.log(searchlocal);
    // if (searchlocal === null) {
    //     foodStorage = [foodInput];
    // } else {
    //     foodStorage.push(foodInput)
    // }
    // console.log(foodStorage);
    // localStorage.setItem("foodStorage", JSON.stringify(foodStorage));

    // erika edited to prevent duplicates - can be changed back
    if (foodStorage.indexOf(foodInput) === -1) {
        foodStorage.push(foodInput);
        localStorage.setItem("storedFood", JSON.stringify(foodStorage));
    }
}

function appendSearch() {

    // var appendLeft = $("<button>");
    // appendLeft.text(foodStorage[foodStorage.length]);

    // $("#leftSide").append(appendLeft);
    // adds recent searches to page

    // erika edited to get text appended to the left side can change back
    $("#leftSide").html("");
    for (let i = 0; i < foodStorage.length; i++) {
        $("#leftSide").append("<p><button>" + foodStorage[i] + "</button></p>");

    }

} 