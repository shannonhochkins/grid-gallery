if (DEVELOPMENT) {
    let angular = require('angular');
    let ngAnimate = require('angular-animate');
}
const app = angular.module('app', ['ngAnimate']);

if (DEVELOPMENT) {
    app.component('ngRepeatExample', require('./example/ng-repeat.component.js'));
}

const styles = require('./grid-gallery.scss');




app.animation('.is-panel', require('./grid-gallery.animation.js'))
app.component('gridPanel', require('./grid-gallery.component.js'));
app.component('gridPanelItem', require('./grid-gallery-item.component.js'));    

// app.component('gridPanelContent', {
//     require : {
//         'gridPanel' : '^gridPanel',
//     },
//     /*@ngInject*/
//     controller: function($element, $animate, $compile, $window, $document, $timeout, $scope, $attrs) {
        

//         this.$onChange = function(changes) {
            
//         };
//         this.$onInit = $onInit;

//         function $onInit() {
//             debugger;            
//         }

//     }
// });    