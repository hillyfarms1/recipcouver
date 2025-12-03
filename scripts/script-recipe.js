function getRecipeIdFromURL() {
    // URLSearchParams reads the ?id=something part of the URL
    const params = new URLSearchParams(window.location.search);
    return params.get('id');  // Gets the value after ?id=
}


async function getRecipesDetails() {
    const recipeId = getRecipeIdFromURL();
    if (!recipeId) {
        console.error('No recipe ID found in URL');
        return;
    }

    const recipeData = await getRecipeData();

    const recipesDetails = recipeData.find(r => r.id === recipeId);
    if (!recipesDetails) {
        console.error('Recipe details not found in index');
        document.body.innerHTML = /*html*/`<p>Recipe not found!</p>`;
        return;
        }
    
    return recipesDetails
}


async function getRecipe() {

    const recipeId = getRecipeIdFromURL();
    if (!recipeId) {
        console.error('No recipe ID found in URL');
        return;
    }

    try {
        const response = await fetch(`../data/${recipeId}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const recipe = await response.json();
        return recipe;
    }

    catch (error) {
        console.error('Error loading recipe:', error);
        const recipeContainer = document.getElementById('recipeContainer');
        if (recipeContainer) {
            recipeContainer.innerHTML = /*html*/`<p>Unable to load recipe. Please try again later.</p>`;
    }};
}


async function displayRecipe() {

    const recipesDetails = await getRecipesDetails();
    const recipe = await getRecipe();
        
        let htmlRecipe = "";
        let recipeContainer = document.getElementById('recipeContainer');

        htmlRecipe += /*html*/ `<h3 class="recipeTitle">${recipe.title}</h3>
                                <h4 class="restaurantTitle">from ${recipe.restaurant}</h4>
                                <img class="heroImg" src="../images/${recipe.heroImage}">`;

        htmlRecipe += /*html*/ `<div class="recipeDetails">
                                    <p class="tl">${recipesDetails.servingMetric}: ${recipesDetails.serving}</p>
                                    <p  class="tr">Course: ${recipesDetails.mealType}</p>
                                    <p class="bl">Difficulty: ${recipesDetails.difficulty}</p>
                                    <p class="br">Diet: ${recipesDetails.diet}</p>
                                </div>`;

        htmlRecipe += /*html*/ `<div class="ingredLst">`;

        recipe.ingredientSections.forEach(function(section){
            htmlRecipe += /*html*/ `<h4 class="ingredLstSectName">${section.heading}</h4>
                                    <ul>`;
            section.items.forEach(function(item){
                htmlRecipe += /*html*/ `<li class="ingredItem">${item}</li>`; 
            });
        });

        htmlRecipe += /*html*/ `</ul>
                                </div>
                                <div class="methodLst">
                                <h4 class="method">Directions</h4>
                                <ul>
                                `;
                                recipe.methodSections.forEach(function(section){
                                    htmlRecipe += /*html*/ `<h4 class="mthdLstSectName">${section.heading}</h4>`;
                                    section.steps.forEach(function(step){
                                        htmlRecipe += /*html*/ `<li>${step}</li>`;                  
                                    });
                                });
        htmlRecipe += /*html*/ `</ul>
                                </div>`;

        recipeContainer.innerHTML = htmlRecipe;

} 


async function headerColor() {

    const recipe = await getRecipe();
    if (recipe.book == "The East Van Foodie") {
        document.documentElement.style.setProperty('--bookColorMain', '#CE0000');
        document.documentElement.style.setProperty('--bookColorHighLight', '#FF0000');
        document.documentElement.style.setProperty('--bookColorBkGrd', '#faebd7');
        document.documentElement.style.setProperty('--bookColorOppst', '#FEDF04');
    }
    if (recipe.book == "The North Shore Foodie") {
        document.documentElement.style.setProperty('--bookColorMain', '#1F431E');
    }
    if (recipe.book == "The Gastown Foodie") {
        document.documentElement.style.setProperty('--bookColorMain', '#700037');
    }
    if (recipe.book == "The Plant-based Foodie") {
        document.documentElement.style.setProperty('--bookColorMain', '#FEDF04');
        document.documentElement.style.setProperty('--bookColorHighLight', '#ffff00');
        document.documentElement.style.setProperty('--bookColorBkGrd', '#ffffc8');
        document.documentElement.style.setProperty('--bookColorOppst', '#FF0000');
    }      
}


displayRecipe();
headerColor();