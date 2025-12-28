function dropMenuBottom() {
  document.querySelector('.dropMenuBottom').classList.toggle('show');
};
function dropMenuTop() {
  document.querySelector('.dropMenuTop').classList.toggle('show');
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

//closes the drop menus when click is elsewhere
document.addEventListener('click', e => {
  if (!e.target.closest('.dropMenu') && !e.target.closest('.navButton')) {
        const dropMenus = document.querySelectorAll('.dropMenu');
        dropMenus.forEach(menu => menu.classList.remove('show'));
  }
})

//closes the drop menus when screen width changes
const mediaQuery = window.matchMedia('(min-width: 449px)');
mediaQuery.addEventListener('change', handleScreenChange);
function handleScreenChange(e){
    const dropMenus = document.querySelectorAll('.dropMenu');
    if (e.matches) {
        dropMenus.forEach(menu => menu.classList.remove('show'));
    }
};

//closes the drop menus on scroll
document.addEventListener("scroll", handleScrollChange);
function handleScrollChange(){
    const dropMenus = document.querySelectorAll('.dropMenu');
    dropMenus.forEach(menu => menu.classList.remove('show'));
};


function getRecipeData() {
  // Fetch the index file that contains recipe data
  return fetch('data/index.json')
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

document.addEventListener('DOMContentLoaded', function() { 
  handleScreenChange(mediaQuery);
});