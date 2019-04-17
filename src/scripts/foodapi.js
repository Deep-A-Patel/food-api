// create function to get all food data (local and api) and input into DOM

function getData() {
    //grab HTML to inject food data
    let foodlist = document.querySelector(".foodList");
    // clear element
    foodlist.innerHTML = "";
    // fetch LOCAL food data
    fetch("http://localhost:8088/food")
    .then (response => response.json())
    .then(parsedFoods => {
        //console.table shows data in console as a table
        console.table(parsedFoods);
        // loop over local food data, grab barcode and use it to fetch API data
        parsedFoods.forEach(item => {
            fetch(`http://world.openfoodfacts.org/api/v0/product/${item.barcode}.json`)
            .then(APIfoods => APIfoods.json())
            .then(parsedAPIfoods => {
                //target html element and inject DOM element created by foodFactory function
                // In below, item is from local API, parsedAPI foods is from online
                foodlist.innerHTML += foodFactory(item, parsedAPIfoods);
            });
        });
    });
}

// input local and API food data to create DOM element
function foodFactory(localFood, apiFood) {
    return `
    <div class="Item">
        <h2>${localFood.name}</h2>
        <h3>${localFood.ethnicity}</h3>
        <p>${localFood.category}</p>
        <p>Country: ${apiFood.product.countries}</p>
        <p>Calories: ${apiFood.product.nutriments.energy_serving}</p>
        <p>Fat: ${apiFood.product.nutriments.fat_serving}</p>
        <p class="ingredients">Ingredients: ${apiFood.product.ingredients_text}</p>
    </div>
    `;
}

const getDataBtn = document.getElementById("btn-get-data");
getDataBtn.addEventListener("click", () => getData());