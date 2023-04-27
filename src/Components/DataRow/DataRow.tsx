import React from 'react';
import {userInterface,UserObject} from '../../features/userSlice'

import { removeUser } from '../../features/userSlice';
import {useDispatch} from 'react-redux';
import {RootState,AppDispatch} from "../../app/store";

import { BiTrash,BiEditAlt } from "react-icons/bi";

interface DataRowProps{
    user : userInterface 
    setSelected:React.Dispatch<React.SetStateAction<UserObject>>
    selected:boolean


}
const DataRow = ({user,setSelected,selected}:DataRowProps) =>{
    //Defining the Dispatch for redux
    const dispatch = useDispatch<AppDispatch>();

    //Destructureing the user object
    const {id,name,email,role} = user;

    //Function to handle checkbox state change
    const handleCheckBoxChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        event.stopPropagation();
        let checkStatus:boolean = event.target.checked;
        if(checkStatus == true){
            setSelected((state)=> {
                return {...state, [id]:user}
            })
        }
        else if(checkStatus == false){
            setSelected(state=>{
                let resState = JSON.parse(JSON.stringify(state))
                delete resState[id];
                return resState;
            })
        }
    }

    //Function to handle delete Button Click
    const handleSingleDeleteClick = (e:React.MouseEvent<HTMLDivElement>)=>{
        // logic to remove the user
        dispatch(removeUser(id));
    }
    
    return (
        
            <div className='table-row'>
                <div>{id}</div>
                <div className="table-cell Selected"><input type="checkbox" checked={selected} onChange={handleCheckBoxChange}/></div>
                <div className="table-cell name">{name}</div>
                <div className="table-cell email">{email}</div>
                <div className="table-cell role">{role}</div>
                <div className="table-cell edit-action"><BiEditAlt/></div>
                <div className="table-cell delete-action" onClick={handleSingleDeleteClick}><BiTrash color="red"/></div>
            </div>
        
    )
}


export default DataRow;