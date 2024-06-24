fetch('/chart/amountLeft')
.then(response => response.json())
.then(data => {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var color = ['#2980b9'];

        let arrayData = [['Money', 'Amount'], ['Amount left', data[0].amount]];      

        var chartData = google.visualization.arrayToDataTable(arrayData);

        var options = {
            title: '',
            pieSliceText: 'value',
            pieSliceTextStyle: {
                color: 'white',
                fontSize: 16,
            },
            legend: 'none',
            colors: color,
        };

        var chart = new google.visualization.PieChart(document.querySelector('#money-left-chart'));    
        chart.draw(chartData, options);
    }
})
.catch(error => {
    console.error('Error:', error);
});