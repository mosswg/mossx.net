

const menu_list_id = "menu_list";

var menu_amimation = null;
var menu_is_open = false;
var menu_is_chaging = false;
var menu_elements = document.getElementsByClassName("menu_collapsible");
var current_menu_index = 0;
        

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