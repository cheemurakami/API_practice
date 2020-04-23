import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import { apiCall } from './apicall.js';

$(document).ready(function () {
  $('#weatherLocation').click(function () {
    const city = $('#location').val();
    // $('#location').val("");

    let request = new XMLHttpRequest();
    // const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e45eec14dc0b63bbccd6306e03915bc5`;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(response)
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function (response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    }
  });

  $("#search-gifs").click(function () {
    const search = $("#search").val();
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_APY_KEY}&q=${search}`)
      .then(function (response) {
        if (response.ok && response.status == 200) {
          return response.json();
        } else {
          return false;
        }
      })
      .catch(function () {
        return false;
      })
      .then(function (responseJson) {
        getElements(responseJson);
      });

    function randomNum(num) {
      return Math.floor(Math.random() * (num + 1));
    }
    const getElements = function (response) {
      if (response) {
        let randomIndex = randomNum(response.data.length)
        let url = response.data[randomIndex].images.downsized_large.url;
        // let image = new Image();
        // image.src = url;  
        $("#show-gif").html(`<img src="${url}">`);
      }
    };
  });
  $("#gifs").click(function () {
    apiCall().then(function (responseJson){
      $("#show-trend-gif").html(`<img src="${responseJson.data[0].images.downsized_large.url}">`);
    });
  });
});