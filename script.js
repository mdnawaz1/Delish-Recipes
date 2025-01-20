const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const recipeGrid = document.getElementById('recipe-grid');

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert('Please enter a recipe to search!');
    return;
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();

    recipeGrid.innerHTML = '';
    if (data.meals) {
      data.meals.forEach((meal) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="card-content">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strInstructions.slice(0, 100)}...</p>
          </div>
        `;
        recipeGrid.appendChild(card);
      });
    } else {
      recipeGrid.innerHTML = '<p>No recipes found. Try another search!</p>';
    }
  } catch (error) {
    alert('Error fetching data. Please try again later.');
  }
});
