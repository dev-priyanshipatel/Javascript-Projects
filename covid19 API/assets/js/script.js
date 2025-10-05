const stateInput = document.getElementById("stateInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const message = document.getElementById("message");
const COVID_API = "https://api.rootnet.in/covid19-in/stats/latest";


function showLoader() {
  results.innerHTML = `
                <div class="loader">
                    <div class="spinner"></div>
                </div>
            `;
}

function showMessage(text) {
  results.innerHTML = `<div class="message">${text}</div>`;
}

function displayState(state) {
  results.innerHTML = `
                <div class="state-card">
                    <h2 class="state-name"><i class="fa-solid fa-location-dot"></i>${
                      state.loc
                    }</h2>
                    <div class="stats">
                        <div class="stat confirmed">
                            <div class="stat-label"><i class="fa-solid fa-virus"></i>Total Confirmed</div>
                            <div class="stat-value">${state.totalConfirmed.toLocaleString(
                              "en-IN"
                            )}</div>
                        </div>
                        <div class="stat recovered">
                            <div class="stat-label"><i class="fa-solid fa-shield-heart"></i>Recovered</div>
                            <div class="stat-value">${state.discharged.toLocaleString(
                              "en-IN"
                            )}</div>
                        </div>
                        <div class="stat deaths">
                            <div class="stat-label"><i class="fa-solid fa-heart-crack"></i>Deaths</div>
                            <div class="stat-value">${state.deaths.toLocaleString(
                              "en-IN"
                            )}</div>
                        </div>
                    </div>
                </div>
            `;
}

async function stateFind() {
  const stateValue = stateInput.value.trim().toLowerCase();
  if (!stateValue) {
    showMessage("⚠️ Please enter a state name.");
    return;
  }
  showLoader();

  try {
    let res = await fetch(COVID_API);
    if (!res.ok) {
      throw new Error("API request Failed please enter valid state...");
    }
    let data = await res.json();

    let statesArray = data.data.regional;

    let SingleState = statesArray.find((state) => {
      return state.loc.toLowerCase() === stateValue;
    });

    if (!SingleState) {
      showMessage(
        "❌ State not found. Please enter a valid Indian state name."
      );
      return;
    }

    displayState(SingleState);

    // console.log(SingleState);

    console.log(data);
  } catch (err) {
    // console.log(err);
    showMessage("⚠️ Unable to fetch data. Please try again later.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  searchBtn.addEventListener("click", function () {
    // showLoader();
    stateFind();
  });
});
