webshims.register("mediaelement-yt",function(e,t,i,a,n){"use strict";var r=t.mediaelement,o=jQuery.Deferred();i.onYouTubePlayerAPIReady=function(){o.resolve()},i.YT&&YT.Player&&i.onYouTubePlayerAPIReady();var s={paused:!0,ended:!1,currentSrc:"",duration:i.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(e){return e?(t.error("buffered index size error"),n):0},end:function(e){return e?(t.error("buffered index size error"),n):0},length:0}},l=Object.keys(s),u={currentTime:0,volume:1,muted:!1};Object.keys(u);var c=e.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_metadata:!1,_callMeta:!1,currentTime:0,_buffered:0,_ppFlag:n},s,u),d=function(t,i){i=e.Event(i),i.preventDefault(),e.event.trigger(i,n,t)},p=function(){var e=["_buffered","_metadata","_ppFlag","currentSrc","currentTime","duration","ended","networkState","paused","videoHeight","videoWidth","_callMeta"],t=e.length;return function(i){if(i){var a=t,n=i.networkState;for(i.readyState=0;--a;)delete i[e[a]];i.buffered.length=0,clearInterval(i._timeInterval),n&&d(i._elem,"emptied")}}}(),f=function(){var t={},i=function(i){var n,r,o;return t[i.currentSrc]?n=t[i.currentSrc]:i.videoHeight&&i.videoWidth?(t[i.currentSrc]={width:i.videoWidth,height:i.videoHeight},n=t[i.currentSrc]):(r=e.attr(i._elem,"poster"))&&(n=t[r],n||(o=a.createElement("img"),o.onload=function(){t[r]={width:this.width,height:this.height},t[r].height&&t[r].width?m(i):delete t[r]},o.src=r,o.complete&&o.onload())),n||{width:300,height:"video"==i._elemNodeName?150:50}};return function(t){var a,n,r=t.elemDimensions;return("auto"==r.width||"auto"==r.height)&&(r=e.extend({},t.elemDimensions),a=i(t),n=a.width/a.height,"auto"==r.width&&"auto"==r.height?r=a:"auto"==r.width?(t.shadowElem.css({height:r.height}),r.width=t.shadowElem.height()*n):(t.shadowElem.css({width:r.width}),r.height=t.shadowElem.width()/n)),r}}(),m=function(t){var a,n=t._elem,r=t.shadowElem;"third"==t.isActive&&(console.log(t),t&&t._ytAPI&&t._ytAPI.getPlaybackQuality&&(i.ytapi=t._ytAPI),t.elemDimensions={width:n.style.width||e(n).attr("width")||e(n).width(),height:n.style.height||e(n).attr("height")||e(n).height()},a=f(t),r.css(a))},h=function(e){try{e.nodeName}catch(i){return null}var a=t.data(e,"mediaelement");return a&&"third"==a.isActive?a:null},v=function(i){var a;return i=i.split("?"),-1!=i[0].indexOf("youtube.com/watch")&&i[1]?(i=i[1].split("&"),e.each(i,function(e,t){return t=t.split("="),"v"==t[0]?(i=t[1],a=!0,!1):n})):-1!=i[0].indexOf("youtube.com/v/")&&(i=i[0].split("/"),e.each(i,function(e,t){return a?(i=t,!1):("v"==t&&(a=!0),n)})),a||t.warn("no youtube id found: "+i),i},g=function(t){t&&(t._ppFlag===n&&e.prop(t._elem,"autoplay")||!t.paused)&&setTimeout(function(){if("third"==t.isActive&&(t._ppFlag===n||!t.paused))try{e(t._elem).play()}catch(i){}},1)},y=e.noop;(function(){var i={play:1,playing:1},n=["play","pause","playing","canplay","progress","waiting","ended","loadedmetadata","durationchange","emptied"],r=n.map(function(e){return e+".webshimspolyfill"}).join(" "),o=function(a){var n=t.data(a.target,"mediaelement");if(n){var r=a.originalEvent&&a.originalEvent.type===a.type;r==("third"==n.activating)&&(a.stopImmediatePropagation(),i[a.type]&&n.isActive!=n.activating&&e(a.target).pause())}};y=function(i){e(i).off(r).on(r,o),n.forEach(function(e){t.moveToFirstEvent(i,e)})},y(a)})(),e(a).on("emptied",function(e){var t=h(e.target);g(t)}),r.setActive=function(i,a,n){if(n||(n=t.data(i,"mediaelement")),n&&n.isActive!=a){"html5"!=a&&"third"!=a&&t.warn("wrong type for mediaelement activating: "+a);var r=t.data(i,"shadowData");n.activating=a,e(i).pause(),n.isActive=a,"third"==a?(r.shadowElement=r.shadowFocusElement=n.shadowElem[0],e(i).addClass("yt-api-active nonnative-api-active").hide().getShadowElement().show()):(clearInterval(n._timeInterval),e(i).removeClass("yt-api-active nonnative-api-active").show().getShadowElement().hide(),r.shadowElement=r.shadowFocusElement=!1),e(i).trigger("mediaelementapichange")}};var b=function(t,i){i._ppFlag=!0,"playing"==t&&(b("play",i),3>i.readyState&&(i.readyState=3,d(i._elem,"canplay")),e(i._elem).trigger("playing")),"play"==t&&i.paused?(i.paused=!1,d(i._elem,"play")):"pause"!=t||i.paused||(i.paused=!0,d(i._elem,"pause"))},w={small:{height:240,width:320},medium:{height:360,width:640},large:{height:480,width:853},hd720:{height:720,width:1280},hd1080:{height:1080,width:1920}},T=function(t,i,a,n){o.done(function(){var r=function(){var i,n;a._metadata&&a._ytAPI.getVideoLoadedFraction&&(n=a._ytAPI.getVideoLoadedFraction(),i=n*a.duration,a._buffered!==i&&(a._buffered=i,a.buffered.length=1,e(t).trigger("progress")),n>.99&&(a.networkState=1),4>a.readyState&&a.currentTime&&(a._buffered-a.currentTime>9||n>.9)&&(a.readyState=4,d(a._elem,"canplaythrough")))},o=function(){if(a._ytAPI&&a._ytAPI.getCurrentTime){var i=a._ytAPI.getCurrentTime();a.currentTime!=i&&(a.currentTime=i,e(t).trigger("timeupdate")),r()}},s=function(){if("third"==a.isActive&&a._ytAPI&&a._ytAPI.getVolume){var i,n=a._ytAPI.getVolume()/100,s=a._ytAPI.isMuted();n!=a.volume&&(a.volume=n,i=!0),s!=a.muted&&(a.muted=s,i=!0),o(),r(),i&&e(t).trigger("volumechange")}},l=function(){clearInterval(a._timeInterval),a._timeInterval=setInterval(function(){var i=a._ytAPI.getCurrentTime();a.currentTime!=i&&(a.currentTime=i,e(t).trigger("timeupdate"))},350)};a._ytAPI=new YT.Player(i,{height:"100%",width:"100%",allowfullscreen:"allowfullscreen",webkitallowfullscreen:"allowfullscreen",playerVars:{allowfullscreen:!0,fs:1,rel:0,showinfo:0,autohide:1,controls:e.prop(t,"controls")?1:0},videoId:n,events:{onReady:function(){g(a),setTimeout(s,9),setInterval(s,5e3)},onStateChange:function(i){if(i.target.getDuration){var n;if(!a._metadata){var r=i.target.getDuration(),o=i.target.getPlaybackQuality();r&&(a._metadata=!0,a.duration=r,1>a.readyState&&(a.readyState=1),1>a.networkState&&(a.networkState=2),n=!0,w[o]||(o="large"),a.videoHeight=w[o].height,a.videoWidth=w[o].width)}n&&e(t).trigger("durationchange").trigger("loadedmetadata"),setTimeout(s,9),1==i.data?(b("playing",a),l()):2==i.data?(clearInterval(a._timeInterval),b("pause",a)):3==i.data?(a.readyState>2&&(a.readyState=2),a.networkState=2,e(t).trigger("waiting")):0===i.data&&(a.readyState>4&&(a.readyState=4),a.networkState=1,clearInterval(a._timeInterval),e(t).trigger("ended"))}}}}),e(t).on("updateytdata",s)})};if("matchMedia"in i){var x=!1;try{x=i.matchMedia("only all").matches}catch(N){}x&&(r.sortMedia=function(e,t){return e=!e.media||matchMedia(e.media).matches,t=!t.media||matchMedia(t.media).matches,e==t?0:e?-1:1})}r.createSWF=function(i,a,s){s||(s=t.data(i,"mediaelement"));var l=v(a.src);if(s)return r.setActive(i,"third",s),p(s),s.currentSrc=a.srcProp,o.done(function(){s._ytAPI.loadVideoById&&s._ytAPI.loadVideoById(l)}),n;e.prop(i,"controls");var u="yt-"+t.getID(i),d=e('<div class="polyfill-video polyfill-mediaelement" id="wrapper-'+u+'"><div id="'+u+'"></div>').css({position:"relative",overflow:"hidden"}),f=function(){m(s)};s=t.data(i,"mediaelement",t.objectCreate(c,{shadowElem:{value:d},_elem:{value:i},currentSrc:{value:a.srcProp},buffered:{value:{start:function(e){return e>=s.buffered.length?(t.error("buffered index size error"),n):0},end:function(e){return e>=s.buffered.length?(t.error("buffered index size error"),n):s._buffered},length:0}}})),m(s),t.addShadowDom(i,d),r.setActive(i,"third",s),y(i),d.insertBefore(i),T(i,u,s,l),e(i).on("updatemediaelementdimensions loadedmetadata emptied",f).onWSOff("updateshadowdom",f).on("remove",function(e){e.originalEvent||d.remove()})},function(){var i,a=function(t){clearTimeout(t.updateDataTimer),t.updateDataTimer=setTimeout(function(){e(t._elem).triggerHandler("updateytdata")},9)},r={},o=function(e){r[e]={get:function(){var t=h(this);return t?t[e]:i[e].prop._supget.apply(this)},writeable:!1}},s=function(e,t){o(e),delete r[e].writeable,r[e].set=t};l.forEach(o),s("currentTime",function(e){var t=h(this);return t?(e*=1,!isNaN(e)&&t._ytAPI&&t._ytAPI.seekTo&&(t._ytAPI.seekTo(e),a(t)),n):i.currentTime.prop._supset.apply(this,arguments)}),s("muted",function(e){var t=h(this);return t?(t._ytAPI&&t._ytAPI.mute&&(t._ytAPI[e?"mute":"unMute"](),a(t)),n):i.muted.prop._supset.apply(this,arguments)}),s("volume",function(e){var r=h(this);return r?(e*=100,!isNaN(e)&&r._ytAPI&&r._ytAPI.setVolume&&((0>e||e>100)&&t.error("volume greater or less than allowed "+e/100),r._ytAPI.setVolume(e),a(r)),n):i.volume.prop._supset.apply(this,arguments)}),e.each(["play","pause"],function(e,t){var a=t+"Video";r[t]={value:function(){var e=h(this);return e?(e._ytAPI&&e._ytAPI[a]&&(e._ytAPI[a](),b(t,e)),n):i[t].prop._supvalue.apply(this,arguments)}}}),i=t.defineNodeNameProperties("video",r,"prop")}()});