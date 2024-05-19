google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var color = ['#2980b9'];

    var data = google.visualization.arrayToDataTable([
        ['Money', 'Amount', ],
        ['Money Left', 120],
    ]);

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

    var chart = new google.visualization.PieChart(document.getElementById('money-left-chart'));    
    chart.draw(data, options);
}