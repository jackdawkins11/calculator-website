'use strict';

function CalculatorScreen(props){
  return (
    <div className="calculator-top">
    {props.screenValue}
    </div>
  );
}

function CalculatorButton(props){
  return (
    <div className="calculator-button-wrapper">
      <div className="calculator-button">
        {props.calculatorButtonValue}
      </div>
    </div>
  );
}

function CalculatorEqualButton(props){
  return (
    <div className="calculator-button-wrapper equal-button-wrapper">
      <div className="calculator-button equal-button">
        {props.calculatorButtonValue}
      </div>
    </div>
  );
}

/* Buttons on calculator. Stored as [ column1, column2, column3, column4 ] */
let calculatorButtonValues =
  [ ['+', '7', '4', '1', '0'],
    ['-', '8', '5', '2', '.' ],
    ['*', '9', '6', '3', 'c' ],
    ['%', '='] ];

function Calculator(props){
  let columns = [];
  //Add the first 3 columns
  for( let c=0; c < 3; c++ ){
    let column = [];
    for( let r=0; r < 5; r++ ){
      column.push(
        <CalculatorButton
        calculatorButtonValue={calculatorButtonValues[c][r]} />
        );
    }
    columns.push( <div className="calculator-column">{column}</div> );
  }
  //Add the last column
  let column = [
      <CalculatorButton 
      calculatorButtonValue={calculatorButtonValues[3][0]} />,
      <CalculatorEqualButton
      calculatorButtonValue={calculatorButtonValues[3][1]} />
    ];
  columns.push( <div className="calculator-column">{column}</div> );
  return (
    <div className="calculator">
      <CalculatorScreen screenValue={props.screenValue} />
      <div className="calculator-bottom">
        {columns}
      </div>
    </div>
  );
}

function Simple(props){
  return (
    <div>Hello world</div>
  );
}

ReactDOM.render(<Calculator screenValue={0}/>, document.getElementById("root"));
//ReactDOM.render(<Simple/>, document.getElementById("root"));
