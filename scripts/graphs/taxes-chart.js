fetch('/chart/taxes')
.then(response => response.json())
.then(data => {    
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
        
    function drawChart() {
        var arrayData = [["Discount", "Percentage", { role: "style" } ]];

        for (let i=0; i < data.length; i++) {
            arrayData.push([data[i].name, data[i].percentage, '#FFBF00']);
        }

        var chartData = google.visualization.arrayToDataTable(arrayData);

        var view = new google.visualization.DataView(chartData);
        view.setColumns([0, 1, { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" }, 2]);

        var options = {
            title: "",
            bar: {
                groupWidth: "50%"
            },
            legend: "none",
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('taxes-chart'));
        chart.draw(view, options);
    }
})
.catch(error => {
    console.error('Error:', error);
});