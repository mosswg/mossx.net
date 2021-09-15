

const menu_list_id = "menu_list";

var menu_amimation = null;
var menu_is_open = false;
var menu_is_chaging = false;
var menu = null;
var menu_elements = document.getElementsByClassName("menu_collapsible");
var current_menu_index = 0;
        
function create_menu() {

    var _menu = document.getElementsByClassName("menu_horizontal");
    if (_menu[0]) {
        menu = _menu[0];

    }
    else {
        _menu = document.getElementsByClassName("menu_vertical");
        if (_menu[0]) {
            menu = _menu[0];
        }
    }
    if (menu)
        create_menu_elements();
    else {
        console.error("create_menu called but no element with menu(menu_vertical or menu_horizontal) class");
    }
}

function create_menu_elements() {
    var menu_list = document.createElement('div');  // main menu list div
    menu_list.classList = "menu_list btn-group"; 
    
    

    
    var file_uri = document.baseURI.split('/');
    file_name = file_uri[file_uri.length-1];

    if (file_name == "sierpinski.html") {
        var button_class = "btn btn-outline-light menu_item ";
    }
    else {
        var button_class = "btn btn-outline-secondary menu_item ";
    }

    var open_button = document.createElement('a');
    open_button["role"] = "button";
    open_button.text = "☰";
    open_button.classList = button_class + "menu_static";
    open_button.onclick = toggleMenu;
    
    menu_list.appendChild(open_button);
    
    var menu_item = document.createElement('a');
    menu_item["role"] = "button";
    menu_item.classList = button_class + "menu_collapsible";
    if (file_name != "index.html") {
        menu_item.text = "Home";
        menu_item.href = "/";
    }
    else {
        menu_item.text = "About Me";
        menu_item.href = "about";
    }
    menu_list.appendChild(menu_item);

    menu_item = document.createElement('a');
    menu_item["role"] = "button";
    menu_item.classList = button_class + "menu_collapsible";
    if (file_name != "sierpinski.html") {
        menu_item.text = "Sierpinski's Triangle";
        menu_item.href = "sierpinski";
    }
    else {
        menu_item.text = "About Me";
        menu_item.href = "about";
    }
    menu_list.appendChild(menu_item);


    menu_item = document.createElement('a');
    menu_item["role"] = "button";
    menu_item.classList = button_class + "menu_collapsible";
    menu_item.text = "Source";
    menu_item.href = "https://github.com/mossx-dev/mossx.net";
    
    menu_list.appendChild(menu_item);

    menu_item = document.createElement('a');
    menu_item["role"] = "button";
    menu_item.classList = button_class + "menu_collapsible";
    menu_item.text = "Activism";
    menu_item.href = "https://www.thequeerkiwi.com";
    
    menu_list.appendChild(menu_item);



    menu.appendChild(menu_list);           //appending the element

    // <div class="menu_list btn-group">
	// 		<a role="button" class="btn btn-outline-secondary menu_item menu_static" onclick="toggleMenu()">&#9776;</a>
	// 		<a role="button" class="btn btn-outline-secondary menu_item menu_collapsible" href="about">About Me</a>
	// 		<a role="button" class="btn btn-outline-secondary menu_item menu_collapsible" href="sierpinski">Sierpinski's Triangle</a>
	// 		<a role="button" class="btn btn-outline-secondary menu_item menu_collapsible" href="https://github.com/mossx-dev/mossx.net">Source</a>
	// 		<a role="button" class="btn btn-outline-secondary menu_item menu_collapsible" href="https://www.thequeerkiwi.com/">Activism</a>

	// 	</div>
}


function toggleMenu() {

    if (!menu_is_chaging) {
        if (menu_is_open) {
            menu_is_chaging = true;
            menu_amimation = setInterval(closeMenu, 100);
            menu_is_open = false;
        }   
        else {
            menu_is_chaging = true;
            openMenu();
            menu_amimation = setInterval(openMenu, 150);
            menu_is_open = true;
        }
    }

}


function openMenu() {
    if (current_menu_index < menu_elements.length) {
        menu_elements[current_menu_index++].style.left = "0%";
    } else {
        clearInterval(menu_amimation);
        current_menu_index--;
        menu_is_chaging = false;
    }
}

function closeMenu() {
    if (current_menu_index >= 0) {
        menu_elements[current_menu_index--].style.left = "-100%";
    } else {
        clearInterval(menu_amimation);
        current_menu_index++;
        menu_is_chaging = false;
    }
}