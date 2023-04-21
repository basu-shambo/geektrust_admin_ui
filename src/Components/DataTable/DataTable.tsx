import React from 'react';
import { useSelector } from 'react-redux';
import {RootState,AppDispatch} from "../../app/store";

import DataRow from '../DataRow';

import {UserObject} from "../../features/userSlice"

interface DataTableProps {
    showUsers : UserObject,
    setSelected:React.Dispatch<React.SetStateAction<UserObject>>
    selected:UserObject
}
const DataTable = ({showUsers,setSelected,selected}:DataTableProps) =>{

    return (
        <div className="table min-w-max w-auto">
            {
                Object.keys(showUsers).map((userId:string,index:number)=>{
                    return <DataRow key={index} user={showUsers[userId]} setSelected={setSelected} selected={userId in selected?true:false}/>
                })
            }
        </div>
    )
}

export default DataTable;