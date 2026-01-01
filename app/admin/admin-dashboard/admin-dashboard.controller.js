(function(){
	'use strict';

	angular
		.module('app.admin')
		.controller('AdminDashboardController', AdminDashboardController);

	function AdminDashboardController(authService, user) {
		var vm = this;
		this.currentUser = user;

		// Get badge count helper
		var getBadge = function(count) {
			return count > 0 ? count : null;
		};

		// Organize admin functions into categories
		this.categories = [
			{
				title: 'Moderation',
				icon: 'fa-gavel',
				items: [
					{
						title: 'Reports',
						description: 'Handle user reports',
						state: 'admin-reports',
						icon: 'fa-flag',
						getBadge: function() { return getBadge(vm.currentUser.newReports); }
					},
					{
						title: 'Forum Posts',
						description: 'Moderate forum posts',
						state: 'forum-posts',
						icon: 'fa-file-text-o'
					},
					{
						title: 'Torrent Comments',
						description: 'Moderate torrent comments',
						state: 'torrent-comments',
						icon: 'fa-file-text-o'
					},
					{
						title: 'Banned Users',
						description: 'View banned users',
						state: 'admin-banned',
						icon: 'fa-ban'
					}
				]
			},
			{
				title: 'Users',
				icon: 'fa-users',
				items: [
					{
						title: 'User Search',
						description: 'Search and manage users',
						state: 'admin-search',
						icon: 'fa-search'
					},
					{
						title: 'New Signups',
						description: 'Review new user registrations',
						state: 'admin-signups',
						icon: 'fa-user-plus'
					},
					{
						title: 'Login Attempts',
						description: 'View login attempts',
						state: 'admin-login-attempts',
						icon: 'fa-sign-in'
					},
					{
						title: 'IP Changes',
						description: 'Monitor IP address changes',
						state: 'admin-ipchanges',
						icon: 'fa-map-marker'
					}
				]
			},
			{
				title: 'Communication',
				icon: 'fa-comments',
				items: [
					{
						title: 'Staff Messages',
						description: 'Admin mailbox',
						state: 'admin-mailbox',
						icon: 'fa-envelope',
						getBadge: function() { return getBadge(vm.currentUser.newAdminMessages); }
					}
				]
			},
			{
				title: 'System & Logs',
				icon: 'fa-cog',
				items: [
					{
						title: 'Staff Log',
						description: 'View admin activity logs',
						state: 'admin-logs',
						icon: 'fa-list-alt'
					},
					{
						title: 'Recovery Log',
						description: 'Password recovery logs',
						state: 'recovery-logs',
						icon: 'fa-key'
					},
					{
						title: 'SQL Errors',
						description: 'Database error logs',
						state: 'admin-sqlerrors',
						icon: 'fa-exclamation-triangle'
					},
					{
						title: 'Cheat Log',
						description: 'View cheat detection logs',
						state: 'cheatlog',
						icon: 'fa-shield'
					}
				]
			},
			{
				title: 'Financial',
				icon: 'fa-usd',
				items: [
					{
						title: 'Donations',
						description: 'Manage donations',
						state: 'admin-donations',
						icon: 'fa-usd'
					}
				]
			}
		];
	}

})();
