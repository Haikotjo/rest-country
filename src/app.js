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
    }
    return color
}
async function fetchData() {
    try {
        const result = await axios.get('https://restcountries.com/v3.1/all')
        const countries = result.data;
        countries.sort((a, b) => b.population - a.population);
        countries.map((country) => {
            const countryListItem = document.createElement("li");
            countryList.innerHTML += `
        <li class="${regionColor(country.region)}">
        <h4>${country.name.common}</h4>
        <p>Has a population of: ${country.population}</p>
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

