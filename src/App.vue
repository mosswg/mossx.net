<script setup lang="ts">
import { ref, computed } from 'vue'
import Home from './views/HomeView.vue'
import About from './views/AboutView.vue'
import Projects from './views/ProjectsView.vue'
import Contact from './views/ContactView.vue'
import Blog from './views/BlogView.vue'
import blog_redesign from './views/posts/how-i-redesigned-my-website.vue'
import NotFound from './views/NotFound.vue'

const routes: any = {
	'/': Home,
	'/about': About,
	'/projects': Projects,
	'/blog': Blog,
	'/contact': Contact,
	'/blog/how-i-redesigned-my-website': blog_redesign,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
});


const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
});
</script>

<template>
  <div id="nav">
    <router-link tag="li" class="first" class-active="active" to="/">Home</router-link>
    <router-link tag="li" class="middle" class-active="active" to="/about">About</router-link>
    <router-link tag="li" class="middle" class-active="active" to="/projects">Projects</router-link>
    <router-link tag="li" class="middle" class-active="active" to="/contact">Contact</router-link>
    <router-link tag="li" class="middle" class-active="active" to="/blog">Blog</router-link>
    <a class="last" href="https://github.com/mosswg/website">Source</a>
  </div> <br>
  <div id="router-view">
  <router-view></router-view>
  </div>
</template>


<style scoped>
header {
    line-height: 1.5;
  }

	#nav > * {
		padding: .5em .75em .5em .75em;
		border: 2px solid hsla(var(--primary-color), .5);
		border-radius: 0px;
}

	#nav > .first {
		border-radius: 5px 0 0 5px;
}

	#nav > .last {
		border-radius: 0 5px 5px 0;
}

#nav {
	font-size: 1.5vw;
}

.router-link-active {
	background-color: hsla(var(--trinary-color), .4);
}

#router-view > * {
	/* 52px is the height of the nav */
	margin-top: 52px;
}

</style>
