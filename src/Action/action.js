import * as type from "./type";

export function getData(data)
{
    return{
        type:type.GET_DATA,
        payload:data
    }
}

export function addData(data)
{
    console.log(data,"add action")
    return{
        type:type.ADD_DATA,
        payload:data
    }
}