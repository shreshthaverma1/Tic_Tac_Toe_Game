let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true for O, false for X
let count = 0; //used in draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Box was clicked!");

    if (box.innerText === "") {
      // Prevent overwriting
      box.innerText = turnO ? "O" : "X";
      box.setAttribute("disabled", true); // Disable the button
      turnO = !turnO;
      count++; // Increment count on each move

      if (!checkWINNER() && count === 9) {
        gameDraw();
      }
    }
  });
});

const gameDraw = () => {
  msg.innerText = "Game Drawn";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = ""; //visible text inside it
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations!
 Winner is : ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWINNER = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }

  if (count === 9) {
    gameDraw();
  }
  return false;
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
