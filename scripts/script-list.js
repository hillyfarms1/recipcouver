
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

  htmlByDietList += /*html*/ `<div class="gridContainer">`
                              sortedRecipes.forEach(function(recipe){
                                  let restColor;
                                  if(recipe.book === "The East Van Foodie"){
                                      restColor = "#ca0000ff"
                                  }else if(recipe.book === "The North Shore Foodie"){
                                      restColor = "#1F431E"
                                  }else if(recipe.book === "The Plant-based Foodie"){
                                      restColor = "#f1d500ff"
                                  }else if(recipe.book === "The Gastown Foodie"){
                                      restColor = "#700037"
                                  }else{
                                      restColor = "#0044ffff"
                                  }

                                  htmlByDietList += /*html*/ `<div class="recipeCover">
                                                                <a href="../html/recipePage.html?id=${recipe.id}">
                                                                <img src="../images/${recipe.image}" loading="lazy" class="recipeCoverImg" style="object-position: ${recipe.imgPos}">
                                                                  <div class="recipeCoverHead">
                                                                    <h4 style="color: ${restColor}">${recipe.restaurant}</h4>
                                                                    <h3>${recipe.title}</h3>
                                                                  </div>
                                                                </a>
                                                              </div>`;
                              });
  htmlByDietList += /*html*/ `</div>`;
  listDiv.innerHTML = htmlByDietList;
};

function toggleFilters() {
  document.querySelector('.otherFilters').classList.toggle('show');
};

function showNav(){
  document.addEventListener('scroll', () => {
    if(window.scrollY > 400){
      document.querySelector('.indexNav').classList.add('show');
    }else{
      document.querySelector('.indexNav').classList.remove('show');
    }
  })
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function(){ 
    displayList();
    showNav();
});





