import React, { useState } from 'react';

import {useSelector,useDispatch} from "react-redux";
import {RootState,AppDispatch} from "../../app/store";
import {increase,increaseMore,decrease } from "../../features/counterSlice"
import {getUsers} from "../../features/userSlice";
interface SearchBarProps{
    searchString:string,
    setSearchString:React.Dispatch<React.SetStateAction<string>>
}
/**
 * Component for Search Bar
 * @component
 * 
 */
const SearchBar = ({searchString,setSearchString}:SearchBarProps) =>{
    const dispatch = useDispatch<AppDispatch>();
    const counter = useSelector((state:RootState)=>state.counter.count)
    const users = useSelector((state:RootState)=>state.users)
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        let string = event.target.value;
        setSearchString(string)
    }

    
    return (
        <div className="search-bar">
            <input onChange={handleChange} value={searchString}/>
        </div>
    )
}

export default SearchBar;