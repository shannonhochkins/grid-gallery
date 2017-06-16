module.exports = isExapandedAnimation;

/*@ngInject*/
function isExapandedAnimation($animateCss) {
  return {
    enter: function(element, done) {
        let child = angular.element(element[0].querySelector('.content-wrapper'));
        element.addClass('is-opening');
        child.css({
            'max-height': 'none',
        });
        element.css({
            'visibility' : 'hidden'
        });

        let height = child[0].getBoundingClientRect().height;
        element.css({
            'visibility' : 'visible'
        });


      let expandAnimation = $animateCss(child, {
        easing: 'ease',
        from: { 
            maxHeight: '0px' 
        },
        to: { 
          maxHeight: height + 'px' 
        },
        duration: .3
      });

      expandAnimation.start().done(() => {
        element.removeClass('is-opening');
        child.css('max-height', 'none');
        done();
      });

      return function (isCancelled) {
        if (isCancelled) element.css('max-height', 'none');
      };
    },
    leave: function(element, done) {
        let child = angular.element(element[0].querySelector('.content-wrapper'));
        element.addClass('is-closing');
        child.css({
            'max-height': 'none',
        });
        element.css({
            'visibility' : 'hidden'
        });

        let height = child[0].getBoundingClientRect().height;
        element.css({
            'visibility' : 'visible'
        });


      let collapseAnimation = $animateCss(child, {
        easing: 'ease',
        from: { 
          maxHeight: height + 'px' 
        },
        to: { 
          maxHeight: '0px' 
        },
        duration: .3
      });

      collapseAnimation.start().done(function(){
            element.removeClass('is-closing');
            return done();
        });
      return function (isCancelled) {

        if (isCancelled) child.css('max-height', '0px');
      };
    }
  };
}