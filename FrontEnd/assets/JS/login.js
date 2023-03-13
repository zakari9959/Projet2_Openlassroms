// Déclaration des constantes
const form = document.querySelector("form");
const main = document.querySelector('main');
// Création d'un élément pour afficher les erreurs
const erreurTexte = document.createElement("div");
erreurTexte.classList.add('mdperrone');


// Création de la fonction pour obtenir le token
async function loginUser(email, password) {
    // Envoi de la requête POST pour la connexion de l'utilisateur
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    console.log(reponse);
    const ancienErreurTexte = document.querySelector('.mdperrone');
    if (ancienErreurTexte) {
        ancienErreurTexte.remove();
    };
    // Traitement de la réponse de la requête
    // Création d'un nouvel élément pour afficher l'erreur correspondante
    const nouvelleErreurTexte = document.createElement("div");
    nouvelleErreurTexte.classList.add('mdperrone');
    if (reponse.ok) {

        const json = await reponse.json();
        // Stockage du token de l'utilisateur dans le sessionStorage
        sessionStorage.setItem("Token", json.token);
        // Redirection vers la page d'accueil
        window.location.href = "index.html";
    } else if (reponse.status === 401) {
        nouvelleErreurTexte.innerText = "Erreur dans le mot de passe";
    } else if (reponse.status === 404) {
        nouvelleErreurTexte.innerText = "Erreur dans l'identifiant ou le mot de passe";
    } else {
        nouvelleErreurTexte.innerText = "Erreur inconnue";
    }

    // Ajout de l'élément affichant l'erreur dans le DOM
    if(main){
    main.appendChild(nouvelleErreurTexte)};
}


// Écouteur d'événement sur la soumission du formulaire
if(form){
form.addEventListener("submit", async (event) => {
    console.log("Soumission du formulaire");
    event.preventDefault();
    const email = form.elements.email.value;
    const password = form.elements.password.value;
   loginUser(email, password);
})};
