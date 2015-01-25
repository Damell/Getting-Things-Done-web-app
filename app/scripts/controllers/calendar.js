'use strict';

/**
 * @ngdoc function
 * @name gtdApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the gtdApp
 */
angular.module('gtdApp')
.controller('CalendarCtrl', function ($scope, $state, uiCalendarConfig) {
	$scope.calendarOptions = {
		eventClick: function(calEvent) {
			$scope.select(calEvent.original);
			$state.go('main.activityDetails');
		}

	};
	$scope.setView = function (viewName) {
		uiCalendarConfig.calendars.myCalendar.fullCalendar( 'changeView', viewName );
	};
	$scope.events = [];
	$scope.eventSources = [$scope.events];
	$scope.renderCalender = function () {
		$scope.eventSources = [$scope.events];
		if (uiCalendarConfig.calendars.uiCalendarConfig) {
			uiCalendarConfig.calendars.myCalendar.fullCalendar('render');
		}
	};
	$scope.tasks.$promise.then(function (tasks) {
		$scope.events.slice(0, $scope.events.length);
		tasks.data.filter(function (el) {
			return el.state.code === 'K';
		}).map(function (el) {
			$scope.events.push({
				'title': el.title,
				'start': el.calendar.from,
				'end': el.calendar.to,
				'allDay': false,
				'original': el
			});
		});
		$scope.renderCalender();
	});
});
