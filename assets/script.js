// calling init function so localstorage is loaded when page is loaded
init()
// getting the item foodstorage or an empty array
var foodStorage = localStorage.getItem("foodStorage") || [];
// getting the item storedDrink or an empty array
var storedDrink = JSON.parse(localStorage.getItem("storedDrink")) || [];
// storearray = to empty array
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
    // food function being called to return a value for foodinput
    food(foodInput);
    // store function being called to return a value for foodinput
    store(foodInput);

});

//logs the input from searchBar element to the console when the foodBtn is clicked
$("#drinkBtn").on("click", function (e) {
    e.preventDefault();

    // make main box go blank with each click
    $("#mainContent").html("");
    $("#mainContent2").html("");
    $("#mainContent3").html("");
    $("#mainContent4").html("");

    //sets a variable that is equal to the value input into the searchBar
    var drinkInput = $("#searchBar").val().trim();
    //calls the drink function to return a value for drinkinput
    drinks(drinkInput);
    //calls the stored function to return a value for drinkinput
    stored(drinkInput);

});

//logs a random recipe to the console when the pickBtn is picked 
$("#foodBtnR").on("click", function (e) {
    e.preventDefault();

    // make main box go blank with each click
    $("#mainContent").empty("")
    $("#mainContent2").empty("")
    $("#mainContent3").empty("")
    $("#mainContent4").empty("")


    //sets a variable that is equal to the value input into the searchBar
    var foodInput = $("#searchBar").val();
    //calls the randomFood function to return a value
    randomFood();
    // calls te random store function to return a value for foodinput
    store(foodInput);

})

//logs a random recipe to the console when the pickBtn is picked 
$("#drinkBtnR").on("click", function (e) {
    e.preventDefault();

    // make main box go blank with each click
    $("#mainContent").empty("");
    $("#mainContent2").empty("");
    $("#mainContent3").empty("");
    $("#mainContent4").empty("");



    //sets a variable that is equal to the value input into the searchBar
    var drinkInput = $("#searchBar").val();

    //calls the randomdrink function to return a value
    randomDrink();
    // calls the random stored fucntion to ruturn a value
    stored(drinkInput);

});

//when the recentButton is clicked, so something
$(document).on("click", ".recentSearch", function (e) {
    e.preventDefault();

    // make main box go blank with each click
    $("#mainContent").empty("");
    $("#mainContent2").empty("");
    $("#mainContent3").empty("");
    $("#mainContent4").empty("");


    //sets a variable that is equal to the value of the button's text
    recentsAppended = $(this).text();

    //calls gettRecFood function to return a value 
    getRecFood(recentsAppended);
    // getting yes in the console
    console.log("yes");

});

//when the recentButton is clicked, do something
$(document).on("click", ".recentSearchDrink", function (e) {
    e.preventDefault();

    // make main box go blank with each click
    $("#mainContent").empty("");
    $("#mainContent2").empty("");
    $("#mainContent3").empty("");
    $("#mainContent4").empty("");


    //sets a variable that is equal to the value of the button's text
    recentsAppended = $(this).text();

    //calls gettRecFood function
    getRecDrink(recentsAppended);
    // getting yes in console
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
        // foodthumb = to newly created image tag
        var foodThumb = $("<img>");
        // foodtitle = to newly created h3 tag
        var foodTitle = $("<h3>");
        // foodtype = to newly created h4 tag
        var foodType = $("<h4>");
        // instructions = to newly created p tag
        var instructions = $("<p>");
        // putting instructions, area, meal into text on the page
        instructions.text(response.meals[0].strInstructions)
        foodType.text("Cuisine type: " + response.meals[0].strArea)
        foodTitle.text(response.meals[0].strMeal);
        // putting foodthumb into a photo on the page along with width and height of the img
        foodThumb.attr("src", response.meals[0].strMealThumb);
        foodThumb.attr("width", "250px");
        foodThumb.attr("height", "250px");
        // putting everything onto the maincontent area
        $("#mainContent").append(foodTitle);
        $("#mainContent").append(foodThumb);
        $("#mainContent").append(foodType);
        // for loop to go through the 20 ingredients
        for (let index = 1; index <= 20; index++) {
            console.log(response.meals[0]["strIngredient" + index]);
            // to get full igredient list on page, added p tags to get in a list
            $('#mainContent2').append('<p>' + response.meals[0]["strMeasure" + index] + " " + response.meals[0]["strIngredient" + index] + '</p>');
        }
        // putting instructions on the page in maincontent
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

        //then runs information through a function
    }).then(function (response) {
        // variables set equal to newly created tags of different types
        var drinkThumb = $("<img>");
        var drinkTitle = $("<h3>");
        var drinkType = $("<h4>");
        var instructionsDrink = $("<p>");
        // instructions, alcoholic, drink being pulled and put into text
        instructionsDrink.text(response.drinks[0].strInstructions)
        drinkType.text(response.drinks[0].strAlcoholic)
        drinkTitle.text(response.drinks[0].strDrink);
        // thumb being put into an src and give a height and width
        drinkThumb.attr("src", response.drinks[0].strDrinkThumb);
        drinkThumb.attr("width", "250px");
        drinkThumb.attr("height", "250px");
        // appending information to the maincontent
        $("#mainContent").append(drinkTitle);
        $("#mainContent").append(drinkThumb);
        $("#mainContent").append(drinkType);
        // for loop cycling through ingrdients
        for (let index = 1; index <= 20; index++) {
            console.log(response.drinks[0]["strIngredient" + index]);
            // to get full igredient list on page, added p tags to get in a list
            if (response.drinks[0]["strMeasure" + index] === null || response.drinks[0]["strIngredient" + index] === null) {
                return;
            }
            // putting instructions, ingredients, and measurements on the maincontent
            $('#mainContent2').append('<p>' + response.drinks[0]["strMeasure" + index] + " " + response.drinks[0]["strIngredient" + index] + '</p>');
            $("#mainContent4").append(instructionsDrink)
        }

    })
};

