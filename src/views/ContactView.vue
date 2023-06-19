<script setup lang="ts">
	import { ref } from 'vue'
	const contacts = ref([
		{ link: 'https://discord.com/users/457594112929955841', name: 'Discord', text: '@mosswg' },
		{ link: 'mailto:moss@mossx.net', name: 'Email', text: 'moss@mossx.net' },
		// template: { link: '', name: '', text: '' },
	])
</script>

<template>
	<div class="centered-view-container" id="contact-container">
		<div v-for="contact in contacts">
			<a class="contact-a" v-bind:href="contact.link" z-index="1"><p class="contact-p"><p class="contact-p contact-name">{{ contact.name }}:</p> {{ contact.text }}</p> </a>
		</div>
	</div>
</template>

<style>
.contact-p {
	display: inline-block;
}

.contact-name {
	color: hsla(var(--primary-color), 0.8);
}

.contact-a {
	color: var(--text-color);
}

ul {
  list-style-type: none;
}

#contact-container {
	font-size: 2rem;
	text-align: center;
}


</style>
