import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {RootState,AppDispatch} from "../../app/store";

import DataRow from '../DataRow';

import {userInterface} from "../../features/userSlice"

interface DataTableProps {
    showUsers : userInterface[]
}
const DataTable = ({showUsers}:DataTableProps) =>{
    //This state will hold all the users that have been selected
    const [selected,setSelected] = useState<string[]>()
    return (
        <div className="table min-w-max w-auto">
            {
                showUsers.map((user,index)=><DataRow user={user} key={index} setSelected={setSelected}/>)
            }
        </div>
    )
}

export default DataTable;