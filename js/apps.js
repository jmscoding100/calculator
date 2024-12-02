/*
WHAT DO WE WANT IT TO DO??
    define operations
        clear
        delet(single number)
        append number
        compute
        update display
*/

class Calculator{
    //1 constructor
    constructor(prevOperText, currOperText){
        this.prevOperText = prevOperText
        this.currOperText = currOperText
        this.clear()
    }


    //2.1 append number
    appendNumber(number){
        if(number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()

        // console.log(number, this.currOperand)
    }



// Choose operation
//if there is no number then operation buttons are disabled
chooseOperation(operation){
    if(this.currOperand === '') return
    if(this.prevOperand !== ''){
        this.compute()
    }

    this.operation = operation
    // pass this.currOperand to this.prevOperand
    this.prevOperand = this.currOperand
    this.currOperand = ''
}




//1.2 clear
clear(){
    this.prevOperand = ''
    this.currOperand = ''
    this.operation = undefined
}


compute(){
    let computation

    const prev = parseFloat(this.prevOperand)
    const current = parseFloat(this.currOperand)

    if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                    computation = prev - current
                    break
            case '*':
                    computation = prev * current
                    break
            case '/':
                    computation = prev / current
                    break
            default:
                return
        }



        // this.currOperand = computation
        this.currOperand = isFinite(computation) ? computation: "ERROR"
        this.operation = undefined
        this.prevOperand = ''
}




//1.3 delete
delete(){
    if (this.currOperand == 'ERROR'){
        this.currOperand = ''
    } else{
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

}


getDisplayNumber(number) {
    const stringNumber = number.toString()

    const integerDigits = parseFloat(stringNumber.split('.'[0]))
    const decimalDigits = stringNumber.split('.'[1])

    let integerDisplay

    if (isNaN(integerDigits)){
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        }

        return decimalDigits
    }


//3 update display
updateDisplay(){
    this.currOperText.innerText = this.getDisplayNumber(this.currOperand)

    if(this.operation != null) {
        this.prevOperText.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
    } else {
        this.prevOperText.innerText = ''
    }
}

}


// 2 set const to access the btns
//enclose attribute-value pairs in brackets
const numBtn = document.querySelectorAll('[data-number]')
// console.log(numBtn)

const operBtn = document.querySelectorAll('[data-operation]')
const equalBtn = document.querySelector('[data-equals]')
const delBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-all-clear]')

const prevOperText = document.querySelector('[data-prev-operand]')
const currOperText = document.querySelector('[data-curr-operand]')


const calculator = new Calculator(prevOperText, currOperText)


numBtn.forEach(button => {
    button.addEventListener('click', ()=> {
        // console.log(button.innerText)
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operBtn.forEach(button => {
    button.addEventListener('click', ()=> {
        // console.log(button.innerText)
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalBtn.addEventListener('click', ()=> {
    // console.log(equalBtn.innerText)
    calculator.compute()
    calculator.updateDisplay()
})


allClearBtn.addEventListener('click', ()=> {
    // console.log(allClearBtn.innerText)
    calculator.clear()
    calculator.updateDisplay()
})

delBtn.addEventListener('click', ()=>{
    // console.log(delBtn.innerText)
    calculator.delete()
    calculator.updateDisplay()
})