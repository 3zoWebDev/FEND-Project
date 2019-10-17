/* -------------------------------------- Section one  for variables Declaration -------------------------------------- */

let allcards = document.querySelectorAll(".card");  // Store all Cards inside an Array
let card_Opened = [];    // to store opened cards and checking if matched or not
let symbols = [];      //stroe all the symbols/icons inside an array to shuffle them

let mov = document.querySelector('.moves');
let numMoves = 0;

let star = document.querySelectorAll('.fa-star');
let numStars = 3;

let second = 0, minute = 0; hour = 0;
let timer = document.querySelector(".timer"); //select the timer class
let interval;  //for setinterval to make the time strat after a secound

let restart = document.querySelector('.restart');
let matchedCard = document.getElementsByClassName("match");


/* -- store all Symbols inside a Symbols Array by using the Childeren inside the Class card -- */

allcards.forEach(card => {
    let icon = card.children[0];
    symbols.push(icon.className);
});



/* --------------------------------------- Section Two for Functions --------------------------------------- */


// we have to start by build starting function to reset every things when the page load or when click restart symbole.

// Function one for - when game start/restart we have to :
        // 1- Shuffle the Cards
        // 2- Hide all Cards
        // 3- reset the numMoves to zero
        // 4- reset the The_timer to zero
        // 5- reset the Stars to 3 stars
        function HideCardsAndRestThegame() {
            //First Shuffle the Cards
            shuffle_Cards();

            //Secound Hide the Cards
            allcards.forEach(card => {
                card.className = "card"; // hide all the cards by setting the class name to 'card' only
                });

            //Third Reset the numMoves to zero and use textContent property to change it to 0
                numMoves = 0 ;
                mov.textContent = numMoves;

            //Fourth Reset the the_timer to zero

                second = 0;
                minute = 0;
                hour = 0;
                timer.innerHTML = "0 mins 0 secs";
                clearInterval(interval);

            // Fifth Reset the Stars Rating by use for loop because we have three stars to avoid repeting
                for (let i = 0; i < star.length; i++) {
                    star[i].style.color = "#FFD700";
                    star[i].style.visibility = "visible";
                }
        }


 // Function Two to Shuffle symbols first by use Shuffle Function and then by assigned them to the symbols array

    function shuffle_Cards(){
       symbols = shuffle(symbols);

    // to make the shuffling appear in Markup also not just inside the symbols array
        let i=0;
        allcards.forEach(card => {
            let icon = card.children[0];
            icon.className = symbols[i];
            i++;
        });
    }

// Function Three for EventListener Click to make cards open when cliked

function opencard_clicked(){
    //first we have to be sure only two cards opend so we need declare open_card Array for checking

    if(card_Opened.length < 2){
            this.classList.toggle('show');      // this refere to each card
            this.classList.toggle('open');     //  we use toggle so we can toggle the class name show/open
            card_Opened.push(this);           //   then we push the card to cars_opened Array

            if(card_Opened.length == 2){
            setTimeout(matched, 1000);     // delay for 1 sec to make us see the open cards before hide them
            Moves();                      //  increase the number of move by 1
            }

    }

}

// Function Four for Chicking if the two cards are Matched

function matched(){
    //first make sure the card_opened array has only two cards by use length property
    if(card_Opened.length == 2){
        //because we have only two cards we colud use index 0 and 1 directly and assigned them to 1st & 2nd card
        let firstcard = card_Opened[0];
        let secoundcard = card_Opened[1];

        //Now lets compare them by use children class name if they Equal.
        if(firstcard.children[0].className == secoundcard.children[0].className){
            // set the class Name for both to Match
            firstcard.classList.add("match");
            secoundcard.classList.add("match");
        }
        // else if != we have to Hide them
        else {
            firstcard.className = "card";
            secoundcard.className = "card";
        }
        card_Opened = [];  //we need to empty the card_opened Array for a new comparison
    }
        win_or_lose_Function() //now after all cards matched pass the win_or_lose_function for pop up window
}

//Function five to increase number of move when select two cards
function Moves(){
    numMoves += 1;                    // select class moves (we store it in mov var)
    mov.textContent = numMoves;      // for incresing numMove by one
                                    // and to be updated in html then pass Moves()
                                   //  to  opencard_clicked Function
    stars()                       //  pass stars Function for comparison with number of moves

    // to make the timer start on first click
    if (numMoves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        the_timer();
    }
}


// Function six for stars, how many stars depend to the num of move.
//from https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript#toc-4-star-rating

// if the moves <   15 so will get three stars
// if the moves >=  25  and < 30 will get two stars
// if the moves >= 30 and  will get one star
function stars() {
        if (numMoves > 15 && numMoves < 25) {
            for (i = 0; i < 3; i++) {
                if (i > 1) {
                    star[i].style.visibility = "collapse";
                    //console.log('test1');
                }
            }
        }
        else if (numMoves >= 25 && numMoves < 30 ) {
            for (i = 0; i < 3; i++) {
                if (i > 0) {
                    star[i].style.visibility = "collapse";
                    //console.log('test2');
                }
            }
        }
    }


// Function seven to check if the player win or lose

    function win_or_lose_Function(){
        let card_not_matched = document.querySelectorAll(".card:not(.match)"); // select only 'show' and 'open' class
        if (card_not_matched.length == 0) {
        // popup Congratulations You the winner
           Congratulations_Popup()
    }
}

//function Eight for the timer
//then we pass the timer function to Moves() function to start when move = 1;
function the_timer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* --------------------- Congratulations Popup --------------------- */

//select the dialog in global Scope to use it in two functions below:
// 1- Congratulations_Popup()
// 2- HideCardsAndRestThegamefordialog()

let dialog = document.getElementById('Congrats-Popup');

//create a function for Congratulations Popup
function Congratulations_Popup() {

    clearInterval(interval);
    finalTime = timer.innerHTML;
    // change the number of moves by use innerText
    // select the span with id NumMoves
        document.getElementById('numMoves').innerText = numMoves;

     // select star rate tp pass number of stars after the game finsh
         let starRating = document.querySelector(".stars").innerHTML;
         document.getElementById("starsrate").innerHTML = starRating;

    // select the first button to play agin
       let btn1 = document.getElementById('restart-the-game');
       btn1.addEventListener('click', HideCardsAndRestThegamefordialog);

    //select the secound button to exit the game
        let btn2 = document.getElementById('exit');
        btn2.addEventListener('click', () => {   // here i used arrow function becuse i need the function for one time,
            dialog.close();                     // and to do one thing which is close the dialog
        });

    //now let the dialog pop up in the screen by use ShowModel method
        dialog.showModal();

    // Now stop the timer to show the time get to complete the game
    clearInterval(interval);
    finalTime = timer.innerHTML;
    document.getElementById("timetotal").innerHTML = finalTime;
    }

    //create function for play agin button dialog to make the dilog disappear and restart the game
        function HideCardsAndRestThegamefordialog(){
            HideCardsAndRestThegame() //to restart the game
            dialog.close();
        }

// Now pass the function Congratulations_Popup to win_or_lose Function
// to run after the game end ...




/* -------------------------------------------- Section for Running  -------------------------------------------- */


//Hide and reset the game when the game start or once the html file load
    HideCardsAndRestThegame();


// Event To Open cards when clicked
    allcards.forEach(card => {
        card.addEventListener('click', opencard_clicked);
    });

// Now lets select Reset button to add Event Listener (click) and pass HideCardsAndRestThegame();
// to make the user restat the game while or after finsh the game
    restart.addEventListener('click', HideCardsAndRestThegame);
