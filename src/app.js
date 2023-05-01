import axios from "axios";
import {color} from "ansi-styles";
console.log('Hallo daar!');

const countryList = document.getElementById("countries");
const errorMessage = document.getElementById("errors");


function regionColor( region ) {
    let color
    if ( region === "Americas" ) {
        color = "yellow"
    }else if( region === "Africa" ) {
        color = "brown";
    }else if ( region === "Oceania" ) {
        color = "turquoise"
    }else if ( region === "Europe" ) {
        color = "blue"
    }else if ( region === "Asia" ) {
        color = "green"
    }else if ( region === "Antarctic" ) {
        color = "cold"
    }
    return color
}
function sort(countries) {
    countries.sort((a, b) => b.population - a.population);
}
async function fetchData() {
    try {
        const result = await axios.get('https://restcountries.com/v3.1/all')
        const countries = result.data;
        console.log(result.data)
        sort(countries)
        countries.map((country) => {
            countryList.innerHTML += `
        <li class="${regionColor(country.region)}">
        <h2 class="country-name">${country.name.common}</h2>
        <p>Has a population of: ${country.population}</p>
        <p>Languages: ${Object.values(country.languages).join(', ')}</p>
        <img class="flag" src="${country.flags.svg}" alt="${country.flag.alt}">
         </li>
            `;
        });
    }catch (e) {
        // errors om console
        console.error(e)
    //     errors in ui
        if (e.response.status === 404 ) {
            errorMessage.textContent = "Page not found 404"
        } else if (e.response.status === 500) {
            errorMessage.textContent = "Internal server error 500"
        }
    }
}
void fetchData();

