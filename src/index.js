function fetchDogs(filterStatus) {
  fetch("http://localhost:3000/pups")
   .then(data => data.json())
   .then(json => renderDogs(json, filterStatus))
}


function renderDogs(data, filterStatus) {
  let filteredData = data.filter(dog => dog.isGoodDog);
  if(filterStatus){
    dogList(filteredData)
  } else {
    dogList(data)
  }
};

function dogList(arr) {
  let div = document.getElementById('dog-bar');
  div.innerHTML = "";
  arr.forEach(dog => {
    let span = document.createElement('span');
    let name = dog.name;
    span.innerText = name;
      span.addEventListener('click', function(e) {
        showDog(dog)
      });
    div.appendChild(span);
  });
}



function showDog(dogObj) {
  let div = document.getElementById('dog-info');
  div.innerHTML = "";
  let image = document.createElement('img');
  let h2 = document.createElement('h2');
  let button = document.createElement('button');
  button.innerText = "";
  if(dogObj.isGoodDog){
    button.innerText = "Good Dog!";
  } else {
    button.innerText = "Bad Dog!";
  }
  image.setAttribute('src', dogObj.image);
  h2.innerText = dogObj.name;
  button.addEventListener('click', function(e) {
    button.classList.toggle('innerText', toggleDog(e, dogObj));
  });
  div.appendChild(image);
  div.appendChild(h2);
  div.appendChild(button);
};

function toggleDog(e, dogObj) {
  let button = e.target
  if (button.innerText === "Good Dog!") {
    button.innerText = "Bad Dog!";
  } else {
    button.innerText = "Good Dog!";
  }
  updateDog(dogObj);
};

function updateDog(dogObj) {
  let id = dogObj.id;
  let isDog = !(dogObj.isGoodDog);
  configObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'isGoodDog': isDog
    })
  }
  fetch("http://localhost:3000/pups/" + id, configObj)
  .then(resp => resp.json())
  .then(json => showDog(json))
 }

document.addEventListener("DOMContentLoaded", function() {
const filterButton = document.getElementById('good-dog-filter')
let filterStatus = false;
  filterButton.addEventListener('click', function(e) {
    filterStatus = !filterStatus
      if(e.target.innerText === "Filter good dogs: OFF"){
        e.target.innerText = "Filter good dogs: ON"
      } else {
        e.target.innerText = "Filter good dogs: OFF"
      }
      fetchDogs(filterStatus)
    })

  fetchDogs(filterStatus)
})
