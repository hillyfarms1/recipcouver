const filterValues = {
  diet: 'all',
  book: 'all',
  difficulty: 'all',
  meal: 'all'
};

async function displayList(){
  const recipes = await getRecipeData();  // Wait here until data arrives
  const viewType = document.querySelector('input[name="view"]:checked').value;
  const dietType = filterValues.diet;
  const bookType = filterValues.book;
  const diffType = filterValues.difficulty;
  const mealType = filterValues.meal;

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
  const filtersElement = document.querySelector('.otherFilters');
  const isOpening = !filtersElement.classList.contains('show');
  
  if (isOpening) {
    // When opening, add show class first
    filtersElement.classList.add('show');
    
    // Then allow overflow after animation completes (300ms)
    setTimeout(() => {
      filtersElement.querySelector('div').style.overflow = 'visible';
    }, 300);
  } else {
    // When closing, hide overflow immediately
    filtersElement.querySelector('div').style.overflow = 'hidden';
    
    // Then remove show class
    filtersElement.classList.remove('show');
  }
}


function showNav(){
  document.addEventListener('scroll', () => {
    if(window.scrollY > 400){
      document.querySelector('.indexNav').classList.add('show');
    }else{
      document.querySelector('.indexNav').classList.remove('show');
    }
  })
};

function initCustomDropdowns() {
  const dropdowns = document.querySelectorAll('.custom-dropdown');
  
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-button');
    const menu = dropdown.querySelector('.dropdown-menu');
    const options = menu.querySelectorAll('button');
    const dropdownType = button.dataset.dropdown;
    
    // Toggle dropdown on button click
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Close all other dropdowns
      document.querySelectorAll('.custom-dropdown').forEach(dd => {
        if (dd !== dropdown) {
          dd.classList.remove('open');
        }
      });
      
      // Toggle this dropdown
      dropdown.classList.toggle('open');
    });
    
    // Handle option selection
    options.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const value = this.dataset.value;
        const text = this.textContent;
        
        // Update button text
        button.querySelector('.dropdown-text').textContent = text;
        
        // Update filter value
        filterValues[dropdownType] = value;
        
        // Update selected state
        options.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        
        // Close dropdown
        dropdown.classList.remove('open');
        
        // Refresh the list
        displayList();
      });
    });
    
    // Keyboard navigation
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
      }
    });
    
    // Navigate options with arrow keys
    menu.addEventListener('keydown', function(e) {
      const focusedOption = document.activeElement;
      const optionsArray = Array.from(options);
      const currentIndex = optionsArray.indexOf(focusedOption);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % optionsArray.length;
        optionsArray[nextIndex].focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + optionsArray.length) % optionsArray.length;
        optionsArray[prevIndex].focus();
      }
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        button.focus();
      }
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-dropdown')) {
      document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        dropdown.classList.remove('open');
      });
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function(){ 
    displayList();
    showNav();
    initCustomDropdowns();
});