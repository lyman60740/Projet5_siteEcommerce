const article = document.querySelector('#items a');

fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    valeur = value;
for(var i = 0; i < valeur.length; i += 1) {
  const anchor = document.createElement('a');
anchor.href = `./product.html?id=${valeur[i]._id}`;

const article = document.createElement('article');

const img = document.createElement('img');
img.src = valeur[i].imageUrl;
img.alt = valeur[i].altTxt;

const h3 = document.createElement('h3');
h3.className = 'productName';
h3.textContent = valeur[i].name;

const p = document.createElement('p');
p.className = 'productDescription';
p.textContent = valeur[i].description;

article.appendChild(img);
article.appendChild(h3);
article.appendChild(p);
anchor.appendChild(article);

document.querySelector('#items').appendChild(anchor);

}

  })
  .catch(function(err) {
    // Une erreur est survenue
  });



  



// Target Hover on card

// document.querySelector('article').addEventListener('mouseenter', function(){
//   this.style.boxShadow = 'rgba(42, 18, 206, 0.9) 0 0 22px 6px';
// })
// document.querySelector('article').addEventListener('mouseover', function(){
//   this.style.boxShadow = ' ';
// })