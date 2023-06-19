<template>
	<div class="centered-view-container">
		<div class="about">
			<h1> Programming </h1>
			<p>
				I'm moss.
				I am an amatuer developer.
				I have been programming since 2016.
				I started with HTML, CSS and JS.
				My first large project was creating snake with JS and HTML canvas.
				The next year I learned C++ and created a text based snakes and ladders game in the terminal.
			</p> <br>

			<h1> Personal Life </h1>
			<p>
				I'm 18 and I grew up in upstate South Carolina but moved to California when I was 17.
				I am an anarchist and a communist. I believe in a federated council system.
				I am happy to discuss any of my views or my programming and you can find my contact info <router-link to="/contact">here</router-link>.
			</p>


		</div>
  </div>
</template>

<style>
.about > h1 {
	color: hsla(var(--primary-color), 0.8);
}

.about {
	font-size: 1.25rem;
	height: 60vh;
	overflow: scroll;
}


</style>
