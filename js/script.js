const userInput = document.getElementById("inputs");
const countryDetails = document.getElementById("countryDetails");
let allCountries = [];

// Fetch all countries 
window.onload = function () {
  userInput.value = ""; 
  fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
      allCountries = data;
      displayCountries(data);
    })
    .catch(err => console.error("Error fetching countries:", err));
};

// Display all countries
function displayCountries(data) {
  countryDetails.innerHTML = "";
  data.forEach(country => {
    const countryCard = `
      <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card h-100">
            <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.common}">
            <div class="card-body">
              <h5 class="card-title">${country.name.common}</h5>
              <p class="card-text">
                <strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}<br>
                <strong>Region:</strong> ${country.region}<br>
                <strong>Population:</strong> ${country.population.toLocaleString()}
              </p>
              <a href="https://www.google.com/maps?q=${country.name.common}" target="_blank" class="btn btn-primary">View on Google Maps</a>
            </div>
          </div>
        </div>
    `;
    countryDetails.innerHTML += countryCard;
  });
}

// Filter countries 
function filterCountries() {
  const query = userInput.value.toLowerCase();
  const filteredCountries = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(query)
  );

  if (filteredCountries.length === 0) {
    alert(`No countries found in "${userInput.value}". Please try again.`);
    countryDetails.innerHTML = "";
  }

  displayCountries(filteredCountries);
}
