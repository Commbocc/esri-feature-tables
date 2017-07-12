<template>
	<tr class="esri-feature-table-row">
		<td width="1">
			<router-link v-once :to="{ path: route_path }" class="btn btn-default btn-xs">
				<i class="fa fa-fw fa-info-circle"></i>
			</router-link>
		</td>
		<td v-for="f in $parent.fields">
			<!-- <pre>{{ $parent.feature_fields }}</pre> -->
			<!-- {{ item.attributes[f] }} -->
			{{ formatted_attr(f) }}
		</td>
	</tr>
</template>

<script>
import _ from 'underscore'

export default {
	name: 'esri-feature-table-row',
	props: ['item'],
	data () {
		return {}
	},
	computed: {
		feature_id () {
			return this.item.attributes[this.$parent.oid];
		},
		route_path () {
			return this.$parent.pre_route_path+'/'+this.feature_id
		}
	},
	methods: {
		formatted_attr (attr) {
			var field = _.findWhere(this.$parent.feature_fields, {name: attr})
			switch (field.type) {
				case 'date':
					var options = { year: 'numeric', month: 'long', day: 'numeric' }
					var date = new Date(this.item.attributes[attr])
					return date.toLocaleString('en-us', options)
					break;
				default:
					return this.item.attributes[attr]
			}
		},
	}
}
</script>
