<template>
	<tr class="esri-feature-table-row">
		<td width="1">
			<router-link v-once :to="{ path: route_path }" class="btn btn-default btn-xs" :aria-label="aria_label">
				<i class="fa fa-fw fa-info-circle" aria-hidden="true"></i>
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
		},
		first_key () {
			return this.$parent.fields[Object.keys(this.$parent.fields)[0]]
		},
		aria_label () {
			return `Additional information for ${this.formatted_attr(this.first_key)}`
		}
	},
	methods: {
		formatted_attr (attr) {
			var field = _.findWhere(this.$parent.feature_fields, {name: attr})
			switch (field.type) {
				case 'date':
					if (this.item.attributes[attr]) {
						var options = { year: 'numeric', month: 'long', day: 'numeric' }
						var date = new Date(this.item.attributes[attr])
						return date.toLocaleString('en-us', options)
					} else {
						return null
					}
					break;
				default:
					return this.item.attributes[attr]
			}
		},
	}
}
</script>
