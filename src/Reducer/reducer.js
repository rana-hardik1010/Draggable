const initial={data:[]};
const reducer = (state=initial,action) =>{

    switch(action.type)
    {
        case 'GET_DATA':
            return({...state,
                data:action.payload
            });
        
        case 'ADD_DATA':
            console.log(action.payload,"add reducer")
            console.log(state.data,"state reducer")

            return({
                ...state.data,
                todo: {
                    title: "Todo",
                    items: [
                      {
                        id: action.payload.id,
                        name: action.payload.name
                      },
                      ...state.data.todo.items
                    ]
                  }
            });

        default:
            return state;
            break;
    }
}

export default reducer;