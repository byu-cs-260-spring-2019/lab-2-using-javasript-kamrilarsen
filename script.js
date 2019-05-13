window.onload = function () {
    document.getElementById("weatherSubmit").addEventListener("click", async function(event) {
        event.preventDefault();
        const value = document.getElementById("weatherInput").value;
        if (value === "")
          return;
        console.log(value);

        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + 
            "&APPID=222301cf37f66d5f1af65d1afb9ad1ec";
        try {
            const response = await fetch(url);
            const json = await response.json();
            let results = "";
            results += '<h1>Weather in ' + json.name + "</h1>";
            for (let i=0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>' + String(json.main.temp).split(".")[0] + " &deg;F</h2>";
            results += "<p>";
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description;
                if (i !== json.weather.length - 1) {
                    results += ", ";
                }
            }
            results += "</p>";
            document.getElementById("weatherResults").innerHTML = results;
        } catch(err) {
            console.log(err);
        }
        
        

        const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + 
            "&APPID=222301cf37f66d5f1af65d1afb9ad1ec";
        try {
            const response = await fetch(url2);
            const json = await response.json();
            let forecast = "";
            var currentDay = moment(json.list[0].dt_txt).format('MMMM Do YYYY');
            forecast += "<div><h1>Five-Day Weather Forcast</h1></div> <br>";
            forecast += "<div class=\"container\"> <div class=\"row\"> <div class=\"col border border-dark\" id=\"col0\">";
            forecast += "<h3>" + moment(json.list[0].dt_txt).format('MMMM Do') + "</h3>";
            var columnNum = 1;    
            for (let i=0; i < json.list.length; i++) {
                if (currentDay != moment(json.list[i].dt_txt).format('MMMM Do YYYY'))
                {
                    forecast += "</div> <div class=\"col border border-dark\" id=\"col" + String(columnNum) + "\">";
                    forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do') + "</h3>";
                    columnNum += 1;
                }
                currentDay = moment(json.list[i].dt_txt).format('MMMM Do YYYY');
                forecast += "<h5>" + moment(json.list[i].dt_txt).format('h a') + "</h5>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
                forecast += "<p>" + String(json.list[i].main.temp).split(".")[0] + " &deg;F</p>";
                //forecast += "<p>———</p>"
                forecast += "<hr class=\"horizonLine\">";
            }
            forecast += "</div> </div> </div>";
            document.getElementById("forecastResults").innerHTML = forecast;
        } catch(err) {
            console.log(err);
        }
    });
}