//load some elements before request, pretty much a mess
$(document).ready(function() {var ctx = document.getElementById('chart').getContext('2d');var myLineChart = new Chart(ctx, {type: 'line',data: {labels: ['4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'],datasets: [{label: 'credits',data: [0,0,0,0,0],backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)'],borderColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'],borderWidth: 1}]},options: {maintainAspectRatio:false,aspectRatio:'2',scales: {yAxes: [{ticks: {beginAtZero: true}}]}}});myLineChart.canvas.parentNode.style.height = $('#warp4').height() - 70 + 'px';myLineChart.canvas.parentNode.style.width = $('#warp4').width() -70 + 'px';$.ajax({dataType: "text",url: 'functions/dbprocessor.php?action=get_cr',success:function(data){var rateh =data;switch(true){case (rateh <=10):$('#crntrateh').html('<span style="color:#8b0000">' + Math.round(rateh) + 'CR/h</span>');break;case (rateh<=23):$('#crntrateh').html('<span style="color:#ffa500">' + Math.round(rateh) + 'CR/h</span>');break;case (rateh>=25):$('#crntrateh').html('<span style="color:#228b22">' + Math.round(rateh) + 'CR/h</span>');}},});});
$( document ).ready(function(){
  $('#warp').height('100%');
  $('#warp4').height('100%');
  $('#warp').height($('#warp').height() + 150 + 'px');
  $('#warp4').height($('#warp4').height() + 150 + 'px');
});

$(document).ready(function() {

sendd();

});

function sendd(){
//start balances
  $.get("functions/getbalance.php",function(data){
    var obj = JSON.parse(data);
    var total = obj[0];
    var today = obj[1];
    $("#balance").html(total);
    $("#today").html(today);
      $.get("functions/getfivedays.php",function(data1){
          var obj1 = JSON.parse(data1);
          var lastfivedays = obj1['total_days'];
          var chartdata = obj1['days_values'];
            $('#avrgrate').html(Math.round(lastfivedays / 5 ) + 'CR/day');
            $('#payin').html(Math.round((20000 - ($('#balance').text() *1000)) /(lastfivedays / 5)) + ' day(s)');
            var ctx = document.getElementById('chart').getContext('2d');
            var myLineChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: ['4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'],
                datasets: [{
                label: 'credits',
                data: chartdata,
                backgroundColor: 'rgba(128, 20, 255, 0.43)',
                backgroundColor: 'rgba(128, 20, 255, 0.43)',
                borderWidth: 1
                }]
              },
              options: {
                maintainAspectRatio:false,
                aspectRatio:'2',
                scales: {
                  yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                  }]
                }
              }
            });
            myLineChart.canvas.parentNode.style.height = ((60 / 100) * $('#warp4').height()) + 'px';
            myLineChart.canvas.parentNode.style.width = $('#warp4').width() -20 + 'px';
      })
      //start realtime rate /h and realtime rate /d
      $.ajax({
        dataType: "text",
        url: 'functions/dbprocessor.php?action=update&cr='+(today * 1000),
        success:function(data){
          $.ajax({
            dataType: "text",
            url: 'functions/dbprocessor.php?action=get_cr',
            success:function(data){
              var rateh =Math.round(data);
              var rated = rateh * 24;
              $('#payin2').html(Math.round((20000 - ($('#balance').html() * 1000)) / rated) + ' day(s)');
              switch(true){
                case (rateh <=10):
                $('#crntrateh').html('<span style="color:#8b0000">' + rateh + 'CR/h</span>');
                $('#crntrated').html('<span style="color:#8b0000">' +  rated + 'CR/day</span>');
              break;
                case (rateh<=23):
                $('#crntrateh').html('<span style="color:#ffa500">' + Math.round(rateh) + 'CR/h</span>');
                $('#crntrated').html('<span style="color:#ffa500">'  +  rated + 'CR/day</span>');
              break;
                case (rateh>=25):
                $('#crntrateh').html('<span style="color:#228b22">' + Math.round(rateh) + 'CR/h</span>');
                $('#crntrated').html('<span style="color:#228b22">'  +  rated +  'CR/day</span>');
          }
    },
    });},});
    });
    //start last refresh
      $.ajax({
        dataType: "text",
        url: 'functions/dbprocessor.php?action=get_h',
        success:function(data){
        $('#lastre').html(data + '<br><span style="font-size:14px;">Auto refresh in <span id="countdown"><span id="hour">0</span>h <span id="min">59</span> minute<span style="font-size:11px">(s)</span> <span id="seconds">59</span> second<span style="font-size:11px">(s)</span></span></span>');
      },
      });
     //start devices
          $.get("functions/updatedevices.php",function(dataresponse){
             $('#warp1').html(dataresponse);
             checkoffline();
          });
function checkoffline(){
$.get("functions/checkoffline.php",function(dataresponse){
  if(dataresponse == 0){
    //
  }
  else{
    $('#errss').html(dataresponse);
    $('.errors_area').fadeIn();
  }

});
}
//end devices
}
function  clErrsA(){$(".errors_area").fadeOut();}
function getstats(name,crs,i){
$('.indentity'+ i).css('height','800px');
$('.indentity'+ i).html('<span id="namepr">Name:<span id="name1">'+window.atob(name)+'</span></span><button onclick=\'getback("'+ name +'","'+ crs +'","'+ i +'")\' id="back"><span>Back to overview</span></button><span id="creditspr">Credits : '+crs+'</span><br><center><h2>Device progress</h2><br><div class="chart-container" style="height:500px;width:600px"><canvas id="chart1" width="50" height="60"></canvas></div></div>');
loadgraph(i,i);
}
function loadgraph(name,i){
$.ajax({
        dataType: "text",
        url: 'functions/get_devicestat.php?name=' + name,
        success:function(data){
        var tmpData = JSON.parse(data);
        var i =0;
        var nel = data.length;
        var ctx = document.getElementById('chart1').getContext('2d');
        var name = $('#name1').text();
        var chartdatacrs=[];
        var chartdatadates=[];
        for(var i in tmpData) {
            chartdatacrs.push(tmpData[i].crs);
            chartdatadates.push(tmpData[i].date);
          }
        var chartdata = {
        labels: chartdatadates,
        datasets: [
          {
            label: "CR",
            fill: true,
            lineTension: 0.1,
                backgroundColor: 'rgba(128, 20, 255, 0.43)',
                backgroundColor: 'rgba(128, 20, 255, 0.43)',
            data: chartdatacrs
          }
        ]
      };
      var ctx = $("#chart1");
      var mychart = new Chart(ctx, {
        type: 'line',
        data: chartdata,

       options: {
       responsive :true,
       maintainAspectRatio:false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

      });
    },
});
           $('.chart-container').height($('.indentity'+ i).height() - 150 + 'px');
           $('.chart-container').width($('.indentity'+ i).width() -70 + 'px');

}
function getback(name,crs,i){
  $('.indentity'+ i).css('height','80px');
  $('.indentity'+ i).html('<span id="name">Name:'+window.atob(name)+'</span><button onclick=\'getstats("'+ name +'","'+ crs +'","'+i+'")\' id="viewpr"><span>View progress</span></button><span id="credits">Credits : '+crs+'</span>');

}
setInterval(function(){
  var seconds = $('#seconds').text();
  var minutes = $('#min').text();
  var hour =$('#hour').text();
  if(seconds > 0){
    seconds--;
  }
  else{
    seconds = 60;
  if(minutes > 0){minutes--;}else{
    sendd();
  }
  }
  $('#seconds').html(seconds);
  $('#min').html(minutes)},1000);
