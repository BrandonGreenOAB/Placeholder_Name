// f84ef5063c2945efa425f9a031406685 API KEY for spoonacular

$("#foodBtn").on("click", function(e){
    e.preventDefault();
    
})

function food(){

$.ajax({

    method: "GET",
    url: "https://api.spoonacular.com/recipes/complexSearch?query=" + "spaghetti" + "&apiKey=f84ef5063c2945efa425f9a031406685"
}).then(function (response){

    console.log(response);

})};

function drinks() {

$.ajax({
    method: "GET",
    url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"

}).then(function(data){

    console.log(data);

})};
    

drinks();
food();