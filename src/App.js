import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MentalMathBoardGame from './MentalMathBoardGame';


class App extends Component {  
  /**
   * Gera um novo termo da soma
   */
  generateValue = () => Math.floor(Math.random() * 100)

  /**
   * Gera o dado para ser armazenado na variável de estado
   */
  generateNewData = () => (
    {
      value1 : this.generateValue(),
      value2 : this.generateValue(),
      value3 : this.generateValue(),
      secretValue: Math.floor(Math.random() * 3),
      proposedAnswer : function() { return this.secretValue + this.value1 + this.value2 + this.value3 } ,
      numQuestions : 0,
      numCorrect : 0
    }
  )
  
  state = this.generateNewData();
  
  /**
   * Soma as respostas corretas
   */
  sumCorrectAnswer = (answer, currentState) => {    
    /** realiza a soma do termos */
    const sum = currentState.value1 + currentState.value2 + currentState.value3
    /** verifica se a resposta proposta é igual à soma */
    const equal = currentState.proposedAnswer() === sum;
    /**
     * Se a resposta dada pelo usuário for equivalente à condição dada pela resposta proposta, 
     * será retornado o valor 1 que será somado com a qtde de respostas corretas
     */
    const numCorrect = currentState.numCorrect + (answer === equal ? 1 : 0);    
    return numCorrect;
  }
 
  /**
   * Valida a resposta dada como verdadeira
   */
  validateTrueAnswer = () => this.validateAnswer(true)

  /**
   * Valida a resposta dada como false
   */
  validateFalseAnswer = () => this.validateAnswer(false)  

  /**
   * Valida a resposta dada pelo usuário
   */
  validateAnswer = (answer) => {    
    this.setState((currentState) => {
      const newData = this.generateNewData();
      newData.numQuestions = currentState.numQuestions + 1;
      newData.numCorrect = this.sumCorrectAnswer(answer, currentState);
      return newData;
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <MentalMathBoardGame 
          validateTrueAnswer={this.validateTrueAnswer}
          validateFalseAnswer={this.validateFalseAnswer}
          value1={this.state.value1} 
          value2={this.state.value2} 
          value3={this.state.value3} 
          proposedAnswer={this.state.proposedAnswer()} 
          numQuestions={this.state.numQuestions} 
          numCorrect={this.state.numCorrect} 
        />
        <footer className="App-footer">Milsonei dos Santos Cardoso - 19/11/2018</footer>
      </div>
    );
  }
}

export default App;
