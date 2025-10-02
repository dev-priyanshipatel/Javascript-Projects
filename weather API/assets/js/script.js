const findBtn = document.getElementById("findbtn");
const weatherContainer = document.getElementById("weather-container");
const APIkey = "21b4e0d08e2c3571a8e05fa1f6812110";

async function GetWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("City not found");
    }
    const data = await res.json();

    weatherContainer.innerHTML = `
                <div class="">
                <div class="main-container d-flex justify-content-center">
                    <div class="col-lg-6 col-md-8 col-12 text-center shadow-lg p-4 rounded-4">
                        <h3 class="card-title"><strong>${data.name}, ${data.sys.country}</strong></h3>
                        <div class="d-flex justify-content-center align-items-center my-3">
                            <h2 class="mb-0">${data.main.temp}°C</h2>
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
                        </div>
                        <h4 class = "mb-4 text-capitalize">${data.weather[0].description}</h4>
                        <div class="row gx-3 gy-3">
                            <div class="col-12 col-md-4">
                                <div class = " p-3 border rounded-3 bg-light">
                                    <p class = "fw-bold mb-1">Feels like</p>
                                    <p class = "mb-0">${data.main.feels_like}°C</p>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class = "p-3 border rounded-3 bg-light">
                                    <p class = "fw-bold mb-2">Humidity</p>
                                    <p class = "mb-0">${data.main.humidity}%</p>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class = "p-3 border rounded-3 bg-light">
                                    <p class = "fw-bold mb-1">Wind Speed</p>
                                    <p class = "mb-0">${data.wind.speed}m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
  } catch (err) {
    weatherContainer.innerHTML = `
                    <div class = "d-flex justify-content-center">
                        <div class="error-msg p-3 col-lg-6 col-md-8 col-12 border border-2 rounded-4 border-danger text-center ">
                            <p class = "text-danger mb-0"><strong> City not found. Please try again. </strong></p>
                        </div>
                    </div>
                `;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  findBtn.addEventListener("click", function () {
    let city = document.getElementById("city-input").value;
    GetWeatherData(city);
  });
});
