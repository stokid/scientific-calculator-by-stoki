var operandFirst = {
    numbersArray: ["0"],
    numbersStringHystory: "",
    numbersValue: 0,
    isDecimalPoint: false,
    isNegative: false,
    isFinish: false
}
var operandSecond = {
    numbersArray: ["0"],
    numbersStringHystory: "",
    numbersValue: 0,
    isDecimalPoint: false,
    isNegative: false,
    isFinish: false
}
var operandExponent = {
    numbersArray: ["0"],
    numbersStringHystory: "",
    numbersValue: 0,
    isDecimalPoint: false,
    isNegative: false,
    isFinish: false,
}

var operandMemorize = {
    numbersArray: ["0"],
    numbersStringHystory: "",
    numbersValue: 0,
    isDecimalPoint: false,
    isNegative: false,
    isFinish: false
}

var actualOperator = [];
var repeatWhenEquiel = [];
var thirdOprator = [];
let operatorScreener = "";
let operatorContainer = [];
let secondFunctions = false;
let measurementsNumbers = 0;
let unitOfMeasurement = "deg";

document.getElementById('second-functions-button').style.visibility = "hidden";
document.getElementById('memory-function').style.visibility = "hidden";


/* CLEAR */
document.getElementById("clear").addEventListener('click',function (){
    clearAll ();
})
/* MEMORY FUNCTION DISPLAY ON SCRENNER */
document.getElementById("operator-memoryplus").addEventListener('click',function (){
    memoryFunctionsScreen()
})
/* SECOND FUNCTION */
document.getElementById("second-function").addEventListener('click',function (){
    secondFunctionsTurn();
      //console.log(secondFunctions);
})
/* UNIT OF MEASUREMENT */
document.getElementById("button-drg").addEventListener('click',function (){
    let measurements = document.getElementsByClassName("measurement-functions-display");
    drgFunctionsTurn();
    function drgFunctionsTurn() {
        if (measurementsNumbers===measurements.length-1) {
            measurementsNumbers=0;
            unitOfMeasurement = measurements[measurementsNumbers].id;
            measurements[measurementsNumbers].style.visibility = 'visible';
            measurements[measurements.length-1].style.visibility = 'hidden';
        } else {
        measurementsNumbers+=1;
        unitOfMeasurement = measurements[measurementsNumbers].id;
        measurements[measurementsNumbers].style.visibility = 'visible';
        measurements[measurementsNumbers-1].style.visibility = 'hidden';
        }
        
    }
})


