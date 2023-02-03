fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        let galleryDiv = document.querySelector('#gallery');
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            console.log(data[i].categoryId);
            var divPhoto = document.createElement("div");
            var imgWork = document.createElement("img");
            
            imgWork.src = data[i].imageUrl;
            

            
            divPhoto.innerHTML = data[i].title;
            divPhoto.classList.add('work');
            divPhoto.dataset.workcategoryid = data[i].categoryId;
            galleryDiv.appendChild(divPhoto);

        }

        // Etape 1.1 du Etapes par Etapes
        // A) : faire une boucle sur data pour qu à chaque tour de boucle on ait un console.log de chaque title
        // B) crée un élement de type <div> 
        // C) mets le titre dans cet élément créé
        // D) insère cette div à l emplacement du html où on avait les <figure>    

    });
document.querySelectorAll(".filtre").forEach(filtre => {
    filtre.addEventListener("click", function () {
        const categoryId = this.getAttribute("data-categoryId");
        console.log('categoryId : ' + categoryId);

        const works = document.querySelectorAll('.work');
        if (works) { 
            console.log(works);

            works.forEach(work => {
                let workCategoryId = work.dataset.workcategoryid;
                console.log(workCategoryId);
                if (workCategoryId === categoryId || categoryId === 'tous') {
                    work.style.display = 'block';
                } else {
                    work.style.display = 'none';
                }

            });
        }
    });
});

/*
                
                console.log(categoryId);
                console.log(figureNumeroId)
                // Mettre en évidence le filtre actuel
                document.querySelectorAll(".filtre").forEach(f => {
                    f.classList.remove("selected");
                });
                this.classList.add("selected");
            });
        });
        // Sélectionner le filtre "tous" par défaut
        document.querySelector('[data-categoryId="tous"]').click();
    });
*/