//create randomFood function to display different foods that aren't ingredient driven
function randomFood() {
    //creates a request for information from the mealdb endpoint 
    $.ajax({

        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/random.php"
    //then runs information through a function
    }).then(function (response) {
        console.log(response);
        // variables equal to newly created tags
        var foodThumb = $("<img>");
        var foodTitle = $("<h3>");
        var foodType = $("<h4>");
        var instructions = $("<p>");
        // pulling instructions, area, and meal to become text
        instructions.text(response.meals[0].strInstructions)
        foodType.text("Cuisine type: " + response.meals[0].strArea)
        foodTitle.text(response.meals[0].strMeal);
        // food title and meal thumb along with heigh and width as attributes
        foodTitle.attr("id", "foodTitle")
        foodThumb.attr("src", response.meals[0].strMealThumb);
        foodThumb.attr("width", "250px");
        foodThumb.attr("height", "250px");
        // appening title, thumb and type to page
        $("#mainContent").append(foodTitle);
        $("#mainContent").append(foodThumb);
        $("#mainContent").append(foodType);
        // for loop cycling through 20 ingredients
        for (let index = 1; index <= 20; index++) {
            // to get full igredient list on page, added p tags to get in a list
            $('#mainContent2').append('<p>' + response.meals[0]["strMeasure" + index] + " " + response.meals[0]["strIngredient" + index] + '</p>');
        }
        // putting instructions on page
        $("#mainContent3").append(instructions)
    })
};

// function for random drinks that aren't ingredient driven
function randomDrink() {
    //creates a request for information from the drinkdb endpoint 
    $.ajax({

        method: "GET",
        url: "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        // runs information through a function
    }).then(function (response) {
        console.log(response);
        // variables equal to newly created tags
        var drinkThumb = $("<img>");
        var drinkTitle = $("<h3>");
        var drinkType = $("<h4>");
        var instructionsDrink = $("<p>");
        // pulling to create text
        instructionsDrink.text("Instructions: " + response.drinks[0].strInstructions)
        drinkType.text("Drink type: " + response.drinks[0].strAlcoholic)
        drinkTitle.text("Beverage Name: " + response.drinks[0].strDrink);
        // pulling to put thrum and size attr
        drinkThumb.attr("src", response.drinks[0].strDrinkThumb);
        drinkThumb.attr("width", "250px");
        drinkThumb.attr("height", "250px");
        // putting content on page
        $("#mainContent").append(drinkTitle);
        $("#mainContent").append(drinkThumb);
        $("#mainContent").append(drinkType);
        // for loop to run through ingredients
        for (let index = 1; index <= 20; index++) {
            // to get full igredient list on page, added p tags to get in a list
            if (response.drinks[0]["strMeasure" + index] === null || response.drinks[0]["strIngredient" + index] === null) {
                return;
            }
            // appening ingredients, measurements, and instructions to page
            $('#mainContent2').append('<li>' + response.drinks[0]["strMeasure" + index] + " " + response.drinks[0]["strIngredient" + index] + '</li>');
            $("#mainContent3").append(instructionsDrink);
        }
    })
};

//creates a function that calls the API and returns an object to the console
function food(foodInput) {
    //creates a request for information from the mealdb endpoint 
    $.ajax({

        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + foodInput
        // runs information through a function
    }).then(function (response) {
        console.log(response);
        // variables equal to newly created tags
        var foodThumb = $("<img>");
        var foodTitle = $("<h3>");
        var foodType = $("<h4>");
        var instructions = $("<p>");
        // pulling to create text
        instructions.text(response.meals[0].strInstructions)
        foodType.text("Cuisine type: " + response.meals[0].strArea)
        foodTitle.text(response.meals[0].strMeal);
        // pulling to put thrum and size attr
        foodThumb.attr("src", response.meals[0].strMealThumb);
        foodThumb.attr("width", "250px");
        foodThumb.attr("height", "250px");
        // putting content on page
        $("#mainContent").append(foodTitle);
        $("#mainContent").append(foodThumb);
        $("#mainContent").append(foodType);
        // for loop to run through ingredients
        for (let index = 1; index <= 20; index++) {
            // to get full igredient list on page, added p tags to get in a list
            if (response.meals[0]["strMeasure" + index] === null || response.meals[0]["strIngredient" + index] === null) {
                return;
            }
            // appening ingredients, measurements, and instructions to page
            $('#mainContent2').append('<p>' + response.meals[0]["strMeasure" + index] + " " + response.meals[0]["strIngredient" + index] + '</p>');
        }
        $("#mainContent3").append(instructions)

    })
};


