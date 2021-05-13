const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForsecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}


keys.addEventListener('click', function(e) {
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return;

    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(element.value);
            break;
            case '.':
            inputDecimal();
            case 'clear':
            clear();
            break;
            default:
                inputNumber(element.value);
    }

    updateDisplay();
});


function handleOperator(nextOperator){
   const value = parseFloat(displayValue);

   if(operator && waitingForsecondValue){
       operator = nextOperator;
       return;
   }

   if (firstValue === null){
       firstValue = value;
       console.log(displayValue,firstValue, operator, waitingForsecondValue);
   } else if (operator){
       const result = calculate (firstValue, value, operator);
       
       displayValue = `${parseFloat(result.toFixed(7))}`;
       firstValue = result
   }

   waitingForsecondValue = true
   operator = nextOperator
   console.log(displayValue,firstValue, operator, waitingForsecondValue);
}

function calculate(first, second, operator){
    if (operator === '+'){
        return first + second;
    } else if (operator === '-'){
        return first - second;
    } else if (operator === '*'){
        return first * second;
    } else if (operator === '/'){
        return first / second;
    }

    return second;
}



function inputNumber(num) {
    if(waitingForsecondValue){
        displayValue = num;
        waitingForsecondValue = false;
    }else{
        displayValue = displayValue === '0'? num: displayValue + num;
    }
   
}
 console.log(displayValue,firstValue, operator, waitingForsecondValue);
function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
}