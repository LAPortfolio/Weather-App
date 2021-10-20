window.addEventListener("load", () => {
  let blabla = document.querySelector(".location-city");
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );

  let tempDegree = document.querySelector(".temperature-degree");
  let iconApp = document.querySelector(".iconApp");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ec4ab7779202ce64d3fa01434baab683`;

      console.log(api);

      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);

          const temperature = Math.ceil(data.main.temp - 273.15);
          const description = data.weather[0].description;
          const city = data.name;

          console.log(city);

          //   var currentdate = new Date();
          //   var datetime = "Last Sync: " + currentdate.getTimezoneOffset();

          const icon = data.weather[0].icon;

          //SET DOM ELEMEMTS

          tempDegree.textContent = temperature;
          temperatureDescription.textContent = description;
          blabla.textContent = city;

          iconApp.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="" width="200" height="200" />`;

          function currentTime() {
            let date = new Date();
            let hh = date.getHours();
            let mm = date.getMinutes();
            let ss = date.getSeconds();
            let session = "AM";

            if (hh == 0) {
              hh = 12;
            }
            if (hh > 12) {
              hh = hh - 12;
              session = "PM";
            }

            hh = hh < 10 ? "0" + hh : hh;
            mm = mm < 10 ? "0" + mm : mm;
            ss = ss < 10 ? "0" + ss : ss;

            let time = hh + ":" + mm + ":" + ss + " " + session;

            document.getElementById("clock").innerText = time;
            let t = setTimeout(function () {
              currentTime();
            }, 1000);
          }
          currentTime();
        });
    });
  }
});
