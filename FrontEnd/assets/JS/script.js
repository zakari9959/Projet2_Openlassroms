

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
    figurePhoto.appendChild(imgWork);
    figurePhoto.appendChild(figcaptionPhoto);
    return figurePhoto;
}

function filterWorksByCategoryId(categoryId) {
    const works = document.querySelectorAll('.work');
    works.forEach(work => {
        let workCategoryId = work.dataset.workcategoryid;
        if (workCategoryId === categoryId || categoryId === 'tous') {
            work.style.display = 'block';
        } else {
            work.style.display = 'none';
        }
    });
}

function populateGallery(data) {
    let galleryDiv = document.querySelector('#gallery');
    for (let i = 0; i < data.length; i++) {
        let workElement = createWorkElement(data[i]);
        if (galleryDiv) {
            galleryDiv.appendChild(workElement);
        }
    }
}

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        populateGallery(data);
    })
    .then(() => {

        document.querySelectorAll(".filtre").forEach(filtre => {
            filtre.addEventListener("click", function () {
                const categoryId = this.getAttribute("data-categoryId");
                filterWorksByCategoryId(categoryId);
            });


        })});
/*
// Affichage des éléments cachés une fois que l'utilisateur est connecté
import { loginUser } from "./login.js";
const tokenUtilisateur = sessionStorage.getItem("token");
const json = loginUser("sophie.bluel@test.tld", "S0phie")
console.log(tokenUtilisateur);
console.log(json);
if (tokenUtilisateur) {
    const hiddenElements = document.getElementsByClassName('hidden');
    console.log("hiddenElements" + hiddenElements);
    hiddenElements.forEach(hiddenElements => {
        hiddenElements.classList.remove('hidden');
    });

}
*/