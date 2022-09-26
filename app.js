const splash = document.querySelector('.splash')

document.addEventListener('DOMContentLoaded', (e) =>{
  setTimeout(() => {
    splash.classList.add("display-none")
  }, 3000);
})


// THE String.charFromCharcode is use to access charcters that set inside the browser
//The can be get my specifying the index ie number
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const symbolsEl = document.getElementById("symbols");
const numberEl = document.getElementById("number");
const generateEl = document.getElementById("generate-btn");
const clipboardEl = document.getElementById("clipboard");


const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  symbol: getRandomSymbol,
  number: getRandomNumber
}

//copy to clipboard
clipboardEl.addEventListener('click', ()=>{
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText

  if (!password) {
    return
  }

  textarea.value = password;
  document.body.appendChild(textarea)
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('password copied to clipboard')
})

generateEl.addEventListener('click', () => {
  const choice = +lengthEl.value;
  const hasLower = lowerEl.checked;
  const hasUpper = upperEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, choice);
});

function  generatePassword(lower, upper, number, symbol, choice) {
  let generatedPassword = "";

  const typesCount =  lower + upper + number + symbol;

  //console.log('typesCount: ', typesCount);

  const typesArr = [{ lower }, {upper}, {number}, {symbol}].filter
  (item => Object.values(item)[0]);

 // console.log('typesArr: ', typesArr)

  if (typesCount === 0) {
    return '';
  }
  
  for (let i = 0; i<choice; i+=typesCount){
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      //console.log('funcName: ', funcName);

      generatedPassword += randomFunc[funcName]();
    });
  }

 const finalPassword =  generatedPassword.slice(0, choice)

 return finalPassword;
}






function  getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function  getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function  getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function  getRandomSymbol() {
  const symbols = "!@$#%><(){}+=?/^";
  return symbols[Math.floor(Math.random() * symbols.length)]
}

