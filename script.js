let score = JSON.parse(localStorage.getItem("savedScore"));

if (score === null) {
  score = {
    Wins: 0,
    Losses: 0,
    Ties: 0,
  };
}

updateScoreElement();

/* 
    // OR you can do the following too // 

        let score = JSON.parse(localStorage.getItem('savedScore')) || {
        Wins: 0,
        Losses: 0,
        Ties: 0
      };

    */
let isAutoplaying = false;
let intervailID;

function autoplay() {
  if (!isAutoplaying) {
     intervailID = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
  isAutoplaying = true;
  }
  else
  {
    clearInterval(intervailID);
    isAutoplaying = false;
  }
}

document.querySelector('.rockbtn-js').addEventListener('click',() => {playGame('Rock');});
document.querySelector('.paperbtn-js').addEventListener('click',() => {playGame('Paper');});
document.querySelector('.scissorsbtn-js').addEventListener('click',() => {playGame('Scissors');});

document.body.addEventListener('keydown',(event)=>{

  if(event.key === ('r' || 'R'))
  {
    playGame('Rock');
  }
  else if(event.key === ('p' || 'P'))
  {
    playGame('Paper');  
  }
    else if(event.key === ('s' || 'S'))
  {
    playGame('Scissors');
  }
})

function playGame(playerMove) {
  const ComputerMove = pickComputerMove();
  let Result = "";

  if (playerMove === "Scissors") {
    if (ComputerMove === "Paper") {
      Result = "You Win";
    } else if (ComputerMove === "Rock") {
      Result = "You Lose";
    } else if (ComputerMove === "Scissors") {
      Result = "Tie";
    }
  } else if (playerMove === "Rock") {
    if (ComputerMove === "Rock") {
      Result = "Tie";
    } else if (ComputerMove === "Paper") {
      Result = "You Lose";
    } else if (ComputerMove === "Scissors") {
      Result = "You Win";
    }
  } else if (playerMove === "Paper") {
    if (ComputerMove === "Paper") {
      Result = "Tie";
    } else if (ComputerMove === "Rock") {
      Result = "You Win";
    } else if (ComputerMove === "Scissors") {
      Result = "You Lose";
    }
  }

  if (Result === "You Lose") {
    score.Losses += 1;
  } else if (Result === "You Win") {
    score.Wins += 1;
  } else if (Result === "Tie") {
    score.Ties += 1;
  }

  localStorage.setItem("savedScore", JSON.stringify(score));
  updateScoreElement();

  document.querySelector(".js-result").innerHTML = Result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = ` You picked <img src="img/${playerMove}-emoji.png" class="move-icon"> &nbsp;&nbsp;&nbsp; |||| &nbsp;&nbsp;&nbsp; Computer picked <img src="img/${ComputerMove}-emoji.png" class="move-icon">`;
  //alert(` You picked ${playerMove}.\n Computer picked ${ComputerMove}.\n\n  =============== \n | Final Result: ${Result}  | \n  =============== \n \n Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties} `);
}

function updateScoreElement() {
  document.querySelector(
    ".JS-score"
  ).innerHTML = ` Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties} `;
}

function pickComputerMove() {
  const randomMove = Math.random();
  let ComputerMove = "";
  if (randomMove >= 0 && randomMove < 1 / 3) {
    ComputerMove = "Paper";
  } else if (randomMove >= 1 / 3 && randomMove < 2 / 3) {
    ComputerMove = "Rock";
  } else if (randomMove >= 2 / 3 && randomMove < 1) {
    ComputerMove = "Scissors";
  }
  console.log(ComputerMove);
  return ComputerMove;
}
