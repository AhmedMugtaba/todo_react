import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';

const APIURL = '/api/todos/'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos: []
        }
    }
    
    componentWillMount(){
        this.loadTodos();
    }
    
    async loadTodos()  {
        let todos = await apiCalls.getTodos();
        this.setState({todos});
    }
    
    addTodo = (val) => {
        fetch(APIURL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({name: val})
        })
            .then(resp => {
              if(!resp.ok) {
                if(resp.status >=400 && resp.status < 500) {
                  return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                  })
                } else {
                  let err = {errorMessage: 'Please try again later, server is not responding'};
                  throw err;
                }
              }
              return resp.json(); 
        })
        .then(newTodo => {
            this.setState({todos: [...this.state.todos, newTodo]})
        });
    }
    
    deleteTodo = (id) => {
        const deleteUrl = APIURL + id;
        fetch(deleteUrl, {
            method: 'delete'
        })
         .then(resp => {
              if(!resp.ok) {
                if(resp.status >=400 && resp.status < 500) {
                  return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                  })
                } else {
                  let err = {errorMessage: 'Please try again later, server is not responding'};
                  throw err;
                }
              }
              return resp.json(); 
        })
        .then(() => {
            const todos = this.state.todos.filter((todo => todo._id !== id))
            this.setState({todos: todos});
        });
    }
    
    toggleTodo = (todo) => {
        const updateUrl = APIURL + todo._id;
        fetch(updateUrl, {
            method: 'put',
            body: JSON.stringify({completed: !todo.completed})
        })
         .then(resp => {
              if(!resp.ok) {
                if(resp.status >=400 && resp.status < 500) {
                  return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                  })
                } else {
                  let err = {errorMessage: 'Please try again later, server is not responding'};
                  throw err;
                }
              }
              return resp.json(); 
        })
        .then(updatedTodo => {
            const todos = this.state.todos.map((t) => (t._id === updatedTodo._id) ? {...t, completed: !t.completed} : t 
            )
        this.setState({todos: todos});
        });
    }

    render() {
    
    const todos = this.state.todos.map((t) => (
        <TodoItem 
            key={t._id}
            {...t}
            onDelete={this.deleteTodo.bind(this, t._id)}
            onToggle = {this.toggleTodo.bind(this, t)}         
        />
    ));
    return (
      <div className="App">
        <TodoList />
        <TodoForm addTodo = {this.addTodo}/>
        <ul>
            {todos}  
        </ul>
      </div>
    );
  }
}

export default App;
