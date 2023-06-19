<script setup lang="ts">
	import { ref } from 'vue'
	const pages = ref([
		{ link: 'blog/how-i-redesigned-my-website', title: 'How I Redesigned my Website with Vue.js', desc: "I just redesigned this website with Vue.js. Vue was surpisingly easy to use. I had none of the issues I normally have when using HTML and JS although CSS is still kind of a pain. This project will probably changed the way I create projects in the future." },
	])
</script>

<template>
	<div class="centered-view-container" id="posts-container">
		<div v-for="page in pages">
			<h2><router-link v-bind:to="page.link">{{ page.title }}</router-link></h2> <p>{{ page.desc }}</p>
			<br>
		</div>
	</div>
</template>

<style>
ul {
  list-style-type: none;
}

#posts-container {
	font-size: 1.25rem;
}


</style>
