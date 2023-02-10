
class Calculator{
  constructor(currentOperandText,previousOperandText){
    this.currentOperandText = currentOperandText;
    this.previousOperandText = previousOperandText;
    this.clear();
  }

  clear(){
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = '';
    this.updateDisplay();
  }

  delete(){
    if(this.currentOperand == '0' && this.previousOperand == '') return;
    this.currentOperand = this.currentOperand.slice(0,length-1);
    if(this.currentOperand == '') this.currentOperand = '0';
    this.updateDisplay();
  }
  appendNumber(number){
    if(this.currentOperand.toString().includes('.') && number.toString() == '.'){
      return;
    }
    if(this.currentOperand == '0' && number.toString() != '.'){
      this.currentOperand = '';
    }
    this.currentOperand += number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation){
    if((this.currentOperand == '0' && this.previousOperand =='')||(this.previousOperand=='' && operation =='=')|| (this.currentOperand=='' && operation == '=')){
      return;
    }else if(this.previousOperand !==''){
      console.log(`${operation} ${this.operation}`)
      if((this.operation == '' && operation !== '=')|| (this.currentOperand == '')){
        this.operation = operation;
        this.updateDisplay();
        return;
      }
      this.compute();
      console.log(operation)
      if(operation == '='){
        this.operation = ''
      }else{
      this.operation = operation;
      }
      this.updateDisplay();
    }else{
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
      this.updateDisplay();
    }
  }

  compute(){
    let computed;
    console.log(`${this.previousOperand} ${this.operation} ${this.currentOperand}` )
    switch(this.operation){
      case '+':
        computed = Number(this.previousOperand) + Number(this.currentOperand);
        this.previousOperand = computed.toString();
        //console.log(`${this.previousOperand} ${this.operation} ${this.currentOperand}` )
        break;
      case '-':
        computed = Number(this.previousOperand) - Number(this.currentOperand);
        this.previousOperand = computed.toString();
        //console.log(`${this.previousOperand} ${this.operation} ${this.currentOperand}` )
        break;
      case '×':
        computed = Number(this.previousOperand) * Number(this.currentOperand);
        this.previousOperand = computed.toString();
        break;
      case '÷':
        computed = Number(this.previousOperand)/Number(this.currentOperand);
        this.previousOperand = computed.toString();
        break;

      default:
        console.log("why")
        return;

    }
    this.currentOperand = '';
    
    console.log(`${this.previousOperand} ${this.operation} ${this.currentOperand}` )
    
  }
  
  formattDisplay(number){
    //console.log("yo"+number)
    let integer;
    let decimal;
    let index = number.indexOf('.')
    //console.log(index)
    const floatNum = parseFloat(number)
    //console.log("yo"+floatNum)
    //if(number == '' || number=='0'){
    if(isNaN(floatNum) || floatNum == 0){
      //console.log("return" +number)
      return number;
    }else if(index != -1){
        integer = parseFloat(number.slice(0,index))
        decimal = number.slice(index+1)
        return `${integer.toLocaleString('en-US',{ maximumSignificantDigits: 20 })}.${decimal}`
    }else
      return floatNum.toLocaleString('en-US',{ maximumSignificantDigits: 20 });
  }
  updateDisplay(){
    console.log(this.currentOperand)
    this.currentOperandText.textContent = this.formattDisplay(this.currentOperand);
    this.previousOperandText.textContent = `${this.formattDisplay(this.previousOperand)} ${this.operation}`;

  }
}

let screenInput = document.querySelector("div.input");
let screenOutput = document.querySelector("div.output");

const numButtons = document.querySelectorAll('button.number');
const opButtons = document.querySelectorAll("button.operator");
const clearButton = document.querySelector("button.clear");
const equalButton = document.querySelector("button.equals");
const deleteButton = document.querySelector("button.delete");

// function handleClick() {
//   //console.log(this.textContent);
//   let screenVal = document.querySelector("input").value;
//   console.log(typeof screenVal)
//   if (screenVal == "0"){
//     document.querySelector("input").value = this.textContent;
//   }else{
//     document.querySelector("input").value += `${this.textContent}`;
//   }
// }

let calculator = new Calculator(screenInput,screenOutput);
numButtons.forEach(button => {
  button.addEventListener('click', ()=>calculator.appendNumber(button.value));
});

opButtons.forEach(button=>{
  button.addEventListener('click', ()=>calculator.chooseOperation(button.value));
})

clearButton.addEventListener('click',()=>calculator.clear());

equalButton.addEventListener('click',()=>calculator.chooseOperation('='));

deleteButton.addEventListener('click',()=>calculator.delete());