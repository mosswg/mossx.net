<template>
	<div class="blog-post centered-view-container">
		<h1 class="blog-title">How I Redesigned my Website with Vue.js</h1>
		<div class="blog-text">
			<h2>A Word of Warning</h2>
			When I first created my website I felt like using a framework was sort of cheating and I was somehow better because I did "everything" from scratch. That is an extremely idiotic mentality.
			First of all no one is better than anyone else because of what they do or don't use. But I also wasn't doing everything from scratch because thats impossible. If you truly want to create a project from scratch you better start mining silicon.
			But more importanly the end product was worse. I wasted my time making a worse website because I was too stuborn to use a framework. Don't be how I was, use a damn framework.
			<h2>Tech</h2>
			I am using <a href="https://vuejs.org/">Vue.js</a> with typescript and the default vue router. This is my first time using Vue so I definitely made mistakes. I have breifly tried other frameworks in the past and Vue is the most similar to vanilla HTML.
			This made the migration relativly easy for me. It was a smooth expirence and I would recommend using Vue if you don't already know another framework.
			<h2>Menu</h2>
			The menu is list of <code>router-link</code> elements. Along with the vue router these allow for navigation without having to reload the page. I am using the <code>router-link-active</code> class in CSS to change the color of the active element.
			Learning Vue and making this menu together took a fourth of the time it took me to write my own menu system and I think the Vue version is better.
			<h2>Pages</h2>
			All pages are using the Vue router so that they appear below the menu. There is a shared class called <code>centered-view-container</code> this centers the div, sets the height, add scroll overflow, and gives all children a max-width value.
			Blog posts like this one are similar but different in that they use relative positioning rather than absolute.
			<h2>Color</h2>
			The color choice is completely arbritrary but very easy to change. I am using a handful of CSS variables to control all the colors. Because of how Vue imports the pages into one central place I don't have to import any CSS into the individual pages which is very convenient.
			<h2>Conclusion</h2>
			If I knew making a website with Vue would be this seamless I would never have made one from scratch. There are certainly a few circumstances where using a framework would be harder or make a worse result but this is not one of them. In general I am against using a library if I think I can do it better myself but this has entirely changed my perspective. Even if I can do something better from scratch it will likely take much longer. I might not even finish the original project because I wasted all my time and energy doing something someone else has already done. In conclusion, don't be stupid and use libraries and frameworks.
			<h2>Special thanks</h2>
			Thanks to Techno for giving me this idea :).
		</div>
	</div>
</template>

<style>
	code {
		font-size: .95em;
		background: var(--vt-c-black-mute);
	}
</style>
