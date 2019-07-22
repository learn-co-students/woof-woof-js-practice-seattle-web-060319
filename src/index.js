
const dogsUrl = 'http://localhost:3000/pups';


function main(){


fetchdogs().then(dogs => dogCards(dogs))
}



function fetchdogs(){
  return fetch(dogsUrl)
  .then(res => res.json())
}

function dogCards(dogs){
  dogs.forEach(function(dog){
    let dogId = dog.id;
    let dogName = dog.name;
    let goodDog = dog.isGoodDog;
    let doggypic = dog.image;
    const span = document.createElement('span');
    span.innerText = dogName;
    const container = document.getElementById('dog-bar');
    if (goodDog === true){
      span.className = "Good Dog!"
    }
    else if (goodDog === false) {
      span.className = "Bad Dog!"
    }
    container.appendChild(span)
    span.addEventListener("click", function(e) {
      createDogInfo(dogName, doggypic, dogId, span,goodDog);
    });
  });
}



function createDogInfo(dogName, doggypic, dogId, span,goodDog) {
  const infojawn = document.getElementById("dog-info");
  infojawn.innerHTML = "";
  const img = document.createElement("img");
  img.src = doggypic;
  const h2 = document.createElement("h2");
  h2.innerText = dogName;
  const button = document.createElement("button")
    button.innerText = span.className;
    button.addEventListener("click", function(e){
      dogStatus(dogName, doggypic, dogId, span, button, goodDog);
    })

    infojawn.appendChild(img)
    infojawn.appendChild(h2)
    infojawn.appendChild(button)
  }

  function dogStatus(dogName, doggypic, dogId, span, button, goodDog) {
    goodDog = !goodDog;
    return fetch(`http://localhost:3000/pups/${dogId}`, {
  method: 'put',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: dogName,
    image: doggypic,
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


  main();
