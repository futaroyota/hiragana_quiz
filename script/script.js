// -----------------------------
// Hiragana Question Bank
// -----------------------------
const questions = [
    // Reading (easy first 5)
    { type: "reading", question: "あ", options: ["a","i","u","e"], answer: "a" },
    { type: "reading", question: "い", options: ["a","i","u","e"], answer: "i" },
    { type: "reading", question: "う", options: ["u","e","o","a"], answer: "u" },
    { type: "reading", question: "え", options: ["e","i","o","u"], answer: "e" },
    { type: "reading", question: "お", options: ["a","i","o","u"], answer: "o" },

    // Reading combinations (medium/hard)
    { type: "reading", question: "きゃ", options: ["kya","kyo","kyu","ka"], answer: "kya" },
    { type: "reading", question: "ちゅ", options: ["chu","cha","chi","cho"], answer: "chu" },
    { type: "reading", question: "ひな", options: ["hina","hinaa","hinae","hinao"], answer: "hina" },
    { type: "reading", question: "っさ", options: ["ssa","sa","saa","ssa"], answer: "ssa" },
    { type: "reading", question: "がん", options: ["gan","gon","gen","gin"], answer: "gan" },
    { type: "reading", question: "じゅ", options: ["ju","ja","ji","jo"], answer: "ju" },
    { type: "reading", question: "ぴょ", options: ["pyo","pyu","pya","po"], answer: "pyo" },
    { type: "reading", question: "てん", options: ["ten","tan","tenn","teno"], answer: "ten" },
    { type: "reading", question: "まっ", options: ["ma","matsu","mappu","ma"], answer: "ma" },
    { type: "reading", question: "ひょ", options: ["hyo","hyu","hya","ho"], answer: "hyo" },
    { type: "reading", question: "しゃ", options: ["sha","shu","sho","sa"], answer: "sha" },
    { type: "reading", question: "ちょ", options: ["cho","chu","cha","chi"], answer: "cho" },
    { type: "reading", question: "にゅ", options: ["nyu","nya","nyo","ni"], answer: "nyu" },
    { type: "reading", question: "ぴゅ", options: ["pyu","pyo","pya","pu"], answer: "pyu" },
    { type: "reading", question: "ぎゃ", options: ["gya","gyu","giyo","ga"], answer: "gya" },
    { type: "reading", question: "じゃ", options: ["ja","ju","ji","jo"], answer: "ja" },
    { type: "reading", question: "びょ", options: ["byo","byu","bya","bi"], answer: "byo" },
    { type: "reading", question: "ふぁ", options: ["fa","fu","fya","fyo"], answer: "fa" },
    { type: "reading", question: "かっ", options: ["ka","katsu","kappu","kat"], answer: "ka" },
    { type: "reading", question: "ぞう", options: ["zou","zo","zoo","zoa"], answer: "zou" },
    { type: "reading", question: "せん", options: ["sen","senn","san","zen"], answer: "sen" },
    { type: "reading", question: "みゅ", options: ["myu","mya","myo","mi"], answer: "myu" },
    { type: "reading", question: "りゃ", options: ["rya","ryu","ryo","ra"], answer: "rya" },
    { type: "reading", question: "ぴん", options: ["pin","pun","pinp","pinn"], answer: "pin" },
    { type: "reading", question: "ちっ", options: ["chi","chii","cchi","chi"], answer: "chi" },
    { type: "reading", question: "にょ", options: ["nyo","nyu","nya","ni"], answer: "nyo" },
    { type: "reading", question: "ふゅ", options: ["fyu","fya","fyo","fu"], answer: "fyu" },
    { type: "reading", question: "びゃ", options: ["bya","byu","byo","bi"], answer: "bya" },

    // Writing Section
    { type: "writing", question: "a", answer: "あ" },
    { type: "writing", question: "i", answer: "い" },
    { type: "writing", question: "u", answer: "う" },
    { type: "writing", question: "e", answer: "え" },
    { type: "writing", question: "o", answer: "お" },
    { type: "writing", question: "kya", answer: "きゃ" },
    { type: "writing", question: "chu", answer: "ちゅ" },
    { type: "writing", question: "hina", answer: "ひな" },
    { type: "writing", question: "ssa", answer: "っさ" },
    { type: "writing", question: "gan", answer: "がん" },
    { type: "writing", question: "ju", answer: "じゅ" },
    { type: "writing", question: "pyo", answer: "ぴょ" },
    { type: "writing", question: "ten", answer: "てん" },
    { type: "writing", question: "ma", answer: "まっ" },
    { type: "writing", question: "hyo", answer: "ひょ" },
    { type: "writing", question: "sha", answer: "しゃ" },
    { type: "writing", question: "cho", answer: "ちょ" },
    { type: "writing", question: "nyu", answer: "にゅ" },
    { type: "writing", question: "pyu", answer: "ぴゅ" },
    { type: "writing", question: "gya", answer: "ぎゃ" },
    { type: "writing", question: "ja", answer: "じゃ" },
    { type: "writing", question: "byo", answer: "びょ" },
    { type: "writing", question: "fa", answer: "ふぁ" },
    { type: "writing", question: "ka", answer: "かっ" },
    { type: "writing", question: "zou", answer: "ぞう" },
    { type: "writing", question: "sen", answer: "せん" },
    { type: "writing", question: "myu", answer: "みゅ" },
    { type: "writing", question: "rya", answer: "りゃ" },
    { type: "writing", question: "pin", answer: "ぴん" },
    { type: "writing", question: "chi", answer: "ちっ" },
    { type: "writing", question: "nyo", answer: "にょ" },
    { type: "writing", question: "fyu", answer: "ふゅ" },
    { type: "writing", question: "bya", answer: "びゃ" }
];

