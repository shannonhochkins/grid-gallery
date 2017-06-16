module.exports = {
	template : `
		<style>
			body,html{
				margin:0;
				padding:0;
			}
	        .demo-item {
			    height: 150px;
			    width: 150px;

			    margin: 10px;

			    color: #ffffff;
			    font-weight: bold;

			    text-align: center;

			    border-radius: 5px;
			}

			.demo-item img {
			    outline: 0;
			    border: 0;
			    box-shadow: none;
			}

			.demo-panel {
			    text-align: left;
			    padding-left: 40px;
			    box-sizing: border-box;
			}

			.demo-panel h3 {
			    color: #ffffff;
			}

			#header_wrap .inner {
			    padding: 10px 10px 30px 10px;
			}

			#main_content_wrap section {
			    margin-top: 20px;

			    text-align: center;
			}

			grid-panel grid-panel-content .close-x {
			    font-size: 30px;
			}
	    </style>
		<grid-panel items="$ctrl.items" 
        	on-panel-opened="panelIsOpened(item)" 
        	on-panel-closed="panelIsClosed(item)">
	        <grid-panel-item>
	            <div class="demo-item align" ng-style="{ backgroundColor: item.backgroundColor}">
                    <div class="align-item">{{ item.name }}</div>
                </div>
	        </grid-panel-item>
	        <grid-panel-content>
	            <div class="demo-panel align">
	            	<div class="align-item">
                    	<h3 ng-style="{ padding: item.padding }">{{ item.name }}</h3>                    
                    </div>
                </div>
	        </grid-panel-content>
	    </grid-panel>
	`,
	controller : function() {


        var colors = ['#444444', '#D1DBBD', '#91AA9D', '#3E606F', '#193441', '#703030', '#2F343B', '#7E827A', '#E3CDA4', '#C77966'];
        var padding = [20,40,60,80,20,103,40,50,30];

        this.items = [];

        for(var i = 0; i < 150; i++) {
            this.items.push({
                name: 'Click me ' + i,
                padding : padding[Math.round(Math.random() * (padding.length - 1))] + 'px 0px',
                backgroundColor: generateRandomBackgroundColor()
            });
        }

        function generateRandomBackgroundColor() {
            return colors[Math.round(Math.random() * (colors.length - 1))];
        }
	}
}