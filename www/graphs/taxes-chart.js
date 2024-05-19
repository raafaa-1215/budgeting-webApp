google.charts.load("current", {packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);
    
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ["Discount", "Percentage", { role: "style" } ],
        ["Social Security", 11, '#FFBF00'],
        ["IRS", 15.4, '#FFBF00'],
    ]);

    var view = new google.visualization.DataView(data);
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