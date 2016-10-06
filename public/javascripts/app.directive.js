/**
 * Define the `tooltip` directive on the `nodeNgApp` module
 */
nodeNgApp.directive('tooltip', function ()
{
    return {
        restrict: 'AEC',
        link: function (scope, element, attrs)
        {
            if (attrs.tooltipped === "tooltip") {
                $(element).tooltip({
                    delay: 50,
                    html: attrs.tooltip
                });
            }
        }
    };
});

