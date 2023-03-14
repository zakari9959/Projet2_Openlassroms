const modale = document.getElementById("modale");
const ouvrirBouton = document.getElementById("ouvrirmodale");
const fermerBouton = document.getElementById("fermermodale");
const overlay = document.getElementById("overlay");
const publierBouton = document.getElementById("publier");
const deconnexionBouton = document.getElementById("deconnexion");
let galleryDiv = document.querySelector('#gallerymodale');


// Affichage des éléments cachés une fois que l'utilisateur est connecté
const tokenUtilisateur = sessionStorage.getItem("Token");
const hiddenElements = document.querySelectorAll(".hidden");
if (hiddenElements && tokenUtilisateur) {
  hiddenElements.forEach(hiddenElement => {
    hiddenElement.classList.remove("hidden");
  })
} else {
  hiddenElements.forEach(hiddenElement => {
    hiddenElement.classList.add("hidden");
  })
};

function createModalWork(i, data) {

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
  imgWork.crossOrigin = 'same-origin';
  figcaptionPhoto.innerText = "éditer";
  figurePhoto.classList.add('work');
  figurePhoto.classList.add('modalwork'); /* changer par work modal pour ne plus filtrer dans la modale*/
  figurePhoto.dataset.workcategoryid = data[i].categoryId;
  figurePhoto.dataset.workid = data[i].id;
  iconePoubelle.dataset.workid = data[i].id;
  if (galleryDiv) {

    galleryDiv.appendChild(figurePhoto);
    imgWork.appendChild(iconePoubelle);
    figurePhoto.appendChild(imgWork);
    figurePhoto.appendChild(figcaptionPhoto);
    figurePhoto.appendChild(iconePoubelle);
  }
}
initApiEdition()
async function initApiEdition() {
  await fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      galleryDiv.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        createModalWork(i, data);
      };
    })
    .then(() => {
      const iconePoubelleBoutons = document.querySelectorAll(".poubelle");
      const supprimerphotobtn = document.getElementById("supprimerphotobtn");
      if (iconePoubelleBoutons) {
        for (const iconePoubelleBouton of iconePoubelleBoutons) {
          const id = iconePoubelleBouton.dataset.workid;

          iconePoubelleBouton.addEventListener("click", function (event) {
            console.log("click");
            console.log(id);
            deleteImage(id, iconePoubelleBouton);
            refreshApi()

          })
          supprimerphotobtn.addEventListener("click", function () {
            const images = document.querySelectorAll(".work");
            if (images) {
              images.forEach(function (image) {
                deleteImage(id, iconePoubelleBouton);
                refreshApi()
              })
            }
          });
        }
      }

    })
    .then(() => {

      const form = document.getElementById("ajouterphoto");

      form.addEventListener("submit", async (event) => {
        console.log("Soumission du formulaire");
        event.preventDefault();

        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        const maxSize = 4 * 1024 * 1024; // 4 Mo en octets
        if (file.size > maxSize) {
          alert("Le fichier est trop volumineux !");
        } else if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
          alert("Le fichier doit être une image au format PNG, JPEG ou JPG !");
        } else {

          sendFormData(form);
          console.log("ok");

          const modale = document.getElementById("modale");
          if (modale) {
            modale.style.display = "none";
          }
          const ajouterPhotoDiv = document.getElementById("ajoutphotomodale");
          const corpsModale = document.querySelector(".corpsmodale");
          if (ajouterPhotoDiv && corpsModale) {
            ajouterPhotoDiv.style.display = "none";
            corpsModale.style.display = "flex";
          }

        }
      });
    });
}
/*

*/
createImagePreview()
function createImagePreview() {
  const inputImage = document.getElementById("image");
  const imagePreview = document.getElementById("image-preview");
  const img = document.createElement("img");
  img.src = "./assets/icons/icone_image.png";
  imagePreview.appendChild(img);
  const texteajouter = document.getElementById("texteajouterunephoto");
  const taillemax = document.getElementById("imagetaillemax");
  const divimage = document.getElementById("divimage");

  inputImage.addEventListener("change", () => {
    const file = inputImage.files[0];

    if (file.type.startsWith("image/")) {

      divimage.style.paddingBottom = "0";
      divimage.style.paddingTop = "0";
      imagePreview.style.display = "flex";
      texteajouter.style.display = "none";
      taillemax.style.display = "none";
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        img.src = reader.result;
        console.log(inputImage);
        console.log(inputImage);
        imagePreview.innerHTML = "";
        imagePreview.appendChild(img);
        texteajouter.style.display = "none";
        taillemax.style.display = "none";
      };

    } else {
      imagePreview.innerHTML = "Le fichier sélectionné n'est pas une image.";
    }

  })
  imagePreview.addEventListener("click", () => {
    inputImage.value = "";
    img.src = "./assets/icons/icone_image.png";
    texteajouter.style.display = "flex";
    taillemax.style.display = "flex";
    divimage.style.paddingBottom = "19px";
    divimage.style.paddingTop = "28px";
  });
};

