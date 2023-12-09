let Button = document.querySelector("#drop_down_button");

let Content = document.querySelector(".content-container");

let container1_1 = document.querySelector(".container1-1")

let close = true;

Button.addEventListener("click", drop_menu);

function drop_menu(){
    if(Content.style.display=="none" || close==true){
        Content.style.display = "block";
        container1_1.style.backgroundColor = "rgba(0, 0, 0, 0.211)";
        close = false;
    }
    else{
        Content.style.display = "none";
        container1_1.style.backgroundColor = "";
    }
}