//TODO: Add snacks system and cart system
//Snacks system: Container w/ list of items that can be scrolled through and chosen. When left clicked add item to cart and when right clicked remove it. Each snack will contain price of the item, picture of the item, and the title.
// Cart system: Button when clicked creates a drop-down menu of items that have been added to the cart. Including price of the item, a picture of the item, and the title.
const movieSelect = document.getElementById("movie");
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const clearBtn = document.getElementById("btn");
populateUI();
let ticketPrice = +movieSelect.value;

// Get data from local storage and populate the ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Copy selected seats into array
  // Map through array
  // return a new array indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
// Movie select event

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  updateSelectedCount();
});

// Clear button event
clearBtn.addEventListener("click", () => {
  // Remove selected class from seats. Reset total seats and price back to 0
  seats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  // Revert local storage back to default
  localStorage.setItem("selectedMovieIndex", 0);
});
//Initial count and total set
updateSelectedCount();