async function deleteImage(id, iconePoubelleBouton) {
  const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
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


async function sendFormData(form) {
  const postApi = "http://localhost:5678/api/works";
  const formData = new FormData(form);
  const image = form.image.files[0]

  const fetchInit = {

    method: "POST",
    headers: {

      Authorization: `Bearer ${sessionStorage.getItem("Token")}`,

    },
    body: formData,
  };


  for (let [key, value] of formData.entries()) {
    console.log(key + ': ' + value);
  }

  try {
    const reponse = await fetch(postApi, fetchInit);
    if (reponse.ok) {
      console.log("Image ajouté");
      refreshApi();
      refreshModal();

    }
  } catch (error) {
    console.error(error);
  };

}


if (ouvrirBouton) {
  ouvrirBouton.addEventListener("click", function () {

    modale.style.display = "block";
  });
}

if (fermerBouton) {
  fermerBouton.addEventListener("click", function () {
    modale.style.display = "none";

  });
}

if (overlay) {
  overlay.addEventListener("click", function () {
    modale.style.display = "none";

  });
}

if (publierBouton) {
  publierBouton.addEventListener("click", function () {
    sessionStorage.removeItem("Token");
    window.location.href = "index.html";
  });
}

if (deconnexionBouton) {
  deconnexionBouton.addEventListener("click", function () {
    sessionStorage.removeItem("Token");
    window.location.href = "index.html";
  });
}

const ajouterPhotoBouton = document.getElementById("ajouterphotobtn");
if (ajouterPhotoBouton) {
  ajouterPhotoBouton.addEventListener("click", function () {
    const ajouterPhotoDiv = document.getElementById("ajoutphotomodale")
    const corpsModale = document.querySelector(".corpsmodale");
    if (ajouterPhotoDiv && corpsModale) {
      ajouterPhotoDiv.style.display = "flex";
      corpsModale.style.display = "none";
    }
  });
}

const boutonRetour = document.getElementById("boutonretour")
if (boutonRetour) {
  boutonRetour.addEventListener("click", function () {
    const ajouterPhotoDiv = document.getElementById("ajoutphotomodale")
    const corpsModale = document.querySelector(".corpsmodale");
    if (ajouterPhotoDiv && corpsModale) {
      ajouterPhotoDiv.style.display = "none";
      corpsModale.style.display = "flex";
    }
  })
}


async function refreshApi() {
  await fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {

      populateGallery(data);
    })

}
function populateGallery(data) {
  let galleryDiv = document.querySelector('#gallery');
  if (galleryDiv) {
    galleryDiv.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      let workElement = createWorkElement(data[i]);
      galleryDiv.appendChild(workElement);
    }
  }
}
function createWorkElement(work) {
  let figurePhoto = document.createElement("figure");
  let figcaptionPhoto = document.createElement("figcaption");
  let imgWork = document.createElement("img");
  imgWork.src = work.imageUrl;
  imgWork.alt = work.title;
  imgWork.crossOrigin = 'same-origin';
  figcaptionPhoto.innerHTML = work.title;
  figurePhoto.classList.add('work');
  figurePhoto.dataset.workcategoryid = work.categoryId;
  figurePhoto.dataset.workid = work.id;
  figurePhoto.appendChild(imgWork);
  figurePhoto.appendChild(figcaptionPhoto);
  return figurePhoto;
}
async function refreshModal() {
  await fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      galleryDiv.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        createModalWork(i, data);
      };
    })
    .then(() => {
      const iconePoubelleBoutons = document.querySelectorAll(".poubelle");
      const supprimerphotobtn = document.getElementById("supprimerphotobtn");
      if (iconePoubelleBoutons) {
        for (const iconePoubelleBouton of iconePoubelleBoutons) {
          const id = iconePoubelleBouton.dataset.workid;

          iconePoubelleBouton.addEventListener("click", function (event) {
            console.log("click");
            console.log(id);
            deleteImage(id, iconePoubelleBouton);
            refreshApi()

          })
          supprimerphotobtn.addEventListener("click", function () {
            const images = document.querySelectorAll(".work");
            if (images) {
              images.forEach(function (image) {
                deleteImage(id, iconePoubelleBouton);
                refreshApi()
              })
            }
          });
        }
      }

    })
}