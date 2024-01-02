const typingText = document.querySelector(".typing-text p"),
inpFeild = document.querySelector(".input-feild"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistakes span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
tryBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = isTyping =  mistakes = 0;

function randomParagraph() {
    let randomIndex = Math.floor(Math.random()*paragraphs.length);
    typingText.innerHTML = ""; //the next para will not append into the previous one
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag; //adding each character inside span tag, and the adding the span inside p tag
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    //focusing input feild on keydown or click event
    document.addEventListener("keydown", () => inpFeild.focus());
    typingText.addEventListener("click", () => inpFeild.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpFeild.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) { //once timer is started it won't restart again on every key clicked
            timer = setInterval(initTimer, 1000);
            isTyping = 1;
        }
        if(typedChar == null) { //if user has pressed backpress or hasn't entered any character
    
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")) { //decrement msitakes only if span tag contains incorrect class
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if(characters[charIndex].innerText === typedChar) { //if user typed character matched with paragrph then add correct class inside span tag
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active")); //removing active class froma all span and then adding to current span tag only
        characters[charIndex].classList.add("active");  //adding active class to next coming character
    
        let wpm = Math.round((((charIndex - mistakes)/5)/(maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;    //if wpm value is infinity, less than 0, empty then set it to 0
    
        mistakeTag.innerHTML = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;    //cpm will not count mistakes
    } else {
        inpFeild.value = "";
        clearInterval(timer);
    }
    
}

function initTimer() {  
    if(timeLeft > 0) {  //if timeLeft > 0 then decrement or clear the timer
        timeLeft--;
        timeTag.innerHTML = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    //calling loadParagraph function and
    //resetting each variable and element value to default
    randomParagraph();
    timeLeft = maxTime,
    charIndex = isTyping =  mistakes = 0;
    timeTag.innerHTML = timeLeft;
    mistakeTag.innerHTML = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpFeild.addEventListener("input", initTyping);
tryBtn.addEventListener("click", resetGame);