/* ---------------------------------- NUMBERS INPUT ---------------------------------- */
var numberButtons = document.querySelectorAll(".number");
for (const button of numberButtons) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        //If we push an ordinary operator button then we push "Equial" or "Number" button, we have to take "operatorContainer" to empty.
        if(actualOperator[0] == "equial" || actualOperator[1] == "equial" || actualOperator[0] == "multiplication" || actualOperator[0] == "division" || 
        actualOperator[0] == "addition" || actualOperator[0] == "subtraction" || event.target.name=="number") {
            operatorContainer = [];
        }
        //If we push an operator button which has not actualOperator(s) (because we delete with Array.shift()), we have to provide the operandFirst properties has own last properties.
        if ( operatorContainer.indexOf("factorial")>-1 || operatorContainer.indexOf("nthpower")>-1 ||
        operatorContainer.indexOf("nthevolution")>-1 || operatorContainer.indexOf("sin")>-1 || operatorContainer.indexOf("cos")>-1 || 
        operatorContainer.indexOf("tan")>-1 || operatorContainer.indexOf("square")>-1 || operatorContainer.indexOf("sqrt")>-1) {
            operandFirst.numbersArray = [operandFirst.numbersValue.toString()];
            operandFirst.numbersStringHystory = operandFirst.numbersValue.toString();
            operandFirst.isFinish=false;
            operatorContainer = [];
        }
        if(actualOperator[0] == "equial") {
            if(event.target.name == "memoryplus") {
                actualOperator = [];
                operandFirst.numbersArray = [operandFirst.numbersValue.toString()];
                operandFirst.numbersStringHystory = operandFirst.numbersValue.toString();
                operandFirst.isFinish=false;
            } else {
            actualOperator = [];
            rebootOperandFirst();
            rebootOperandSecond();
            console.log("REBOOTOLOM MINDKÉT OPERANDOT");
            }
        }
        /* FIRST OPERANDUS INPUT -START- */
        if(operandFirst.isFinish==false) {
            var actualValue = event.target.value;
            if (actualValue == "PI") {
                rebootOperandFirst();
                actualValue = Math.PI;
            }
            if (actualValue == "e") {
                rebootOperandFirst();
                actualValue = Math.E;
            }
            if (event.target.name == "memoryread") {
                memoryReadToFirstNumber();
            }
            if (actualValue == "-") {
                operandFirst.isNegative = !operandFirst.isNegative; 
            } else if(operandFirst.numbersArray.length<16) {
                if (actualValue == "backspace") {
                    operandFirst.numbersArray.pop();
                    operandFirst.numbersStringHystory = operandFirst.numbersArray.join("");
                } else if (actualValue != "M+"  && actualValue != "RM") {
                operandFirst.numbersArray.push(actualValue);
                operandFirst.numbersStringHystory = operandFirst.numbersArray.join("");
                    if (actualValue == ".") {
                        operandFirst.isDecimalPoint = true;
                        document.getElementById("decimal-point").disabled = true;
                    }
                }
            }
            operandFirst.numbersValue = Number(operandFirst.numbersStringHystory);
            if (operandFirst.isNegative == true) {
                operandFirst.numbersValue = -1*operandFirst.numbersValue;
            }
            if (event.target.name == "memoryplus") {
                memoryPlus();
            }
            numbersString = operandFirst.numbersValue.toString();
            document.getElementById("screener-numbers").innerHTML = numberStringBreak(numbersString);
            numbersString ="";
        }
        /* SECOND OPERANDUS INPUT -START- */
        if(operandFirst.isFinish==true) {
            if (event.target.name == "memoryplus") {
                memoryPlus();
            }
            //operandSecond.isNegative = false; // SUCCES// BUG: We have to take "operandSecond.isNegative" to FALSE, because after we finish a math exercise we return to "operandSecond"-input that we have to start with a positive number. When we input the new  "operandSecondNumber" and push the plus/negative button it will be changed to negative number. BUT, when we push again this button it will not be changed to positive number, because this function is started with positive number then it will be changed to negative again.
            var actualValue = event.target.value;
            if (actualValue == "PI") {
                rebootOperandSecond();
                actualValue = Math.PI;
            }
            if (actualValue == "e") {
                rebootOperandSecond();
                actualValue = Math.E;
            }
            if (actualValue == "-") {
                operandSecond.isNegative = !operandSecond.isNegative;
            } else if (operandSecond.numbersArray.length<16) {
                if (actualValue == "backspace") {
                    operandSecond.numbersArray.pop();
                    operandSecond.numbersStringHystory = operandSecond.numbersArray.join("");
                } else if (actualValue != "M+"  && actualValue != "RM") {
                    operandSecond.numbersArray.push(actualValue);
                    operandSecond.numbersStringHystory = operandSecond.numbersArray.join("");
                    if (actualValue == ".") {
                        operandSecond.isDecimalPoint = true;
                        document.getElementById("decimal-point").disabled = true;
                    }
              }
            }
            operandSecond.numbersValue = Number(operandSecond.numbersStringHystory);
            if (operandSecond.isNegative == true) {
                operandSecond.numbersValue = -1*operandSecond.numbersValue;
                /* operandSecond.isNegative = !operandSecond.isNegative; */
            }
            if (event.target.name == "memoryread") {
                memoryReadToSecondNumber();
            }
            operandSecond.isFinish=true;
            numbersString = operandSecond.numbersValue.toString();
            document.getElementById("screener-numbers").innerHTML = numberStringBreak(numbersString);
            numbersString ="";
            /* document.getElementById("screener-numbers").innerHTML = operandSecond.numbersValue; */
        }
    })
}
/* ---------------------------------- OPERATORS INPUT ---------------------------------- */
var numberOperators = document.querySelectorAll(".operator");
for (const button of numberOperators) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        operandFirst.isFinish=true;
        document.getElementById("decimal-point").disabled = false;

        operatorContainer.push(event.target.name);
        
        if (operandSecond.isFinish==false) {
            actualOperator.push(event.target.name)
            if(actualOperator.length>1) {
                actualOperator.shift();
            }
        }
        repeatWhenEquiel = event.target.name;

        if (event.target.name === "multiplication" || event.target.name === "division" || event.target.name === "addition" || event.target.name === "subtraction" ||
        event.target.name === "nthpower" || event.target.name === "nthevolution") {
            operatorScreener = event.target.value;
        } else operatorScreener = "";
        
        document.getElementById("screener-operator").innerHTML = operatorScreener;

        if (operandFirst.isFinish==true && (actualOperator=="square" || actualOperator=="sqrt" || actualOperator=="sin" || 
            actualOperator=="cos" || actualOperator=="tan" || actualOperator=="factorial") && operandSecond.isFinish==false) {
            switch (actualOperator[0]) {
                case "square":
                    if (secondFunctions) {
                        operandFirst.numbersValue = Math.pow(10,operandFirst.numbersValue);
                        secondFunctionsTurn();
                    } else {
                    operandFirst.numbersValue = operandFirst.numbersValue * operandFirst.numbersValue;
                    }
                    actualOperator.shift();                       
                    break;
                case "sqrt":
                    if (secondFunctions) {
                        operandFirst.numbersValue = 1/operandFirst.numbersValue;
                        secondFunctionsTurn();
                    } else {
                    operandFirst.numbersValue = Math.sqrt(operandFirst.numbersValue);
                    }
                    actualOperator.shift();                       
                    break;
                case "sin":
                    if(unitOfMeasurement === "rad") {
                        if(secondFunctions) {
                            operandFirst.numbersValue = Math.asin(operandFirst.numbersValue);
                            secondFunctionsTurn()
                        } else {
                            operandFirst.numbersValue = Math.sin(operandFirst.numbersValue);
                        }
                    } else {
                        if(secondFunctions) {
                            operandFirst.numbersValue = Math.asin(operandFirst.numbersValue) * (180/Math.PI); // in degrees
                            secondFunctionsTurn()
                        } else {
                        operandFirst.numbersValue = Math.sin(operandFirst.numbersValue * (Math.PI / 180)); // in degrees
                        }
                    }
                    actualOperator.shift();                       
                    break;
                case "cos":
                    if(unitOfMeasurement === "rad") {
                        if(secondFunctions) {
                            operandFirst.numbersValue = Math.acos(operandFirst.numbersValue);
                            secondFunctionsTurn()
                        } else {
                            operandFirst.numbersValue = Math.cos(operandFirst.numbersValue);
                        }
                    } else {
                        if(secondFunctions) {
                            operandFirst.numbersValue = Math.acos(operandFirst.numbersValue) * (180/Math.PI); // in degrees
                            secondFunctionsTurn()
                        } else {
                        operandFirst.numbersValue = Math.cos(operandFirst.numbersValue * (Math.PI /180)); // in degrees
                        }
                    }
                    actualOperator.shift();                       
                    break;
                case "tan":
                    if(unitOfMeasurement === "rad") {
                        if(secondFunctions) {
                            operandFirst.numbersValue = Math.atan(operandFirst.numbersValue);
                            secondFunctionsTurn()
                        } else {
                        operandFirst.numbersValue = Math.tan(operandFirst.numbersValue);
                        }
                    } else {
                        if(secondFunctions) {
                            operandFirst.numbersValue = Math.atan(operandFirst.numbersValue) * (180/Math.PI); // in degrees
                            secondFunctionsTurn()
                        } else {
                    operandFirst.numbersValue = Math.tan(operandFirst.numbersValue * (Math.PI / 180)); // in degrees
                        }
                    }
                    actualOperator.shift();                       
                    break;
                case "factorial":
                    let num = operandFirst.numbersValue
                    operandFirst.numbersValue = factorialize(num);
                    actualOperator.shift();                       
                    break;
            }
        }
        if (operandFirst.isFinish==true && operandSecond.isFinish==true) {
            var operand = operandSecond.numbersValue;
            actualOperator.push(event.target.name);

            /*OPERATORS EXPECT 2 OPERANDUS -START- */
            if (event.target.name == "nthpower" || event.target.name == "nthevolution" || event.target.name == "logaritmus" || 
                thirdOprator == "nthpower" || thirdOprator == "nthevolution" || thirdOprator == "logaritmus") {
                if (event.target.name == "nthpower" || event.target.name == "nthevolution" || event.target.name == "logaritmus") {
                thirdOprator = event.target.name;
                }
                if (operandExponent.isFinish == true) {
                    switch (thirdOprator) {
                        case "nthpower":
                            operand = Math.pow(operandExponent.numbersValue, operandSecond.numbersValue);
                            actualOperator.pop();
                            actualOperator.pop();
                            actualOperator.push(event.target.name);
                            repeatWhenEquiel = event.target.name;
                            thirdOprator = [""];
                            rebootOperandExponent();
                            break;
                        case "nthevolution":
                            operand = Math.pow(operandExponent.numbersValue, 1/operandSecond.numbersValue);
                            actualOperator.pop();
                            actualOperator.pop();
                            actualOperator.push(event.target.name);
                            repeatWhenEquiel = event.target.name;
                            thirdOprator = [""];
                            rebootOperandExponent();
                            break;
                        case "logaritmus":
                            operand = Math.log(operandSecond.numbersValue) / Math.log(operandExponent.numbersValue);
                            actualOperator.pop();
                            actualOperator.pop();
                            actualOperator.push(event.target.name);
                            repeatWhenEquiel = event.target.name;
                            thirdOprator = [""];
                            rebootOperandExponent();
                            break;
                    }
                 } else {
                    operandExponent.numbersValue = operandSecond.numbersValue;
                    operandExponent.isFinish = true;
                    rebootOperandSecond();
                    return;
                }    
            }
            /*OPERATORS EXPECT 2 OPERANDUS -END- */

            if(actualOperator[1]=="square") {
                if (secondFunctions) {
                    operand = Math.pow(10,operandSecond.numbersValue);
                    secondFunctionsTurn();
                } else {
                operand = operandSecond.numbersValue * operandSecond.numbersValue;
                }
            }
            if(actualOperator[1]=="sqrt") {
                if (secondFunctions) {
                    operand = 1/operandSecond.numbersValue;
                    secondFunctionsTurn();
                } else {
                operand = Math.sqrt(operandSecond.numbersValue);
                }
            }
            if(actualOperator[1]=="sin") {
                if(unitOfMeasurement === "rad") {
                    if(secondFunctions) {
                        operand = Math.asin(operandSecond.numbersValue);
                        secondFunctionsTurn()
                    } else {
                    operand = Math.sin(operandSecond.numbersValue);
                    }
                } else {
                    if(secondFunctions) {
                        operand = Math.asin(operandSecond.numbersValue) * (180/Math.PI); // in degrees
                        secondFunctionsTurn()
                    } else {
                    operand = Math.sin(operandSecond.numbersValue * (Math.PI / 180)); // in degrees
                    }
                }
            }
            if(actualOperator[1]=="cos") {
                if(unitOfMeasurement === "rad") {
                    if(secondFunctions) {
                        operand = Math.acos(operandSecond.numbersValue);
                        secondFunctionsTurn()
                    } else {
                    operand = Math.cos(operandSecond.numbersValue);
                    }
                } else {
                    if(secondFunctions) {
                        operand = Math.acos(operandSecond.numbersValue) * (180/Math.PI); // in degrees
                        secondFunctionsTurn()
                    } else {
                    operand = Math.cos(operandSecond.numbersValue * (Math.PI / 180)); // in degrees
                    }
                }
            }
            if(actualOperator[1]=="tan") {
                if(unitOfMeasurement === "rad") {
                    if(secondFunctions) {
                        operand = Math.atan(operandSecond.numbersValue);
                        secondFunctionsTurn()
                    } else {
                    operand = Math.tan(operandSecond.numbersValue);
                    }
                } else {
                    if(secondFunctions) {
                        operand = Math.atan(operandSecond.numbersValue) * (180/Math.PI); // in degrees
                        secondFunctionsTurn()
                    } else {
                    operand = Math.tan(operandSecond.numbersValue * (Math.PI / 180)); // in degrees
                    }
                }
            }
            if(actualOperator[1]=="factorial") {
                let num = operandSecond.numbersValue
                operand = factorialize(num);
            }

            switch (actualOperator[0]) {
                case "multiplication":
                    operandFirst.numbersValue = operandFirst.numbersValue * operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "division":
                    operandFirst.numbersValue = operandFirst.numbersValue / operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "addition":
                    operandFirst.numbersValue = operandFirst.numbersValue + operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "subtraction":
                    operandFirst.numbersValue = operandFirst.numbersValue - operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "nthpower":
                    operandFirst.numbersValue = Math.pow(operandFirst.numbersValue, operand);
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "nthevolution":
                    operandFirst.numbersValue = Math.pow(operandFirst.numbersValue, 1/operand);
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "logaritmus":
                    operandFirst.numbersValue = Math.log(operand) / Math.log(operandFirst.numbersValue);
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                }
        }
        numbersString = operandFirst.numbersValue.toString();
        document.getElementById("screener-numbers").innerHTML = numberStringBreak(numbersString);
        numbersString ="";
        operandSecond.isNegative= false;
        displayErrors();
    })
}
/* ---------------------------------- EQUIAL INPUT ---------------------------------- */
var numberEquial = document.querySelectorAll(".equial");
for (const button of numberEquial) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        operandFirst.isFinish=true;
        document.getElementById("decimal-point").disabled = false;

        if(operandFirst.isFinish==true && actualOperator[0] == "equial"){
            var operand = operandSecond.numbersValue;
            switch (repeatWhenEquiel) {
                case "multiplication":
                    operandFirst.numbersValue = operandFirst.numbersValue * operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    break;
                case "division":
                    operandFirst.numbersValue = operandFirst.numbersValue / operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    break;
                case "addition":
                    operandFirst.numbersValue = operandFirst.numbersValue + operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];                   
                    break;
                case "subtraction":
                    operandFirst.numbersValue = operandFirst.numbersValue - operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];               
                    break;
                case "nthpower":
                    operandFirst.numbersValue = Math.pow(operandFirst.numbersValue, operand);
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    break;
                case "nthevolution":
                    operandFirst.numbersValue = Math.pow(operandFirst.numbersValue, 1/operand);
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    break;
                case "logaritmus":
                    operandFirst.numbersValue = Math.log(operand) / Math.log(operandFirst.numbersValue);
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    break;
            }
        }
        if (operandFirst.isFinish==true && operandSecond.isFinish==true) {
            actualOperator.push(event.target.name);
            var operand = operandSecond.numbersValue;

            /*OPERATORS EXPECT 2 OPERANDUS -START- */
            if (event.target.name == "nthpower" || event.target.name == "nthevolution" || event.target.name == "logaritmus" || thirdOprator == "nthpower" || 
                thirdOprator == "nthevolution" || thirdOprator == "logaritmus") {
                if (event.target.name == "nthpower" || event.target.name == "nthevolution" || event.target.name == "logaritmus") {
                thirdOprator = event.target.name;
                }
                if (operandExponent.isFinish == true) {
                    switch (thirdOprator) {
                        case "nthpower":
                            operand = Math.pow(operandExponent.numbersValue, operandSecond.numbersValue);
                            actualOperator.pop();
                            actualOperator.pop();
                            actualOperator.push(event.target.name);
                            repeatWhenEquiel = event.target.name;
                            thirdOprator = [""];
                            rebootOperandExponent();
                            break;
                        case "nthevolution":
                            operand = Math.pow(operandExponent.numbersValue, 1/operandSecond.numbersValue);
                            actualOperator.pop();
                            actualOperator.pop();
                            actualOperator.push(event.target.name);
                            repeatWhenEquiel = event.target.name;
                            thirdOprator = [""];
                            rebootOperandExponent();
                            break;
                        case "logaritmus":
                            operand = Math.log(operandSecond.numbersValue) / Math.log(operandExponent.numbersValue);
                            actualOperator.pop();
                            actualOperator.pop();
                            actualOperator.push(event.target.name);
                            repeatWhenEquiel = event.target.name;
                            thirdOprator = [""];
                            rebootOperandExponent();
                            break;
                    }
                 } else {
                    operandExponent.numbersValue = operandSecond.numbersValue;
                    operandExponent.isFinish = true;
                    rebootOperandSecond();
                    return;
                }    
            }
            /*OPERATORS EXPECT 2 OPERANDUS -END- */

            switch (actualOperator[0]) {
                case "multiplication":
                    operandFirst.numbersValue = operandFirst.numbersValue * operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "division":
                    operandFirst.numbersValue = operandFirst.numbersValue / operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "addition":
                    operandFirst.numbersValue = operandFirst.numbersValue + operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "subtraction":
                    operandFirst.numbersValue = operandFirst.numbersValue - operand;
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "nthpower":
                    operandFirst.numbersValue = Math.pow(operandFirst.numbersValue, operand);
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "nthevolution":
                    operandFirst.numbersValue = Math.pow(operandFirst.numbersValue, 1/operand);
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
                case "logaritmus":
                    operandFirst.numbersValue = Math.log(operand) / Math.log(operandFirst.numbersValue);
                    operandSecond.isFinish=false;
                    operandSecond.numbersArray=[];
                    actualOperator.shift();
                    break;
            }
        }
        numbersString = operandFirst.numbersValue.toString();
        document.getElementById("screener-numbers").innerHTML = numberStringBreak(numbersString);
        numbersString ="";
        displayErrors ();
        operandSecond.isNegative= false;
    })
}

