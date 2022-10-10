import React, {useEffect, useState} from 'react';
import {userInterface} from '../../features/userSlice'


import { BiTrash,BiEditAlt } from "react-icons/bi";

interface DataRowProps{
    user : userInterface 
    header?:boolean
    setSelected :React.Dispatch<React.SetStateAction<Set<string>>>

}
const DataRow = ({user,setSelected}:DataRowProps) =>{
    //This state will store the store the check state
    const [checkState,setCheckState] = useState<boolean>(false);
    const {id,name,email,role} = user;
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setCheckState(event.target.checked)
    }
    useEffect(()=>{
        if(checkState == true){
            setSelected((state:Set<string>)=>{
                const res = state;
                res.add(id);
                return res;
            })
        }
        else {
            setSelected((state:Set<string>)=>{
                const res = state;
                if(res.has(id)){
                    res.delete(id);
                }
                return res;
            })
        }
    },[checkState])
    return (
        <div className="table-row-group">
            <div className='table-row'>
                <div className="table-cell Selected"><input type="checkbox" checked={checkState} onChange={handleChange}/></div>
                <div className="table-cell name">{name}</div>
                <div className="table-cell email">{email}</div>
                <div className="table-cell role">{role}</div>
                <div className="table-cell edit-action"><BiEditAlt/></div>
                <div className="table-cell delete-action"><BiTrash color="red"/></div>
            </div>
        </div>
    )
}


export default DataRow;