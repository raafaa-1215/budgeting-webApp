google.charts.load("current", {packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);
    
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ["Discount", "Percentage", { role: "style" } ],
        ["Social Security", 11, null],
        ["IRS", 15.4, null],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1, { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" }, 2]);

    var options = {
        title: "",
        width: 600,
        height: 400,
        bar: {
            groupWidth: "50%"
        },
        legend: { 
            position: "none" 
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('discounts-chart'));
    chart.draw(view, options);
}