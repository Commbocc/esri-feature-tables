<template>
	<main id="app">

		<ul class="nav nav-tabs">
			<router-link v-if="tabs.length > 1" v-for="tab in tabs" :to="tab.path" :key="tab.text" tag="li">
				<a>{{ tab.text }}</a>
			</router-link>
		</ul>

		<router-view :key="$route.matched[0].path"></router-view>

	</main>
</template>

<script>
import * as esriLoader from 'esri-loader'

window.tabs = window.tabs || [
	{
		path: '/roads',
		text: 'Road Closures'
	},
	{
		path: '/lanes',
		text: 'Lane Closures'
	},
	{
		path: '/resurfacings',
		text: 'Road Resurfacings'
	}
]

export default {
	name: 'app',
	data () {
		return {
			tabs: window.tabs
		}
	}
}
</script>
