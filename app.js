const buttonElements = document.querySelectorAll('button');
// const addElements = document.querySelectorAll('add');
// const removeElements = document.querySelectorAll('remove');
const spanElements = document.querySelectorAll(`.count`);
const spanStock = document.querySelectorAll(`.inventory`)
const moneyElement = document.querySelector('#money');
//game objects
const game = {
ingredients: [
   {name: 'sauce', stock: 5, price: 3},
   {name: "meat", stock: 5, price: 5},
    {name: "dough", stock: 5, price: 2},
    {name: "oregano", stock: 5, price: 1},
    {name: "noodles", stock: 5, price: 2},
    {name: "bread", stock: 5, price: 3}
],
foodOrders: [0],
meals: [
    {name: "pizza", price: 10, sold: 0},
    {name: "sub", price: 10, sold: 0},
    {name: "pasta", price: 10, sold: 0}
],
cartArray: [0,0,0,0,0,0],
money: 100,
}
//this is our bread and butter, run this bad boy whenever you
//want to update the visual of our ingredients.  Incremented an item?
//postCart(), run gameplay loop? postCart()
//scratch your butt? sneeze?  postCart()
function postCart() {
    for(let i=0; i < spanElements.length; i++){
    spanElements[i].textContent=game.cartArray[i]//updates cart
    spanStock[i].textContent=game.ingredients[i].stock //updates Stock
    }
    moneyElement.textContent = `Money: ${game.money}`  //updates money
}
//I'm telling you we use it all the time
//in this case to initialize our arrays
postCart()
//basic random number generator
//feed him variable max to set the max range
//e.g. randomBoi(7) will return values between 0 and 6
function randomBoi(max) {
 return Math.floor(Math.random() * max);
 //math.random returns random number between 0 and 1
 //(not including 1...this matters)
 //if you multiply this by a number e.g. 7 that means
 //you get a number between 0 and 7 (not including 7)
 //math.floor rounds down, so 2.344355 becomes 2,
 //6.7659867 becomes 6.  THUS we arrive at a random value.
 //If this still confuses you, try writing this explanation
 //in your own code a few times
}
function makeFood(x){
    if (x ===0
        && game.ingredients[0].stock > 0
        && game.ingredients[1].stock > 0
        && game.ingredients[2].stock > 0){
            //fulfill pizza order
            game.ingredients[0].stock--
            game.ingredients[1].stock--
            game.ingredients[2].stock--
            game.money += Number(game.meals[0].sellPrice)
            game.meals[0].sold++
        } else if(x === 1
            && game.ingredients[1].stock > 0
            && game.ingredients[3].stock > 0
            && game.ingredients[5].stock > 0)
        {
            // fulfill sub order
            game.ingredients[1].stock--
            game.ingredients[3].stock--
            game.ingredients[5].stock--
            game.money += Number(game.meals[1].sellPrice)
            game.meals[1].sold++
            }  else if( x === 2
                && game.ingredients[0].stock > 0
                && game.ingredients[3].stock > 0
                && game.ingredients[4].stock > 0)
            {
                    // fulfill pasta order
                game.ingredients[0].stock--
                game.ingredients[3].stock--
                game.ingredients[4].stock--
                game.money += Number(game.meals[2].sellPrice);
                game.meals[2].sold++
                }
}
function dinnerTime() {
//push cart to stock
    for(let i=0; i< game.cartArray.length; i++){
        game.ingredients[i].stock = game.ingredients[i].stock + game.cartArray[i]
        game.cartArray[i] = 0;
    }
//generate 20 random orders to simulate
//customers coming to the store
//clear orders from prior day
for(let i= 0; i < 20; i++) {
 const trash = game.foodOrders.pop()
}
//make 20 random orders
for(let i= 0; i < 20; i++) {
 game.foodOrders.push(randomBoi(3))
}
//try to fulfill orders
//"We're firing! 76 beefs! 34 chickens! I need hands!"
for(let i= 0; i < 20; i++) {
    makeFood(game.foodOrders.pop())
}
//in terminal I would log here to tell the
//user how many meals they sold or each type
//in html we would push it to a paragraph
}
buttonElements.forEach((button) => {
    // console.log(button.textContent);
    button.addEventListener(`click`, (event) => {
        //because we gave IDs to rows, we are using IDs to pull
        //their position
        //when we query them as an array (e.g. querySelectorAll)
        const rowID = event.target.parentElement.id.split('')[1];
        // console.log(buttonElements);
        // console.log(buttonElements[rowID-1]);
        // console.log(button.textContent);
        // if (buttonElements[rowID-1].textContent==='+') {
            if (button.textContent==='+') {
        //spanElements is an array of all 6 count classes
        //essentially spanElements[rowID-1] when we click the button in
        //row r1 = spanElements[1-1] = spanElements[0] which is our first
        //count class, meaning this will scale with our iterations
        //so when we click the button in row r2, spanElements[2-1] = spanElements[1]
        //which will be the 2nd (think arrays) count class
        // spanElements[rowID-1].textContent++
        if (game.money >= game.ingredients[rowID-1].price) { //gotta have money to buy
        game.money=game.money-game.ingredients[rowID-1].price
        game.cartArray[rowID-1]++
        postCart() //push cartArray to the html reflection
        }
        } else if(button.textContent==='-')
        {
        // only let the remove from cart if there is something to remove
            if (game.cartArray[rowID-1] > 0){
            game.money= game.money+game.ingredients[rowID-1].price
            game.cartArray[rowID-1]--
            postCart()
            }
        }
        console.log(game.cartArray);
    })
})
// listElements.forEach((itemList) => {
//     console.log(itemList.button)
    // itemList.button.addEventListener('click', () => {
    //     // console.log(event.target.textContent)
    //     console.log(button.textContent);
    //     count.textContent++
    //     // if(button.textContent === `+`) {
    //     //     count.textContent ++;
    //     // }
    // })
// })
