
init();
var foodStorage = localStorage.getItem("storedFood") || [];
var drinkStorage = localStorage.getItem("storedDrink") || [];

var storeArray = [];
//logs the input from searchBar element when the foodBtn is clicked

$("#foodBtn").on("click", function (e) {
    e.preventDefault();

    // make main box go blank with each click

    $("#mainContent").html("")
    $("#mainContent2").html("")
    $("#mainContent3").html("")
    $("#mainContent4").html("")

    //sets a variable that is equal to the value input into the searchBar
    var foodInput = $("#searchBar").val().trim();


    food(foodInput);

    store(foodInput);

    appendSearch();

});

//logs the input from searchBar element to the console when the foodBtn is clicked
$("#drinkBtn").on("click", function (e) {
    e.preventDefault();

    $("#mainContent").empty("");
    $("#mainContent2").empty("");
    $("#mainContent3").empty("");
    $("#mainContent4").empty("");


    //sets a variable that is equal to the value input into the searchBar
    var drinkInput = $("#searchBar").val();

    //calls the randomFood function
    stored(drinkInput);
    drinks(drinkInput);
    appendDrinkSearch();

});


//logs a random recipe to the console when the pickBtn is picked 
$("#foodBtnR").on("click", function (e) {
    e.preventDefault();

    $("#mainContent").empty("")
    $("#mainContent2").empty("")
    $("#mainContent3").empty("")
    $("#mainContent4").empty("")


    //sets a variable that is equal to the value input into the searchBar
    var foodInput = $("#searchBar").val();

    //calls the randomFood function
    randomFood();
    store(foodInput);
    appendSearch();

})

//logs a random recipe to the console when the pickBtn is picked 
$("#drinkBtnR").on("click", function (e) {
    e.preventDefault();

    $("#mainContent").empty("");
    $("#mainContent2").empty("");
    $("#mainContent3").empty("");
    $("#mainContent4").empty("");



    //sets a variable that is equal to the value input into the searchBar
    var drinkInput = $("#searchBar").val();

    //calls the randomFood function
    randomDrink();
    stored(drinkInput);
    appendDrinkSearch();

});

//when the recentButton is clicked, so something
$(document).on("click", ".recentSearch", function (e) {
    e.preventDefault();

    $("#mainContent").empty("");
    $("#mainContent2").empty("");
    $("#mainContent3").empty("");
    $("#mainContent4").empty("");


    //sets a variable that is equal to the value of the button's text
    recentsAppended = $(this).text();

    //calls gettRecFood function
    getRecFood(recentsAppended);

    console.log("yes");

});



//when the recentButton is clicked, so something
$(document).on("click", ".recentSearchDrink", function (e) {
    e.preventDefault();

    $("#mainContent").empty("");
    $("#mainContent2").empty("");
    $("#mainContent3").empty("");
    $("#mainContent4").empty("");


    //sets a variable that is equal to the value of the button's text
    recentsAppended = $(this).text();

    //calls gettRecFood function
    getRecDrink(recentsAppended);

    console.log("yes");

});

//creates a function that calls the API and returns an object to the console
function getRecFood() {


    //log recentsAppended to the console
    console.log("hello");


    //creates a request for information from the mealdb endpoint and attaches the information stored in the recentsAppended variable
    $.ajax({

        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + recentsAppended

        //then creates a function 
    }).then(function (response) {


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



        for (let index = 1; index <= 20; index++) {
            console.log(response.meals[0]["strIngredient" + index]);
            // erika edited to get full igredient list on page, added p tags to get in a list

            $('#mainContent2').append('<p>' + response.meals[0]["strMeasure" + index] + " " + response.meals[0]["strIngredient" + index] + '</p>');

        }

        $("#mainContent4").append(instructions)

    })
};


