let Item;
let Price;
let Item_name;
let Item_count = 0;
let Item_number = 0;

// Define the setCookie function
function setCookie(something, value, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${something}=${value}; ${expires}; path=/`;
}

function deleteAllCookies() {
    Item_number = 0;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

deleteAllCookies(); //delete all cookies by default;

console.log(document.cookie); // check current cookie
// Attach click event listeners to buy buttons
document.querySelectorAll('.buy').forEach(function(anchor) {
    anchor.addEventListener('click', function() {
        // Get the value of the 'for' attribute and assign it to the Item variable
        Item = anchor.getAttribute('for');

        // Get the price and item name based on the clicked item
        Price = parseFloat(document.querySelector(`.${Item} .price_number`).textContent);
        Item_name = document.querySelector(`.${Item} .item_name`).textContent;

        // Increment the count for the current item
        let itemCount = parseInt(getCookie(`Count_${Item_name}`)) || 0;
        itemCount++;
        setCookie(`Count_${Item_name}`, itemCount, 365);

        // Set cookies
        setCookie(`Price_${Item_name}`, Price, 365);
        setCookie('Item_number', Item_number + 1, 365);
        Item_number += 1;

        // Log the updated values
       // console.log('Item:', Item);
        //console.log(`Price: ${Price}`);
        //console.log(`Item_name : ${Item_name}`);
        //console.log(`Count_${Item_name} : ${itemCount}`);

        // Log the current cookies
        console.log(document.cookie);
    });
});

function getCookie(name) {
    console.log(`cookies before split: `,document.cookie);
    const cookies = document.cookie.split(';');
    console.log(`cookies after split: ${cookies}`);
    console.log(`cookies length: ${cookies.length}`);
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        console.log(`cookies${i} : ${cookie}`);
        if (cookie.startsWith(name + '=')) {
            console.log(`name ${name.length}`);
            console.log(`return cooki.substring: ${cookie.substring(name.length + 1)}`);
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

let opencart = document.querySelector(".cart-item");
opencart.addEventListener('click', function() {
    // Add code to handle the cart item click
});
