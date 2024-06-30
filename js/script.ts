const container = document.querySelector(".container");
const countries = document.querySelector(".countries") as HTMLDivElement | null; // adding ! to the end asserts non-null assertion operator
const filterInput = document.querySelector(
  "#country-searched"
) as HTMLInputElement | null; //adding 'as HTMLInputElement' to the end is a type assertion to tell TypeScript that this element will exist
const filterRegion = document.querySelector(
  "#region"
) as HTMLSelectElement | null;
const searchCountry = document.querySelector("#search-country");

document.addEventListener("DOMContentLoaded", loadContent);

function loadContent() {
  fetchAllCountries(); // fetch all countries from API
  // filter countries by input
  if (filterInput) {
    filterInput.addEventListener("keyup", filterCountries);
  } else {
    console.log("the element with ID: 'country-searched' does not exist");
  }

  if (filterRegion) {
    // filter countries by region
    filterRegion.addEventListener("change", filterCountriesByRegion);
  } else {
    console.log("the element with ID: 'region' does not exist");
  }
}

// Filter country by input
function filterCountries() {
  if (filterInput) {
    let filterValue = filterInput.value.toLowerCase();

    if (countries) {
      const country = countries.querySelectorAll(".country-container");

      country.forEach((country) => {
        const h3 =
          (country.querySelector(".country-name") as HTMLHeadingElement) ||
          null;

        if (h3 && h3.textContent) {
          if (h3.textContent.toLowerCase().indexOf(filterValue) > -1) {
            (country as HTMLElement).style.display = "";
          } else {
            (country as HTMLElement).style.display = "none";
          }
        }
      });
    }
  }
}

// filter region using select
function filterCountriesByRegion() {
  let regionSelected = (filterRegion as HTMLSelectElement).options[
    (filterRegion as HTMLSelectElement).selectedIndex
  ].value;

  if (countries && regionSelected !== "") {
    const country = countries.querySelectorAll(".country-container");

    country.forEach((country) => {
      const countryRegion = country.querySelector(".country-region");

      if (
        countryRegion &&
        countryRegion.textContent &&
        countryRegion.textContent.toLowerCase().indexOf(regionSelected) > -1
      ) {
        (country as HTMLElement).style.display = "";
      } else {
        (country as HTMLElement).style.display = "none";
      }
    });
  }
}

async function fetchAllCountries() {
  try {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();
    if (data) {
      showAllCountries(data);
    } else {
      // if data is not feteched from API
      // Show an error message
      if (countries) {
        countries.innerHTML = ` 
        <div style="margin: 0 auto;">
          <h2 style="text-align: center; font-size:3rem; margin: 0 0 0.5em 0;">Error: 500</h2>
          Request for countries data from https://restcountries.com/v2/all was unsuccessfull. Please try again later.
        </div>
      `;
      } else {
        console.log(
          "the element 'countries' does not exist and there was an error while getting the data from API"
        );
      }
    }
  } catch (err) {
    if (countries) {
      countries.innerHTML = ` 
      <div style="margin: 0 auto;">
        <h2 style="text-align: center; font-size:3rem; margin: 0 0 0.5em 0;">Error: 500</h2>
        Request for countries data from https://restcountries.com/v2/all was unsuccessfull. Please try again later.
      </div>
    `;
    }

    console.log(err);
  }
}

// the type of data the API will return
// this is a small subset that is used from the complete response
interface CountriesData {
  name: string;
  alpha3Code: string;
  flags: {
    svg: string;
  };
  population: string;
  region: string;
  capital: string;
}

function showAllCountries(data: CountriesData[]): void {
  let countryData = data.map((item) => {
    return `
      <div class="country-container">
        <a href="countryInfo.html?country=${
          item.alpha3Code
        }" class="country-link">
          <div class="country-img-container">
            <img class="country-img" src=${item.flags.svg} alt="country">
          </div>
          <div class="country-info-container">
            <h3 class="country-name">${item.name}</h3>
            <p><strong>Population:</strong> <span>${item.population.toLocaleString()}</span></p>
            <p><strong>Region:</strong> <span class="country-region">${
              item.region
            }</span></p>
            <p><strong>Capital:</strong> <span>${item.capital}</span></p>
          </div>
        </a>
      </div>
    `;
  });
  countries && (countries.innerHTML = countryData.join(""));
}