document.getElementById("screener-numbers").innerHTML = operandFirst.numbersValue;



/* ---------------------------------- FUNCTIONES ---------------------------------- */

/* DISPLAY ERRORS */
function displayErrors () {
    if (actualOperator.length>2) {
        document.getElementById("screener-numbers").innerHTML = "ERROR";
        setTimeout(function(){ clearAll (); }, 3000);
    }
}

/* CLEAR ALL */
function clearAll (){
    rebootOperandSecond();
    rebootOperandFirst();
    rebootOperandExponent()
    actualOperator = [];
    actualValue = "";
    operatorScreener = "";
    repeatWhenEquiel = [];
    document.getElementById("screener-numbers").innerHTML = operandFirst.numbersValue;
    document.getElementById("screener-operator").innerHTML = operatorScreener;
    document.getElementById("decimal-point").disabled = false;
    return;
}
function rebootOperandFirst() {
    operandFirst.numbersArray= ["0"];
    operandFirst.numbersStringHystory= "";
    operandFirst.numbersValue= 0;
    operandFirst.isDecimalPoint= false;
    operandFirst.isNegative= false;
    operandFirst.isFinish= false;
}
function rebootOperandSecond() {
    operandSecond.numbersArray= ["0"];
    operandSecond.numbersStringHystory= "";
    operandSecond.numbersValue= 0;
    operandSecond.isDecimalPoint= false;
    operandSecond.isNegative= false;
    operandSecond.isFinish= false;
}
function rebootOperandExponent() {
    operandExponent.numbersArray= ["0"];
    operandExponent.numbersStringHystory= "";
    operandExponent.numbersValue= 0;
    operandExponent.isDecimalPoint= false;
    operandExponent.isNegative= false;
    operandExponent.isFinish= false;
}

