let Item;
let Price;
let Item_name;
let cart_list =document.querySelector('.my-list');

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

function Lastfunction() {
    let target = getCookieItemName();

    for (let i = 0; i < target.length; i++) {
        console.log("first for");
        let indexOfB = target[i].indexOf("=");
        let real_target = target[i].substring(0, indexOfB);
        let real_target_number = getCookie(`Count_${real_target}`);
        let real_target_price = getCookie(`Price_${real_target}`);
        console.log(`real target: ${real_target}`);

        let classFound = false;

        for (let y = 0; y < cart_list.children.length; y++) {
            console.log("Enter second for");
            let child = cart_list.children[y];

            if (child.classList.contains(real_target)) {
                classFound = true;
                child.textContent = `${real_target} : ${real_target_number} (${real_target_price})`;                break;
            }
        }

        if (!classFound) {
            let List = document.createElement("li");
            List.classList.add(`${real_target}`);
            List.textContent = `${real_target} : ${real_target_number} (${real_target_price})`;
            console.log("children.length = 0 or class not found");
            cart_list.appendChild(List);
        }
    }
}

window.onload = function () {
    Lastfunction();
};



//deleteAllCookies(); //delete all cookies by default;

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

        let Item_number = parseInt(getCookie(`Item_number`)) || 0;
        setCookie('Item_number', Item_number + 1, 365);

        // Log the updated values
       // console.log('Item:', Item);
        //console.log(`Price: ${Price}`);
        //console.log(`Item_name : ${Item_name}`);
        //console.log(`Count_${Item_name} : ${itemCount}`);

        // Log the current cookies
        console.log(document.cookie);
        Lastfunction();
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
            console.log(`name ${name}`);
            console.log(`name length ${name.length}`);
            console.log(`return cooki.substring: ${cookie.substring(name.length + 1)}`);
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function getCookieItemName() {
    //console.log(`cookies before split: `,document.cookie);
    const cookies = document.cookie.split(';');
    //console.log(`cookies after split: ${cookies}`);
    //console.log(`cookies length: ${cookies.length}`);
    let temp =[];
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        //console.log(`cookies${i} : ${cookie}`);
        if (cookie.startsWith("Count_")) {
            console.log(`cookie: ${cookie}`);
            temp.push(cookie.substring(6));
        }
    }
    return temp;
}


let opencart = document.querySelector(".cart-item");
opencart.addEventListener('click', function() {
    // Add code to handle the cart item click
});

//////////start coding for My cart///
let cart_button = document.querySelector('.cart-item');
let close = true;

cart_button.addEventListener('click',function(){
    if(cart_list.style.display=="none"|| close==true){
        cart_list.style.display="block";
        close = false;
    }
    else{
        cart_list.style.display="none";
    }

});

    /////// get cookie to send to the cart_list/////






