import React, { Component} from 'react';

class TodoForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {inputValue: ''}
//        this.handleChange = this.handleChange;
    }
    
    handleChange = (e) => {
        this.setState(
            {
            inputValue: e.target.value
            })
    }
    
    handleSubmit = () => {
       this.props.addTodo(this.state.inputValue);
    }
    
    render(){
       return(
        <div>
        <input type='text' 
                value= {this.state.inputValue} 
                onChange={this.handleChange}/>
        <button
        onClick={this.handleSubmit}
        >Add to do</button>
        </div>
       ) 
    }
}

export default TodoForm;