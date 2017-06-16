module.exports = {
    require : {
        'gridPanel' : '^gridPanel',
    },
    /*@ngInject*/
    controller: function($element, $animate, $compile, $window, $document, $timeout, $scope, $attrs) {
        

        this.$onChange = function(changes) {
            
        };
        this.$onInit = $onInit;

        function $onInit() {
            console.log('this', this);       
        }

    }
}