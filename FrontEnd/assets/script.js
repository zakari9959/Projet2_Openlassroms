fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        const objetsData = data.filter(entry => entry.categoryId === 1);
        const appartementsData = data.filter(entry => entry.categoryId === 2);
        const hotelsrestaurantsData = data.filter(entry => entry.categoryId === 3);
        const nomsData = data.map(data => data.title)
        const categoryidData = data.map(data => data.categoryId);
        const imageUrlData = data.map(data => data.imagesUrl)
        switch (categoryidData) {
            case 1:
                console.log('Objets');
                break;
            case 2:
                console.log('Appartements');
                break;
            case 3:
                console.log('Hotels');
                break;

            default:
                console.log('Erreur');
        }
        const nouvelleImage = document.createElement('figure')
         for (let i = 0; i < nomsData.length; i++) {
            const titreImage = document.createElement('figcaption');
            titreImage.innerText = nomsData[i];
            nouvelleImage.appendChild(titreImage)
        }
        document.querySelector('.gallery').appendChild(nouvelleImage);
        console.log(objetsData);
        console.log(appartementsData);
        console.log(hotelsrestaurantsData);
        console.log(nomsData);
        console.log(categoryidData);
        console.log(nouvelleImage);
    })
    .catch(error => console.error(error));




/*

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i = 0: i < data.length; i++) {
            const category = document.querySelector()
        } 
        console.log(categoryID)
    })
    .catch(error => console.error(error));
    
const elt = document.getElementsByClassName('filtre');

elt.addEventListener('click', function(log) {
    console.log(data)
});

/**

if(filtres){
    
    }

Boucler sur filtres pour qu'à chaque tour de boucle on ai un addeventlistener type click 
filtre.addEventListener('click', filtreclick);
fonction filtre click fait un console.log du data attribute filtre
*/