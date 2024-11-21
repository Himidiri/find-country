const userInput = document.getElementById("inputs");
const countryDetails = document.getElementById("countryDetails");

let allCountries = []; // Holds all fetched countries for filtering

// Fetch and store all countries
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    allCountries = data;
  })
  .catch((err) => {
    console.error("Error fetching countries:", err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong while fetching countries!",
      footer: '<a href="https://restcountries.com/">Check API status</a>'
    });
  });

// Display countries 
function displayCountries(data) {
  countryDetails.innerHTML = "";
  data.forEach((country) => {
    const countryCard = `
      <div data-aos="flip-left" class="col">
          <div data-aos="flip-left" class="card h-100">
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
  const query = userInput.value.trim().toLowerCase();

  if (!query) {
    Swal.fire({
      icon: "warning",
      title: "Empty Input",
      text: "Please enter a country name before searching."
    });
    return;
  }

  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );

  if (filteredCountries.length === 0) {
    Swal.fire({
      icon: "info",
      title: "No Results Found",
      text: `Cannot find any country matching "${userInput.value}". Please try another search.`,
    });
    userInput.value = "";
    countryDetails.innerHTML = "";
    return;
  }

  displayCountries(filteredCountries);
  // userInput.value = ""; 
}
