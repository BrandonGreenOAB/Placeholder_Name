// f84ef5063c2945efa425f9a031406685 API KEY for spoonacular

var foodStorage = [];
//logs the input from searchBar element when the foodBtn is clicked

//when the foodBtn is clicked, so something
$("#foodBtn").on("click", function (e) {
       e.preventDefault();

    // make main box go blank with each click
    $("#mainBox").html("")
    $("#mainContent").html("")
    $("#mainContent2").html("")
    $("#mainContent3").html("")
    $("#mainContent4").html("")
    $("#mainContent5").html("")

    //sets a variable that is equal to the value input into the searchBar
    var foodInput = $("#searchBar").val();
    var foodInput = $("#searchBar").val().trim();

    //calls food function
    food(foodInput);
    
    //calls store function
    store(foodInput);

    //calls appendSearch function
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

//when the recentButton is clicked, so something
$(document).on("click",".recentButton", function (e) {
    e.preventDefault();

    //sets a variable that is equal to the value of the button's text
    recentsAppended = $(this).text();
    
console.log(recentsAppended);

    //calls gettRecFood function
    getRecFood(recentsAppended);

    console.log("yes");

});

//creates a function that calls the API and returns an object to the console
function food(foodInput) {

    $.ajax({

        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + foodInput

    }).then(function(response) {

        console.log(response);

        var foodResults = $("<p>");

        var foodThumb = $("<img>");

        var foodTitle = $("<h3>");

        var foodType = $("<h4>");

        var instructions = $("<p>");

        // var ytVideo = $(<iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)
        // ytVideo.attr("src", response.meals[0].strYoutube)

        instructions.text(response.meals[0].strInstructions)

        foodType.text("Cuisine type: " + response.meals[0].strArea)

        foodResults.text(response.meals[0].strIngredient1);
        foodTitle.text(response.meals[0].strMeal);

        $("#mainBox").append(foodResults);

        foodThumb.attr("src", response.meals[0].strMealThumb);
        foodThumb.attr("width", "250px");
        foodThumb.attr("height", "250px");

        $("#mainContent").append(foodTitle);

        $("#mainContent").append(foodThumb);

        $("#mainContent").append(foodType);

        // $("#mainContent5").append(ytVideo);
        

        for (let index = 1; index <= 20; index++) {
          

                // erika edited to get full igredient list on page, added p tags to get in a list
                $('#mainBox').append('<p>' + response.meals[0]["strIngredient" + index] + '</p>');
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

    var searchlocal = JSON.parse(localStorage.getItem("foodStorage"))
    console.log(searchlocal);
    if (searchlocal === null) {
        foodStorage = [foodInput];
    } else {
        foodStorage.push(foodInput)
    }
    console.log(foodStorage);
    localStorage.setItem("foodStorage", JSON.stringify(foodStorage));
}

//function that appends the local storage information to a button element within the leftSide ID element
function appendSearch() {

    //creates a variable called appendLeft and set's it's ID to recentButton
    var appendLeft = $("<button>").attr("class", "recentButton");
    appendLeft.text(foodStorage[foodStorage.length - 1]);

    $("#leftSide").append(appendLeft);

    appendLeft.text

} 

//creates a function that calls the API and returns an object to the console
function getRecFood() {

    // make main box go blank with each click
    $("#mainBox").empty("");
    
    //log recentsAppended to the console
    console.log(recentsAppended);

     
//creates a request for information from the mealdb endpoint and attaches the information stored in the recentsAppended variable
    $.ajax({

        method: "GET",
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + recentsAppended 

    //then creates a function 
    }).then(function(response) {

        //logs the result of the function to the console
        console.log(response);

        //sets a new variable equal to a newly created p tag
        var recentText  = $("<p>");
        
        var foodThumb = $("<img>");

        var foodTitle = $("<h3>");

        var foodType = $("<h4>");

        var instructions = $("<p>");

        var foodResults = $("<p>");
        
        //passes the object targeted by 0.strInstructions and turns it into text within the recentText variable
        recentText.text(response.meals[0].strInstructions);

        foodType.text("Cuisine type: " + response.meals[0].strArea);

        foodResults.text(response.meals[0].strIngredient1);

        foodTitle.text(response.meals[0].strMeal);

        $("#mainBox").append(foodResults);
        foodThumb.attr("src", response.meals[0].strMealThumb);
        foodThumb.attr("width", "250px");
        foodThumb.attr("height", "250px");

        $("#mainContent").append(foodTitle);

        $("#mainContent").append(foodThumb);

        $("#mainContent").append(foodType);

        // $("#mainContent5").append(ytVideo);

        for (let index = 1; index <= 20; index++) {
            console.log(response.meals[0]["strIngredient" + index]);

         // erika edited to get full igredient list on page, added p tags to get in a list
         $('#mainBox').append('<p>' + response.meals[0]["strIngredient" + index] + '</p>');
         $('#mainContent2').append('<p>' + response.meals[0]["strMeasure" + index] + " " + response.meals[0]["strIngredient" + index] + '</p>');

     }

     $("#mainContent5").append(instructions)

 })
};