//load some elements before request, pretty much a mess
$( document ).ready(function() {var ctx = document.getElementById('chart').getContext('2d');var myLineChart = new Chart(ctx, {type: 'line',data: {labels: ['4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'],datasets: [{label: 'credits',data: [0,0,0,0,0],backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)'],borderColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'],borderWidth: 1}]},options: {maintainAspectRatio:false,aspectRatio:'2',scales: {yAxes: [{ticks: {beginAtZero: true}}]}}});myLineChart.canvas.parentNode.style.height = $('#warp4').height() - 70 + 'px';myLineChart.canvas.parentNode.style.width = $('#warp4').width() -70 + 'px';$.ajax({dataType: "text",url: 'dbprocessor.php?action=get_cr',success:function(data){var rateh =data;switch(true){case (rateh <=10):$('#crntrateh').html('<span style="color:#8b0000">' + Math.round(rateh) + 'CR/h</span>');break;case (rateh<=23):$('#crntrateh').html('<span style="color:#ffa500">' + Math.round(rateh) + 'CR/h</span>');break;case (rateh>=25):$('#crntrateh').html('<span style="color:#228b22">' + Math.round(rateh) + 'CR/h</span>');}},});});
function sendd(){

//start config
  var corsserver ='https://cors-anywhere.herokuapp.com/'; //leave it like this unless you have a cors proxy yourself
  var token_id= ''; //your token id
//end config

//start balances
      $.ajax({
        dataType: "text",
        url: corsserver + 'https://dashboard.honeygain.com/api/v1/users/balances',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", token_id);
        },
        success:function(data){
          var tmpData = JSON.parse(data);
          var formattedJson = JSON.stringify(tmpData);
          $('#balance').html(tmpData.data.payout['credits']);
          $('#today').html(tmpData.data.realtime['credits']);
          $.ajax({
            dataType: "text",
            url: corsserver + 'https://dashboard.honeygain.com/api/v1/dashboards/traffic_stats',
            beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", token_id);
            },
            //start average rate /day and payout at average rate
          success:function(data){
            var tmpData = JSON.parse(data);
            var formattedJson = JSON.stringify(tmpData);
            var day = tmpData.data.traffic_stats;
            var lastfivedays=((day['25']['traffic'] / 10000000) + (day['26']['traffic'] / 10000000) + (day['27']['traffic']/ 10000000) + (day['28']['traffic']/ 10000000) + (day['29']['traffic']/ 10000000));
            $('#avrgrate').html(Math.round(lastfivedays / 5 ) + 'CR/day');
            $('#payin').html(Math.round((20000 - $('#balance').text()) /(lastfivedays / 5)) + ' day(s)');
            //start graph
            var ctx = document.getElementById('chart').getContext('2d');
            var myLineChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: ['4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'],
                datasets: [{
                label: 'credits',
                data: [(day['25']['traffic'] / 10000000),(day['26']['traffic'] / 10000000),(day['27']['traffic']/ 10000000),(day['28']['traffic']/ 10000000),(day['29']['traffic']/ 10000000)],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ],
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
            myLineChart.canvas.parentNode.style.height = $('#warp4').height() - 70 + 'px';
            myLineChart.canvas.parentNode.style.width = $('#warp4').width() -70 + 'px';

          },
      });
      //start realtime rate /h and realtime rate /d
      $.ajax({
        dataType: "text",
        url: 'dbprocessor.php?action=update&cr='+tmpData.data.realtime['credits'],
        success:function(data){
          $.ajax({
            dataType: "text",
            url: 'dbprocessor.php?action=get_cr',
            success:function(data){
              var rateh =Math.round(data);
              var rated = rateh * 24;
              $('#payin2').html(Math.round((20000 - $('#balance').html()) / rated) + ' day(s)');
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
        },});},});},});
    //start last refresh
      $.ajax({
        dataType: "text",
        url: 'dbprocessor.php?action=get_h',
        success:function(data){  
        $('#lastre').html(data);},});
      

     //start devices 
      $.ajax({
        dataType: "text",
        url: corsserver + 'https://dashboard.honeygain.com/api/v1/devices',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", token_id);
        },
        success:function(data){
        var tmpData = JSON.parse(data);
        var formattedJson = JSON.stringify(tmpData);
        var items = tmpData.meta.pagination['total_items'];
        var i = 0;
          $("#devices").html('');
          while(items >= i){
          var creditsi =tmpData.data[0+i].stats['total_credits'];
          switch(true){
          case (creditsi <=60):
          $('#devices').append('<div style="border:2px solid #8b0000;" id="device_warp">Name: ' + tmpData.data[0+ i]['manufacturer'] + '<br>Credits : '+ tmpData.data[0+i].stats['total_credits'] +'</div>');
          break;
          case (creditsi<=500):
          $('#devices').append('<div style="border:2px solid #ffa500;" id="device_warp">Name: ' + tmpData.data[0+ i]['manufacturer'] + '<br>Credits : '+ tmpData.data[0+i].stats['total_credits'] +'</div>');          break;
          case (creditsi>=501):
          $('#devices').append('<div style="border:2px solid #228b22;" id="device_warp">Name: ' + tmpData.data[0+ i]['manufacturer'] + '<br>Credits : '+ tmpData.data[0+i].stats['total_credits'] +'</div>');
          }
            i = i+ 1;
          }
      
},
});
//end devices   
}