//creates a function that calls the API and returns an object to the console
function getRecDrink() {


    //log recentsAppended to the console
    console.log("hello");


    //creates a request for information from the mealdb endpoint and attaches the information stored in the recentsAppended variable
    $.ajax({

        method: "GET",
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + recentsAppended

        //then creates a function 
    }).then(function (response) {


        var drinkThumb = $("<img>");

        var drinkTitle = $("<h3>");

        var drinkType = $("<h4>");

        var instructionsDrink = $("<p>");

        // var ytVideo = $(<iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)
        // ytVideo.attr("src", response.meals[0].strYoutube)

        instructionsDrink.text(response.drinks[0].strInstructions)

        drinkType.text(response.drinks[0].strAlcoholic)

        drinkTitle.text(response.drinks[0].strDrink);

        drinkThumb.attr("src", response.drinks[0].strDrinkThumb);
        drinkThumb.attr("width", "250px");
        drinkThumb.attr("height", "250px");

        $("#mainContent").append(drinkTitle);

        $("#mainContent").append(drinkThumb);

        $("#mainContent").append(drinkType);



        for (let index = 1; index <= 20; index++) {
            console.log(response.drinks[0]["strIngredient" + index]);
            // erika edited to get full igredient list on page, added p tags to get in a list

            if (response.drinks[0]["strMeasure" + index] === null || response.drinks[0]["strIngredient" + index] === null) {
                return;
            }

            $('#mainContent2').append('<p>' + response.drinks[0]["strMeasure" + index] + " " + response.drinks[0]["strIngredient" + index] + '</p>');
            $("#mainContent4").append(instructionsDrink)
        }

    })
};




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

        instructions.text(response.meals[0].strInstructions)

        foodType.text("Cuisine type: " + response.meals[0].strArea)

        foodTitle.text(response.meals[0].strMeal);
        foodTitle.attr("id", "foodTitle")

        foodThumb.attr("src", response.meals[0].strMealThumb);

        foodThumb.attr("width", "250px");
        foodThumb.attr("height", "250px");

        $("#mainContent").append(foodTitle);
        $("#mainContent").append(foodThumb);
        $("#mainContent").append(foodType);

        for (let index = 1; index <= 20; index++) {
            // erika edited to get full igredient list on page, added p tags to get in a list

            $('#mainContent2').append('<p>' + response.meals[0]["strMeasure" + index] + " " + response.meals[0]["strIngredient" + index] + " " + '</p>');
        }
        $("#mainContent3").append(instructions)
    })
};

//create a function the connects the searchBar input to the food function when foodBtn is clicked
//create a function the connects the searchBar input to the food function when foodBtnR is clicked
function randomDrink() {

    $.ajax({

        method: "GET",
        url: "https://www.thecocktaildb.com/api/json/v1/1/random.php"

    }).then(function (response) {
        console.log(response);
        var drinkThumb = $("<img>");
        var drinkTitle = $("<h3>");
        var drinkType = $("<h4>");
        var instructionsDrink = $("<p>");
        // var ytVideo = $(<iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)
        // ytVideo.attr("src", response.meals[0].strYoutube)
        instructionsDrink.text("Instructions: " + response.drinks[0].strInstructions)
        drinkType.text("Drink type: " + response.drinks[0].strAlcoholic)
        drinkTitle.text("Beverage Name: " + response.drinks[0].strDrink);
        drinkThumb.attr("src", response.drinks[0].strDrinkThumb);
        drinkThumb.attr("width", "250px");
        drinkThumb.attr("height", "250px");
        $("#mainContent").append(drinkTitle);
        $("#mainContent").append(drinkThumb);
        $("#mainContent").append(drinkType);
        for (let index = 1; index <= 20; index++) {
            // erika edited to get full igredient list on page, added p tags to get in a list
            if (response.drinks[0]["strMeasure" + index] === null || response.drinks[0]["strIngredient" + index] === null) {
                return;
            }
            $('#mainContent2').append('<p>' + response.drinks[0]["strMeasure" + index] + " " + response.drinks[0]["strIngredient" + index] + " " + '</p>');

            $("#mainContent4").append(instructionsDrink)
        }
    })
};

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


            // to get full igredient list on page, added p tags to get in a list
            if (response.meals[0]["strMeasure" + index] === null || response.meals[0]["strIngredient" + index] === null) {
                return;
            }

            $('#mainContent2').append('<p>' + response.meals[0]["strMeasure" + index] + " " + response.meals[0]["strIngredient" + index] + '</p>');

        }


        $("#mainContent3").append(instructions)

    })
};


