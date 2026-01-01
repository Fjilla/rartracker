(function(){
	'use strict';

	angular
		.module('app.shared')
		.factory('StartTorrentsResource', StartTorrentsResource);

	function StartTorrentsResource(resourceExtension) {
		var arrayTransform = function(data) {
			if (angular.isArray(data)) {
				return data;
			}
			// If data is an object (error response), return empty array
			if (angular.isObject(data) && !angular.isArray(data)) {
				return [];
			}
			// If data is a string or other type, return empty array
			return [];
		};

		var safeJsonParse = function(data) {
			// If data is not a string, return as is
			if (typeof data !== 'string') {
				return data;
			}
			// If data looks like HTML (starts with <), return empty array
			if (data.trim().charAt(0) === '<') {
				return [];
			}
			// Try to parse as JSON
			try {
				return angular.fromJson(data);
			} catch(e) {
				// If parsing fails, return empty array
				return [];
			}
		};

		return resourceExtension('start-torrents', {}, {
			query: {
				isArray: true,
				transformResponse: function(data) {
					var parsed = safeJsonParse(data);
					return arrayTransform(parsed);
				}
			}
		});
	}

})();
