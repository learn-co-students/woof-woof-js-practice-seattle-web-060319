const dogUrl = "http://localhost:3000/pups";

fetch(dogUrl)
  .then(res => res.json())
  .then(json => {
    showDogs(json);
  });

function showDogs(dogs) {
  dogs.forEach(function(dog) {
    let div = document.getElementById("dog-bar");
    let span = document.createElement("span");
    div.appendChild(span);
    span.innerText = dog.name;

    span.setAttribute("id", dog.id);
    span.addEventListener("click", fetchDogInfo);
  });
}

function fetchDogInfo(e) {
  let div2 = document.getElementById("dog-info");
  let ul = document.createElement("ul");
  div2.appendChild(ul);
  const dogId = e.target.id;

  let h2 = document.createElement("h2");
  ul.appendChild(h2);

  fetch(dogUrl + "/" + dogId)
    .then(res => res.json())
    .then(json => {
      dogAtts(json);
    });
}

function dogAtts(json) {
  let dogName = json.name;
  let dogImg = json.image;
  let isGood = json.isGoodDog;

  let div = document.getElementById("dog-info");
  let ul = document.createElement("ul");
  div.appendChild(ul);

  let img = document.createElement("img");
  img.src = dogImg;
  ul.appendChild(img);

  let h2 = document.createElement("h2");
  h2.innerText = dogName;
  ul.appendChild(h2);

  let button = document.createElement("button");
  button.setAttribute = button.innerText = "Good Dog!";
  ul.appendChild(button);
  button.addEventListener("click", goodBad);
}

function goodBad(e) {
  if (e.target.innerText === "Bad Dog!") {
    e.target.innerText = "Good Dog!";
  } else {
    e.target.innerText = "Bad Dog!";
  }
}
