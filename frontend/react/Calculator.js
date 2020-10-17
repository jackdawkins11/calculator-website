'use strict';

function CalculatorScreen(props) {
  return (
    <div className="calculator-top">
      {props.screenValue}
    </div>
  );
}

function CalculatorButton(props) {
  return (
    <div className="calculator-button"
      onClick={props.onClick} >
      {props.calculatorButtonValue}
    </div>
  );
}

function CalculatorEqualButton(props) {
  return (
    <div className="calculator-button equal-button"
      onClick={props.onClick} >
      {props.calculatorButtonValue}
    </div>
  );
}

/* Buttons on calculator. Stored as [ column1, column2, column3, column4 ] */
let calculatorButtonValues =
  [['+', '7', '4', '1', '0'],
  ['-', '8', '5', '2', '.'],
  ['*', '9', '6', '3', 'c'],
  ['/', '=']];

function CalculatorRender(props) {
  let columns = [];
  //Add the first 3 columns
  for (let c = 0; c < 3; c++) {
    let column = [];
    for (let r = 0; r < 5; r++) {
      let button = calculatorButtonValues[c][r];
      column.push(
        <CalculatorButton
          key={button}
          calculatorButtonValue={button}
          onClick={() => props.buttonClick(button)} />
      );
    }
    columns.push(<div className="calculator-column" key={c}>{column}</div>);
  }
  //Add the last column
  let buttons = [calculatorButtonValues[3][0], calculatorButtonValues[3][1]];
  let column = [
    <CalculatorButton
      key={buttons[0]}
      calculatorButtonValue={buttons[0]}
      onClick={() => props.buttonClick(buttons[0])} />,
    <CalculatorEqualButton
      key={buttons[1]}
      calculatorButtonValue={buttons[1]}
      onClick={() => props.buttonClick(buttons[1])} />
  ];
  columns.push(<div className="calculator-column" key={3}>{column}</div>);
  return (
    <div className="calculator">
      <CalculatorScreen screenValue={props.screenValue} />
      <div className="calculator-bottom">
        {columns}
      </div>
    </div>
  );
}

/*
Calculator class.
It keeps track of its state with the 'inputs' array.

len( inputs ) == 0  ==>  Waiting for first number
len( inputs ) == 1  ==>  In the process of entering the first number
len( inputs ) == 2  ==>  The first number and the operation have been entered
len( inputs ) == 3  ==>  Entering the second number

Digits and '.' can be entered in all 4 states. Ops can only
be entered in state 1. '=' can only be entered in state 3. 'c'
can be entered anytime.

*/

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 0
    };
    this.inputs = [];
    this.MAXSCREENDIGITS = 10;
  }

  /*
  Takes as input the character entered and updates state
  */
  buttonPushed(button) {
    let inputStep = this.inputs.length;
    if (isDigit(button)) {
      if (inputStep === 0) {
        //Update the inputs array
        this.inputs.push(button);
        //update the screen
        this.setState({ screen: this.inputs[0] });
      } else if (inputStep === 1) {
        //Update inputs array
        this.inputs[0] += button;
        //update the screen
        this.setState({ screen: this.inputs[0] });
      } else if (inputStep === 2) {
        //Update inputs array
        this.inputs.push(button);
        //update the screen
        this.setState({ screen: this.inputs[2] });
      } else if (inputStep === 3) {
        //Update inputs array
        this.inputs[2] += button;
        //update the screen
        this.setState({ screen: this.inputs[2] });
      }
    } else if (isDecPoint(button)) {
      if (inputStep === 0) {
        //Update the inputs array
        this.inputs.push(button);
        //update the screen
        this.setState({ screen: this.inputs[0] });
      } else if (inputStep === 1 && !this.inputs[0].includes('.')) {
        //Update inputs array
        this.inputs[0] += button;
        //update the screen
        this.setState({ screen: this.inputs[0] });
      } else if (inputStep === 2) {
        //Update inputs array
        this.inputs.push(button);
        //update the screen
        this.setState({ screen: this.inputs[2] });
      } else if (inputStep === 3 && !this.inputs[2].includes('.')) {
        //Update inputs array
        this.inputs[2] += button;
        //update the screen
        this.setState({ screen: this.inputs[2] });
      }
    } else if (isOp(button)) {
      if (inputStep === 1) {
        //Update inputs array
        this.inputs.push(button);
      }
    } else if (isEqu(button)) {
      if (inputStep === 3) {
        let calculation = doCalculation(this.inputs).toPrecision(this.MAXSCREENDIGITS);
        this.postCalculation( this.inputs, calculation );
        //update inputs array
        this.inputs = [];
        //update the screen
        this.setState({ screen: calculation });
      }
    } else if (isClear(button)) {
      this.inputs = [];
      //update the screen
      this.setState({ screen: 0 });
    }
  }

  postCalculation(inputs, output) {
    let x = String(inputs[0]),
      op = inputs[1],
      y = String(inputs[2]),
      val = String(output),
      date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let calculation = new URLSearchParams();
    calculation.append("x", x);
    calculation.append("op", op);
    calculation.append("y", y);
    calculation.append("val", val);
    calculation.append("date", date);
    fetch("../backend/addCalculation.php", {
      method: "POST",
      body: calculation
    }).then((response) => response.json())
      .then(result => {
        if (!result.error) {
          //do something
        } else {
          this.error("There was an error");
        }
      }).catch((reason) => {
        this.error("There was an error " + reason );
      });
  }
  error( message ){
    console.log( message );
  }

  render() {
    return <CalculatorRender
      screenValue={this.state.screen}
      buttonClick={(c) => this.buttonPushed(c)} />
  }

}

function isDigit(str) {
  return str.length === 1 && /[0-9]/.test(str);
}

function isDecPoint(str) {
  return str === '.';
}

function isOp(str) {
  return str.length === 1 && "+-*/".includes(str);
}

function isEqu(str) {
  return str === '=';
}

function isClear(str) {
  return str === 'c';
}

function doCalculation(inputs) {
  let op = inputs[1];
  let x = parseFloat(inputs[0]);
  let y = parseFloat(inputs[2]);
  if (op === '+') {
    return x + y;
  } else if (op === '-') {
    return x - y;
  } else if (op === '*') {
    return x * y;
  } else if (op === '/') {
    return x / y;
  }
}

export { Calculator };