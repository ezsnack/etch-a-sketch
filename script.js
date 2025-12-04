let gridColor = "blue";
let drawColor = "red";
let currentGridSize = 16;
let darkeningOn = false;

function createGrid(gridSize) {
  const container = document.querySelector(".grid-container");
  const cellSize = parseInt(window.getComputedStyle(container).getPropertyValue("width")) / gridSize;
  for (let i = 0; i < gridSize * gridSize; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.height = cellSize + "px";
    cell.style.width = cellSize + "px";
    cell.style.backgroundColor = gridColor;
    container.appendChild(cell);
  }
  for (let cell of container.children)
    cell.addEventListener("mouseover", changeColor);
}

const changeGridSize = document.querySelector("#change-grid-size");
changeGridSize.addEventListener("click", () => {
  let size = parseInt(prompt("Desired grid size: "));
    if (size > 100) {
      alert("Desired size exceeds maximum (100).\nGrid size set to 100.")
      size = 100;
    } else if (size < 1) {
      alert("Negative values or zero not valid.\nGrid size set to 1.");
      size = 1;
    } else if (isNaN(size)) {
      alert("Invalid input.\nGrid size set to 16.");
      size = 16;
    }
  currentGridSize = size;
  clearGrid();
  createGrid(currentGridSize);
});

function clearGrid() {
  const container = document.querySelector(".grid-container");
  container.replaceChildren();
}

function changeColor(event) {
  if (event.target.style.backgroundColor != drawColor) {
    event.target.style.backgroundColor = drawColor;
    event.target.style.opacity = darkeningOn ? "0.0" : "1";
  }
  if (darkeningOn && event.target.style.opacity != "1") {
    event.target.style.opacity = (parseFloat(event.target.style.opacity) + 0.1).toString();
  }
}

function randomize() {
  //returns an int between 0 and 255
  return Math.floor(Math.random() * 256);
}

const randomizeGridColorButton = document.querySelector("#rand-grid-color");
randomizeGridColorButton.addEventListener("click", () => {
  clearGrid();
  gridColor = "rgb(" + randomize() + " " + randomize() + " " + randomize() + ")";
  createGrid(currentGridSize);
  let cells = document.querySelectorAll(".cell");
  for (let cell of cells)
    cell.style.backgroundColor = gridColor;
});

const randomizeDrawColorButton = document.querySelector("#rand-draw-color");
randomizeDrawColorButton.addEventListener("click", () => {
  clearGrid();
  createGrid(currentGridSize);
  drawColor = "rgb(" + randomize() + ", " + randomize() + ", " + randomize() + ")";
});

const darkeningToggleButton = document.querySelector("#toggle-darkening");
darkeningToggleButton.addEventListener("click", () =>{
  if (darkeningOn)
    darkeningOn = false;
  else
    darkeningOn = true;
  clearGrid();
  createGrid(currentGridSize);
});

createGrid(currentGridSize);
