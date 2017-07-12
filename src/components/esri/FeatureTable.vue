<template>
	<section class="esri-feature-table">

		<div class="panel panel-default">
			<header v-if="filter" class="panel-heading">
				<input v-on:keyup="get_features" v-model="filter_text" :placeholder="filterPlaceholder" class="form-control input-lg" />
			</header>

			<div v-if="is_loading" class="panel-body">
				<p class="h1 text-center caption">
					<i class="fa fa-fw fa-spinner fa-spin"></i>
					Loading...
				</p>
			</div>
			<div v-else-if="has_features" class="table-responsive">
				<table class="table table-condensed table-striped table-bordered">
					<thead>
						<tr>
							<th></th>
							<th v-for="(v, k, i) in fields">{{ k }}</th>
						</tr>
					</thead>
					<tbody>
						<tr is="esri-feature-table-row" v-for="item in sorted_features" :item="item" :fields="fields" :oid="oid" :url="url"></tr>
					</tbody>
				</table>
			</div>
			<div v-else class="panel-body">
				<p class="h1 text-center caption">
					No Results...
				</p>
			</div>

		</div>

		<!-- Modal -->
		<router-view></router-view>

	</section>
</template>

<script>
import * as esriLoader from 'esri-loader'
import EsriFeatureTableRow from '@/components/esri/FeatureTableRow'

export default {
	name: 'esri-feture-table',
	props: {
		url: {default: ''},
		oid: {default: 'OBJECTID'},
		fields: {type: Object, default: () => {}},
		filter: {default: true},
		filterPlaceholder: {default: 'Filter...'}
	},
	data () {
		return {
			filter_text: '',
			features: [],
			feature_fields: [],
			loaded: false,
		}
	},
	components: {
		'esri-feature-table-row': EsriFeatureTableRow
	},
	computed: {
		is_loading () {
			return !this.loaded
		},
		has_features () {
			return this.features.length
		},
		query_where_exp () {
			if (this.filter_text !== '') {
				return this.field_keys().map( (f) => {
					return f + " LIKE '%" + this.filter_text + "%'"
				}).join(' OR ')
			} else {
				return '1=1'
			}
		},
		sorted_features: function() {
			return this.features.sort(this.sort_function)
		},
		pre_route_path: function() {
			// return this.$route.path
			return this.$route.matched[0].path
		},
		out_fields () {
			var out_fields = this.field_keys()
			out_fields.unshift(this.oid)
			return out_fields
		},
	},
	methods: {
		field_keys () {
			return Object.values(this.fields)
		},
		get_features () {
			esriLoader.dojoRequire([
				'esri/layers/FeatureLayer',
				'esri/tasks/support/Query'
			], (FeatureLayer, Query) => {
				var feature_layer = new FeatureLayer({ url: this.url }).load()
				feature_layer.then( () => {
					var query = new Query
					query.outFields = this.out_fields
					query.where = this.query_where_exp
					// needs pagination support for response over 1000 records
					feature_layer.queryFeatures(query).then( (results) => {
						this.features = results.features
						this.feature_fields = results.fields
						this.loaded = true
					})
				})
			});
		},
		sort_function (a,b) {
			var aName = a.get('attributes')[this.field_keys()[0]] || 'Z'
			var bName = b.get('attributes')[this.field_keys()[0]] || 'Z'
			return ((aName.toLowerCase() < bName.toLowerCase()) ? -1 : ((aName.toLowerCase() > bName.toLowerCase()) ? 1 : 0))
		}
	},
	beforeMount () {
		this.get_features()
	}
}
</script>
<style media="screen">
.esri-feature-table .panel-heading {
	padding: 10px;
	background: rgba(4, 65, 105, 0.075);
}
</style>
