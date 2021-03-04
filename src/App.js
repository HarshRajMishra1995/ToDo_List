import React from 'react';

import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.sortItem = this.sortItem.bind(this);
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  //function for deleting the items
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
//function for sorting the list items depending upon their key values
  sortItem(key){
    var sortItems= this.state.items;
      for(let i=0;i<=sortItems.length;i++)
      {
          for(let j=0;j<=sortItems.length;j++)
          {
              if(sortItems[j]<=sortItems[j+1])
              {
                  let temp=sortItems[j];
                  sortItems[j]=sortItems[j+1];
                  sortItems[j+1]=temp;
                  
  
              }
          }
      }
     // console.log(sortItems) //This line is for debugging purposes

    this.setState({
      items: sortItems
    })

  }

  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }
 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem} >
          <input type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">Add</button>
          
        </form>
        <p>{this.state.items.text}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
          <button 
          type="submit" onClick={this.sortItem}>Sort</button>
      </header>
    </div>
  );
 }
}


export default App;
