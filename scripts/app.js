/**
 * @license
 *
 * Copyright (c) 2015, University of Washington Interactive Data Lab.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of the University of Washington Interactive Data Lab
 *   nor the names of its contributors may be used to endorse or promote products
 *   derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";angular.module("voyager2",["vlui","ngSanitize","ngTouch","ngDragDrop","zeroclipboard","Chronicle","LocalStorageModule","720kb.tooltips","ngOrderObjectBy","angular-google-analytics"]).constant("_",window._).constant("vl",window.vl).constant("vg",window.vg).constant("cql",window.cql).constant("ZSchema",window.ZSchema).constant("Tether",window.Tether).constant("Drop",window.Drop).constant("Blob",window.Blob).constant("URL",window.URL).constant("jsondiffpatch",window.jsondiffpatch).config(["consts",function(e){window.vg.util.extend(e,{appId:"voyager2",initialSpec:window.initialSpec||void 0,debugInList:!0,logLevel:"DEBUG",logToWebSql:!0,maxAnyShelf:3})}]).config(["vl",function(e){e.config.defaultConfig.countTitle="COUNT"}]).config(["uiZeroclipConfigProvider",function(e){e.setZcConf({swfPath:"bower_components/zeroclipboard/dist/ZeroClipboard.swf"})}]).config(["localStorageServiceProvider",function(e){e.setPrefix("voyager2")}]).config(["AnalyticsProvider","consts",function(e,t){t.embeddedData||e.setAccount({tracker:"UA-44428446-4",name:"voyager2",trackEvent:!0})}]),angular.module("voyager2").directive("vgSpecEditor",["Spec",function(e){return{templateUrl:"components/vgSpecEditor/vgSpecEditor.html",restrict:"E",scope:{},link:function(t){t.Spec=e}}}]),angular.module("voyager2").directive("nullFilterDirective",["Spec",function(e){return{templateUrl:"components/nullfilterdirective/nullfilterdirective.html",restrict:"E",scope:{},link:function(t,n,i){t.Spec=e,t.updateFilter=function(){e.update()}}}}]),angular.module("voyager2").directive("lyraExport",function(){return{template:'<a href="#" class="command" ng-click="export()">Export to lyra</a>',restrict:"E",replace:!0,scope:{},controller:["$scope","$timeout","Spec","Alerts",function(e,t,n,i){e["export"]=function(){var e=n.vgSpec;e||i.add("No vega spec present."),e.marks[0]["lyra.groupType"]="layer";var a="http://idl.cs.washington.edu/projects/lyra/app/",r=window.open(a,"_blank");t(function(){i.add("Please check whether lyra loaded the vega spec correctly. This feature is experimental and may not work.",5e3),r.postMessage({spec:e},a)},5e3)}}]}}),angular.module("voyager2").directive("jsonInput",["JSON3",function(e){return{restrict:"A",require:"ngModel",scope:{},link:function(t,n,i,a){var r=function(t){return e.stringify(t,null,"  ",80)};a.$formatters.push(r)}}}]),angular.module("voyager2").directive("cqlQueryEditor",["Spec",function(e){return{templateUrl:"components/cqlQueryEditor/cqlQueryEditor.html",restrict:"E",scope:{},link:function(t){t.Spec=e}}}]),angular.module("voyager2").directive("configurationEditor",function(){return{templateUrl:"components/configurationeditor/configurationeditor.html",restrict:"E",scope:{},controller:["$scope","Config",function(e,t){e.Config=t}]}}),angular.module("voyager2").service("Wildcards",["ANY","vl",function(e,t){var n={list:[{title:"Categorical Fields",field:"?",type:{"enum":[t.type.NOMINAL,t.type.ORDINAL]},immutable:!0},{title:"Temporal Fields",field:"?",type:t.type.TEMPORAL,immutable:!0},{title:"Quantitative Fields",field:"?",type:t.type.QUANTITATIVE,immutable:!0}]};return n}]),angular.module("voyager2").service("Spec",["ANY","_","vg","vl","cql","util","ZSchema","consts","Alerts","Alternatives","Chart","Config","Dataset","Logger","Schema","Pills",function(e,t,n,i,a,r,o,c,l,s,d,p,u,g,v,h){function f(){return{data:p.data,transform:{filterInvalid:void 0},mark:e,encoding:A.reduce(function(e,t){return e[t]={},e},{}),config:p.config}}function m(e){for(var i in e)t.isObject(e[i])&&m(e[i]),(null===e[i]||void 0===e[i]||t.isObject(e[i])&&0===n.util.keys(e[i]).length&&"bin"!==i||e[i]===[])&&delete e[i]}function y(e){return i.util.mergeDeep(f(),e)}function S(e){if(!e)return!0;var t=e.enumSpecIndex;return 0===r.keys(t.encodingIndicesByProperty).length}function E(i){var r={data:p.data,mark:i.mark===e?"?":i.mark,transform:i.transform,encodings:n.util.keys(i.encoding).reduce(function(e,t){var r=n.util.extend({channel:h.isAnyChannel(t)?"?":t},i.encoding[t],{title:void 0});return a.enumSpec.isEnumSpec(r.field)&&(r.field={name:"f"+t}),e.push(r),e},[]),config:i.config},o=t.some(r.encodings,function(e){return a.enumSpec.isEnumSpec(e.field)}),c=o?["field","aggregate","bin","timeUnit","stack"]:["field","aggregate","bin","timeUnit","stack","channel"];return{spec:r,groupBy:c,chooseBy:"effectiveness",config:{omitTableWithOcclusion:!1}}}function T(e){return{}}function w(e,t,n){var a=t.type,r=h.isAnyChannel(n)?{measure:!0,dimension:!0}:i.channel.getSupportedRole(n),o=r.dimension&&!r.measure;t.field&&o?"count"===t.aggregate?t={}:a!==i.type.QUANTITATIVE||t.bin?a!==i.type.TEMPORAL||t.timeUnit||(t.timeUnit=c.defaultTimeFn):(t.aggregate=void 0,t.bin={maxbins:i.bin.MAXBINS_DEFAULT}):t.field||(t={});var l=T(n),s=v.getChannelSchema(n).properties;for(var d in s)t[d]&&("value"===d&&t.field?delete l[d]:l[d]=t[d]);e[n]=l}var A=t.keys(v.schema.definitions.Encoding.properties).concat([e+0]),b={spec:null,previewedSpec:null,emptySpec:f(),query:null,isSpecific:!0,charts:null,chart:d.getChart(null),hasPlot:!1,alternatives:[],histograms:null,instantiate:f};return b._removeEmptyFieldDefs=function(e){e.encoding=t.omit(e.encoding,function(t,n){return!t||void 0===t.field&&void 0===t.value||e.mark&&!i.channel.supportMark(n,e.mark)})},b.parseSpec=function(e){b.spec=y(e)},b.preview=function(e,t,n){if(e){var i=t.vlSpec;b.previewedSpec=y(i),g.logInteraction(g.actions.SPEC_PREVIEW_ENABLED,t.shorthand,{list:n})}else null!==b.previewedSpec&&(b.previewedSpec=null,g.logInteraction(g.actions.SPEC_PREVIEW_DISABLED,t.shorthand,{list:n}))},b.reset=function(){b.spec=f()},b.update=function(e){e=t.cloneDeep(e||b.spec),b._removeEmptyFieldDefs(e),m(e),"encoding"in e||(e.encoding={}),"config"in e||(e.config={}),n.util.extend(e.config,p.small());var i=b.cleanQuery=E(e),r=a.query(i,u.schema);b.query=r.query;var o=r.result.getTopSpecQueryModel();b.isSpecific=S(o),b.hasPlot=b.query&&b.query.spec.encodings.length>0,b.alternatives=[],b.isSpecific?(b.chart=d.getChart(o),b.charts=null,u.schema&&(i.spec.encodings.length>0?b.alternatives=s.getAlternatives(i,b.chart):b.alternatives=[s.getHistograms(i,b.chart)])):(b.charts=r.result.items.map(d.getChart),b.chart=d.getChart(null))},h.listener={set:function(e,t){w(b.spec.encoding,t,e)},remove:function(e){h.isAnyChannel(e)?delete b.spec.encoding[e]:w(b.spec.encoding,{},e)},add:function(n){var i=a.enumSpec.isEnumSpec(b.cleanQuery.spec.mark);if(g.logInteraction(g.actions.ADD_FIELD,n,{from:b.chart.shorthand}),b.isSpecific&&!a.enumSpec.isEnumSpec(n.field)){var r=b.cleanQuery.spec,o=t.extend({},n,{channel:a.enumSpec.SHORT_ENUM_SPEC},"count"===n.aggregate?{}:{aggregate:a.enumSpec.SHORT_ENUM_SPEC,bin:a.enumSpec.SHORT_ENUM_SPEC,timeUnit:a.enumSpec.SHORT_ENUM_SPEC});r.encodings.push(o);var c={spec:r,groupBy:["field","aggregate","bin","timeUnit","stack"],orderBy:"aggregationQuality",chooseBy:"effectiveness",config:{omitTableWithOcclusion:!1}},l=a.query(c,u.schema),s=l.result,d=s.getTopSpecQueryModel().toSpec();i&&(d.mark=e),b.parseSpec(d)}else{var p=t.clone(b.spec.encoding),v=h.getEmptyAnyChannelId();w(p,t.clone(n),v);var f=h.getNextAnyChannelId();null!==f&&w(p,{},f),b.spec.encoding=p}},parse:function(e){b.parseSpec(e)},preview:b.preview,update:function(e){b.update(e)},reset:function(){b.reset()},dragDrop:function(e,n){var i=t.clone(b.spec.encoding);n&&(h.isAnyChannel(n)&&!h.isAnyChannel(e)?delete i[n]:w(i,h.get(n)||{},n));var a=!(i[e]||{}).field;if(w(i,h.get(e)||{},e),h.isAnyChannel(e)&&a&&(!n||!h.isAnyChannel(n))){var r=h.getNextAnyChannelId();null!==r&&w(i,{},r)}b.spec.encoding=i},rescale:function(e,t){var n=b.spec.encoding[e];n.scale?n.scale.type=t:n.scale={type:t}},sort:function(e,t){b.spec.encoding[e].sort=t},transpose:function(){d.transpose(b.spec)},isEnumeratedChannel:function(e){return!b.spec.encoding[e].field},isEnumeratedField:function(e){return a.enumSpec.isEnumSpec(b.spec.encoding[e].field)},toggleFilterInvalid:function(){b.spec.transform.filterInvalid=!b.spec.transform.filterInvalid||void 0}},b.reset(),u.onUpdate.push(b.reset),b}]),angular.module("voyager2").controller("MainCtrl",["$scope","$document","Spec","Dataset","Wildcards","Config","consts","Chronicle","Logger","Bookmarks","Modals",function(e,t,n,i,a,r,o,c,l,s,d){e.Spec=n,e.Dataset=i,e.Wildcards=a,e.Config=r,e.Logger=l,e.Bookmarks=s,e.consts=o,e.showDevPanel=!1,e.embedded=!!o.embeddedData,e.hideExplore=!1,e.toggleHideExplore=function(){e.hideExplore=!e.hideExplore,e.hideExplore?l.logInteraction(l.actions.TOGGLE_HIDE_ALTERNATIVES,n.chart.shorthand):l.logInteraction(l.actions.TOGGLE_SHOW_ALTERNATIVES,n.chart.shorthand)},e.alternativeType=null,e.setAlternativeType=function(t,i){e.alternativeType=t,i||(e.hideExplore=!1,l.logInteraction(l.actions.TOGGLE_SHOW_ALTERNATIVES,n.chart.shorthand),l.logInteraction(l.actions.SET_ALTERNATIVES_TYPE,t,{shorthand:n.chart.shorthand}))},e.scrollToTop=function(){t.find(".vis-pane-container").scrollTop(0)},e.$watch("Spec.alternatives",function(t){for(var n=0;n<t.length;n++)if(e.alternativeType===t[n].type)return;e.setAlternativeType(null,!0)}),e.canUndo=!1,e.canRedo=!1,e.showModal=function(e){d.open(e),"bookmark-list"==e&&l.logInteraction(l.actions.BOOKMARK_OPEN)},s.isSupported&&s.load(),e.embedded&&(i.dataset={values:o.embeddedData,name:"embedded"}),i.update(i.dataset).then(function(){r.updateDataset(i.dataset),o.initialSpec&&n.parseSpec(o.initialSpec),e.chron=c.record("Spec.spec",e,!0,["Dataset.dataset","Config.config"]),e.canUndoRedo=function(){e.canUndo=e.chron.canUndo(),e.canRedo=e.chron.canRedo()},e.chron.addOnAdjustFunction(e.canUndoRedo),e.chron.addOnUndoFunction(e.canUndoRedo),e.chron.addOnRedoFunction(e.canUndoRedo),e.chron.addOnUndoFunction(function(){l.logInteraction(l.actions.UNDO)}),e.chron.addOnRedoFunction(function(){l.logInteraction(l.actions.REDO)}),angular.element(t).on("keydown",function(t){return t.keyCode!=="Z".charCodeAt(0)||!t.ctrlKey&&!t.metaKey||t.shiftKey?t.keyCode==="Y".charCodeAt(0)&&(t.ctrlKey||t.metaKey)?(e.chron.redo(),e.$digest(),!1):t.keyCode==="Z".charCodeAt(0)&&(t.ctrlKey||t.metaKey)&&t.shiftKey?(e.chron.redo(),e.$digest(),!1):void 0:(e.chron.undo(),e.$digest(),!1)})})}]),angular.module("voyager2").service("Alternatives",["ANY","vl","cql","util","Chart","Dataset",function(e,t,n,i,a,r){function o(e,t){return{type:"histograms",title:"Univariate Summaries",limit:12,charts:l("histograms",e,t)}}function c(e,i){var a=n.query.spec.isAggregate(e.spec),r=[],o=!1;e.spec.encodings.forEach(function(e){e.type===t.type.TEMPORAL&&(o=!0)});var c=i.vlSpec,s=!c.encoding.x||!c.encoding.y,d=c.encoding.color||c.encoding.size||c.encoding.shape||c.encoding.opacity,p=!c.encoding.row||!c.encoding.column;return r.push({type:"summarize",title:"Summaries"}),!s&&d||r.push({type:"addQuantitativeField",title:"Add Quantitative Field"}),(s||!d||p)&&r.push({type:"addCategoricalField",title:"Add Categorical Field"}),!o&&s&&r.push({type:"addTemporalField",title:"Add Temporal Field"}),r.push({type:"alternativeEncodings",title:"Re-Encode"}),a&&r.push({type:"disaggregate",title:"Disaggregate"}),r.map(function(t){return t.charts=l(t.type,e,i),t})}function l(e,t,i){var o=m[e](t),c=n.query(o,r.schema);return c.result.items.filter(function(e){var t=e.getTopSpecQueryModel();return!i||!i.shorthand||t.toShorthand()!==i.shorthand}).map(a.getChart)}function s(e){return n.enumSpec.isEnumSpec(e)?e:n.enumSpec.SHORT_ENUM_SPEC}function d(e){var t=i.duplicate(e.spec);return t.mark=s(t.mark),t.encodings.forEach(function(e){e.channel=s(e.channel)}),{spec:t,groupBy:y,orderBy:"effectiveness",chooseBy:"effectiveness"}}function p(e){var a=i.duplicate(e.spec);return a.mark=s(a.mark),a.encodings=a.encodings.reduce(function(e,i){if(n.enumSpec.isEnumSpec(i.type))i.aggregate=s(i.aggregate),i.bin=s(i.bin),i.timeUnit=s(i.timeUnit);else switch(i.type){case t.type.Type.QUANTITATIVE:if("count"===i.aggregate)return e;i.aggregate=s(i.aggregate),i.bin=s(i.bin);break;case t.type.Type.TEMPORAL:i.timeUnit=s(i.timeUnit)}return e.concat(i)},[]),{spec:a,groupBy:S,orderBy:"aggregationQuality",chooseBy:"effectiveness",config:{autoAddCount:!0,omitRaw:!0}}}function u(e){var a=i.duplicate(e.spec);return a.mark=s(a.mark),a.encodings=a.encodings.filter(function(e){return"count"!==e.aggregate}).map(function(e){return(n.enumSpec.isEnumSpec(e.type)||e.type===t.type.Type.QUANTITATIVE)&&(delete e.aggregate,delete e.bin),e}),{spec:a,groupBy:S,orderBy:"aggregationQuality",chooseBy:"effectiveness",config:{autoAddCount:!1,omitAggregate:!0}}}function g(e){var a=i.duplicate(e.spec);return a.encodings.push({channel:n.enumSpec.SHORT_ENUM_SPEC,field:n.enumSpec.SHORT_ENUM_SPEC,type:{"enum":[t.type.Type.NOMINAL,t.type.Type.ORDINAL]}}),{spec:a,groupBy:E,orderBy:"aggregationQuality",chooseBy:"effectiveness",config:{autoAddCount:!0}}}function v(e){var a=i.duplicate(e.spec);return a.encodings.push({channel:n.enumSpec.SHORT_ENUM_SPEC,bin:n.enumSpec.SHORT_ENUM_SPEC,aggregate:n.enumSpec.SHORT_ENUM_SPEC,field:n.enumSpec.SHORT_ENUM_SPEC,type:t.type.Type.QUANTITATIVE}),{spec:a,nest:[{groupBy:E},{groupBy:S,orderGroupBy:"aggregationQuality"}],chooseBy:"effectiveness",config:{autoAddCount:!0}}}function h(e){var a=i.duplicate(e.spec);return a.encodings.push({channel:n.enumSpec.SHORT_ENUM_SPEC,timeUnit:n.enumSpec.SHORT_ENUM_SPEC,field:n.enumSpec.SHORT_ENUM_SPEC,type:t.type.Type.TEMPORAL}),{spec:a,nest:[{groupBy:E},{groupBy:S,orderGroupBy:"aggregationQuality"}],chooseBy:"effectiveness",config:{autoAddCount:!0}}}function f(e){return{spec:{data:e.spec.data,mark:n.enumSpec.SHORT_ENUM_SPEC,encodings:[{channel:n.enumSpec.SHORT_ENUM_SPEC,field:n.enumSpec.SHORT_ENUM_SPEC,bin:n.enumSpec.SHORT_ENUM_SPEC,timeUnit:n.enumSpec.SHORT_ENUM_SPEC,type:n.enumSpec.SHORT_ENUM_SPEC},{channel:n.enumSpec.SHORT_ENUM_SPEC,field:"*",aggregate:t.aggregate.AggregateOp.COUNT,type:t.type.Type.QUANTITATIVE}]},groupBy:S,chooseBy:"effectiveness",config:{autoAddCount:!1}}}var m={alternativeEncodings:d,summarize:p,disaggregate:u,addCategoricalField:g,addQuantitativeField:v,addTemporalField:h,histograms:f,getHistograms:o,getAlternatives:c},y=[n.property.Property.FIELD,n.property.Property.AGGREGATE,n.property.Property.BIN,n.property.Property.TIMEUNIT,n.property.Property.TYPE,{property:n.property.Property.CHANNEL,replace:{x:"xy",y:"xy",color:"style",size:"style",shape:"style",opacity:"style",row:"facet",column:"facet"}}],S=[n.property.Property.FIELD,n.property.Property.AGGREGATE,n.property.Property.BIN,n.property.Property.TIMEUNIT,n.property.Property.TYPE],E=[{property:n.property.Property.FIELD,replace:{"*":""}}];return m}]),angular.module("voyager2").run(["$templateCache",function(e){e.put("app/main/main.html",'<div ng-controller="MainCtrl" class="flex-root vflex full-width full-height"><div class="full-width no-shrink"><div class="card top-card no-right-margin no-top-margin"><div class="hflex"><div id="logo"></div><div class="pane"><div class="controls"><a ng-show="Bookmarks.isSupported" class="command" ng-click="showModal(\'bookmark-list\')"><i class="fa fa-bookmark"></i> Bookmarks ({{Bookmarks.list.length}})</a> <a class="command" ng-click="chron.undo()" ng-class="{disabled: !canUndo}"><i class="fa fa-undo"></i> Undo</a> <a class="command" ng-click="chron.redo()" ng-class="{disabled: !canRedo}"><i class="fa fa-repeat"></i> Redo</a></div></div><div class="absolute-top-right"><a href="https://idl.cs.washington.edu/" target="_blank" class="idl-logo"></a></div></div></div><alert-messages></alert-messages></div><div class="hflex full-width main-panel grow-1"><div class="pane data-pane noselect"><div class="card no-top-margin data-card abs-100"><div class="sidebar-header" ng-if="!embedded"><h2>Data</h2><dataset-selector class="right"></dataset-selector><div class="current-dataset" title="{{Dataset.currentDataset.name}}"><i class="fa fa-database"></i> <span class="dataset-name">{{Dataset.currentDataset.name}}</span></div></div><h3>Fields</h3><schema-list field-defs="Dataset.dataschema" order-by="Dataset.fieldOrder" show-add="true"></schema-list><h3>Wildcards</h3><schema-list field-defs="Wildcards.list" show-add="true"></schema-list><div id="footer"><ul class="menu"><span ng-show="consts.debug"><li><a class="debug" ng-click="showDevPanel = !showDevPanel">Debug</a></li><li><a ng-href="{{ {spec:Spec.chart.vlSpec} | reportUrl }}" target="_blank" class="debug">Report an issue</a></li></span></ul></div></div></div><div class="pane encoding-pane"><shelves spec="Spec.spec" preview="false" support-any="true"></shelves><shelves class="preview" ng-show="Spec.previewedSpec" spec="Spec.previewedSpec || Spec.emptySpec" preview="true" support-any="true"></shelves></div><div class="pane vis-pane"><div class="vis-pane-container abs-100" ng-class="{\'scroll-y\': !hideExplore, \'no-scroll-y\': hideExplore}"><div class="specified-vis-pane vflex card no-top-margin" ng-if="Spec.isSpecific" ng-class="{expand: hideExplore, \'no-scroll-y\': hideExplore}"><h2>View</h2><vl-plot-group ng-if="Spec.hasPlot" class="main-vl-plot-group card" ng-class="{\'no-scroll-y\': hideExplore}" chart="Spec.chart" show-bookmark="true" show-debug="true" show-filter-null="true" show-log="true" show-sort="true" show-transpose="true" always-scrollable="hideExplore" overflow="true" show-label="true" tooltip="true" toggle-shelf="true"></vl-plot-group><div ng-if="!Spec.hasPlot">No specified visualization yet. Start exploring by dragging a field to encoding pane on the left or examining univariate summaries below.</div></div><div class="queried-vis-pane no-top-margin card" ng-if="!Spec.isSpecific"><h2>View<span ng-show="Spec.charts.length>1">s</span></h2><vl-plot-group-list charts="Spec.charts" enable-pills-preview="true" priority="1000" list-title="\'Results\'" hide-list-title="true" post-select-action="scrollToTop()" initial-limit="12"></vl-plot-group-list></div><div class="alternatives-pane card" ng-class="{collapse: hideExplore}" ng-if="Spec.isSpecific"><div class="alternatives-header"><div class="right alternatives-jump"><a ng-if="!hideExplore && Spec.alternatives.length > 1" ng-click="setAlternativeType(null)" ng-class="{active: alternativeType===null}">All</a> <a ng-repeat="alternative in Spec.alternatives" ng-if="alternative.charts.length" ng-click="$parent.setAlternativeType(alternative.type);" md-parent-scope="this" ng-class="{active: $parent.alternativeType === alternative.type}">{{alternative.title}}</a> <a class="toggle-hide-explore" ng-click="toggleHideExplore()"><span ng-show="hideExplore">Show <i class="fa fa-toggle-up"></i></span> <span ng-show="!hideExplore">Hide <i class="fa fa-toggle-down"></i></span></a></div><h2>Related Views</h2></div><div class="alternatives-content" ng-if="!hideExplore">{{Spec.alternatives.charts}}<vl-plot-group-list ng-repeat="alternative in Spec.alternatives" ng-if="alternative.charts.length > 0 && (!$parent.alternativeType || $parent.alternativeType === alternative.type)" id="alternatives-{{alternative.type}}" list-title="alternative.title" charts="alternative.charts" enable-pills-preview="true" priority="$index * 1000" initial-limit="alternative.limit || null" post-select-action="$parent.scrollToTop()"></vl-plot-group-list></div></div></div></div></div><div class="hflex full-width dev-panel" ng-if="showDevPanel"><div class="pane" ng-show="consts.logToWebSql"><div class="card"><div>userid: {{Logger.userid}}</div><button ng-click="Logger.clear()">Clear logs</button><br><button ng-click="Logger.export()">Download logs</button></div></div><div class="pane config-pane"><div class="card scroll-y abs-100"><configuration-editor></configuration-editor></div></div><div class="pane vl-pane"><cql-query-editor></cql-query-editor></div><div class="pane vg-pane"><vg-spec-editor></vg-spec-editor></div></div><bookmark-list highlighted="Fields.highlighted" post-select-action="scrollToTop"></bookmark-list><dataset-modal></dataset-modal></div>'),e.put("components/configurationeditor/configurationeditor.html","<form><pre>{{ Config.config | compactJSON }}</pre></form>"),e.put("components/cqlQueryEditor/cqlQueryEditor.html",'<div class="card scroll-y abs-100 vflex"><div><div class="right command"><a ui-zeroclip="" zeroclip-model="Spec.query | compactJSON">Copy</a></div><h3>CompassQL Query</h3></div><textarea class="cqlquery flex-grow-1 full-height" json-input="" type="text" ng-model="Spec.cleanQuery"></textarea></div>'),e.put("components/nullfilterdirective/nullfilterdirective.html",'<label><input ng-model="Spec.spec.config.filterNull.O" ng-change="updateFilter()" type="checkbox"> Remove null values</label>'),e.put("components/vgSpecEditor/vgSpecEditor.html",'<div class="card scroll-y abs-100 vflex no-right-margin"><div><div class="right"><a class="command" ui-zeroclip="" zeroclip-model="Spec.chart.vgSpec | compactJSON">Copy</a><lyra-export></lyra-export></div><h3>Vega Specification</h3></div><textarea class="vgspec flex-grow-1" json-input="" disabled="disabled" type="text" ng-model="Spec.chart.vgSpec"></textarea></div>')}]);