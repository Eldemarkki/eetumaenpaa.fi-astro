<script lang="ts">
	import Navbar from "../components/Navbar.svelte";
	export let title: string;
</script>

<!DOCTYPE html />
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/x-icon" href="/favicon.ico" />
		<title>{title}</title>
	</head>
	<body>
		<div class="content">
			<Navbar />
			<slot />
		</div>
		<style is:global>
			/* fira-sans-regular - latin */
			@font-face {
				font-family: "Fira Sans";
				font-style: normal;
				font-weight: 400;
				src: url("/fonts/fira-sans-v15-latin-regular.woff") format("woff");
			}

			/* fira-sans-italic - latin */
			@font-face {
				font-family: "Fira Sans";
				font-style: italic;
				font-weight: 400;
				src: local(""),
					url("/fonts/fira-sans-v15-latin-italic.woff2") format("woff2"),
					/* Chrome 26+, Opera 23+, Firefox 39+ */
						url("/fonts/fira-sans-v15-latin-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
			}
			* {
				font-family: "Fira Sans", sans-serif;
				box-sizing: border-box;
			}
			pre {
				font-family: monospace;
				margin: 0px;
			}
			html {
				font-size: 1.3em;
				padding: 0;
			}
			:root {
				--color-background: #1a1a1a;
				--color-text: #fff;
				--color-link: #157f55;
			}
			html,
			body {
				margin: 0;
			}

			body {
				padding: 30px;
				display: flex;
				justify-content: center;
			}

			.content {
				padding: 48px;
				width: 100%;
				max-width: 992px;
			}
			@media (max-width: 992px) {
				.content {
					padding: 16px;
				}
			}

			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				margin: 30px 0px 10px 0px;
			}

			p {
				margin: 16px 0px;
				line-height: 1.5em;
			}

			a {
				text-decoration: none;
				transition-duration: 100ms;
				color: var(--color-link);
			}

			a:hover {
				filter: brightness(1.3);
				transform: scale(1.05);
			}

			body {
				background-color: var(--color-background);
				color: var(--color-text);
			}
		</style>
	</body>
</html>
