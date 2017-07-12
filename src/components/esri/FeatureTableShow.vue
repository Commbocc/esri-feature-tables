<template>
	<div class="modal fade" tabindex="-1" role="dialog" data-backdrop="false">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<header class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 v-if="is_loading" class="modal-title">
						Loading...
					</h4>
					<h4 v-else class="modal-title">
						{{ modal_header_text }}
					</h4>
				</header>

				<figure class="embed-responsive embed-responsive-16by9">
					<div id="mapDiv" class="embed-responsive-item"></div>
				</figure>

				<!-- has feature -->
				<div v-if="is_loading" class="modal-body">
					Loading...
				</div>

				<div v-else-if="feature" class="modal-body">

					<component if="customComponent" :is="customComponent"></component>

					<dl>
						<template v-for="(v,k,i) in out_fields">
							<dt>{{ k }}</dt>
							<dd>
								{{ formatted_attr(v) }}
							</dd>
						</template>
					</dl>

				</div>
				<!-- feature not found -->
				<div v-else class="modal-body">
					A Feature with that ID does not exist.
				</div>

				<footer class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</footer>

			</div>
		</div>
	</div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import _ from 'underscore'

export default {
	name: 'esri-feture-table-show',
	props: ['fields', 'customComponent'],
	data () {
		return {
			feature: false,
			mapview: false,
			loaded: false,
			feature_fields: []
		}
	},
	computed: {
		is_loading () {
			return !this.loaded;
		},
		modal_header_text () {
			if (this.feature) {
				return this.feature.get('attributes')[this.$parent.field_keys()[0]]
			} else {
				return 'Not Found'
			}
		},
		query_where_exp () {
			return this.$parent.oid+' = '+this.$route.params.id
		},
		out_fields () {
			return (this.fields) ? this.fields : _.invert(this.feature.attributes)
		},
	},
	methods: {
		formatted_attr (attr) {
			var field = _.findWhere(this.feature_fields, {name: attr})
			switch (field.type) {
			case 'date':
				var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
				var date = new Date(this.feature.attributes[attr])
				return date.toLocaleString('en-us', options)
				break;
			default:
				return this.feature.attributes[attr]
			}
		},
		get_feature () {
			esriLoader.dojoRequire([
				'esri/WebMap',
				'esri/views/MapView',
				'esri/tasks/QueryTask',
				'esri/tasks/support/Query',
				'esri/symbols/SimpleLineSymbol',
				'esri/Graphic'
			], (WebMap, MapView, QueryTask, Query, SimpleLineSymbol, Graphic) => {

				// init map
				var webmap = new WebMap({portalItem: {id: 'b51fb4e76e154e1b93b630eac3ea94ae'}})
				this.mapview = new MapView({
					container: 'mapDiv',
					map: webmap
				})

				// get feature
				this.mapview.then( () => {

					var queryTask = new QueryTask({ url: this.$parent.url })
					var query = new Query
					query.returnGeometry = true
					query.outFields = ['*']
					query.where = this.query_where_exp
					query.outSpatialReference = this.mapview.get('spatialReference')

					queryTask.execute(query).then( (results) => {
						this.feature = results.features[0]
						this.loaded = true
						this.feature_fields = results.fields

						var geometry = this.feature.get('geometry')

						var symbol = new SimpleLineSymbol({
							color: "#f00",
							width: "5px",
							style: "solid"
						})

						var line_graphic = new Graphic({
							symbol: symbol,
							geometry: geometry
						})

						this.mapview.graphics.add(line_graphic)
						this.mapview.extent = geometry.extent.expand(3)
					})

				})
			});
		}
	},
	mounted () {
		$(this.$el).modal('show')
		$(this.$el).on('hidden.bs.modal', (e) => {
			this.$router.push({ name: this.$route.matched[0].name });
		})

		this.get_feature()
	}
}
</script>
