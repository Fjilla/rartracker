(function(){
	'use strict';

	angular
		.module('app.shared')
		.factory('PollsResource', PollsResource);

	function PollsResource(resourceExtension) {
		return {
			Polls:		resourceExtension('polls/:id', { id: '@id' }),
			Latest:		resourceExtension('polls/latest', {}, {
				get: {
					isArray: false,
					transformResponse: function(data) {
						// If data is not a string, return as is
						if (typeof data !== 'string') {
							return data;
						}
						// If data looks like HTML (starts with <), return null
						if (data.trim().charAt(0) === '<') {
							return null;
						}
						// Try to parse as JSON
						try {
							var parsed = angular.fromJson(data);
							// If it's already an object, return it; if it's a string (error), return null
							return (angular.isObject(parsed) && !angular.isArray(parsed)) ? parsed : null;
						} catch(e) {
							return null;
						}
					}
				}
			}),
			Votes:		resourceExtension('polls/votes/:id', { id: '@id' }),
		};
	}

})();
