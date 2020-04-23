export function apiCall () {
  
  return fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_APY_KEY}`)
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
          console.log(responseJson)
          return responseJson;
        });

}
