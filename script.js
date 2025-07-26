const typingTest = document.querySelector('.typing-test p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

//set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex =0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = [
  "Typing fast is not just about speed but also about maintaining accuracy over longer periods of time without getting fatigued.",
  "Once upon a time in a distant kingdom, a young scribe trained every day to perfect the art of typing without ever looking at the keyboard.",
  "Although it seemed like a simple task, typing flawlessly while maintaining a high words-per-minute rate took weeks of disciplined practice.",
  "The efficiency of your typing skills can significantly impact your productivity in programming, writing, and communication tasks.",
  "In a world where digital communication reigns supreme, the ability to type quickly and accurately has become a modern superpower.",
  "Mastering keyboard shortcuts and touch typing can dramatically reduce the amount of time you spend on repetitive computer tasks.",
  "As she typed her final sentence, a sense of accomplishment washed over her, knowing she had reached a new personal best in speed.",
  "While speed is essential, developing proper technique and finger placement helps prevent long-term strain and injuries like carpal tunnel.",
  "Whether you are coding, blogging, or just chatting online, improving your typing can enhance both your confidence and efficiency.",
  "Every great typist once struggled with typos and slow speeds, but with persistence and daily practice, they reached remarkable fluency."
    ];
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingTest.innerHTML='';
    for(const char of paragraph[randomIndex]){
        typingTest.innerHTML+= `<span>${char}</span>`;
    }
    typingTest.querySelectorAll('span')[0].
    classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingTest.addEventListener("click",()=>{
        input.focus()})
}

//handle user input
function initTyping(){
    const char = typingTest.querySelectorAll(('span'));
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft>0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }


        if(char[charIndex].innerText=== typedChar){
            char[charIndex].classList.add('correct');
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;

    } 
    else{
        clearInterval(timer);
        input.value='';
    }  
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;

    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    Comment.innerText = 0;
    mistakes.innerText =0;
    if (timeLeft === 0) input.disabled = true;
    input.disabled = false;


}

input.addEventListener("input",initTyping);


loadParagraph();
btn.addEventListener("click",reset);

