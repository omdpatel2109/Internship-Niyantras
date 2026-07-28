const item = document.getElementById('item') as HTMLInputElement; //input tag
const addButton = document.getElementById('addButton') as HTMLButtonElement; //button tag
const addedItem = document.getElementById('addedItem') as HTMLUListElement; //output list tag
const sortItem = document.getElementById('sortItem') as HTMLUListElement; //sort item tag ul
const text = document.getElementById('text') as HTMLHeadingElement; //text tag
const sortButton = document.getElementById('sortButton') as HTMLButtonElement; //sort button
const yourItems: string[] = []; //array to store items
const apiData = document.getElementById('apiData') as HTMLUListElement; //API data ul
const combinedDataList = document.getElementById('combinedDataList') as HTMLUListElement; //Combined data ul
const filterButton = document.getElementById('filterButton') as HTMLButtonElement; //Filter button
const cheapProductsList = document.getElementById('cheapProductsList') as HTMLUListElement; //Cheap products ul
const apiButton = document.getElementById('apiButton') as HTMLButtonElement; //API button
interface Product{
    title: string;
    price: number;
}
type ProductTitle = Pick<Product, "title">; //Pick title from Product interface

/*I used the satisfies operator on my application configuration object to ensure it matched 
 the AppConfig interface. It checks that all required properties exist and catches spelling 
 mistakes while preserving the object's specific types for better type inference.*/
interface AppConfig {
    maxItems: number;
    apiUrl: string;
    sortOrder: "asc" | "desc";
}

const config = {
    maxItems: 5,
    apiUrl: "https://fakestoreapi.com/products",
    sortOrder: "asc"
} satisfies AppConfig;



const addItem = (): void => {
    const enteredItem: string = item.value.trim();
    if(enteredItem === ""){
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
    const itemList: HTMLLIElement = document.createElement('li');
    itemList.textContent = enteredItem;
    alert(`${enteredItem} is added to the list.`)

    addedItem.appendChild(itemList);
    yourItems.push(enteredItem); //array for sorting
    item.value = "";
    item.focus();
}

addButton.addEventListener('click', addItem);
item.addEventListener('keydown', function(event: KeyboardEvent): void{
    if(event.key === 'Enter'){
        addItem();
    }
});

//sort the items in the list
const sortedItem = (): void => {
    if(addedItem.children.length == 5){
        text.textContent = `Sorted Items: `;
        // yourItems.sort();
        function sortItems<Type>(items: Type[]): Type[] { //generic function to sort items
            return items.sort();
        }
        const sortedItems: string[] = sortItems(yourItems);
        sortItem.innerHTML = ""; //clear previous sorted items
        sortedItems.forEach((item: string): void => {    
            const finalItems: HTMLLIElement = document.createElement('li');
            finalItems.textContent = item;
            sortItem.appendChild(finalItems);
        });
    }
}
sortButton.addEventListener('click', sortedItem);

//fetch API data
async function fetchData(): Promise<void> {
    const url: string = 'https://fakestoreapi.com/products';
    try{
        const response: Response = await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP server error: ${response.status}`);
        }
        const data: Product[] = await response.json();
        const cheapProducts: Product[] = data.filter((item: Product ) : boolean => { return item.price < 100});
        // const titles: string[] = cheapProducts.map((item: Product) : string =>{ return item.title});
        const titles: ProductTitle[] = cheapProducts.map((item: Product): ProductTitle => {
            return { title: item.title };
        })
        apiData.innerHTML = ""; //clear previous API data
        titles.forEach((title: ProductTitle | string) => {
            const publicData: HTMLLIElement = document.createElement('li');
            publicData.textContent = typeof title === 'string' ? title : title.title;;
            apiData.appendChild(publicData);
        })

        //combine yourItems and API titles and display in combinedDataList
        combinedDataList.innerHTML = "";
        const combinedData: (string | ProductTitle)[] = [...yourItems, ...titles]; //combine yourItems and API titles
        combinedData.forEach((item: string | ProductTitle) => {
            const finalList: HTMLLIElement = document.createElement('li');
            finalList.textContent = typeof item === 'string' ? item : item.title;
            combinedDataList.appendChild(finalList);
        })

    }   
    catch(error){
        console.error('Error fetching data:', error);
        apiData.innerHTML = "<li>Unable to load products.</li>";
    }
}
apiButton.addEventListener('click', fetchData);
