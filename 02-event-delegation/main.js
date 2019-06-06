document.getElementById("colors").addEventListener("click", function (e) {
  e.preventDefault();

  let _btn = e.target.closest("button");
  _btn.style.backgroundColor = _btn.className;

  /*
  if (e.target.closest(".red")) {
    console.log("red");
    document.querySelector(".red").style.backgroundColor = "red";
  } else if (e.target.closest(".green")) {
    console.log("green");
    document.querySelector(".green").style.backgroundColor = "green";
  } else if (e.target.closest(".blue")) {
    console.log("blue");
    document.querySelector(".blue").style.backgroundColor = "blue";
  }
  */
});
