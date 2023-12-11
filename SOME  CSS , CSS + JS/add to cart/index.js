let Item;
let Price;
let Item_name;
let cart_list =document.querySelector('.my-list');
let check_first_time = true;
let cart_delete_button = document.querySelector('.delete-cart-item');

// Define the setCookie function
function setCookie(something, value, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${something}=${value}; ${expires}; path=/`;
}


function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    check_first_time = true;

}

function add_total_to_list() {
    let total = 0; // Use a different variable name to avoid conflicts
    for (let i = 0; i < cart_list.children.length; i++) {
        let temp_child = cart_list.children[i].textContent;

        if (temp_child.includes("(")) {
            let indexOfOpenParen = temp_child.indexOf("(") + 1;
            let indexOfCloseParen = temp_child.indexOf(")");
            
            // Extract the substring between parentheses and convert it to a number
            let child_target = parseInt(temp_child.substring(indexOfOpenParen, indexOfCloseParen).trim());

            //console.log(`CHILDDDD_TARGETTTT: ${child_target}`);
            total += child_target; // Add the extracted value to the total
        }
    }
    if (total!=0 && check_first_time == true){
        let Total_price=document.createElement("li");
        Total_price.classList.add("Mytotal");
        Total_price.textContent=`Total: ${total}`;
        cart_list.append(Total_price);
        check_first_time = false;
        //console.log(`check first time : ${check_first_time}`);
        cart_delete_button.style.display ="block";
    }
    else if(check_first_time == false){
        //console.log("ERRO");
        let Total_price_clone = document.querySelector(".Mytotal");
        Total_price_clone.textContent = `Total: ${total}`;
    }
    else{

    }

    console.log(`Total: ${total}`);
}

function add_item_to_list_function() {
    let target = getCookieItemName();
    for (let i = 0; i < target.length; i++) {
        //console.log("first for");
        //console.log(`target!! : ${target}`);
        let indexOfB = target[i].indexOf("=");
        let real_target = target[i].substring(0, indexOfB);
        let real_target_number = getCookie(`Count_${real_target}`);
        let real_target_price = parseInt(getCookie(`Price_${real_target}`));
        //console.log(`real target: ${real_target}`);
        let classFound = false;
        for (let y = 0; y < cart_list.children.length; y++) {
            //console.log("Enter second for");
            let child = cart_list.children[y];
            if (child.classList.contains(real_target)) {
                classFound = true;
                child.textContent = `${real_target} : ${real_target_number} (${real_target_price * real_target_number})`;
                break;
            }
        }

        if (!classFound) {
            let List = document.createElement("li");
            List.classList.add(`${real_target}`);
            List.textContent = `${real_target} : ${real_target_number} (${real_target_price * real_target_number})`;
            //console.log("children.length = 0 or class not found");
            cart_list.prepend(List);
        }
    }
    add_total_to_list();
}

window.onload = function () {
    add_item_to_list_function();
};





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
        add_item_to_list_function();
    });
});


function getCookie(name) {
    //console.log(`cookies before split: `,document.cookie);
    const cookies = document.cookie.split(';');
    //console.log(`cookies after split: ${cookies}`);
    //console.log(`cookies length: ${cookies.length}`);
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        //console.log(`cookies${i} : ${cookie}`);
        if (cookie.startsWith(name + '=')) {
            //console.log(`name ${name}`);
            //console.log(`name length ${name.length}`);
            //console.log(`return cooki.substring: ${cookie.substring(name.length + 1)}`);
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
    /////// get cookie to send to the cart_list/////
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
            //console.log(`cookie: ${cookie}`);
            temp.push(cookie.substring(6));
        }
    }
    return temp;
}
///////////

let opencart = document.querySelector(".cart-item");
opencart.addEventListener('click', function() {
    // Add code to handle the cart item click
});

//////////start coding for My cart///
let cart_button = document.querySelector('.cart-item');
let close = true;

cart_button.addEventListener('click',function(){
    //console.log(`cart_list : ${cart_list.children.length}`);
    if(cart_list.style.display=="none"|| close==true){
        cart_list.style.display="block";
        close = false;
    }
    else{
        cart_list.style.display="none";
    }
    if(cart_list.children.length == 1){
        //console.log(`cart_list is none`);
        cart_delete_button.style.display =  "none";
    }
    else if(cart_list.children.length != 1){
        cart_delete_button.style.display = "block";
    }

});


function deleteAllCookies() {
    Item_number = 0;
    Total = 0;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}


cart_delete_button.addEventListener('click',function(){
    deleteAllCookies(); //delete all cookies by default;
    location.reload();
    cart_delete_button.style.display ="none";
});






