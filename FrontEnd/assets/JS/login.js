const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    console.log("Soumission du formulaire");
    event.preventDefault();
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    console.log(`Email: ${email}`);
    console.log(`Mot de passe: ${password}`);


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
        console.log(`Token: ${json.token}`);
        sessionStorage.setItem("token", json.token);
        window.location.href = "edition.html";
    } else {
        let main = document.querySelector('main');
        console.log("Connexion échouée");
        const erreurTexte = document.createElement("div");
        erreurTexte.classList.add('mdperrone');
        erreurTexte.innerText = "Erreur dans l’identifiant ou le mot de passe";
        main.appendChild(erreurTexte);
    }

});
