// f84ef5063c2945efa425f9a031406685 API KEY for spoonacular
function food(){
$.ajax({

    method: "GET",
    url: "https://api.spoonacular.com/recipes/complexSearch?query=" + "spaghetti" + "&apiKey=f84ef5063c2945efa425f9a031406685"
}).then(function (response){
    console.log(response)
})};

food();