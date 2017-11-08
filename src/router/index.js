import Vue from 'vue'
import Router from 'vue-router'

import EsriFeatureTable from '@/components/esri/FeatureTable'
import EsriFeatureTableShow from '@/components/esri/FeatureTableShow'
import RoadsShow from '@/components/RoadsShow'

Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
	routes: [
		{
			path: '/roads',
			name: 'RoadClosures',
			component: EsriFeatureTable,
			props: {
				filterPlaceholder: 'Filter Roads...',
				fields: {'Closed Road':'STREET', 'Closed':'Date_Closed', 'Opened':'Date_Opened'},
				url: 'https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/Lane_RoadClosures_PublicView/FeatureServer/1',
			},
			children: [
				{
					path: ':id',
					component: EsriFeatureTableShow,
					props: {
						fields: {'Closed Road':'STREET', 'From':'FROM_STREET', 'To':'TO_STREET', 'Closed':'Date_Closed', 'Opened':'Date_Opened', 'Reason':'REASON', 'Contractor':'CONTRACTOR'},
						customComponent: RoadsShow
					}
				}
			]
		},
		{
			path: '/lanes',
			name: 'LaneClosures',
			component: EsriFeatureTable,
			props: {
				filterPlaceholder: 'Filter Lanes...',
				fields: {'Closed Lane':'STREET', 'Closed':'Date_Closed', 'Opened':'Date_Opened'},
				url: 'https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/Lane_RoadClosures_PublicView/FeatureServer/0',
			},
			children: [
				{
					path: ':id',
					component: EsriFeatureTableShow,
					props: {
						fields: {'Closed Lane':'STREET', 'From':'FROM_STREET', 'To':'TO_STREET', 'Closed':'Date_Closed', 'Opened':'Date_Opened', 'Reason':'REASON', 'Contractor':'CONTRACTOR'},
					}
				}
			]
		},
		{
			path: '/resurfacings',
			name: 'RoadResurfacings',
			component: EsriFeatureTable,
			props: {
				filterPlaceholder: 'Filter Resurfacings...',
				fields: {'Road':'STREET', 'From':'FRSTNM', 'To':'TOSTNM'},
				url: 'https://maps.hillsboroughcounty.org/arcgis/rest/services/CoinMap/RoadResurfacePlan/MapServer/0',
			},
			children: [
				{
					path: ':id',
					component: EsriFeatureTableShow,
					props: {
						fields: {'Closed Lane':'STREET', 'From':'FRSTNM', 'To':'TOSTNM', 'Type':'Type', 'Project':'Project'},
					}
				}
			]
		},
		{
			path: '*',
			redirect: window.tabs[0].path
		}
	]
})
