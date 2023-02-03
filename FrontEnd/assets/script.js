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
            imgWork.alt = data[i].title;
            imgWork.crossOrigin = 'same-origin';
            console.log(imgWork.crossOrigin);
            divPhoto.innerHTML = data[i].title;
            divPhoto.classList.add('work');
            divPhoto.dataset.workcategoryid = data[i].categoryId;
            galleryDiv.appendChild(divPhoto);
            divPhoto.appendChild(imgWork);

        }

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
                    work.style.display = 'flex';
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