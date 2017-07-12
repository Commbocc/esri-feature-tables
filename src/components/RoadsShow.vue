<template>
	<div class="roads-show">

		<div v-if="detour" class="alert alert-info">
			<strong>Detour Available</strong><br>
			{{ detour.get('attributes').REASON }}
		</div>

	</div>
</template>

<script>
import * as esriLoader from 'esri-loader'

export default {
	name: 'show_road',
	data () {
		return {
			detour: null
		}
	},
	methods: {
		get_detour () {
			esriLoader.dojoRequire([
				'esri/tasks/QueryTask',
				'esri/tasks/support/Query',
				'esri/symbols/SimpleLineSymbol',
				'esri/Graphic'
			], (QueryTask, Query, SimpleLineSymbol, Graphic) => {
				this.$parent.mapview.then( () => {
					var queryTask = new QueryTask({ url: 'https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/Lane_RoadClosures_PublicView/FeatureServer/2' })
					var query = new Query
					query.returnGeometry = true
					query.outFields = ['*']
					query.where = `TTC_NBR = '${this.$parent.feature.attributes['TTC_NBR']}'`
					query.outSpatialReference = this.$parent.mapview.get('spatialReference')

					queryTask.execute(query).then( (results) => {
						this.detour = results.features[0]

						var geometry = this.detour.get('geometry')

						var symbol = new SimpleLineSymbol({
							color: "#31708f",
							width: "2px",
							style: "solid"
						})

						var line_graphic = new Graphic({
							symbol: symbol,
							geometry: geometry
						})

						this.$parent.mapview.graphics.unshift(line_graphic)
						this.$parent.mapview.extent = geometry.extent.expand(3)
					})
				})
			});
		}
	},
	mounted () {
		this.get_detour()
	}
}
</script>
