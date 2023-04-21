import React,{useState,useEffect} from 'react';

import { getUsers, userSlice } from '../../features/userSlice';


//Components
import SearchBar from '../SearchBar';
import DataTable from '../DataTable';
import BottomBar from "../BottomBar";

//Redux Related 
import { userInterface , UserObject} from '../../features/userSlice';
import { useSelector,useDispatch} from 'react-redux';
import {RootState,AppDispatch} from "../../app/store";

import {filterUsers,pageUsers} from './filterUsers'
import { showData } from '../SearchBar/showData';

/**
 * Component for Search Bar
 * @component  
 * 
 */
export type PageInformation={
    currentPage:number,
    totalPages:number
}

const AdminPage = () =>{

    const dispatch = useDispatch<AppDispatch>();
    const allUsers = useSelector((state:RootState)=>state.users.users)

    //This state will be used to store the string input by the user and can be used to filter the choices in the table
    const [searchString,setSearchString] = useState<string>("")

    //This state will be used to hold the users that have been filtered
    const [filtered,setFiltered] = useState<UserObject>(allUsers)

    //this state will be used to store the current
    const [pageInfo,setPageInfo] = useState<PageInformation>({totalPages:1,currentPage:1})
    const singlePageLength:number = 10;

    //this state will store the list of selected items
    const [selected,setSelected] = useState<UserObject>({})

    //this state will store the actual data to be shown to the user based on the filtered and pageNo
    const [toShow,setToShow] = useState<UserObject>(allUsers)
    
    //Getting the users on first load of the AdminPage
    useEffect(()=>{
        dispatch(getUsers())
    },[])

    //This use effect will used to change the filtered state based on the search string
    useEffect(()=>{
        
        if(searchString===""){
            // console.log("yes")
            setFiltered(allUsers)
            const numberOfPages:number = Math.ceil(Object.keys(allUsers).length/singlePageLength)
            // console.log(Object.keys(allUsers).length,numberOfPages)
            setPageInfo({...pageInfo,totalPages:numberOfPages})
        }
        else{
            const filteredUsers = filterUsers(allUsers,searchString)
            setFiltered(filteredUsers)
            const numberOfPages:number = Math.ceil(Object.keys(filteredUsers).length/singlePageLength)
            // console.log(Object.keys(filteredUsers).length,numberOfPages)
            setPageInfo({...pageInfo,totalPages:numberOfPages})
            
        }
    },[searchString,allUsers])
    
    //This use effect will change the toShow state based on the filtered state and the page no
    useEffect(()=>{
        const {currentPage} = pageInfo;
        const pageShowUsers = pageUsers(filtered,currentPage,singlePageLength)
        // console.log(pageShowUsers)
        setToShow(pageShowUsers)

    },[filtered])   

    return(
        <div className="admin-page">
            <SearchBar {...{searchString,setSearchString}}/>
            <DataTable showUsers = {toShow} setSelected={setSelected} selected={selected}/>
            <BottomBar selected={selected} setSelected={setSelected} pageInfo={pageInfo} setPageInfo={setPageInfo}/>
        </div>
    )
}

export default AdminPage;