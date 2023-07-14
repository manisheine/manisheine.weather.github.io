
function sendAjaxRequest1() {
    var myurl1 = "https://api.db-ip.com/v2/free/self";
    $.ajax({
        type: "GET",
        url: myurl1,
        cache: false,

        success: function (data) {
            let city = data.city;
            $("#rcorners1").val(city);
            sendAjaxRequest();

        }
    });
}

function sendAjaxRequest() {
        var city = $("#rcorners1").val();
        var todayDate = new Date().toISOString().slice(0, 10);

        var myurl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + city + "/" + todayDate + "/" + todayDate + "?key=FRSM74VRMPNB8NK3N8ZT6JQP8&include=current&unitGroup=metric";
        $.ajax({
            type: "GET",
            url: myurl,
            cache: false,
            beforeSend: function () {
                $("#loading-overlay").show();
            },
            success: function (data) {


                $("#location").html(data.resolvedAddress + ", " + data.days[0].datetime);
                $("#weather").html("  " + "Min " + data.days[0].tempmin + "&#8451; Max " + data.days[0].tempmax + "&#8451;");
                $("#humidity").html("  " + data.days[0].humidity + "%");
                $("#precipitation").html("  " + data.days[0].precip + "%");
                $("#sunrise").html(data.days[0].sunrise);
                $("#sunset").html(data.days[0].sunset);

                let text = data.days[0].conditions;

                if (text.startsWith("Partially cloudy")) {
                    $("#cimage").attr("src", "images/partly_cloudy.webp");
                } else if (text.startsWith("Clear")) {
                    $("#cimage").attr("src", "images/clear.png");
                } else if (text.startsWith("Rain")) {
                    $("#cimage").attr("src", "images/rain_1.webp");
                } else if (text.startsWith("Snow")) {
                    $("#cimage").attr("src", "images/snow.webp");
                }
                $("#cimage").show();
                $("#conditions").html(text);
                $("#loading-overlay").hide();
             },
            error: function(data){
                $("#loading-overlay").hide();
                alert(data.responseText);
                
            }
        });
  
}
         


$(document).ready(function () {
            sendAjaxRequest1();

            $("#eine").click(function (e) {

                e.preventDefault();
                sendAjaxRequest();
            });

  
        $("#cimage").hide();
});


