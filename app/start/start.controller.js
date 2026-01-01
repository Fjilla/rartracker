(function(){
	'use strict';

	angular
		.module('app.shared')
		.controller('StartController', StartController);

	function StartController(StartTorrentsResource, NewsResource, StatisticsResource, PollsResource, TorrentListsResource) {

		this.pollAnswer = '';
		this.highligtedTorrents = [];
		this.stats = null;
		this.torrentLists = [];
		
		this.fetchPoll = function () {
			PollsResource.Latest.get({}, (data) => {
				this.poll = data;
			}, () => {
				// Error handling - poll is optional, just ignore if it fails
				this.poll = null;
			});
		};


		this.fetchData = function () {
			StartTorrentsResource.query({}, (data) => {
				this.highligtedTorrents = data || [];
			}, () => {
				// Error handling - if not logged in or error, use empty array
				this.highligtedTorrents = [];
			});

			StatisticsResource.get({id: 'start'}, (data) => {
				this.stats = data;
			}, () => {
				// Error handling - stats are optional
				this.stats = null;
			});

			TorrentListsResource.Popular.query().$promise
				.then((torrentLists) => {
					this.torrentLists = torrentLists || [];
				}, () => {
					// Error handling - torrent lists are optional
					this.torrentLists = [];
				});
		};

		this.vote = function () {
			PollsResource.Votes.save({id: this.poll.id, choise: this.poll.myChoise}, () => {
				this.fetchPoll();
			});
		};

		this.fetchData();
		this.fetchPoll();
	}
})();
