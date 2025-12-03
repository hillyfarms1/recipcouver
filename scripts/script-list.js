
async function displayList(){
  const recipes = await getRecipeData();  // Wait here until data arrives
  const viewType = document.querySelector('input[name="view"]:checked').value;
  const dietType = document.querySelector('select[name="diet"]').value;
  const bookType = document.querySelector('select[name="book"]').value;
  const diffType = document.querySelector('select[name="difficulty"]').value;
  const mealType = document.querySelector('select[name="meal"]').value;

  let sortedRecipes;

  if(viewType === "restaurant"){
    sortedRecipes = recipes.sort((a, b) => {  // First sort by restaurant
      const restaurantCompare = a.restaurant.localeCompare(b.restaurant);
          if(restaurantCompare !== 0) return restaurantCompare;
          return a.title.localeCompare(b.title); // then sort by title
    });
  }else{
    sortedRecipes = recipes.sort((a, b) => {  // sort by title
      const recipeCompare = a.title.localeCompare(b.title);
          if(recipeCompare !== 0) return recipeCompare;
    });
  };

  if(dietType != "all"){
    sortedRecipes = sortedRecipes.filter(function(recipe){   //sorts by selected diet
      return dietType === recipe.diet;
    })
  };

  if(bookType != "all"){
    sortedRecipes = sortedRecipes.filter(function(recipe){   //sorts by selected book
      return bookType === recipe.book;
    })
  };

    if(diffType != "all"){
    sortedRecipes = sortedRecipes.filter(function(recipe){   //sorts by selected difficulty
      return diffType === recipe.difficulty;
    })
  };

  if(mealType != "all"){
    sortedRecipes = sortedRecipes.filter(function(recipe){   //sorts by selected meal
      return mealType === recipe.mealType;
    })
  };

  let htmlByDietList = "";
  const listDiv = document.getElementById("listDiv");

  htmlByDietList += /*html*/ `<h2>"${dietType}" List Sorted By "${viewType}"</h2>
                              <div class="gridContainer">`;
                              sortedRecipes.forEach(function(recipe){
                                  htmlByDietList += /*html*/ `<div class="recipeCover">
                                                                <a href="../html/recipePage.html?id=${recipe.id}">
                                                                  <div class="recipeCoverHead">
                                                                    <h3>${recipe.title}</h3>
                                                                    <h4>${recipe.restaurant}</h4>
                                                                  </div>
                                                                  <img src="../images/${recipe.image}" loading="lazy" class="recipeCoverImg" style="object-position: ${recipe.imgPos}">
                                                                </a>
                                                              </div>`;
                              });
  htmlByDietList += /*html*/ `</div>`;
  listDiv.innerHTML = htmlByDietList;
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', function(){ 
    displayList();
});





