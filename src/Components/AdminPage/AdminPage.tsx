import React,{useState,useEffect} from 'react';

import { getUsers, userSlice } from '../../features/userSlice';


//Components
import SearchBar from '../SearchBar';
import DataTable from '../DataTable';

//Redux Related 
import { userInterface , UserObject} from '../../features/userSlice';
import { useSelector,useDispatch} from 'react-redux';
import {RootState,AppDispatch} from "../../app/store";

/**
 * Component for Search Bar
 * @component
 * 
 */
const AdminPage = () =>{

    const dispatch = useDispatch<AppDispatch>();
    const allUsers = useSelector((state:RootState)=>state.users.users)

    //This state will be used to store the string input by the user and can be used to filter the choices in the table
    const [searchString,setSearchString] = useState<string>("")

    //This state will be used to hold the users that have been filtered
    const [filtered,setFiltered] = useState<UserObject>(allUsers)

    //this state will be used to store the current 
    const [pageNo,setPageNo] = useState<number>(1)

    //thiss

    
    
    useEffect(()=>{
        dispatch(getUsers())
    },[])

    useEffect(()=>{
        
        if(searchString===""){
            // console.log("yes")
            setFiltered(allUsers)
        }
        else{
            console.log(typeof allUsers)
            ///// Logic to 
            // setFiltered(allUsers.filter((user)=>{
            //     if(user.name.includes(searchString) || user.email.includes(searchString) || user.role.includes(searchString)){
            //         return user
            //     }
            // }))
        }
    },[searchString,allUsers,[]])
    
    useEffect(()=>{
        // console.log(filtered)
    },[filtered])

    return(
        <div className="admin-page">
            <SearchBar {...{searchString,setSearchString}}/>
            <DataTable showUsers = {filtered} />
        </div>
    )
}

export default AdminPage;