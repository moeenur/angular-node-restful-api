/**
 * Define the `nodeNgApp` module
 */
var nodeNgApp = angular.module('nodeNgApp', ['angular-loading-bar']);

nodeNgApp.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider)
    {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);