const modale = document.getElementById("modale");
const ouvrirBouton = document.getElementById("ouvrirmodale");
const fermerBouton = document.getElementById("fermermodale");

ouvrirBouton.addEventListener("click", function () {
  modale.style.display = "block";

});

fermerBouton.addEventListener("click", function () {
  modale.style.display = "none";
});

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    let galleryDiv = document.querySelector('#gallerymodale');
    console.log(galleryDiv);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].title);
      console.log(data[i].categoryId);
      var figurePhoto = document.createElement("figure");
      var figcaptionPhoto = document.createElement("figcaption");
      var imgWork = document.createElement("img");
      var iconePoubelle = document.createElement("i");
      iconePoubelle.classList.add("fa-solid");
      iconePoubelle.classList.add("fa-trash");

      imgWork.src = data[i].imageUrl;
      imgWork.alt = data[i].title;
      imgWork.crossOrigin = 'same-origin';
      imgWork.appendChild(iconePoubelle);
      figcaptionPhoto.innerText = "éditer";
      figurePhoto.classList.add('work');
      figurePhoto.dataset.workcategoryid = data[i].categoryId;
      /*Pour qu'il n'y ai pas d'erreur dans la page login, mais pas très utile finalement car j'ai juste à enlever le script de la page login.html*/
      if (galleryDiv) {
        galleryDiv.appendChild(figurePhoto);
        imgWork.appendChild(iconePoubelle);
        figurePhoto.appendChild(imgWork);
        figurePhoto.appendChild(figcaptionPhoto);
      }

    }

  });