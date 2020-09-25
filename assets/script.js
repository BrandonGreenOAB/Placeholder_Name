// f84ef5063c2945efa425f9a031406685 API KEY for spoonacular

var foodStorage = JSON.parse(localStorage.getItem("storedFood")) || [];
appendSearch();

randomFoodResults = [];
randomResults = "";



var foodStorage = [];
//logs the input from searchBar element when the foodBtn is clicked

$("#foodBtn").on("click", function (e) {
    e.preventDefault();

    // make main box go blank with each click

    $("#mainContent").html("")
    $("#mainContent2").html("")
    $("#mainContent3").html("")
    $("#mainContent4").html("")
    $("#mainContent5").html("")


    //sets a variable that is equal to the value input into the searchBar
    var foodInput = $("#searchBar").val().trim();

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

    $("#mainContent2").html("")

    //sets a variable that is equal to the value input into the searchBar
    var foodInput = $("#searchBar").val();

    //calls the randomFood function
    randomFood();
    store(foodInput);

})
//create a function the connects the searchBar input to the food function when foodBtnR is clicked
function randomFood() {

    $.ajax({

        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/random.php"

    }).then(function (response) {
        console.log(response);
        var foodThumb = $("<img>");
        var foodTitle = $("<h3>");
        var foodType = $("<h4>");
        var instructions = $("<p>");
        // var ytVideo = $(<iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)
        // ytVideo.attr("src", response.meals[0].strYoutube)
        instructions.text(response.meals[0].strInstructions)
        foodType.text("Cuisine type: " + response.meals[0].strArea)
        foodTitle.text(response.meals[0].strMeal);
        foodThumb.attr("src", response.meals[0].strMealThumb);
        foodThumb.attr("width", "350px");
        foodThumb.attr("height", "350px");
        $("#mainContent").append(foodTitle);
        $("#mainContent").append(foodThumb);
        $("#mainContent").append(foodType);
        // $("#mainContent5").append(ytVideo);
        for (let index = 1; index <= 20; index++) {
            // erika edited to get full igredient list on page, added p tags to get in a list
            $('#mainContent2').append('<p>' + response.meals[0]["strIngredient" + index] + '</p>');        }

        $("#mainContent5").append(instructions)
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

        var foodThumb = $("<img>");

        var foodTitle = $("<h3>");

        var foodType = $("<h4>");

        var instructions = $("<p>");

        // var ytVideo = $(<iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)
        // ytVideo.attr("src", response.meals[0].strYoutube)

        instructions.text(response.meals[0].strInstructions)

        foodType.text("Cuisine type: " + response.meals[0].strArea)

        foodTitle.text(response.meals[0].strMeal);

        foodThumb.attr("src", response.meals[0].strMealThumb);
        foodThumb.attr("width", "250px");
        foodThumb.attr("height", "250px");

        $("#mainContent").append(foodTitle);

        $("#mainContent").append(foodThumb);

        $("#mainContent").append(foodType);

        // $("#mainContent5").append(ytVideo);

        for (let index = 1; index <= 20; index++) {

            // erika edited to get full igredient list on page, added p tags to get in a list

            $('#mainContent2').append('<p>' + response.meals[0]["strMeasure" + index] + " " + response.meals[0]["strIngredient" + index] + '</p>');

        }

        $("#mainContent5").append(instructions)

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

    // //stores searcHistory array in local storage under the key name recentSearch
    // localStorage.setItem("foodStorage", foodInput);

    // // 
    // localStorage.setItem("foodStorage", JSON.stringify(foodStorage));


    var searchlocal = JSON.parse(localStorage.getItem("foodStorage"))
    console.log(searchlocal);
    if (searchlocal === null) {
        foodStorage = [foodInput];
    } else {
        foodStorage.push(foodInput)
    }
    console.log(foodStorage);
    localStorage.setItem("foodStorage", JSON.stringify(foodStorage));



    // erika edited to prevent duplicates - can be changed back
    if (foodStorage.indexOf(foodInput) === -1) {
        foodStorage.push(foodInput);
        localStorage.setItem("storedFood", JSON.stringify(foodStorage));
    }

}

function appendSearch() {



    var appendLeft = $("<button>");
    appendLeft.text(foodStorage[foodStorage.length]);

    $("#leftSide").append(appendLeft);

    //erika edited to get text appended to the left side can change back

    $("#leftSide").html("");
    for (let i = 0; i < foodStorage.length; i++) {
        $("#leftSide").append("<p><button>" + foodStorage[i] + "</button></p>");


    }

}

function appendSocialMedia() {


    var appendBottom = $("<button>");
    appendBottom.text(foodStorage[foodStorage.length]);

    $("#socialmedia").append(appendBottom);

    for (let i = 0; i < foodStorage.length; i++) {
        $("#socialmedia").append("<p><button>" + foodStorage[i] + "</button></p>");


    }

} 