import React, {useState,useEffect} from 'react';
import './design.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { getData,addData } from '../Action/action';

function Add() {
    
  // let storeData = useSelector((state) => state.reducer.data);
  const dispatch = useDispatch();

  // console.log(storeData,"store")

  const [text, setText] = useState("")
  const [checkinpt,setCheckinpt] = useState(false)
  const [isEdit,setIsEdit] = useState(false)
  const [editData,setEditData] = useState([])
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: []
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  function getdata()
  {
      dispatch(getData(state));     
  }

  useEffect(()=>{
    // getdata();
  },[state])

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      prev[source.droppableId].items.splice(source.index, 1)

      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const addItem = () => {
    if(text==="")
    {
      setCheckinpt(true);
      return;
    }
    else{
      setCheckinpt(false);
    }
    
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      }
    })
      
    setText("")
  }

const deletetodo = (deletedata) =>{
   
  _.map(state,(data) => {
    if(data.items.includes(deletedata))
    {
      var index = data.items.indexOf(deletedata);
      data.items.splice(index, 1);
    }  
  })

  console.log(state,"delete state")
  setState(state);
}

const edittodo = (data) =>{
  setText(data.name);
  setEditData(data);
  setIsEdit(true);
}

const EditItem = () =>{
  
    _.map(state,(data) => {
      
          data.items.map((elem,index)=>{
            if(elem.id === editData.id)
            {
              return  { ...elem, name: text };
              // console.log(newdata,"newdata",index)
            }
            else{
              return elem;
              // console.log(elem,"old Data",index)
            }
          })
    }
  )
  
  setIsEdit(false);
  setText("")
  console.log(state,"new edit state")
}

  return (
    <>
      <div className="raw">
        <input type="text" className="form-control mt-3 mb-2" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter Task"/>
        {
          checkinpt
          ?
            <p className="text-danger">Please, Enter Task</p>
          :
            null
        }
        {
          isEdit
          ?
            <button className="btn btn-primary mt-2" onClick={EditItem}>Edit Task</button>
          :
            <button className="btn btn-primary mt-2" onClick={addItem}>Add Task</button>
        }
      </div> 
      <br/>
      <hr/>
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={`column${key}`}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`droppable-col-${key}`}
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              return(
                                <div
                               className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                  <DeleteIcon className='float-right ml-4' onClick={()=>deletetodo(el)}/>
                                  <EditIcon className='float-right'onClick={()=>edittodo(el)}/>
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
    </>
  );
}

export default Add;
