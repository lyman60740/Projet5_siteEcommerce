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
        input.addEventListener('input', handleQuantityChange);
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
          }
          
          document.querySelector('#totalQuantity').innerText = arrayPanier.length;
          
          function sumOfPrice(){
            let totalPrice = 0;
            for (let i = 0; i < arrayPanier.length; i++) {
    
              totalPrice = totalPrice + (arrayPanier[i].quantite * (valeur.find(x => x._id === arrayPanier[i].id).price));
              
            }

            document.querySelector("#totalPrice").innerHTML = totalPrice;
          }
          sumOfPrice();
          console.log(localStorage.getItem('monTableau'))
         
          
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
    inputElement.addEventListener('change', handleQuantityChange);
});

function handleQuantityChange(event) {
  sumOfPrice();
  
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
document.querySelector('.cart__order__form').addEventListener('submit', (event) => {
  event.preventDefault(); // Empêche la soumission du formulaire
  const firstName = event.target.firstName.value;
  const lastName = event.target.lastName.value;
  const address = event.target.address.value;
  const city = event.target.city.value;
  const email = event.target.email.value;
  
   // Objet de stockage des données 
   const contact = {
    firstName: `${firstName}`,
    lastName:`${lastName}`,
    email: `${email}`,
    city: `${city}`,
    address: `${address}`
};
console.log(contact)
});

// Regex :
document.querySelector('#email').addEventListener('blur', (event) => {
  const email = event.target.value;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
      event.target.classList.add('error');
      document.querySelector('#emailErrorMsg').textContent = 'Entrez une adresse mail valide';
  } else {
      event.target.classList.remove('error');
      document.querySelector('#emailErrorMsg').textContent = '';
  }
});
  
document.querySelector('#firstName').addEventListener('blur', (event) => {
  const firstName = event.target.value;
  const regexFirstName = /^[a-zA-Z]{2,}$/;
  if (!regexFirstName.test(firstName)) {
      event.target.classList.add('error');
      document.querySelector('#firstNameErrorMsg').textContent = 'Entrez un prénom valide';
    } else {
    event.target.classList.remove('error');
    document.querySelector('#firstNameErrorMsg').textContent = '';
    }
    });
    
    document.querySelector('#lastName').addEventListener('blur', (event) => {
    const lastName = event.target.value;
    const regexLastName = /^[a-zA-Z]{2,}$/;
    if (!regexLastName.test(lastName)) {
    event.target.classList.add('error');
    document.querySelector('#lastNameErrorMsg').textContent = 'Entrez un nom valide';
    } else {
    event.target.classList.remove('error');
    document.querySelector('#lastNameErrorMsg').textContent = '';
    }
    });
    
    document.querySelector('#address').addEventListener('blur', (event) => {
    const address = event.target.value;
    const regexAddress = /^[a-zA-Z0-9\s]{5,}$/;
    if (!regexAddress.test(address)) {
    event.target.classList.add('error');
    document.querySelector('#addressErrorMsg').textContent = 'Entrez une adresse valide';
    } else {
    event.target.classList.remove('error');
    document.querySelector('#addressErrorMsg').textContent = '';
    }
    });
    
    document.querySelector('#city').addEventListener('blur', (event) => {
    const city = event.target.value;
    const regexCity = /^[a-zA-Z\s]{5,}$/;
    if (!regexCity.test(city)) {
    event.target.classList.add('error');
    document.querySelector('#cityErrorMsg').textContent = 'Entrez une ville valide';
    } else {
    event.target.classList.remove('error');
    document.querySelector('#cityErrorMsg').textContent = '';
    }
    });

   
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
