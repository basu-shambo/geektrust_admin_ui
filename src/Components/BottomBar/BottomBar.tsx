import React from 'react';


//
// import { CgPushChevronLeftR,CgPushChevronRightR, CgChevronLeftR, CgChevronRightR } from "react-icons/cg";

//Components
import PageSelector from '../PageSelector';

import { PageInformation } from '../AdminPage/AdminPage';

//Redux Related Imports             
import { removeUser,UserObject } from '../../features/userSlice';
import {useDispatch} from 'react-redux';
import {RootState,AppDispatch} from "../../app/store";



interface BottomBarProps{
    selected:UserObject,
    setSelected:React.Dispatch<React.SetStateAction<UserObject>>
    pageInfo:PageInformation
    setPageInfo:React.Dispatch<React.SetStateAction<PageInformation>>
}
const BottomBar = ({selected,setSelected,pageInfo,setPageInfo}:BottomBarProps) => {

    //Defining the Dispatch for redux
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteClick = (e:React.MouseEvent<HTMLButtonElement>) =>{
        console.log("delete")
        for( let id in selected ){
            dispatch(removeUser(id))
        }
        setSelected({})
    }

    const selectedLength = Object.keys(selected).length

    return(
        <div className="bottom-bar">
            <button 
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${selectedLength?"":"opacity-50 cursor-not-allowed"} `} 
                type="button" 
                onClick={handleDeleteClick} 
                disabled={selectedLength>=1?false:true}>
                    Delete Selected
            </button>
            <PageSelector {...{pageInfo,setPageInfo}}/>
            
        </div>
    )
}

export default BottomBar;