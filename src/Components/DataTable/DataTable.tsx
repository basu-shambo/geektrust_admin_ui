import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {RootState,AppDispatch} from "../../app/store";

import DataRow from '../DataRow';

import {UserObject} from "../../features/userSlice"

interface DataTableProps {
    showUsers : UserObject
}
const DataTable = ({showUsers}:DataTableProps) =>{
    //This state will hold all the users that have been selected
    const [selected,setSelected] = useState<Set<string>>(new Set<string>)

    useEffect(()=>{
        console.log(selected)
    },[selected])
    return (
        <div className="table min-w-max w-auto">
            {
                Object.keys(showUsers).map((userId:string,index:number)=>{
                    return <DataRow key={index} user={showUsers[userId]} setSelected={setSelected}/>
                })
            }
        </div>
    )
}

export default DataTable;