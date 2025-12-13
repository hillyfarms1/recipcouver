function dropDownMenu() {
  document.querySelector('.dropMenu').classList.toggle('show');
};
function dropDownMenuTop() {
  document.querySelector('.dropMenuTop').classList.toggle('show');
};

const mediaQuery = window.matchMedia('(min-width: 449px)');
mediaQuery.addEventListener('change', handleScreenChange);
function handleScreenChange(e) {
    const dropMenu = document.getElementById('dropMenu');
  if (e.matches) {
    dropMenu.classList.remove('show');
}};

function getRecipeData() {
  // Fetch the index file that contains recipe data
  return fetch('../data/index.json')
    .then(response => response.json())
    .then(indexData => {
      // Transform the index object into an array of recipe objects
      const recipeData = Object.keys(indexData).map(id => {
          const [book, restaurant, image, title, servingMetric, serving, mealType, difficulty, diet, imgPos] = indexData[id];
          return {
              id: id,
              book: book,
              restaurant: restaurant,
              image: image,
              title: title,
              servingMetric: servingMetric,
              serving: serving,
              mealType: mealType,
              difficulty: difficulty,
              diet: diet,
              imgPos: imgPos
          };
      });
      return recipeData;
    })
    .catch(error => {
        console.error('Error loading recipe index:', error);
        return [];
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() { 
  handleScreenChange(mediaQuery);

});

// Using onclick in html so don't need this...
//function dropDownMenu() {
//  const button = document.getElementById('navButton');
//  const menu = document.getElementById('dropMenu');
//
//    button.addEventListener('click', function(e) {
//        e.stopPropagation();  //stops the menu immediately closing due to the next listener bc this button is in this document
//        menu.classList.toggle('show');
//        });
//
//    document.addEventListener('click', function(e) {
//        if (!menu.contains(e.target) && !button.contains(e.target)) {   //if the click is not on the button or menu then hide
//            menu.classList.remove('show');
//        }
//    });
//};