// -----------------------------
// Variables
// -----------------------------
let currentQuestionIndex = 0;
let score = 0;
let userMistakes = [];
let timerInterval;
const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

// DOM Elements
const questionContainer = document.getElementById("question-container");
const answerContainer = document.getElementById("answer-container");
const nextBtn = document.getElementById("next-btn");
const resultsContainer = document.getElementById("results-container");
const quizContainer = document.getElementById("quiz-container");
const scoreDisplay = document.getElementById("score");
const mistakesDisplay = document.getElementById("mistakes");
const progressBar = document.getElementById("progress");
const timeLeftDisplay = document.getElementById("time-left");

// -----------------------------
// Show Question
// -----------------------------
function showQuestion() {
    clearInterval(timerInterval);
    answerContainer.innerHTML = "";
    questionContainer.classList.add("fade-out");

    setTimeout(() => {
        const q = shuffledQuestions[currentQuestionIndex];
        questionContainer.textContent = q.question;

        // Progress bar
        progressBar.style.width = `${((currentQuestionIndex)/shuffledQuestions.length)*100}%`;

        if (q.type === "reading") {
            q.options.forEach(opt => {
                const btn = document.createElement("button");
                btn.textContent = opt;
                btn.addEventListener("click", () => checkAnswer(opt));
                answerContainer.appendChild(btn);
            });
            nextBtn.style.display = "none"; // hide submit button
        } else {
            const input = document.createElement("input");
            input.setAttribute("placeholder", "Type hiragana here");
            answerContainer.appendChild(input);
            input.focus();

            nextBtn.style.display = "inline-block"; // show submit button
            nextBtn.textContent = "Submit";
            nextBtn.onclick = () => checkAnswer(input.value);
        }

        questionContainer.classList.remove("fade-out");
        questionContainer.classList.add("fade-in");

        startTimer();
    }, 300);
}

// -----------------------------
// Timer
// -----------------------------
function startTimer() {
    clearInterval(timerInterval);
    const q = shuffledQuestions[currentQuestionIndex];
    let timeLeft = q.type === "reading" ? 15 : 60;
    timeLeftDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            const input = answerContainer.querySelector("input");
            checkAnswer(input ? input.value : "");
        }
    }, 1000);
}

// -----------------------------
// Check Answer
// -----------------------------
function checkAnswer(selected) {
    clearInterval(timerInterval);
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const correct = currentQ.answer;

    if (selected.trim() === correct) score++;
    else userMistakes.push({ question: currentQ.question, user: selected || "—", correct });

    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) showQuestion();
    else showResults();
}

// -----------------------------
// Results Page
// -----------------------------
function showResults() {
    quizContainer.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    scoreDisplay.textContent = `Your Score: ${score} / ${shuffledQuestions.length}`;
    mistakesDisplay.innerHTML = "";

    userMistakes.forEach((m, index) => {
        const card = document.createElement("div");
        card.classList.add("mistake-card");
        card.classList.add(m.user === m.correct ? "correct" : "incorrect");
        card.innerHTML = `
            <div><strong>Question:</strong> ${m.question}</div>
            <div><strong>Your Answer:</strong> ${m.user}</div>
            <div><strong>Correct Answer:</strong> ${m.correct}</div>
        `;
        mistakesDisplay.appendChild(card);
        setTimeout(() => {
            card.style.transform = "translateY(0)";
            card.style.opacity = "1";
        }, index * 150);
    });

    triggerConfetti();
}

// -----------------------------
// Restart
// -----------------------------
document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    userMistakes = [];
    shuffledQuestions.sort(() => Math.random() - 0.5);
    resultsContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    progressBar.style.width = "0%";
    showQuestion();
});

// -----------------------------
// Keyboard support
// -----------------------------
answerContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const input = answerContainer.querySelector("input");
        if (input) checkAnswer(input.value);
    }
});

// -----------------------------
// Confetti
// -----------------------------
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let confettiParticles = [];

function createConfetti() {
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 20,
            color: `hsl(${Math.random()*360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 10
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r/2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/2);
        ctx.stroke();
    });
    updateConfetti();
}

function updateConfetti() {
    confettiParticles.forEach(p => {
        p.y += Math.cos(0.01 + p.d) + 2 + p.r/2;
        p.x += Math.sin(0.01) * 2;
        if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(drawConfetti);
}

function triggerConfetti() {
    createConfetti();
    drawConfetti();
}

// -----------------------------
// Initialize
// -----------------------------
showQuestion();