//creates a function that calls the API and returns an object to the console
function drinks(drinkInput) {

    $.ajax({
        method: "GET",
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkInput

    }).then(function (response) {
        console.log(response);
        var drinkThumb = $("<img>");
        var drinkTitle = $("<h3>");
        var drinkType = $("<h4>");
        var instructionsDrink = $("<p>");

        instructionsDrink.text("Instructions: " + response.drinks[0].strInstructions);
        drinkType.text("Drink type: " + response.drinks[0].strAlcoholic);
        drinkTitle.text("Beverage Name: " + response.drinks[0].strDrink);
        drinkThumb.attr("src", response.drinks[0].strDrinkThumb);
        drinkThumb.attr("width", "250px");
        drinkThumb.attr("height", "250px");
        $("#mainContent").append(drinkTitle);
        $("#mainContent").append(drinkThumb);
        $("#mainContent").append(drinkType);

        for (let index = 1; index <= 20; index++) {
            // erika edited to get full igredient list on page, added p tags to get in a list
            if (response.drinks[0]["strMeasure" + index] === null || response.drinks[0]["strIngredient" + index] === null) {
                return;
            }

            $('#mainContent2').append('<li>' + response.drinks[0]["strMeasure" + index] + " " + response.drinks[0]["strIngredient" + index] + '</li>');
            $("#mainContent3").append(instructionsDrink);


        }


    })
};

function store(foodInput) {

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

function stored(drinkInput) {

    var searchlocal = JSON.parse(localStorage.getItem("drinkStorage"))
    console.log(searchlocal);
    if (searchlocal === null) {
        drinkStorage = [drinkInput];
    } else {
        drinkStorage.push(drinkInput)
    }
    console.log(drinkStorage);
    localStorage.setItem("drinkStorage", JSON.stringify(drinkStorage));



    // erika edited to prevent duplicates - can be changed back
    if (drinkStorage.indexOf(drinkInput) === -1) {
        drinkStorage.push(drinkInput);
        localStorage.setItem("storedDrink", JSON.stringify(drinkStorage));
    }

}


function appendSearch(appendLeft) {

console.log("appendSearch");

    var appendLeft = $("<button class='recentSearch'>")
    appendLeft.text(foodStorage[foodStorage.length - 1]);

    $("#leftSide").append(appendLeft);

    //erika edited to get text appended to the left side can change back

    // $("#leftSide").html("");
    // for (let i = 0; i < foodStorage.length; i++) {
    //     $("#leftSide").append("<p><button class='recentSearch'>" + foodStorage[i] + "</button></p>");

    // }
}

function appendDrinkSearch() {

console.log("appendDrinkSearch");

    var appendLeft1 = $("<button class='recentSearchDrink'>")
    appendLeft1.text(drinkStorage[drinkStorage.length - 1]);

    $("#leftSide").append(appendLeft1);

    // $("#leftSide").html("");
    // for (let i = 0; i < drinkStorage.length; i++) {
    //     $("#leftSide").append("<p><button class='recentSearchDrink'>" + drinkStorage[i] + "</button></p>");

    // }
}


function appendSocialMedia() {


    var appendBottom = $("<button>");
    appendBottom.text(foodStorage[foodStorage.length]);

    $("#socialmedia").append(appendBottom);

    for (let i = 0; i < foodStorage.length; i++) {
        $("#socialmedia").append("<p><button>" + foodStorage[i] + "</button></p>");


    }

}

// function that checks if there are values stored in local storage and adds them to page upon initialization 
// when the page opens
function init() {


    //sets a variable called textData equal to text contained in the foodStorage key within local storage
    var foodData = localStorage.getItem("foodStorage");
    var drinkData = localStorage.getItem("drinkStorage");


    //if textData has a value
    if (foodData !== null) {
        //parse local storage values into an array contained within the variable parsedData
        var parsedFoodData = JSON.parse(foodData);

        //scan through the parse data and store returned values in a variable called parsedValue
        for (let index = 0; index < parsedFoodData.length; index++) {
            parsedFoodValue = parsedFoodData[index];

            console.log(parsedFoodValue);
            savedAppend(parsedFoodValue);
            
        }



        //if textData has a value
        if (drinkData !== null) {
            //parse local storage values into an array contained within the variable parsedData
            var parsedDrinkData = JSON.parse(drinkData);

            //scan through the parse data and store returned values in a variable called parsedValue
            for (let index = 0; index < parsedDrinkData.length; index++) {
                parsedDrinkValue = parsedDrinkData[index];
                
                console.log(parsedDrinkValue);
                savedAppend(parsedDrinkData);
            }

           
            savedAppend();
        }
    }

}

 // creates a new function that will turn the values of parsed food and drink data into buttons and append them to to the leftSide column
 function savedAppend(text) {


    //creates button with the class of storageValues
    var appendSaved = $("<button class='storageValues'></button>")
    
    //makes the text of appendSaved text and appends it to the leftside column as
    appendSaved.text(text);
    console.log(appendSaved);
    $("#leftSide").append(appendSaved);

}



