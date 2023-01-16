// Manipulation d'URLSearchParams

const url = new URL(document.location);

// la propriété "searchParams" de "url" nous retourne un objet de type "URLSearchParams"

 const searchParams = url.searchParams;
urlData = searchParams.get('id');
console.log(urlData)

fetch(`http://localhost:3000/api/products/${urlData}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    var newImg = document.createElement("img");
    document.querySelector('.item__img').appendChild(newImg)
    document.querySelector('.item__img img').src = value.imageUrl;
    document.querySelector('#title').innerText = value.name;
    document.querySelector('#description').innerText = value.description;
    document.querySelector('#price').innerText = value.price;
    valeur = value;
    for(var i = 0; i < valeur.colors.length; i += 1) {
      var newOption = document.createElement('option');
      newOption.innerHTML = valeur.colors[i];
      document.querySelector('#colors').appendChild(newOption);
      newOption.value = valeur.colors[i];
    }

    let monTableau = JSON.parse(localStorage.getItem('monTableau')) || [];

    document.querySelector('#addToCart').addEventListener('click', function(e){
      var color = document.querySelector('#colors').value;
      var quantity = document.querySelector('#quantity').value;
      alert(`x${quantity} ${color} ${value.name} a été ajouté au panier`)
      function ajouterElement(tableau, element) {
        let Ajouter = true;
        tableau.forEach(item => {
          if (item.id === element.id && item.couleur === element.couleur) {
            item.quantite += Number(element.quantite);
            Ajouter = false;
          }
        });
        if (Ajouter) {
          tableau.push(element);
        }
      }
      ajouterElement(monTableau, { id: value._id, couleur: color, quantite: Number(quantity) });
      localStorage.setItem('monTableau', JSON.stringify(monTableau));
      const tableauSauvegarde = JSON.parse(localStorage.getItem('monTableau'));
      if ((document.querySelector('#colors').value === "") || (document.querySelector('#quantity').value == 0) || (document.querySelector('#quantity').value > 100) ) {
        alert('Veuillez selectionner une couleur et une quantité comprise entre 1 et 100')
      } 
      console.log(tableauSauvegarde);
    })
    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

