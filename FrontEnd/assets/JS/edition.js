const modale = document.getElementById("modale");
const ouvrirBouton = document.getElementById("ouvrirmodale");
const fermerBouton = document.getElementById("fermermodale");
const overlay = document.getElementById("overlay");
const publierBouton = document.getElementById("publier");
const deconnexionBouton = document.getElementById("deconnexion");



// Affichage des éléments cachés une fois que l'utilisateur est connecté
const tokenUtilisateur = sessionStorage.getItem("Token");
console.log(tokenUtilisateur);
const hiddenElements = document.querySelectorAll(".hidden");
console.log("hiddenElements" + hiddenElements);
if (hiddenElements) {
  hiddenElements.forEach(hiddenElement => {
    if (tokenUtilisateur) {
      hiddenElement.classList.remove("hidden");
    } else {
      hiddenElement.classList.add("hidden");
    }
  })
};



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

      console.log(imgWork.id);
      imgWork.crossOrigin = 'same-origin';

      figcaptionPhoto.innerText = "éditer";
      figurePhoto.classList.add('work');
      figurePhoto.dataset.workcategoryid = data[i].categoryId;
      figurePhoto.dataset.workid = data[i].id;
      iconePoubelle.dataset.workid = data[i].id;
      /*Pour qu'il n'y ai pas d'erreur dans la page login, mais pas très utile finalement car j'ai juste à enlever le script de la page login.html*/
      if (galleryDiv) {
        galleryDiv.appendChild(figurePhoto);
        imgWork.appendChild(iconePoubelle);
        figurePhoto.appendChild(imgWork);
        figurePhoto.appendChild(figcaptionPhoto);
        figurePhoto.appendChild(iconePoubelle);
      }

    }

  })
  .then(data => {
    const iconePoubelleBoutons = document.querySelectorAll(".poubelle");
    console.log(iconePoubelleBoutons)
    for (const iconePoubelleBouton of iconePoubelleBoutons) {
      console.log(iconePoubelleBouton);
      const id = iconePoubelleBouton.dataset.workid;

      iconePoubelleBouton.addEventListener("click", function (event) {
        console.log("click");
        console.log(id);
        deleteImage(id, iconePoubelleBouton);
        iconePoubelleBouton.parentNode.remove();
      });
    }

  });



/*

*/
function deleteImage(id, iconePoubelleBouton) {
  const reponse = fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("Token")}`,
    },
  })
    .then(reponse => {
      if (reponse.ok) {
        iconePoubelleBouton.parentNode.remove();

      } else {
        console.log(`Impossible de supprimer le travail ${id}`);
      }
    });
}


async function sendFormData(formData) {
  try {
    console.log(formData);
    const response = await fetch("http://localhost:5678/api/works", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",

        "Authorization": `Bearer ${sessionStorage.getItem("Token")}`,
      },
      body: formData,
    });

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
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

const ajouterPhotoBouton = document.getElementById("ajouterphotobtn");

ajouterPhotoBouton.addEventListener("click", function () {
  const ajouterPhotoDiv = document.getElementById("ajoutphotomodale")
  const corpsModale = document.querySelector(".corpsmodale");
  ajouterPhotoDiv.style.display = "flex";
  corpsModale.style.display = "none";
});


const form = document.getElementById("ajouterphoto");

form.addEventListener("submit", async (event) => {
  console.log("Soumission du formulaire");
  event.preventDefault();
  const postApi = "http://localhost:5678/api/works";

  const formData = new FormData(form);
  const image = form.image.files[0]
  
 
  console.log(formData.get("category"));
  console.log(sessionStorage.Token);
  for (let [key, value] of formData.entries()) {
    console.log(key + ': ' + value);
  }
  const fetchInit = {
    
    method: "POST",
    headers: {
      
      Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      
    },
    body: formData,
  };
  try {
    const reponse = await fetch(postApi, fetchInit);
    if (reponse.ok) {
      console.log('ok')
    }
  } catch (error) {
    console.error(error);
  };
  const ajouterPhotoDiv = document.getElementById("ajoutphotomodale")
  const corpsModale = document.querySelector(".corpsmodale");
  ajouterPhotoDiv.style.display = "none";
  corpsModale.style.display = "flex";
  
});








const inputImage = document.getElementById("image");
const imagePreview = document.getElementById("image-preview");
const texteajouter = document.getElementById("texteajouterunephoto");
const taillemax = document.getElementById("imagetaillemax");

inputImage.addEventListener("change", () => {
  const file = inputImage.files[0];

  if (file.type.startsWith('image/')) {
    imagePreview.style.display = "flex";
    texteajouter.style.display = "none";
    taillemax.style.display = "none";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result;
      imagePreview.innerHTML = '';
      imagePreview.appendChild(img);
      texteajouter.style.display = "none";
      taillemax.style.display = "none";
    };
    
  } else {
    imagePreview.innerHTML = "Le fichier sélectionné n'est pas une image.";
  }

});

imagePreview.addEventListener("click", () => {
  inputImage.innerHTML = "";
  imagePreview.style.display = "none";
  texteajouter.style.display = "flex";
  taillemax.style.display = "flex";
})