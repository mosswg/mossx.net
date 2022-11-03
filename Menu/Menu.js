const menu_list_id = "menu_list";

var menu_amimation = null;
var menu_is_open = false;
var menu_is_chaging = false;
var menu_is_vertical = false;
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
			menu_is_vertical = true;
			menu = _menu[0];
		}
	}
	if (menu)
		create_menu_elements();
	else {
		console.error("create_menu called but no element with menu(menu_vertical or menu_horizontal) class");
	}
}

class MenuElement {
	constructor(text, file_name,  button_class, menu_order, alternative_file_name = null) {
		this.text = text;
		this.file_name = file_name;
		this.menu_order = menu_order;
		this.button_class = button_class;
		this.alternative_file_name = alternative_file_name;
	}

	create_elements() {
		var menu_list = document.createElement('div');  // main menu list div
		menu_list.classList = "menu_list btn-group";


		var open_button = document.createElement('a');
		open_button["role"] = "button";
		open_button.text = "☰";
		open_button.classList = this.button_class + "menu_static menu_first";
		open_button.onclick = toggle_menu;
		// If the menu is vertical round the right side and unround the left size of the first button
		if (menu_is_vertical) {
			open_button.style = "border-top-right-radius: 5% !important; !important; border-top-left-radius: 0; border-bottom-left-radius: 0; margin-left: -1px;"
		}

		menu_list.appendChild(open_button);

		console.log(files);
		console.log(this.menu_order);

		var menu_item = document.createElement('a');
		menu_item["role"] = "button";
		menu_item.classList = this.button_class + "menu_collapsible";
		for (i = 0; i < this.menu_order.length; i++) {
			var menu_item = document.createElement('a');
			menu_item["role"] = "button";
			var file = files[this.menu_order[i]];
			menu_item.classList = this.button_class + "menu_collapsible";
			menu_item.text = file.text;
			menu_item.href = file.alternative_file_name ? file.alternative_file_name : file.file_name;
			if (menu_is_vertical) {
				// Checking if the current menu element is the last in the list
				if (external_menu_elements.length == 0 || i != this.menu_order.length - 1) {
					// If the menu is vertical round the right side and unround the left size of the first button
					menu_item.style = "border-top-right-radius: 0; border-bottom-right-radius: 0; border-top-left-radius: 0; border-bottom-left-radius: 0;"
				}
				else {
					menu_item.style = "border-top-right-radius: 0; border-bottom-right-radius: 5%; border-top-left-radius: 0; border-bottom-left-radius: 0;"
				}
			}

			menu_list.appendChild(menu_item);
		}
		for (i = 0; i < external_menu_elements.length; i++) {
			var menu_item = document.createElement('a');
			menu_item["role"] = "button";
			var file = external_menu_elements[i];
			menu_item.classList = this.button_class + "menu_collapsible";
			menu_item.text = file.text;
			menu_item.href = file.alternative_file_name ? file.alternative_file_name : file.file_name;
			// Checking if the current menu element is the last in the list
			if (menu_is_vertical) {
				if (i != external_menu_elements.length - 1) {
					// If the menu is vertical round the right side and unround the left size of the first button
					menu_item.style = "border-top-right-radius: 0; border-bottom-right-radius: 0; border-top-left-radius: 0; border-bottom-left-radius: 0;"
				}
				else {
					menu_item.style = "border-top-right-radius: 0; border-bottom-right-radius: 5%; border-top-left-radius: 0; border-bottom-left-radius: 0;"
				}
			}
			menu_list.appendChild(menu_item);
		}

		console.log(menu);

		menu.appendChild(menu_list);
	}
}

const files = [
	new MenuElement("Home", "index", "btn btn-outline-secondary menu_item ", [1, 2, 3], ""),
	new MenuElement("About Me", "about", "btn btn-outline-secondary menu_item ", [0, 2, 3]),
	new MenuElement("Projects", "projects", "btn btn-outline-secondary menu_item ", [0, 1, 3]),
	new MenuElement("Contact", "contact", "btn btn-outline-secondary menu_item ", [0, 1, 2])
];
const external_menu_elements = [
	new MenuElement("Source", "https://github.com/mossx-dev/mossx.net", [])
];

function create_menu_elements() {

	var file_uri = document.baseURI.split('/');
	file_name = file_uri[file_uri.length-1].split('.')[0];

	for (i = 0; i < files.length; i++) {
		if (file_name == files[i].file_name || (files[i].alternative_file_name != null && files[i].alternative_file_name == file_name)) {
			files[i].create_elements();
			return;
		}
	}


	new MenuElement("", "", "btn btn-outline-secondary menu_item ", [0, 1, 2, 3]).create_elements();
}




function toggle_menu() {

	if (!menu_is_chaging) {
		if (menu_is_open) {
			menu_is_chaging = true;
			menu_amimation = setInterval(close_menu, 100);
			menu_is_open = false;
		}
		else {
			menu_is_chaging = true;
			open_menu();
			menu_amimation = setInterval(open_menu, 150);
			menu_is_open = true;
		}
	}
}


function open_menu() {
	if (current_menu_index < menu_elements.length) {
		menu_elements[current_menu_index++].style.left = "0%";
	} else {
		clearInterval(menu_amimation);
		current_menu_index--;
		menu_is_chaging = false;
	}
}

function close_menu() {
	if (current_menu_index >= 0) {
		menu_elements[current_menu_index--].style.left = "-100%";
	} else {
		clearInterval(menu_amimation);
		current_menu_index++;
		menu_is_chaging = false;
	}
}

function create_footer() {

	var footer = document.createElement('footer');
	footer.classList = "fixed-bottom d-flex flex-wrap justify-content-between align-items-center p-2 m-0";
	footer.style = "background-color: var(--bs-gray-dark);"

	var copyright = document.createElement('div');
	copyright.classList = "col-md-4 d-flex align-items-center";

	var copyright_text = document.createElement('span');

	copyright_text.innerText = "© Moss Gallagher " + new Date().getFullYear();
	copyright_text.classList = "text-muted";

	copyright.appendChild(copyright_text);


	var links = document.createElement('ul');
	links.classList = "nav col-md-4 justify-content-end list-unstyled d-flex";

	var github = document.createElement('li');
	github.classList = "ms-3";

	var github_link = document.createElement('a');
	github_link.classList =  "text-muted";
	github_link.href = "https://github.com/mossx-dev";

	var github_img = document.createElement('img');
	github_img.src = "logos/github.png";
	github_img.width = "24";

	github_link.appendChild(github_img);
	github.appendChild(github_link);


	var stackoverflow = document.createElement('li');
	stackoverflow.classList = "ms-3";

	var stackoverflow_link = document.createElement('a');
	stackoverflow_link.classList =  "text-muted";
	stackoverflow_link.href = "https://stackoverflow.com/users/15068365/mossx";

	var stackoverflow_img = document.createElement('img');
	stackoverflow_img.src = "logos/stackoverflow.png";
	stackoverflow_img.width = "24";

	stackoverflow_link.appendChild(stackoverflow_img);
	stackoverflow.appendChild(stackoverflow_link);


	links.appendChild(github);
	links.appendChild(stackoverflow);

	footer.appendChild(copyright);
	footer.appendChild(links);


	document.getElementsByTagName("body")[0].appendChild(footer);

}
