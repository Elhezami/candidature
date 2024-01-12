/**
 * Affiche ou enlève la page déroulante au clic de l'utilisateur selon son statut
 */
function afficherPage() {
  // Si la page est affichée, on l'enlève
  if (document.getElementById('maPageDeroulante').style.display == "block") {
    document.getElementById('maPageDeroulante').style.display = "none";
  }
  // Si la page n'est pas affichée, on l'affiche
  else {
    document.getElementById('maPageDeroulante').style.display = "block";
  }
}

/**
 * Envoie une requête personnalisée en utilisant une API
 */
function askWeather() {
  let meteo = new XMLHttpRequest();
  meteo.onreadystatechange = function(){
    // On vérifie que la requête est bien correcte et que la page est bien affichée
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      // On transforme le texte JSON en texte JavaScript
      let response = JSON.parse(this.responseText);
      // On vérifie que la ville rentrée par l'utilisateur dans la barre de recherche est bien contenue dans le nom du fichier JSON
      if (document.getElementById("loupe").value.toLowerCase() == response.name.split(" ",3)[response.name.split(" ",3).length-1].toLowerCase()) {
        document.getElementById("nom").innerHTML = response.name;
        document.getElementById("temperature").innerHTML = "Température : " + (parseInt(response.main.temp - 273.15)) + " °C";
        document.getElementById("ressentie").innerHTML = "Ressentie : " + (parseInt(response.main.feels_like - 273.15)) + " °C";
        document.getElementById("temperaturemin").innerHTML = "Température minimale : " + (parseInt(response.main.temp_min - 273.15)) + " °C";
        document.getElementById("temperaturemax").innerHTML = "Température maximale : " + (parseInt(response.main.temp_max - 273.15)) + " °C";
        document.getElementById("humidite").innerHTML = "Humidité : " + response.main.humidity + " %";
        document.getElementById("pression").innerHTML = "Pression : " + (response.main.pressure*(10**(-3))).toFixed(2) + " bar";
      };
    };
  };
  meteo.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("loupe").value.toLowerCase() + ",fr&APPID=ee07e2bf337034f905cde0bdedae3db8");
  meteo.send();
}

// On applique la fonction askWeather() lorsque l'utilisateur appuie sur Valider
let weather = document.getElementById("valider");
weather.addEventListener('click', function(event){
  askWeather();
});