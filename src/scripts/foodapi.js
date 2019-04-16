console.log("foodapi ROCKS");

foodFactory = (foodItem) => {
    return `<h2>${foodItem.name}</h2>`
}

addFoodToDom = (foodAsHTML) => {
    el.innerHTML += foodAsHTML;
}

function getData(resource){
    el.innerHTML = "";

    fetch(`http://localhost:8088/${resource}`)
        .then(foodResult => {
            console.log(foodResult)
            return foodResult
        })
        .then(foods => foods.json())
        .then(parsedFoods => {
            parsedFoods.forEach(food => {
                const foodAsHTML = foodFactory(food);
                addFoodToDom(foodAsHTML);
            })
        })
}

const el = document.querySelector("#container");
const getDataButton = document.getElementById("btn-getData");
getDataButton.addEventListener("click", () =>  getData("drinks"));

//the following does not work as expected. function is invoked immediately
// getDataButton.addEventListener("click", getData("drinks"));

const getDataButton2 = document.getElementById("btn-getData2");
getDataButton2.addEventListener("click", () => getData("food"));
