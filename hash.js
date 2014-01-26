( function(window, undefined) {
	"use strict";

	var hash = (function() {

		var fromHash = function(url) {
			var params = url ? url.substring(url.indexOf('#')) ? url.substring(url.indexOf('#')).substr(1).split("&") : [] : window.location.hash ? window.location.hash.substr(1).split("&") : [],
				paramsObject = {};

			for(var i = 0; i < params.length; i++) {
				var a = params[i].split("=");
				paramsObject[a[0]] =  decodeURIComponent(a[1]);
			}
			return paramsObject;
		};

		var toHash = function(params) {
			var str = [];
			for(var p in params) {
				str.push(p + "=" + encodeURIComponent(params[p]));
			}
			window.location.hash = str.join("&");
		};

		return {
			get: function(param, url) {
				var params = url ? fromHash(url) : fromHash();
				if (param) {
					return params[param];
				} else {
					return params;
				}
			},
			add: function(newParams) {
				var params = fromHash();
				for (var p in newParams) {
					params[p] = newParams[p];
				}
				toHash(params);
			},
			remove: function(removeParams) {
				removeParams = (typeof(removeParams)=='string') ? [removeParams] : removeParams;
				var params = fromHash();
				for (var i = 0; i < removeParams.length; i++) {
					delete params[removeParams[i]];
				}
				toHash(params);
			},
			clear: function() {
				toHash({});
			},
			onchange: function(func) {
				if (typeof(func)=='function') {
					window.onhashchange = func;
				}
			}
		};
	})();

	window.hash = hash;
})(window);
