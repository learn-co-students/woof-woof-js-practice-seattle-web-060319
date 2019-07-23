document.addEventListener('DOMContentLoaded', (e) => {
  main();
});

const url = 'http://localhost:3000/pups';

function main() {
  fetchPup();
}

//-------fetch pup ---------->renderPups,
function fetchPup() {
  return fetch(url)
  .then(response => response.json())
  .then(data => renderPups(data));
}

//-------Build DIV for pup names------------>createDogElements
function renderPups(data) {
  for (var i = 0; i < data.length; i++) {
    let doggoName = data[i].name;
    let image = data[i].image;
    let goodDog = data[i].isGoodDog;
    let dogId = data[i].id;
    createDogElements(doggoName, image, goodDog, dogId);
    createDogDisplay(doggoName, image, goodDog, dogId);
  };
};

//-----------creating elements to put in dogbar-->createDogDisplay
function createDogElements(doggoName, image, goodDog, dogId) {
  const dogBar = document.getElementById('dog-bar');
  const span = document.createElement('span');
  dogBar.appendChild(span);
  span.innerText = `${doggoName}`;
  span.addEventListener('click', function (e) {
    createDogDisplay(doggoName, image, goodDog, dogId);
  });
}

//------from createDogElements
function createDogDisplay(doggoName, image, goodDog, dogId) {
  const dogContainer = document.getElementById('dog-info');
  dogContainer.innerHTML = '';
  const dogInfo = document.getElementById('dog-info');
  let imageTag = document.createElement('img');
  let h2 = document.createElement('h2');
  let btn = document.createElement('button');
  if (goodDog) {
    btn.innerText = 'Good Boy';
  } else {
    btn.innerText = 'Bad Boy';
  }

  h2.innerText = doggoName;
  imageTag.src = image;
  dogInfo.appendChild(imageTag);
  dogInfo.appendChild(h2);
  dogInfo.appendChild(btn);
  btn.addEventListener('click', function (e) {
    console.log('button says', goodDog);
    if (btn.innerText === 'Good Boy') {
      btn.innerText = 'Bad Boy';
      goodDog = true;
    } else {
      btn.innerText = 'Good Boy';
      goodDog = false;
    }

    goodDog = !goodDog;
    return fetch(`http://localhost:3000/pups/${dogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: dogId,
        name: doggoName,
        image: image,
        isGoodDog: goodDog,
      }),
    })
  .then(res => res.json());
  });
}
