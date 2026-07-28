"use strict";
const item = document.getElementById('item'); //input tag
const addButton = document.getElementById('addButton'); //button tag
const addedItem = document.getElementById('addedItem'); //output list tag
const sortItem = document.getElementById('sortItem'); //sort item tag ul
const text = document.getElementById('text'); //text tag
const sortButton = document.getElementById('sortButton'); //sort button
const yourItems = []; //array to store items
const apiData = document.getElementById('apiData'); //API data ul
const combinedDataList = document.getElementById('combinedDataList'); //Combined data ul
const filterButton = document.getElementById('filterButton'); //Filter button
const cheapProductsList = document.getElementById('cheapProductsList'); //Cheap products ul
const apiButton = document.getElementById('apiButton'); //API button
const config = {
    maxItems: 5,
    apiUrl: "https://fakestoreapi.com/products",
    sortOrder: "asc"
};
const addItem = () => {
    const enteredItem = item.value.trim();
    if (enteredItem === "") {
        alert(`Add valid item..`);
        return;
    }
    // if(addedItem.children.length >= 5){
    //     alert("All items are added..");
    //     return;
    // }
    if (addedItem.children.length >= config.maxItems) {
        alert("All items are added.");
        return;
    }
    const url = config.apiUrl;
    const itemList = document.createElement('li');
    itemList.textContent = enteredItem;
    alert(`${enteredItem} is added to the list.`);
    addedItem.appendChild(itemList);
    yourItems.push(enteredItem); //array for sorting
    item.value = "";
    item.focus();
};
addButton.addEventListener('click', addItem);
item.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addItem();
    }
});
//sort the items in the list
const sortedItem = () => {
    if (addedItem.children.length == 5) {
        text.textContent = `Sorted Items: `;
        // yourItems.sort();
        function sortItems(items) {
            return items.sort();
        }
        const sortedItems = sortItems(yourItems);
        sortItem.innerHTML = ""; //clear previous sorted items
        sortedItems.forEach((item) => {
            const finalItems = document.createElement('li');
            finalItems.textContent = item;
            sortItem.appendChild(finalItems);
        });
    }
};
sortButton.addEventListener('click', sortedItem);
//fetch API data
async function fetchData() {
    const url = 'https://fakestoreapi.com/products';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP server error: ${response.status}`);
        }
        const data = await response.json();
        const cheapProducts = data.filter((item) => { return item.price < 100; });
        // const titles: string[] = cheapProducts.map((item: Product) : string =>{ return item.title});
        const titles = cheapProducts.map((item) => {
            return { title: item.title };
        });
        apiData.innerHTML = ""; //clear previous API data
        titles.forEach((title) => {
            const publicData = document.createElement('li');
            publicData.textContent = typeof title === 'string' ? title : title.title;
            ;
            apiData.appendChild(publicData);
        });
        //combine yourItems and API titles and display in combinedDataList
        combinedDataList.innerHTML = "";
        const combinedData = [...yourItems, ...titles]; //combine yourItems and API titles
        combinedData.forEach((item) => {
            const finalList = document.createElement('li');
            finalList.textContent = typeof item === 'string' ? item : item.title;
            combinedDataList.appendChild(finalList);
        });
    }
    catch (error) {
        console.error('Error fetching data:', error);
        apiData.innerHTML = "<li>Unable to load products.</li>";
    }
}
apiButton.addEventListener('click', fetchData);
