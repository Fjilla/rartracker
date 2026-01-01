(function(){
	'use strict';

	angular
		.module('app.shared')
		.factory('TorrentsResource', TorrentsResource)
		.factory('ReseedRequestsResource', ReseedRequestsResource)
		.factory('CommentsResource', CommentsResource);

	function TorrentsResource(resourceExtension) {
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

		return {
			Torrents: 			resourceExtension('torrents/:id', {}, { 
				query: { 
					isArray: true,
					transformResponse: function(data) {
						var parsed = safeJsonParse(data);
						return arrayTransform(parsed);
					}
				} 
			}),
			Related: 			resourceExtension('related-torrents/:id', {}, { 
				query: { 
					isArray: true,
					transformResponse: function(data) {
						var parsed = safeJsonParse(data);
						return arrayTransform(parsed);
					}
				} 
			}),
			TorrentsMulti:		resourceExtension('torrents/:id/multi'),
			Files: 			resourceExtension('torrents/:id/files', {}, { 
				query: { 
					isArray: true,
					transformResponse: function(data) {
						var parsed = safeJsonParse(data);
						return arrayTransform(parsed);
					}
				} 
			}),
			Peers: 			resourceExtension('torrents/:id/peers'),
			Snatchlog:			resourceExtension('torrents/:id/snatchlog', {}, { 
				query: { 
					isArray: true,
					transformResponse: function(data) {
						var parsed = safeJsonParse(data);
						return arrayTransform(parsed);
					}
				} 
			}),
			Comments:			resourceExtension('torrents/:id/comments/:commentId', { id: '@id', commentId: '@commentId' }, { 
				query: { 
					isArray: true,
					transformResponse: function(data) {
						var parsed = safeJsonParse(data);
						return arrayTransform(parsed);
					}
				} 
			}),
			PackFiles:			resourceExtension('torrents/:id/pack-files'),
			Multi:				resourceExtension('torrents/multi'),
		};
	}

	function ReseedRequestsResource(resourceExtension) {
		return resourceExtension('reseed-requests/:id');
	}

	function CommentsResource(resourceExtension) {
		return resourceExtension('comments/:id');
	}

})();
