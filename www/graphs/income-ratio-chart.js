
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
        
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Income Source', 'Amount'],
        ['Company 1', 1700],
        ['Company 2', 450],
        ['Dropshipping', 1200]
    ]);

    var options = {
        title: '',
        pieHole: 0.6,
        legend: {
            position: "none",
        },
        pieSliceTextStyle: {
            opacity: 0,
        },
    };

    var chart = new google.visualization.PieChart(document.querySelector('#income-ratio-chart'));
    chart.draw(data, options);
}
 