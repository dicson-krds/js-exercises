let balloon = document.querySelector("#balloon"),
  initialSize = 70,
  incrementSize = initialSize,
  maximumSize = 5 * initialSize;

balloon.style.fontSize = initialSize + "px";

function handler(event) {
  event.preventDefault();
  if (event.which === 1) {
    incrementSize += initialSize;
  } else if (event.which === 3) {
    if (incrementSize > initialSize) incrementSize -= initialSize;
  }

  if (incrementSize <= maximumSize && incrementSize >= initialSize) {
    balloon.style.fontSize = incrementSize + "px";
  } else {
    balloon.innerHTML = "💥";
    balloon.removeEventListener("click", handler);
    balloon.removeEventListener("contextmenu", handler);
  }
}
balloon.addEventListener("click", handler);
balloon.addEventListener("contextmenu", handler);
