dogsUrl = "http://localhost:3000/pups";
let goodDog = null;
function fetchDogsData() {
  fetch(dogsUrl) 
  .then(resp => resp.json())
  .then(json => renderDogs(json));
}

function renderDogs(json) {
  json.forEach(dog => {
    const name = dog.name;
    const img = dog.image;
    const dogId = dog.id;
    goodDog = dog.isGoodDog;
    //create each dog element
    const container = document.getElementById('dog-bar');
    const span = document.createElement('span');
    span.innerText = name;
    //give span a class for good dog or bad dog
    if(goodDog) {
      span.className = "goodDog";
    }else {
      span.className = "badDog";
    }
    container.appendChild(span);
    span.addEventListener('click', e => createDogInfo(name, img, dogId, span));
  });
  goodDogFilter();
}

function createDogInfo(name, img, dogId, span) {
  const infoContainer = document.getElementById('dog-info');
  infoContainer.innerHTML = '';
  //create img, h2, button
  const dogImg = document.createElement('img');
  dogImg.setAttribute('src', img);
  const h2 = document.createElement('h2');
  h2.innerText = name;
  const button = document.createElement('button');
  if(goodDog) {
    button.innerText = "Good Dog!"
  }else {
    button.innerText = "Bad Dog!"
  }
  infoContainer.appendChild(dogImg);
  infoContainer.appendChild(h2);
  infoContainer.appendChild(button);

  console.log(goodDog);

  button.addEventListener('click', function(e) {
    changeDogStatus(name, img, dogId, button, span);
  });
}

function changeDogStatus(name, img, dogId, button, span) {
  goodDog = !goodDog;
  
  console.log(goodDog);
  
  return fetch(`http://localhost:3000/pups/${dogId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      image: img,
      id: dogId,
      isGoodDog: goodDog
    })
  })
  .then(resp => resp.json())
  .then(json => changeButtonText(json, button, span));
}

function changeButtonText(json, button, span) {
  goodDog = json.isGoodDog;
  console.log(json);
  console.log(button);
  console.log(span);
  if(json.isGoodDog) {
    button.innerText = "Good Dog!";
    span.className = "goodDog";
    showGoodDog(span);
  }else {
    button.innerText = "Bad Dog!";
    span.className = "badDog";
    hiddenBadDog(span);
  }
}

function showGoodDog(span) {
  console.log(span);
  const filterButton = document.getElementById('good-dog-filter');
  if(filterButton.innerText === 'Filter good dogs: ON') {
    span.style.display = 'flex';
  }
}

function hiddenBadDog(span) {
  const filterButton = document.getElementById('good-dog-filter');
  if(filterButton.innerText === 'Filter good dogs: ON') {
    span.style.display = 'none';
  }
}

function goodDogFilter() {
  const filterButton = document.getElementById('good-dog-filter');
  const badDogs = document.querySelectorAll('.badDog');
  console.log(badDogs);
  filterButton.addEventListener('click', function(e) {
    if(filterButton.innerText === 'Filter good dogs: OFF') {
      filterButton.innerText = 'Filter good dogs: ON';
      hiddenElements(badDogs);
    }else {
      filterButton.innerText = 'Filter good dogs: OFF';
      showElements(badDogs);
    }
  });
}

function hiddenElements(elements) {
  elements.forEach( element => {
    element.style.display = 'none';
  })
}

function showElements(elements) {
  elements.forEach( element => {
    element.style.display = 'flex';
  })
}


document.addEventListener("DOMContentLoaded", function() {
  fetchDogsData();
})