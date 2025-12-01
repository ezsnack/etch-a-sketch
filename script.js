function createGrid(gridSize) {
  const container = document.querySelector(".grid-container");
  const cellSize = parseInt(window.getComputedStyle(container).getPropertyValue("width")) / gridSize;
  console.log(cellSize); //remove later
  for (let i = 0; i < gridSize * gridSize; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.height = cellSize + "px";
    cell.style.width = cellSize + "px";
    container.appendChild(cell);
  }
  for (let cell of container.children)
    cell.addEventListener("mouseover", changeColor);
}

function changeColor(event) {
  event.target.style.backgroundColor = "red";
}

function clearGrid() {
  const container = document.querySelector(".grid-container");
  container.replaceChildren();
}

const button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("clicked"); //remove later
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
  clearGrid();
  createGrid(size);
})

createGrid(16); //default size
