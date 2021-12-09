const userID = Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

document.querySelector(
  ".user-id"
).innerHTML = `Identifikator użytkownika: ${userID}`;

console.log(userID);

const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", function (event) {
  console.log("Opened!");
});

socket.addEventListener("message", function (event) {
  const data = JSON.parse(event.data);

  console.log(userID);
  console.log(data);

  aktualizuj(data.numer);
});

const pole1 = document.querySelector(".box-1");
const pole2 = document.querySelector(".box-2");
const pole3 = document.querySelector(".box-3");
const pole4 = document.querySelector(".box-4");
const pole5 = document.querySelector(".box-5");
const pole6 = document.querySelector(".box-6");
const pole7 = document.querySelector(".box-7");
const pole8 = document.querySelector(".box-8");
const pole9 = document.querySelector(".box-9");

let gameActive = true;

let pola = [];

let zmien = false;

let graczX = 0;
let graczY = 0;

function aktualizuj(numer) {
  if (pola.find((element) => element === numer)) {
    document.getElementById("alert").innerHTML = "Zaznaczyłeś już!";
  } else {
    pola.push(numer);
    document.querySelector(".box-" + numer).innerHTML =
      losuj() === false ? "O" : "X";
  }

  for (let index = 0; index < pola.length; index++) {
    console.log(pola[index]);
    console.log("Dlugosc: ", pola.length);
  }
  socket.send(JSON.stringify({ userID, numer }));

  isAll();
  isWin();
}

function losuj() {
  zmien = !zmien;
  return zmien;
}

function isAll() {
  pola.length === 9
    ? (document.getElementById("alert").innerHTML = "Zaznaczyłeś wszystkie!")
    : null;
}
function isWin() {
  // Kombinacje dla x
  isFieldWin(pole1, pole2, pole3, "X");
  isFieldWin(pole4, pole5, pole6, "X");
  isFieldWin(pole7, pole8, pole9, "X");
  isFieldWin(pole1, pole4, pole7, "X");
  isFieldWin(pole2, pole5, pole8, "X");
  isFieldWin(pole3, pole6, pole9, "X");
  isFieldWin(pole1, pole5, pole9, "X");
  isFieldWin(pole3, pole5, pole7, "X");

  isFieldWin(pole4, pole5, pole6, "O");
  isFieldWin(pole1, pole2, pole3, "O");
  isFieldWin(pole7, pole8, pole9, "O");
  isFieldWin(pole1, pole4, pole7, "O");
  isFieldWin(pole2, pole5, pole8, "O");
  isFieldWin(pole3, pole6, pole9, "O");
  isFieldWin(pole1, pole5, pole9, "O");
  isFieldWin(pole3, pole5, pole7, "O");
}
function blockAllFields() {
  pole1.style.cursorEvent = "none";
}

function isFieldWin(p1, p2, p3, type) {
  if (p1.innerHTML === type && p2.innerHTML === type && p3.innerHTML === type) {
    p1.style.backgroundColor = "red";
    p2.style.backgroundColor = "red";
    p3.style.backgroundColor = "red";

    if (gameActive) {
      if (type === "X") {
        graczX = graczX + 1;
        document.getElementById("gracz1").innerHTML = `Gracz 1: ${graczX}`;
        gameActive = false;
      } else {
        graczY = graczY = 1;
        document.getElementById("gracz2").innerHTML = `Gracz 2: ${graczY}`;
        gameActive = false;
      }

      console.log("Gracz X: ", graczX);
      console.log("Gracz Y: ", graczY);

      document.getElementById("clear-button").disabled = false;
    } else {
      document.getElementById("alert").innerHTML =
        "Gra juz została zakonczona, prosze ja odswiezyć!";
    }
  }
}

const wyczysc = () => {
  console.log("czysc");

  document.getElementById("alert").innerHTML = "";

  pole1.innerHTML = "";
  pole2.innerHTML = "";
  pole3.innerHTML = "";
  pole4.innerHTML = "";
  pole5.innerHTML = "";
  pole6.innerHTML = "";
  pole7.innerHTML = "";
  pole8.innerHTML = "";
  pole9.innerHTML = "";

  pole1.style.backgroundColor = "white";
  pole2.style.backgroundColor = "white";
  pole3.style.backgroundColor = "white";
  pole4.style.backgroundColor = "white";
  pole5.style.backgroundColor = "white";
  pole6.style.backgroundColor = "white";
  pole7.style.backgroundColor = "white";
  pole8.style.backgroundColor = "white";
  pole9.style.backgroundColor = "white";

  pola = [];
  gameActive = true;
};
