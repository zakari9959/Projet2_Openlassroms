fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        const figures = document.querySelectorAll('figure');

        document.querySelectorAll(".filtre").forEach(filtre => {
            filtre.addEventListener("click", function () {
                const categoryId = this.getAttribute("data-categoryId");
                data.forEach(data => {
                    figures.forEach(figure => {


                        figure.dataset.dataid = data.id;
                        figure.dataset.categoryid = data.categoryId;
                        if (figure.dataset.dataid === data.id) {
                            
                            if (figure.dataset.categoryid === data.categoryId || categoryId === 'tous') {
                                figure.style.display = 'block';
                            } else {
                                figure.style.display = 'none';
                            }
                        }
                        figureNumeroId = figure.dataset.dataid;
                    });
                });
                
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