/* CONSTRUCT NUMBERS TO STRING TO SCREEN -START- */
/* A szükséges vesszők számát határozza meg */
function numberOfCommas (numbersString) {
    if (numbersString.length%3>0) {
        return Math.floor(numbersString.length/3);
    } else {
        return (Math.floor(numbersString.length/3)-1);
    }
} 
/* Kijelöli az x-edik elemet, ahova beszúr egy stringet a másik stringen belül 
    Itt a pos értékét negatívnak állítottam be, mert a számok értékénél így jön ki a tagolás
*/
insert = function insert(main_string, ins_string, pos) {
    if(typeof(pos) == "undefined") {
     pos = 0;
   }
    if(typeof(ins_string) == "undefined") {
     ins_string = '';
   }
    return main_string.slice(0, -pos) + ins_string + main_string.slice(-pos);
}
/* A kapott stringben kapott intiger értéket ellátja tagoló vesszőkkel */
function putCommas (numbersString) {
        // console.log("Nagyobb, mint 3");
        let noc = numberOfCommas(numbersString);
        // console.log("noc értéke: " + noc);
        let main_string = numbersString;
        // console.log("main_string értéke: " + numbersString);
        let ins_string = ",";
        for (let i=0; i<noc; i++) {
            // console.log((3+i*3+i));
            numbersString = insert(numbersString, ins_string, (3+i*3+i));
            // console.log(numbersString);
        }
        // console.log("putCommas fv. numberStringje: "+numbersString);
        return numbersString;
}
/* Amennyiben a bevitt string érték tartalmaz matematikai jeleket (negatív, tizedespont, hatványszorzást), szétbontja őket.
    Ezután a tiszta intiger részét beviszi a putCommas fügvénybe. Miután az visszatért a tagolt intigerrel, összeépíti
    a szükséges matematikai jelekkel és visszaadja stringbe.
*/
function numberStringBreak (numbersString) {
    if (numbersString.length>3) {
    let charMinus = "";
    let charDecimalPoint = "";
    let charValueOfExponential = ""; 
    let charValeuDecimalNumbers = "";
    let indexOfExponential = "";
    let indexOfDecimalPoint = "";
    let differentNumbersLength = 0;
    let numberStringLength = numbersString.length;

    if (numbersString.indexOf(".")>-1) {
        numberStringLength = numbersString.length-1;
    }
    numbersString = Number(numbersString);
    if (numberStringLength>11) {
        numbersString = numbersString.toPrecision(10);
    } else {
    numbersString = numbersString.toPrecision(numberStringLength);
    }
    numbersString = numbersString.toString();

    if (numbersString.charAt(0)=="-") {
        charMinus = "-";
        numbersString = numbersString.slice(1);
        // console.log("Visszastringelt érték negatív jel nélkül: " + numbersString);
    }
    if (numbersString.indexOf("e")>-1) {
        indexOfExponential = numbersString.lastIndexOf("e");
        charValueOfExponential = " " + numbersString.slice(indexOfExponential);
        // console.log("Visszastringelt érték exponenciál érték: " + charValueOfExponential);
    }
    if (numbersString.indexOf(".")>-1 && numbersString.indexOf("e")>-1) {
        indexOfDecimalPoint = numbersString.indexOf(".");
        charValeuDecimalNumbers = numbersString.slice(indexOfDecimalPoint,indexOfExponential);
        // console.log("Visszastringelt érték decimálpont és exponenciál érték között: " + charValeuDecimalNumbers);
    }
    if (numbersString.indexOf(".")>-1) {
        indexOfDecimalPoint = numbersString.indexOf(".");
        charDecimalPoint = ".";
        if (numbersString.indexOf("e")==-1) {
        charValeuDecimalNumbers = numbersString.slice(indexOfDecimalPoint);
        while (charValeuDecimalNumbers.slice(-1)=="0") {
            charValeuDecimalNumbers = numbersString.slice(indexOfDecimalPoint, charValeuDecimalNumbers.length);
        }
        }
        numbersString = numbersString.slice(0,indexOfDecimalPoint);
        // console.log("Visszastringelt érték intiger érték: " + numbersString);
    }
    numbersString = putCommas(numbersString);
    
    // console.log("Végeredmény vissza stringelve: " + charMinus + numbersString + charValeuDecimalNumbers + charValueOfExponential);
    return numbersString = (charMinus + numbersString + charValeuDecimalNumbers + charValueOfExponential);

} else {
    return numbersString;
}
}
/* CONSTRUNCT NUMBERS TO STRING TO SCREEN -END- */

