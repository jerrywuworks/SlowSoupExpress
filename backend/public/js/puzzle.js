const msgSec = document.getElementById("messages");
const textInput = document.getElementById("question-input")
const yesNoBtn = document.getElementById("yes-no")
const checkSolutionBtn = document.getElementById("check-solution")
const yesNoWarning = document.getElementById("yes-no-warning")
const wrongSolutionWarning = document.getElementById("wrong-solution-warning")

const puzzleTitle = document.getElementById("title").textContent;

document.addEventListener("DOMContentLoaded", (evt) => {
    yesNoWarning.classList.add("hidden");
    wrongSolutionWarning.classList.add("hidden")
})

yesNoBtn.addEventListener("click", handleQuestion)
checkSolutionBtn.addEventListener("click", handleSolution)

async function handleQuestion (evt) {
    yesNoWarning.classList.add("hidden");
    wrongSolutionWarning.classList.add("hidden")

    evt.preventDefault();
    const input = textInput.value

    const response = await fetch( "/puzzle/yes-no", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            question: input,
            puzzleTitle: puzzleTitle
        })
    })

    const data = await response.json();
    const valid = data.valid;
    if ( ! valid) {
        yesNoWarning.classList.remove("hidden");

    }
    else {
        textInput.value = ""

        const response = data.response;
        const msg = document.createElement("p");
        msg.textContent = `${input}\t-- ${response}`
        msgSec.appendChild(msg);
    }

}

async function handleSolution (evt) {
    yesNoWarning.classList.add("hidden");
    wrongSolutionWarning.classList.add("hidden")

    evt.preventDefault();
    const input = textInput.value

    const response = await fetch( "/puzzle/check-solution", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            solution: input,
            puzzleTitle: puzzleTitle
        })
    })

    const data = await response.json();
    const match = data.match;
    
    if (! match) {
        wrongSolutionWarning.classList.remove("hidden")
    }
    else {
        const truth = data.truth;
        textInput.value = ""
        const correctSolutionMsg = document.createElement("p");
        correctSolutionMsg.textContent = `Congrats, you found the truth:`
        const truthMsg = document.createElement("p")
        truthMsg.textContent = `${truth}`

        msgSec.append(correctSolutionMsg, truthMsg);

        // deactivate all btns
        checkSolutionBtn.removeEventListener("click", handleSolution)
        yesNoBtn.removeEventListener("click", handleQuestion)

        checkSolutionBtn.addEventListener('click' , (evt) => {
            evt.preventDefault();
        })
        yesNoBtn.addEventListener('click' , (evt) => {
            evt.preventDefault();
        })
    }
}