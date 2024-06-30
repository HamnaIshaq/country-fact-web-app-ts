"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const countryContainer = document.querySelector(".country-details");
const countryCode = location.search.split("country=")[1].toLowerCase();
console.log(countryCode);
// show the country details by fetching data from rest countries API
(function countryDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        // getting country details using its code
        const data = yield fetchCountryDetails(countryCode);
        showCountryDetails(data);
    });
})();
// async country details
function fetchCountryDetails(countryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
        const data = yield response.json();
        console.log(data);
        return data;
    });
}
function showCountryDetails(country) {
    return __awaiter(this, void 0, void 0, function* () {
        let borderCountryNames;
        if (country.borders) {
            borderCountryNames = yield borderCountries(country.borders);
        }
        let countryCurrency;
        if (country.currencies) {
            country.currencies.forEach((currency) => {
                countryCurrency = currency.name;
            });
        }
        else if (!country.currencies) {
            countryCurrency = " N/A";
        }
        function languages() {
            const lang = country.languages.map((lang) => {
                return lang.name;
            });
            return lang.join(", ");
        }
        const countryDetailData = `
      <div class="country-details-container country-details-container-flex">
        <div class="country-img-container-single">
          <img src=${country.flags.svg} alt=${country.name} class="country-img-single">
        </div>
        <div class="country-details-info">
          <h2 class="country-name">${country.name}</h2>
          <div class="country-info-flex">
            <div class="col-1">
              <p><strong>Native Name:</strong> ${country.nativeName}</p>
              <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> <span class="country-region">${country.region}</span></p>
              <p><strong>Sub Region:</strong> ${country.subregion}</p>
              <p><strong>Capital:</strong> ${country.capital || " N/A"}</p>
            </div>
            
            <div class="col-2">
              <p><strong>Top Level Domain:</strong> ${country.topLevelDomain}</p>
              <p><strong>Currencies:</strong>${countryCurrency}</p>
              <p><strong>Languages:</strong> ${languages()}</p>
            </div>
          </div>

          <div class="border-countries-container">
            <strong class="border-countries-heading">Border Countries:</strong>
            <div class="border-countries">
              ${borderCountryNames}
            </div>
          </div>
        </div>     
      </div>
    `;
        countryContainer.innerHTML = countryDetailData;
    });
}
// border countries name fetch
function borderCountries(borderCountries) {
    return __awaiter(this, void 0, void 0, function* () {
        if (borderCountries) {
            const codes = yield Promise.all(borderCountries.map((borderCountry) => __awaiter(this, void 0, void 0, function* () {
                const { name } = yield fetchCountryDetails(borderCountry);
                return `
            <a href="countryInfo.html?country=${borderCountry}" class="border-country-link">${name}</a>
          `;
            })));
            return codes.join("");
        }
        else {
            return `
            <a class="border-country-link">No Border Country Exist</a>
          `;
        }
    });
}
