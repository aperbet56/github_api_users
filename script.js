// Récupération des différents éléments
const username = document.querySelector("#search__input");
const detailsContainer = document.querySelector(".details");
const dataResult = document.querySelector("#result");
const btn = document.querySelector(".btn");

// Création de la variable dataArray qui va stocker les données renvoyées par l'API
let dataArray = [];

/**
 * Déclaration de la fonction asynchrone fetchGithub qui va permettre de récupérer les données de l'api Github
 * Envoi d'une requête HTTP de type GET grâce à fetch
 * Stockage des données dans la variable dataArray
 */
const fetchGithub = async () => {
  await fetch(`https://api.github.com/users/${username.value}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      dataArray = value;
      console.log(dataArray);
      // Appel de la fonction displayData ayant pour paramètre dataArray
      displayData(dataArray);
    })
    .catch(function (err) {
      // Affichage d'un message d'erreur dans la console
      console.log(
        "Désolé, une rreur s'est produite. Veuillez réessayer plus tard!"
      );
    });
};

// Déclaration de la fonction displayData qui va permettre l'affichage des données
const displayData = (dataArray) => {
  detailsContainer.style.display = "flex";
  dataResult.innerHTML = `
            <div class="profile">
                <div class="profile__image">
                    <img src="${dataArray.avatar_url}" />
                </div>
                <div class="profile__details">
                    <h2 class="name">${dataArray.name || dataArray.login}</h2>
                    <p class="username">@${dataArray.login}</p>
                    <p class="bio">${
                      dataArray.bio || "Account doesn't have a bio."
                    }</p>

                    <div class="stats">
                        <div>
                            <div class="stats__name">Public Repos</div>
                            <div class="stats__value">${
                              dataArray.public_repos
                            }</div>
                        </div>
                        <div>
                            <div class="stats__name">Followers</div>
                            <div class="stats__value">${
                              dataArray.followers
                            }</div>
                        </div>
                        <div>
                            <div class="stats__name">Following</div>
                            <div class="stats__value">${
                              dataArray.following
                            }</div>
                        </div>
                    </div>

                <div class="media">
                    <p>
                        <span class="media__value">${
                          dataArray.location || "Not Available"
                        }</span>
                    </p>
                    <p>
                        <span class="media__value">${
                          dataArray.blog || "Not Available"
                        }</span>
                    </p>
                    <p>
                        <span class="media__value">${
                          dataArray.twitter_username || "Not Available"
                        }</span>
                    </p>
                    <p>
                        <span class="media__value">${
                          dataArray.company || "Not Available"
                        }</span>
                    </p>
                </div>
            </div>
        </div>
    `;
};

// Ecoute de l'événement "click" sur le bouton "Search" et appel de la fonction fetchGithub
btn.addEventListener("click", fetchGithub);
