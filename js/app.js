let mod = document.querySelector("mo");
/*
 * Create a list that holds all of your cards
 */
// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon in modal
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("popover")

 // array for opened cards
let openedCards = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

document.body.onload = letsPlay();
function letsPlay(){
    cards = shuffle(cards);
    for (var i = 0; i< cards.length; i++) {
      deck.innerHTML = "";
       [].forEach.call(cards, function (item) {
           deck.appendChild(item);
       });
    cards[i].classList.remove("show", "open", "match", "disabled");
/*to empty the array*/    
    openedCards.length = 0;
}
    moves = 0;
    counter.innerHTML = `${moves} move`;

    for (var i=0; i<stars.length; i++){
        stars[i].style.color = "#330505";
        stars[i].style.visibility = "visible";
    }

    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function cardOpen(){
    openedCards.push(this);
    let len = openedCards.length;
    if(len===2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1000);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = `${moves} move`;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    if (moves > 1){
        counter.innerHTML = `${moves} moves`;
    }
    // setting rates based on moves
    if (moves > 9 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i < 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves >= 12 && moves < 15){
        for( i= 0; i < 3; i++){
            if(i == 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves >= 15 && moves < 20){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves >= 20){
        for( i= 0; i < 4; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = `${minute} mins ${second} secs `;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        letsPlay();
    });
}


// @desciption for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    letsPlay();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};
