(function(){
	'use strict';

	angular
		.module('app.shared')
		.factory('AuthResource', AuthResource)
		.factory('StatusResource', StatusResource);

	function AuthResource(resourceExtension) {
		return resourceExtension('auth');
	}

	function StatusResource(resourceExtension) {
		var safeJsonParse = function(data) {
			// If data is not a string, return as is
			if (typeof data !== 'string') {
				return data;
			}
			// If data looks like HTML (starts with <), return empty object
			if (data.trim().charAt(0) === '<') {
				return {};
			}
			// Try to parse as JSON
			try {
				return angular.fromJson(data);
			} catch(e) {
				// If parsing fails, return empty object
				return {};
			}
		};

		return resourceExtension('status', {}, {
			get: {
				isArray: false,
				transformResponse: function(data) {
					var parsed = safeJsonParse(data);
					// Return parsed object (or empty object on error)
					return parsed;
				}
			}
		});
	}

})();