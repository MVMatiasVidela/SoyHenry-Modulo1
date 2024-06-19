class Activity{
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;

  }
}

class Repository{
  constructor() {
    this.activities = [];
    this.id = 0;
  }


  getAllActivities(){
    return this.activities;
  }


  createActivity(title, description, imgUrl){
    this.id++;
    const activity = new Activity(this.id, title, description, imgUrl);
    this.activities.push(activity);
  }


  deleteActivity(id){
    this.activities = this.activities.filter((activity) => activity.id !== id )
  }
}

const repository = new Repository();

const handleDelete = (id) => {
  repository.deleteActivity(id);
  addToDOM();
};

const activityToElement = ({id, title, description, imgUrl}) => {
const cardTitle = document.createElement("h4")
const cardDescription = document.createElement("p")
const cardImage = document.createElement("img")

cardTitle.innerHTML = title;
cardDescription.innerHTML = description;
cardImage.src = imgUrl

const cardContainer = document.createElement('div');

const cardButton = document.createElement("button");
cardButton.innerText = "Eliminar";
cardButton.style.backgroundColor = "#ff4d4d"; // Un rojo más suave
cardButton.style.color = "white";
cardButton.style.border = "none"; // Sin borde
cardButton.style.borderRadius = "2em"; // Bordes redondeados en forma circular
cardButton.style.padding = "10px 15px"; // Ajuste del padding para un mejor tamaño
cardButton.style.fontSize = "16px";
cardButton.style.cursor = "pointer";
cardButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Sombra para dar profundidad
cardButton.style.transition = "background-color 0.3s, transform 0.3s"; // Transiciones suaves

// Agregamos efectos para hover y active
cardButton.addEventListener("mouseover", () => {
  cardButton.style.backgroundColor = "#ff1a1a"; // Color más oscuro al pasar el mouse
});

cardButton.addEventListener("mouseout", () => {
  cardButton.style.backgroundColor = "#ff4d4d"; // Volver al color original
});

cardButton.addEventListener("mousedown", () => {
  cardButton.style.transform = "scale(0.95)"; // Efecto de clic
});

cardButton.addEventListener("mouseup", () => {
  cardButton.style.transform = "scale(1)"; // Volver al tamaño original
});

cardButton.addEventListener("click", () => handleDelete(id));



cardContainer.append(cardButton, cardTitle, cardDescription, cardImage);

console.log(cardContainer);

return cardContainer;
};


 
const addToDOM = () => {
  const conatiner = document.getElementById("container");
  conatiner.innerHTML = "";
 conatiner.classList.add("card");
 
  const allActivities = repository.getAllActivities();
  const allElements = allActivities.map(activity => activityToElement(activity));
  allElements.forEach(element => conatiner.appendChild(element));
};

addToDOM();
const handleSubmit = (event) => {
  event.preventDefault();
  const title = document.getElementById ("title");
  const description = document.getElementById ("description")
  const image = document.getElementById ("image")
  
  const titleInput = title.value;
  const descriptionInput = description.value;
  const imageInput = image.value || "https://ew.com/thmb/UNYjHbTkhX4OfWq0mbTsoPgYJB4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1325247248-a1c52082a70545a4b0f3802f10eda12d.jpg";

  if(!titleInput || !descriptionInput || !imageInput) {
    return alert ("Hay datos incompletos");
  }



repository.createActivity(titleInput, descriptionInput, imageInput);

title.value = "";
description.value ="";
image.value= "";

addToDOM();
};

const boton = document.getElementById( "boton");
boton.addEventListener("click", handleSubmit);




document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    targetElement.scrollIntoView({
      behavior: "smooth",
    });
  });
});