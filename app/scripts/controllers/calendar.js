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
	$scope.renderCalendar = function () {
		if (uiCalendarConfig.calendars.myCalendar) {
			uiCalendarConfig.calendars.myCalendar.fullCalendar('removeEvents');
			uiCalendarConfig.calendars.myCalendar.fullCalendar('addEventSource', $scope.events);
		}
	};
	if ($scope.tasks && $scope.tasks.length > 0) {
		$scope.events.splice(0, $scope.events.length);
		$scope.tasks.filter(function (el) {
			return el.state.code === 'K';
		}).forEach(function (el) {
			$scope.events.push({
				'title': el.title,
				'start': el.calendar.from,
				'end': el.calendar.to,
				'allDay': false,
				'original': el
			});
		});
		$scope.renderCalendar();
	}
	$scope.eventSources = [$scope.events];
});
