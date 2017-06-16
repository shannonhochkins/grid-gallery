module.exports = {
    bindings: {
        items : '<',
        onPanelOpened: '&',
        onPanelClosed: '&'
    },
    /*@ngInject*/
    controller: function($element, $animate, $compile, $window, $document, $timeout, $scope, $attrs) {
        var windowElement = angular.element($window);
        var htmlAndBodyElement = angular.element($document).find('html, body');

        var gridItemTemplate = getGridItemTemplate();
        var gridPanelTemplate = getGridPanelTemplate();


        var iterationVariableName = 'item';

        var panel;
        var panelOpenedAfter;
        var panelScope;
        const $ctrl = this;
        this.$onChange = function(changes) {
            
        };
        this.$onInit = $onInit;

        function $onInit() {

            $timeout(function() {
                _onItemsChanged($ctrl.items);
            }, 500)
        }

        function _onItemsChanged(items) {
            //todo: remove only items that need to be removed
            $element.empty();
            for(var i = 0, len = items.length; i < len; i++) {
                var itemScope = $scope.$new();
                var item = items[i];

                itemScope[iterationVariableName] = item;

                var itemElement = gridItemTemplate.clone();
                itemScope[iterationVariableName].$element = itemElement;

                itemElement.addClass('grid-panel-item-' + i).on('click', function(i, item) {
                    return function() {
                        _onGridItemClick(i, item);
                    };
                }(i, itemScope[iterationVariableName]));

                $animate.enter(itemElement, $element);

                $compile(itemElement)(itemScope);
            }
        }

        function _onGridItemClick(index, item) {
            var gridItem = item.$element;

            let gridItemBB = gridItem[0].getBoundingClientRect(),
                panelBB = gridItem[0].getBoundingClientRect();


            var lastGridItem = getLastGridItem(gridItem);
            var lastGridItemClass = lastGridItem.attr('class');

            if(panel && panelOpenedAfter === lastGridItemClass) {
                updatePanel();
            }
            else {
                addPanel();
            }

            updateTriangle();

            scrollToPanel();

            function getLastGridItem(gridItem) {
                let current = gridItem,
                    next = gridItem.next();              

                while(next.length && current[0].getBoundingClientRect().top === next[0].getBoundingClientRect().top) {
                    current = next;
                    next = current.next();
                }

                return current;
            }

            function addPanel() {
                panelOpenedAfter = lastGridItemClass;

                var isNewPanel = !!panel;

                closePanel();

                panelScope = $scope.$new();
                panelScope[iterationVariableName] = item;

                panel = gridPanelTemplate.clone();

                angular.element(panel[0].querySelector('.close-x')).on('click', function(item) {
                    return function() {
                        closePanel();

                        $ctrl.onPanelClosed({
                            item: item
                        });
                    };
                }(item));

                $animate.enter(panel, null, lastGridItem);


                $compile(panel)(panelScope);
                panelScope.$digest();

                if(isNewPanel) {
                    $ctrl.onPanelOpened({
                        item: item
                    });
                }
            }

            function updatePanel() {
                panelScope[iterationVariableName] = item;
                panelScope.$digest();
            }

            function closePanel() {
                if(panel) {
                    $animate.leave(panel);                    
                    panel = undefined;
                }

                if(panelScope) {
                    panelScope.$destroy();
                    panelScope = undefined;
                }

                $scope.$digest();
            }

            function scrollToPanel() {
                if(!panel) {
                    return;
                }

                $timeout(scrollAnimate, 350);

                function scrollAnimate() {
                    let panelOffset = panelBB.top,
                        w = window,
                        d = document,
                        e = d.documentElement,
                        g = d.getElementsByTagName('body')[0],
                        y = w.innerHeight|| e.clientHeight|| g.clientHeight,
                        top = (w.pageYOffset || d.scrollTop)  - (d.clientTop || 0),
                        windowBottom = top + (y / 2);

                    if(panelOffset > windowBottom) {
                        htmlAndBodyElement.animate({
                            scrollTop: panelOffset - (gridItemBB.height * 2)
                        }, 500);
                    }
                }
            }

            function updateTriangle() {
                if(!panel) {
                    return;
                }
                let triangle = angular.element(panel[0].querySelector('.triangle'));
                triangle.css({
                    left: (gridItemBB.left + (gridItemBB.width / 2) - (triangle[0].offsetWidth / 2) ) + 'px'
                });
            }
        }

        function getGridItemTemplate() {
            var gridItemTemplate = $element.find('grid-panel-item').clone();
            if(!gridItemTemplate.length) {
                throw new Error('grid-panel-item template must be set');
            }

            return gridItemTemplate;
        }

        function getGridPanelTemplate() {
            var gridPanelTemplate = $element.find('grid-panel-content').clone();
            if(!gridPanelTemplate.length) {
                throw new Error('grid-panel-content template must be set');
            }


            gridPanelTemplate
                .addClass('is-panel')                
                .html(`
                    <div class="close-x"></div>
                    <div class="triangle"></div>
                    <div class="content-wrapper">
                        <div class="panel-content">${gridPanelTemplate.html()}</div>                        
                    </div>`)
            return gridPanelTemplate;
        }
    }
};