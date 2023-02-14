const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    console.log("Soumission du formulaire");
    event.preventDefault();
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    console.log(`Email: ${email}`);
    console.log(`Mot de passe: ${password}`);
    let main = document.querySelector('main');
    const erreurTexte = document.createElement("div");
    erreurTexte.classList.add('mdperrone');


    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (reponse.ok) {
        const json = await reponse.json();
        const hidden = document.querySelectorAll('.hidden');

        console.log(`Token: ${json.token}`);
        sessionStorage.setItem("token", json.token);
        window.location.href = "index.html";

        hidden.forEach(hidden => {
            element.classList.remove('hidden');
        });


    } else {
        let main = document.querySelector('main');
        console.log("Connexion échouée");

        const erreurTexte = document.querySelector('.mdperrone');
        if (erreurTexte) {
            erreurTexte.remove();
        }

        const nouvelleErreurTexte = document.createElement("div");
        nouvelleErreurTexte.classList.add('mdperrone');
        nouvelleErreurTexte.innerText = "  ";

        if (reponse.status === 401) {
            nouvelleErreurTexte.innerText = "Erreur dans le mot de passe";
        } else if (reponse.status === 404) {
            nouvelleErreurTexte.innerText = "Erreur dans l'identifiant";
        } else {
            nouvelleErreurTexte.innerText = "Erreur inconnue";
        }

        main.appendChild(nouvelleErreurTexte);
    }
});
