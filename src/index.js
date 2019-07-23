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
  let dogId = json.id;

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
  button.setAttribute("id", isGood);

  if (isGood) {
    button.innerText = "Good Dog!";
  } else {
    button.innerText = "Bad Dog!";
  }

  ul.appendChild(button);

  button.addEventListener("click", function(e) {
    if (button.innerText === "Good Dog!") {
      button.innerText = "Bad Dog!";
    } else {
      button.innerText = "Good Dog!";
    }

    isGood = !isGood;

    return fetch(dogUrl + "/" + dogId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: dogId,
        name: dogName,
        image: dogImg,
        isGoodDog: isGood
      }),
    })
    .then(res => res.json());
  });



}
