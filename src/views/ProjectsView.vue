
<script setup lang="ts">
	import { ref } from 'vue'
	const projects = ref([
		{ link: 'https://github.com/mosswg/mycelium-lang', title: 'Mycelium Programming Language', desc: 'An in-progress strongly typed scripting-style compiled language.' },
		{ link: 'https://github.com/mosswg/mage', title: 'Mage Keyboard', desc: 'A split keyboard made with I/O expanders instead of the usual diode matrix. It runs a custom firmware or QMK.' },
		{ link: 'https://github.com/mosswg/dropout-dl', title: 'dropout-dl', desc: 'A CLI tool to download episodes, season, or series from dropout.tv.' },
	])
</script>

<template>
	<div class="centered-view-container" id="projects-container">
		<div v-for="project in projects">
			<a class="project-a" v-bind:href="project.link"><h2 class="project-title">{{ project.title }}</h2> <p>{{ project.desc }}</p></a>
		</div>
	</div>
</template>

<style>
.project-title {
	color: hsla(var(--primary-color), 0.8);
}

ul {
  list-style-type: none;
}

.project-a {
	color: var(--text-color);
}

.project-a > * {
	transition: 0.4s;
}

.project-a:hover > * {
	background-color: hsla(var(--primary-color), 0.2);
}

#projects-container > div {
	max-width: 80vw;
	overflow: hidden;
	margin: 1em;
}

#projects-container {
	font-size: 1.25rem;
}


</style>
