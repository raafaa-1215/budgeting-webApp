fetch('/chart/incomeStrings')
.then(response => response.json())
.then(data => {
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
    var colors = ['#00602b', '#1b8a43', '#1f9c4d', '#27ae60', '#d2e7f2', '#4ac486', '#33b973'];
    
    var arrayData = [['Income Source', 'Amount']]

    for (let i=0; i < data.length; i++) {
        arrayData.push([data[i].name, data[i].amount]);
    }

    var chartData = google.visualization.arrayToDataTable(arrayData);
    var options = {
        title: '',
        pieHole: 0.5,
        pieSliceTextStyle: {
            opacity: 0,
        },
        colors: colors,
    };
    var chart = new google.visualization.PieChart(document.querySelector('#income-ratio-chart'));
    chart.draw(chartData, options);
    }
})
.catch(error => {
    console.error('Error:', error);
});
    

 