
$(document).ready(function() {

    //populate the word bank
    var words = [
        "Dracula", "Shogun", "Beowulf", "Lolita", "Foundation", "Faust", "Ulysses", "Utopia", "Walden",
        "Siddhartha", "Steppenwolf", "Inferno", "Hamlet", "Macbeth", "Persuasion", "Twilight",
        "Ivanhoe", "Frakenstein", "The Metamorphosis", "Firestarter", "Choke", "Lancelot", "Galapagos",
        "The Great Gatsby", "Don Quixote", "War and Peace", "On the Road", "the Illiad", "Brave New World",
        "Lord of the Flies", "The Sun Also Rises", "The Scarlet Letter", "Candide", "Little Women",
        "Moby Dick", "A Tale of Two Cities", "The Time Machine", "The Trial", "The Jungle Book",
        "The Grapes of Wrath", "Slaughterhouse Five", "Of Mice and Men", "Heart of Darkness",
        "Animal Farm", "A Farewell to Arms", "Native Son", "The Call of Cthulhu", "Lord of the Rings"
    ];
    //Set Variables
    $(function() {
        var currentImage = 1;
        var word;
        var remainingletters;
        var secret;
        var wins = 0;
        var losses = 0;

        //play sound when user choses letter
        var audioKeytype = document.createElement("audio");
        audioKeytype.setAttribute("src", "https://s3.amazonaws.com/job-ucf-code-bootcamp/hangman/typewriter-key.mp3");

        //break the titles down to their individual characters
        String.prototype.replaceAt = function(index, character) {
            return this.substr(0, index) + character + this.substr(index + character.length);
        }

        //Change the alpha characters to _ except the spaces
        function setup(theWord) {
            word = theWord.toUpperCase();
            remainingletters = word;
            secret = word.replace(/\w/g, '_');
            $('#secret').text(secret);
        }

        //set variable to call random world function
        theWord = getWord();
        //call function to get word from bank at random
        setup(theWord);
        //write the starting score of 0 to the DOM
        $("#wins").html(wins);
        $("#losses").html(losses);

        //function to process the letter chosen by the user
        function processletter(letter) {
            //create a variable to later use to determine if the user choice of letter is found in theWord	
            var found = false;
            //run a for loop for the length of theWord
            for (var i = 0; i < remainingletters.length; i++) {
                if (remainingletters.charAt(i) == letter) {
                    remainingletters = remainingletters.replaceAt(i, '_');
                    secret = secret.replaceAt(i, letter);
                    found = true;
                }
            }
            //if the user choses a correct letter
            if (found) {
                //show the correct letter to the DOM instead of the _
                $('#secret').text(secret);
                // if all letters picked win the round
                if (secret.indexOf('_') == -1) {
                    alert('Good job you won! You are really well read.');
                    //increment wins variable
                    wins++;
                    //write new win value to the DOM
                    $("#wins").html(wins);
                    //call the reset function to start a new round.
                    reset();
                    //show the starting hangman image
                    currentImage = 1;
                }
                //if a wrong letter is guessed 
            } else {
                //increment the variable for hangman image
                currentImage++;
                //set variable to change to next hangman image
                var imageId = '#hangman_' + currentImage;
                //change the opacity to the next hangman image do it shows
                $(imageId).fadeTo(300, 1.0, function() {
                    //if the final hangman image shows stop the round
                    if (currentImage == 7) {
                        alert("Sorry you lost. I'm sure you've read the next book!");
                        //show the rmaining word
                        $('#secret').text(word);
                        //increment the losses variable
                        losses++;
                        //write new loss value to the DOM
                        $("#losses").html(losses);
                        //call the reset function to start a new round.					
                        reset();
                        //show the starting hangman image					
                        currentImage = 1;
                    }
                });
            }
        }

        //on click function for user letter choices
        $('.letters span').click(function(event) {

            //new variable set to the innerText of the btn the user clicks
            var letter = event.target.innerText;
            //change the class of the btn to diabled, identifying which letter have been picked
            $(event.target).addClass('disabled');
            //call the function to process the letter chosen by the user
            processletter(this.innerText);

            if (audioKeytype.duration > 0 && !audioKeytype.paused) {
                audioKeytype.pause();
                audioKeytype.currentTime = 0;
                audioKeytype.play();
            } else {
                audioKeytype.play();
            }
        });

        //function to pick a string from the word bank at random
        function getWord() {
            while (true) {
                var theWord = words[Math.floor(Math.random() * words.length)];
                return theWord;
            }
        }

        //function the reset to a new round after a win or loss
        function reset() {
            $('.letters span').removeClass("disabled");
            $(".hangman").css("opacity", 0);
            $("#hangman_1").css("opacity", 1);
            theWord = getWord();
            setup(theWord);
        }

    });
});
