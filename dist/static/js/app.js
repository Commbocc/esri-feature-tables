webpackJsonp([1],{125:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(124),s=r(344),n=r.n(s),i=r(132);a.a.config.productionTip=!1,new a.a({el:"#app",router:i.a,template:"<App/>",components:{App:n.a}})},127:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});r(60);window.tabs=window.tabs||[{path:"/roads",text:"Road Closures"},{path:"/lanes",text:"Lane Closures"},{path:"/resurfacings",text:"Road Resurfacings"}],t.default={name:"app",data:function(){return{tabs:window.tabs}}}},128:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(60);t.default={name:"show_road",data:function(){return{detour:null}},methods:{get_detour:function(){var e=this;a.a(["esri/tasks/QueryTask","esri/tasks/support/Query","esri/symbols/SimpleLineSymbol","esri/Graphic"],function(t,r,a,s){e.$parent.mapview.then(function(){var n=new t({url:"https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/Lane_RoadClosures_PublicView/FeatureServer/2"}),i=new r;i.returnGeometry=!0,i.outFields=["*"],i.where="TTC_NBR = '"+e.$parent.feature.attributes.TTC_NBR+"'",i.outSpatialReference=e.$parent.mapview.get("spatialReference"),n.execute(i).then(function(t){e.detour=t.features[0];var r=e.detour.get("geometry"),n=new a({color:"#31708f",width:"2px",style:"solid"}),i=new s({symbol:n,geometry:r});e.$parent.mapview.graphics.unshift(i),e.$parent.mapview.extent=r.extent.expand(3)})})})}},mounted:function(){this.get_detour()}}},129:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(133),s=r.n(a),n=r(60),i=r(347),o=r.n(i);t.default={name:"esri-feture-table",props:{url:{default:""},oid:{default:"OBJECTID"},fields:{type:Object,default:function(){}},filter:{default:!0},filterPlaceholder:{default:"Filter..."}},data:function(){return{filter_text:"",features:[],feature_fields:[],loaded:!1}},components:{"esri-feature-table-row":o.a},computed:{is_loading:function(){return!this.loaded},has_features:function(){return this.features.length},query_where_exp:function(){var e=this;return""!==this.filter_text?this.field_keys().map(function(t){return t+" LIKE '%"+e.filter_text+"%'"}).join(" OR "):"1=1"},sorted_features:function(){return this.features.sort(this.sort_function)},pre_route_path:function(){return this.$route.matched[0].path},out_fields:function(){var e=this.field_keys();return e.unshift(this.oid),e}},methods:{field_keys:function(){return s()(this.fields)},get_features:function(){var e=this;n.a(["esri/layers/FeatureLayer","esri/tasks/support/Query"],function(t,r){var a=new t({url:e.url}).load();a.then(function(){var t=new r;t.outFields=e.out_fields,t.where=e.query_where_exp,a.queryFeatures(t).then(function(t){e.features=t.features,e.feature_fields=t.fields,e.loaded=!0})})})},sort_function:function(e,t){var r=e.get("attributes")[this.field_keys()[0]]||"Z",a=t.get("attributes")[this.field_keys()[0]]||"Z";return r.toLowerCase()<a.toLowerCase()?-1:r.toLowerCase()>a.toLowerCase()?1:0}},beforeMount:function(){this.get_features()}}},130:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(123),s=r.n(a);t.default={name:"esri-feature-table-row",props:["item"],data:function(){return{}},computed:{feature_id:function(){return this.item.attributes[this.$parent.oid]},route_path:function(){return this.$parent.pre_route_path+"/"+this.feature_id}},methods:{formatted_attr:function(e){switch(s.a.findWhere(this.$parent.feature_fields,{name:e}).type){case"date":var t={year:"numeric",month:"long",day:"numeric"};return new Date(this.item.attributes[e]).toLocaleString("en-us",t);default:return this.item.attributes[e]}}}}},131:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(60),s=r(123),n=r.n(s);t.default={name:"esri-feture-table-show",props:["fields","customComponent"],data:function(){return{feature:!1,mapview:!1,loaded:!1,feature_fields:[]}},computed:{is_loading:function(){return!this.loaded},modal_header_text:function(){return this.feature?this.feature.get("attributes")[this.$parent.field_keys()[0]]:"Not Found"},query_where_exp:function(){return this.$parent.oid+" = "+this.$route.params.id},out_fields:function(){return this.fields?this.fields:n.a.invert(this.feature.attributes)}},methods:{formatted_attr:function(e){switch(n.a.findWhere(this.feature_fields,{name:e}).type){case"date":var t={year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"};return new Date(this.feature.attributes[e]).toLocaleString("en-us",t);default:return this.feature.attributes[e]}},get_feature:function(){var e=this;a.a(["esri/WebMap","esri/views/MapView","esri/tasks/QueryTask","esri/tasks/support/Query","esri/symbols/SimpleLineSymbol","esri/Graphic"],function(t,r,a,s,n,i){var o=new t({portalItem:{id:"b51fb4e76e154e1b93b630eac3ea94ae"}});e.mapview=new r({container:"mapDiv",map:o}),e.mapview.then(function(){var t=new a({url:e.$parent.url}),r=new s;r.returnGeometry=!0,r.outFields=["*"],r.where=e.query_where_exp,r.outSpatialReference=e.mapview.get("spatialReference"),t.execute(r).then(function(t){e.feature=t.features[0],e.loaded=!0,e.feature_fields=t.fields;var r=e.feature.get("geometry"),a=new n({color:"#f00",width:"5px",style:"solid"}),s=new i({symbol:a,geometry:r});e.mapview.graphics.add(s),e.mapview.extent=r.extent.expand(3)})})})}},mounted:function(){var e=this;$(this.$el).modal("show"),$(this.$el).on("hidden.bs.modal",function(t){e.$router.push({name:e.$route.matched[0].name})}),this.get_feature()}}},132:function(e,t,r){"use strict";var a=r(124),s=r(354),n=r(346),i=r.n(n),o=r(348),u=r.n(o),l=r(345),d=r.n(l);a.a.use(s.a),t.a=new s.a({linkActiveClass:"active",routes:[{path:"/roads",name:"RoadClosures",component:i.a,props:{filterPlaceholder:"Filter Roads...",fields:{"Closed Road":"STREET",Closed:"Date_Closed",Opened:"Date_Opened"},url:"https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/Lane_RoadClosures_PublicView/FeatureServer/1"},children:[{path:":id",component:u.a,props:{fields:{"Closed Road":"STREET",From:"FROM_STREET",To:"TO_STREET",Closed:"Date_Closed",Opened:"Date_Opened",Reason:"REASON",Contractor:"CONTRACTOR"},customComponent:d.a}}]},{path:"/lanes",name:"LaneClosures",component:i.a,props:{filterPlaceholder:"Filter Lanes...",fields:{"Closed Lane":"STREET",Closed:"Date_Closed",Opened:"Date_Opened"},url:"https://services.arcgis.com/apTfC6SUmnNfnxuF/ArcGIS/rest/services/Lane_RoadClosures_PublicView/FeatureServer/0"},children:[{path:":id",component:u.a,props:{fields:{"Closed Lane":"STREET",From:"FROM_STREET",To:"TO_STREET",Closed:"Date_Closed",Opened:"Date_Opened",Reason:"REASON",Contractor:"CONTRACTOR"}}}]},{path:"/resurfacings",name:"RoadResurfacings",component:i.a,props:{filterPlaceholder:"Filter Resurfacings...",fields:{Road:"STREET",From:"FRSTNM",To:"TOSTNM"},url:"https://maps.hillsboroughcounty.org/arcgis/rest/services/CoinMap/FY17PlannedResurfacing/MapServer/0"},children:[{path:":id",component:u.a,props:{fields:{"Closed Lane":"STREET",From:"FRSTNM",To:"TOSTNM",Type:"Type",Project:"Project"}}}]},{path:"*",redirect:window.tabs[0].path}]})},342:function(e,t){},344:function(e,t,r){var a=r(48)(r(127),r(353),null,null,null);e.exports=a.exports},345:function(e,t,r){var a=r(48)(r(128),r(350),null,null,null);e.exports=a.exports},346:function(e,t,r){function a(e){r(342)}var s=r(48)(r(129),r(349),a,null,null);e.exports=s.exports},347:function(e,t,r){var a=r(48)(r(130),r(351),null,null,null);e.exports=a.exports},348:function(e,t,r){var a=r(48)(r(131),r(352),null,null,null);e.exports=a.exports},349:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"esri-feature-table"},[r("div",{staticClass:"panel panel-default"},[e.filter?r("header",{staticClass:"panel-heading"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.filter_text,expression:"filter_text"}],staticClass:"form-control input-lg",attrs:{placeholder:e.filterPlaceholder},domProps:{value:e.filter_text},on:{keyup:e.get_features,input:function(t){t.target.composing||(e.filter_text=t.target.value)}}})]):e._e(),e._v(" "),e.is_loading?r("div",{staticClass:"panel-body"},[e._m(0)]):e.has_features?r("div",{staticClass:"table-responsive"},[r("table",{staticClass:"table table-condensed table-striped table-bordered"},[r("thead",[r("tr",[r("th"),e._v(" "),e._l(e.fields,function(t,a,s){return r("th",[e._v(e._s(a))])})],2)]),e._v(" "),r("tbody",e._l(e.sorted_features,function(t){return r("esri-feature-table-row",{tag:"tr",attrs:{item:t,fields:e.fields,oid:e.oid,url:e.url}})}))])]):r("div",{staticClass:"panel-body"},[r("p",{staticClass:"h1 text-center caption"},[e._v("\n\t\t\t\tNo Results...\n\t\t\t")])])]),e._v(" "),r("router-view")],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",{staticClass:"h1 text-center caption"},[r("i",{staticClass:"fa fa-fw fa-spinner fa-spin"}),e._v("\n\t\t\t\tLoading...\n\t\t\t")])}]}},350:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"roads-show"},[e.detour?r("div",{staticClass:"alert alert-info"},[r("strong",[e._v("Detour Available")]),r("br"),e._v("\n\t\t"+e._s(e.detour.get("attributes").REASON)+"\n\t")]):e._e()])},staticRenderFns:[]}},351:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("tr",{staticClass:"esri-feature-table-row"},[r("td",{attrs:{width:"1"}},[e._m(0)],1),e._v(" "),e._l(e.$parent.fields,function(t){return r("td",[e._v("\n\t\t"+e._s(e.formatted_attr(t))+"\n\t")])})],2)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("router-link",{staticClass:"btn btn-default btn-xs",attrs:{to:{path:e.route_path}}},[r("i",{staticClass:"fa fa-fw fa-info-circle"})])}]}},352:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"modal fade",attrs:{tabindex:"-1",role:"dialog","data-backdrop":"false"}},[r("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[r("div",{staticClass:"modal-content"},[r("header",{staticClass:"modal-header"},[e._m(0),e._v(" "),e.is_loading?r("h4",{staticClass:"modal-title"},[e._v("\n\t\t\t\t\tLoading...\n\t\t\t\t")]):r("h4",{staticClass:"modal-title"},[e._v("\n\t\t\t\t\t"+e._s(e.modal_header_text)+"\n\t\t\t\t")])]),e._v(" "),e._m(1),e._v(" "),e.is_loading?r("div",{staticClass:"modal-body"},[e._v("\n\t\t\t\tLoading...\n\t\t\t")]):e.feature?r("div",{staticClass:"modal-body"},[r(e.customComponent,{tag:"component",attrs:{if:"customComponent"}}),e._v(" "),r("dl",[e._l(e.out_fields,function(t,a,s){return[r("dt",[e._v(e._s(a))]),e._v(" "),r("dd",[e._v("\n\t\t\t\t\t\t\t"+e._s(e.formatted_attr(t))+"\n\t\t\t\t\t\t")])]})],2)],1):r("div",{staticClass:"modal-body"},[e._v("\n\t\t\t\tA Feature with that ID does not exist.\n\t\t\t")]),e._v(" "),e._m(2)])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[r("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("figure",{staticClass:"embed-responsive embed-responsive-16by9"},[r("div",{staticClass:"embed-responsive-item",attrs:{id:"mapDiv"}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("footer",{staticClass:"modal-footer"},[r("button",{staticClass:"btn btn-default",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")])])}]}},353:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",{attrs:{id:"app"}},[r("ul",{staticClass:"nav nav-tabs"},e._l(e.tabs,function(t){return e.tabs.length>1?r("router-link",{key:t.text,attrs:{to:t.path,tag:"li"}},[r("a",[e._v(e._s(t.text))])]):e._e()})),e._v(" "),r("router-view",{key:e.$route.matched[0].path})],1)},staticRenderFns:[]}},356:function(e,t,r){r(126),e.exports=r(125)}},[356]);
//# sourceMappingURL=app.js.map