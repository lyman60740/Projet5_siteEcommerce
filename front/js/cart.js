let arrayPanier = localStorage.getItem('monTableau');
arrayPanier = JSON.parse(arrayPanier);


fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {

    valeur = value;
    let sum = 0;
    for(var i = 0; i < arrayPanier.length; i += 1) {
        imageCatch = valeur.find(x => x._id === arrayPanier[i].id).imageUrl;
        nameCatch = valeur.find(x => x._id === arrayPanier[i].id).name;
        priceCatch = valeur.find(x => x._id === arrayPanier[i].id).price;
        altCatch = valeur.find(x => x._id === arrayPanier[i].id).altTxt;
        const article = document.createElement('article');
        article.className = 'cart__item';
        article.dataset.id = arrayPanier[i].id;
        article.dataset.color = arrayPanier[i].couleur;

        const divImg = document.createElement('div');
        divImg.className = 'cart__item__img';

        const img = document.createElement('img');
        img.src = imageCatch;
        img.alt = altCatch;

        const divContent = document.createElement('div');
        divContent.className = 'cart__item__content';

        const divDescription = document.createElement('div');
        divDescription.className = 'cart__item__content__description';

        const h2 = document.createElement('h2');
        h2.textContent = nameCatch;

        const p1 = document.createElement('p');
        p1.textContent = arrayPanier[i].couleur;

        const p2 = document.createElement('p');
        p2.textContent = priceCatch + " €";

        const divSettings = document.createElement('div');
        divSettings.className = 'cart__item__content__settings';

        const divQuantity = document.createElement('div');
        divQuantity.className = 'cart__item__content__settings__quantity';

        const pQuantity = document.createElement('p');
        pQuantity.textContent = "Qté : ";

        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'itemQuantity';
        input.name = 'itemQuantity';
        input.min = 1;
        input.max = 100;
        input.value = arrayPanier[i].quantite;

        const divDelete = document.createElement('div');
        divDelete.className = 'cart__item__content__settings__delete';

        const pDelete = document.createElement('p');
        pDelete.className = 'deleteItem';
        pDelete.textContent = "Supprimer";

        divQuantity.appendChild(pQuantity);
        divQuantity.appendChild(input);

        divDelete.appendChild(pDelete);

        divSettings.appendChild(divQuantity);
        divSettings.appendChild(divDelete);

        divDescription.appendChild(h2);
        divDescription.appendChild(p1);
        divDescription.appendChild(p2);

        divImg.appendChild(img);

        divContent.appendChild(divDescription);
        divContent.appendChild(divSettings);

        article.appendChild(divImg);
        article.appendChild(divContent);

        document.querySelector('#cart__items').appendChild(article);
        
        sum =+ arrayPanier[i].quantite * priceCatch;
        
          }
          
          document.querySelector('#totalQuantity').innerText = arrayPanier.length;
          let totalPrice = 0;
          for (let i = 0; i < arrayPanier.length; i++) {
            console.log(sum)
            
            
          }
          console.log(localStorage.getItem('monTableau'))
          document.querySelector("#totalPrice").innerHTML = totalPrice;
          
        var deleteButtons = document.querySelectorAll('.deleteItem');
        
        for (let i = 0; i < deleteButtons.length; i++){
          
          deleteButtons[i].addEventListener('click', function(e){
            console.log('target ='+e.target);
            idDelete = e.target.closest('.cart__item').dataset.id;
            idColor = e.target.closest('.cart__item').dataset.color;
            console.log(idDelete);
            
            arrayPanier = arrayPanier.filter(function(item) {
              return !(item.id === idDelete && item.couleur === idColor) ;
            });
            e.target.closest('.cart__item').remove();
           localStorage.setItem('monTableau', JSON.stringify(arrayPanier));
           
            console.log(localStorage.getItem('monTableau'));
          })
        }
        const inputElements = document.querySelectorAll('.itemQuantity');
inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', handleQuantityChange);
});

function handleQuantityChange(event) {
    const inputElement = event.target;
    const id = inputElement.closest('.cart__item').dataset.id;
    const color = inputElement.closest('.cart__item').dataset.color;
    const newQuantity = inputElement.value;
  console.log(arrayPanier)
    // Mise à jour de la quantité de l'élément dans arrayPanier
    for (let i = 0; i < arrayPanier.length; i++) {
        if (arrayPanier[i].id === id && arrayPanier[i].couleur === color) {
            arrayPanier[i].quantite = parseInt(newQuantity);
            break;
        }
    }
    localStorage.setItem('monTableau', JSON.stringify(arrayPanier));
    // On pourra également mettre à jour l'affichage de la page web pour refléter les modifications de quantité ici
}
    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
