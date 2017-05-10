angular
    .module("SOS08ManagerApp")
    .controller("VictimsGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCache = {};
        $scope.datos = [];
        $scope.numberVictims = [];
        $scope.averageYears = [];
       $scope.year=[];
       $scope.province=[];
        
        function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        
        $http.get("/api/v1/victims/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                $scope.datos.push(capitalizeFirstLetter($scope.data[i].province) + " " + $scope.data[i].year);
                $scope.numberVictims.push(Number($scope.data[i].numberVictims));
                $scope.averageYears.push(Number($scope.data[i].averageYears));
                $scope.year.push(Number($scope.data[i].year));
                $scope.province.push(Number($scope.data[i].province));

                console.log($scope.data[i].province);
            }
        });    
            
        console.log("Controller initialized");
        $http.get("/api/v1/victims/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            
           Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Number of Victims per year'
    },
    xAxis: {
        categories: $scope.datos
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of Victims'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'numberVictims',
        data: $scope.numberVictims
    }, {
        name: 'AverageYears',
        data: $scope.averageYears
    }]
});
            
            
        
            //Google
            google.charts.load('current', {
                'packages': ['controls','geochart'],
                'mapsApiKey': 'AIzaSyBn5mCnx7CAij6MELDaLrPdidDdGDn0V50'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
                        
        
            function drawRegionsMap() {
                var myData = [['Province','NumberVictims', 'Year']];
     
                response.data.forEach(function (d){
                    myData.push([capitalizeFirstLetter(d.province), Number(d.numberVictims), Number(d.year)]);
                });
                    
                var data = google.visualization.arrayToDataTable(myData);
                var options = {
                    
                    region: '150',
                    colorAxis: {colors: ['blue', 'red' , 'yellow']}
                };
                var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));

                var yearSelector = new google.visualization.ControlWrapper({
                    controlType: 'CategoryFilter',
                    containerId: 'filter',
                    options: {
                        filterColumnIndex: 2,
                        ui: {
                            allowTyping: false,
                            allowMultiple: true,
                            allowNone: false
                        }
                    }
                });
                var chart = new google.visualization.ChartWrapper({
                    chartType: 'GeoChart',
                    containerId: 'map',
                    options: {
                        displayMode: 'regions',
                        colorAxis: {colors: ['yellow', 'orange' , 'red']}
                    }
                });
                dashboard.bind(yearSelector, chart);
                dashboard.draw(data, options);
            }    
            
          
  var chart = new CanvasJS.Chart("chartContainer",
	{
		animationEnabled: true,
		theme: "theme2",
		//exportEnabled: true,
		title:{
			text: "Victims per Year"
		},
		data: [
		{
			type: "column", //change type to bar, line, area, pie, etc
			dataPoints: [
				{ x: 10, y: 71 },
				{ x: 20, y: 55 },
				{ x: 30, y: 50 },
				{ x: 40, y: 65 },
				{ x: 50, y: 95 },
				{ x: 60, y: 68 },
				{ x: 70, y: 28 },
				{ x: 80, y: 34 },
				{ x: 90, y: 14 }
			]
		}
		]
	});

	chart.render();
});
  /*
  
  //CanvasJS
    var chart = new CanvasJS.Chart("PacoChart", {
  title: {
    text: "NumberVictims"
  },
  axisX: {
    title: "Provinces"
  },
  axisY: {
    title: "NumberVictims"
  },
  data: [{
    type: "bar",
    dataPoints:$scope.numberVictims
  }]
});
	chart.render();
*/
           
  
  
  
 
            
            
    }]);