const modale = document.getElementById("modale");
const ouvrirBouton = document.getElementById("ouvrirmodale");
const fermerBouton = document.getElementById("fermermodale");
const overlay = document.getElementById("overlay");
const publierBouton = document.getElementById("publier");
const deconnexionBouton = document.getElementById("deconnexion");


// Affichage des éléments cachés une fois que l'utilisateur est connecté
const tokenUtilisateur = sessionStorage.getItem("Token");
console.log(tokenUtilisateur);
const hiddenElements = document.getElementsByClassName('hidden');
console.log("hiddenElements" + hiddenElements);
Array.from(hiddenElements).forEach(hiddenElement => {
  if (tokenUtilisateur) {
    hiddenElement.classList.remove('hidden');
  } else {
    hiddenElement.classList.add("hidden");
  }
});



fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    let galleryDiv = document.querySelector('#gallerymodale');
    console.log(galleryDiv);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].title);
      console.log(data[i].categoryId);
      let figurePhoto = document.createElement("figure");
      let figcaptionPhoto = document.createElement("figcaption");
      let imgWork = document.createElement("img");
      let iconePoubelle = document.createElement("i");
      let iconeAffichage = document.createElement("i")
      iconePoubelle.classList.add("fa-solid");
      iconePoubelle.classList.add("fa-trash-can");
      iconePoubelle.classList.add("poubelle");
      iconeAffichage.classList.add("fa-solid");
      iconeAffichage.classList.add("fa-arroxs-up-down-left-right");
      imgWork.src = data[i].imageUrl;
      imgWork.alt = data[i].title;
      figurePhoto.id = data[i].id;
      console.log(imgWork.id);
      imgWork.crossOrigin = 'same-origin';

      figcaptionPhoto.innerText = "éditer";
      figurePhoto.classList.add('work');
      figurePhoto.dataset.workcategoryid = data[i].categoryId;
      /*Pour qu'il n'y ai pas d'erreur dans la page login, mais pas très utile finalement car j'ai juste à enlever le script de la page login.html*/
      if (galleryDiv) {
        galleryDiv.appendChild(figurePhoto);
        imgWork.appendChild(iconePoubelle);
        figurePhoto.appendChild(imgWork);
        figurePhoto.appendChild(figcaptionPhoto);
        figurePhoto.appendChild(iconePoubelle);
      }

    }

  });


function deleteImage(workId) {
  const works = document.getElementsByClassName("work");
  Array.from(works).forEach(work => {
    let id = work.id;
    console.log(id);

    const iconePoubelleBouton = document.getElementsByClassName("poubelle")[id];

    iconePoubelleBouton.addEventListener("click", function () {
      console.log("click");
      const reponse = fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          "accept": "*/*",

        },

      })
        .then(reponse => {
          if (reponse.ok) {

            work.remove();
          } else {
            console.log(`Impossible de supprimer le travail ${id}`);
          }
        })
    });



  });


}

ouvrirBouton.addEventListener("click", function () {
  modale.style.display = "block";

});

fermerBouton.addEventListener("click", function () {
  modale.style.display = "none";
});

overlay.addEventListener("click", function () {
  modale.style.display = "none";
});

publierBouton.addEventListener("click", function () {

  sessionStorage.removeItem("Token");
  window.location.href = "index.html";
});
deconnexionBouton.addEventListener("click", function () {

  sessionStorage.removeItem("Token");
  window.location.href = "index.html";
});


