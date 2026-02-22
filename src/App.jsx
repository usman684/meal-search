import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [userMeal, setUserMeal] = useState("");
  const [noResults, setNoResults] = useState(false);

  async function getMeals(e) {
    e.preventDefault();
    if (!userMeal.trim()) return;

    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${userMeal}`
    );

    if (res.data.meals) {
      setMeals(res.data.meals);
      setNoResults(false);
    } else {
      setMeals([]);
      setNoResults(true);
    }
  }

  return (
    <>
      <nav className="bg-gray-800 text-white text-center text-2xl p-4 font-bold">
        Meal Recipe App
      </nav>

      <nav className="bg-yellow-800 text-white text-center text-2xl p-4 font-bold">
        Menu
      </nav>

      <nav className="bg-red-800 text-white text-center text-1xl p-4 font-bold flex justify-evenly">
        <a>Beef</a>
        <a>Chicken</a>
        <a>Biryani</a>
        <a>Dessert</a>
        <a>Lamb</a>
        <a>Miscellaneous</a>
        <a>Pasta</a>
        <a>Pork</a>
        <a>Seafood</a>
        <a>Side</a>
        <a>Starter</a>
        <a>Vegan</a>
        <a>Vegetarian</a>
        <a>Breakfast</a>
        <a>Goat</a>
      </nav>

      <form onSubmit={getMeals} className="flex justify-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Search Meal..."
          className="border p-2 rounded"
          value={userMeal}
          onChange={(e) => setUserMeal(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 rounded">
          Search
        </button>
      </form>

      {noResults && (
        <p className="text-center text-red-500 mt-6">
          No meals found for "{userMeal}".
        </p>
      )}  

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 px-6">
            {meals.map((ml) => (
              <div key={ml.idMeal} className="shadow-lg rounded overflow-hidden">
                <img className="w-full" src={ml.strMealThumb} alt={ml.strMeal} />
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{ml.strMeal}</h2>
                    {ml.strCategory}<br></br>
                    {ml.idMeal}<br></br>
                    {ml.strTags}
                  </div>
              </div>
            ))}
        </div>
    </>
  );
}
export default App;