/* FACTORIAL FUNCTION -START- */
function factorialize(num) {
    if (num>170) {
        document.getElementById("screener-numbers").innerHTML = "Infinity number";
        setTimeout(function(){ clearAll(); }, 1000);
    }
    else if (num < 0) {
        document.getElementById("screener-numbers").innerHTML = "Infinity";
        setTimeout(function(){ clearAll(); }, 1000);
    }
    else if (num == 0) 
        return 1;
    else {
        return (num * factorialize(num - 1));
    }
  }
/* FACTORIAL FUNCTION -END- */


/* MEMORY FUNCTION -START- */
function memoryPlus() {
    operandMemorize.numbersArray = operandFirst.numbersArray;
    operandMemorize.numbersStringHystory = operandFirst.numbersStringHystory;
    operandMemorize.numbersValue = operandFirst.numbersValue;
    operandMemorize.isDecimalPoint = operandFirst.isDecimalPoint;
    operandMemorize.isNegative = operandFirst.isNegative;
    operandMemorize.isFinish = operandFirst.isFinish;
}
function memoryReadToFirstNumber() {
    operandFirst.numbersArray = operandMemorize.numbersArray;
    operandFirst.numbersStringHystory = operandMemorize.numbersStringHystory;
    operandFirst.numbersValue = operandMemorize.numbersValue;
    operandFirst.isDecimalPoint = operandMemorize.isDecimalPoint;
    operandFirst.isNegative = operandMemorize.isNegative;
    operandFirst.isFinish = operandMemorize.isFinish;
}
function memoryReadToSecondNumber() {
    operandSecond.numbersArray = operandMemorize.numbersArray;
    operandSecond.numbersStringHystory = operandMemorize.numbersStringHystory;
    operandSecond.numbersValue = operandMemorize.numbersValue;
    operandSecond.isDecimalPoint = operandMemorize.isDecimalPoint;
    operandSecond.isNegative = operandMemorize.isNegative;
    operandSecond.isFinish = operandMemorize.isFinish;
}
function memoryClear() {
    operandMemorize.numbersArray = ["0"];
    operandMemorize.numbersStringHystory = "";
    operandMemorize.numbersValue = 0;
    operandMemorize.isDecimalPoint = false;
    operandMemorize.isNegative = false;
    operandMemorize.isFinish = false;
}
/* MEMORY FUNCTION -END- */

/* SECOND FUNCTION -START- */
function secondFunctionsTurn() {
    var x = document.getElementById('second-functions-button');
    let y = document.getElementsByClassName("buttons-second-class-sec-function");
    
    if (x.style.visibility === "hidden") {
      x.style.visibility = 'visible';
      for(const masod of y) {
        masod.style.fontWeight ="bold";
        masod.style.color ="#FFA500";
        }
      secondFunctions = true;

    } else {
      x.style.visibility = 'hidden';
      for(const masod of y) {
        masod.style.fontWeight = "";
        masod.style.color ="";
        }
      secondFunctions = false;
    }
    //console.log(x);
}
  /* SECOND FUNCTION -END- */

/* MEMORY FUNCTION DISPLAY ON SCREEN -START */
function memoryFunctionsScreen() {
    var x = document.getElementById('memory-function');
    if (x.style.visibility === "hidden") {
      x.style.visibility = 'visible';
    }
  }
/* MEMORY FUNCTION DISPLAY ON SCREEN -END */