//creates a function that calls the API and returns an object to the console
function drinks(drinkInput) {
    //creates a request for information from the drinkdb endpoint 
    $.ajax({
        method: "GET",
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkInput
        // runs information through a function
    }).then(function (response) {
        console.log(response);
        // variables equal to newly created tags
        var drinkThumb = $("<img>");
        var drinkTitle = $("<h3>");
        var drinkType = $("<h4>");
        var instructionsDrink = $("<p>");
        // pulling to create text
        instructionsDrink.text("Instructions: " + response.drinks[0].strInstructions);
        drinkType.text("Drink type: " + response.drinks[0].strAlcoholic);
        drinkTitle.text("Beverage Name: " + response.drinks[0].strDrink);
        // pulling to put thrum and size attr
        drinkThumb.attr("src", response.drinks[0].strDrinkThumb);
        drinkThumb.attr("width", "250px");
        drinkThumb.attr("height", "250px");
        // putting content on page
        $("#mainContent").append(drinkTitle);
        $("#mainContent").append(drinkThumb);
        $("#mainContent").append(drinkType);
        // for loop to run through ingredients
        for (let index = 1; index <= 20; index++) {
            // to get full igredient list on page, added p tags to get in a list
            if (response.drinks[0]["strMeasure" + index] === null || response.drinks[0]["strIngredient" + index] === null) {
                return;
            }
            // appening ingredients, measurements, and instructions to page
            $('#mainContent2').append('<li>' + response.drinks[0]["strMeasure" + index] + " " + response.drinks[0]["strIngredient" + index] + '</li>');
            $("#mainContent3").append(instructionsDrink);
        }
    })
};

function store(foodInput) {
    var foodStorage = JSON.parse(localStorage.getItem("foodStorage")) || []
    console.log(foodStorage);

    if (foodInput.length > 3){
        console.log("not defined")
        } else {
        store(foodInput)
        }

    if (foodStorage.indexOf(foodInput) === -1) {
        foodStorage.push(foodInput);
        localStorage.setItem("foodStorage", JSON.stringify(foodStorage));
    }
    
    appendSearch();
}

function stored(drinkInput) {

    var storedDrink = JSON.parse(localStorage.getItem("storedDrink")) || []
    console.log(storedDrink);

    if (drinkInput.length > 3){
        console.log("not defined")
        } else {
        store(drinkInput)
        }
  
    // erika edited to prevent duplicates - can be changed back
    if (storedDrink.indexOf(drinkInput) === -1) {
        storedDrink.push(drinkInput);
        localStorage.setItem("storedDrink", JSON.stringify(storedDrink));
    }

    appendDrinkSearch();
}


function appendSearch() {

    //to get text appended to the left side 
    foodStorage = JSON.parse(localStorage.getItem("foodStorage"))
    console.log(foodStorage)
    $("#leftSide").html("");
    for (let i = 0; i < foodStorage.length; i++) {
        $("#leftSide").append("<p><button class='recentSearch'>" + foodStorage[i] + "</button></p>");

    }
}

function appendDrinkSearch() {

    storedDrink = JSON.parse(localStorage.getItem("storedDrink"))
    console.log(storedDrink)
    $("#leftSide").html("");
    for (let i = 0; i < storedDrink.length; i++) {
        $("#leftSide").append("<p><button class='recentSearchDrink'>" + storedDrink[i] + "</button></p>");

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

// function that checks if there are values stored in local storage and adds them to page upon initialization 
// when the page opens
function init() {


    //sets a variable called textData equal to text contained in the foodStorage key within local storage
    var foodData = localStorage.getItem("foodStorage");
    var drinkData = localStorage.getItem("storedDrink");


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
            appendDrinkSearch();
            
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

//when the recentButton is clicked, so something
$(document).on("click", ".storageValues", function (e) {
    e.preventDefault();

    $("#mainContent").empty("");
    $("#mainContent2").empty("");
    $("#mainContent3").empty("");
    $("#mainContent4").empty("");


    //sets a variable that is equal to the value of the button's text
    buttonText = $(this).text();

    //calls gettRecFood function
    getStoredFood(buttonText);

    

});


function getStoredFood(buttonText) {



    //creates a request for information from the mealdb endpoint and attaches the information stored in the recentsAppended variable
    $.ajax({

        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + buttonText

        //then creates a function 
    }).then(function(response) {


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

