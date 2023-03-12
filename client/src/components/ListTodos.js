import React, { Component } from 'react'
import TodoItem from './TodoItem'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {fetch_actions} from '../actions';

class ListTodos extends Component {
  componentDidMount(){
      this.props.fetchActions();
  }  
  render() {
      let {actions} = this.props.todos;
      if(actions && actions.length >= 1) {

        return actions.map(act => <TodoItem key={act._id} id={act._id} text={act.action} />);
      } else {
        return <div>No todos found</div>
      }
  }
}

const mapStateToProps  = state => ({
    todos: state.todos
});

const mapDispatchToProps  = dispatch => {
    return bindActionCreators({fetchActions: fetch_actions},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListTodos);