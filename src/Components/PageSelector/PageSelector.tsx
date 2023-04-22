import React from "react";

//Icons
import { BiChevronLeft,BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

import { PageInformation } from "../AdminPage/AdminPage"
import PageChangeButton from "../PageChangeButton"
import { IconType } from 'react-icons/lib';

interface PageSelectorProps{
    pageInfo:PageInformation
    setPageInfo:React.Dispatch<React.SetStateAction<PageInformation>>
}
const PageSelector = ({pageInfo,setPageInfo}:PageSelectorProps) =>{

    const navigationButtonClickHandler=(e:any)=>{
        e.stopPropagation()
        const buttonClickedId:string = e.target.id;
        // console.log(buttonClickedId)
        let currPage:number = 0;
        switch (buttonClickedId){
            case "first":
                currPage = 1;
                break;
            case "prev":
                currPage = pageInfo.currentPage == 1?pageInfo.currentPage:pageInfo.currentPage-1;
                break;
            case "next":
                currPage = pageInfo.currentPage == pageInfo.totalPages?pageInfo.currentPage:pageInfo.currentPage+1;
                break;
            case "last":
                currPage = pageInfo.totalPages;
                break;
            default:
                if(buttonClickedId.startsWith("number_button_")){
                    const split_id = buttonClickedId.split('_')
                    const pageNumberClicked:number  = parseInt(buttonClickedId[buttonClickedId.length-1])
                    // console.log(pageNumberClicked)
                    currPage = pageNumberClicked
                }
        }
        // console.log(currPage)
        setPageInfo({...pageInfo,currentPage:currPage})
    }
    // const icon:IconType = React.createElement()
    const {currentPage,totalPages} = pageInfo;

    return(
        <div className="PageSelector" id="pageSelector">
            {/* This is used to goto the first page */}
            <PageChangeButton icon={BiChevronsLeft} id="first" disabled={currentPage === 1} clickHandler={navigationButtonClickHandler}/>

            {/* This is used to for the previous page */}
            <PageChangeButton icon={BiChevronLeft} id="prev"  disabled={currentPage === 1} clickHandler={navigationButtonClickHandler}/> 

            {/* This is used for creating the numbered button at the bottom of the page */}
            {
                [...Array(totalPages)].map((e,i)=>{
                    const num  = (i+1).toString();
                    const id_string = `number_button_${num}`;
                    return <PageChangeButton text={num} id={id_string} disabled={false} clickHandler={navigationButtonClickHandler} key={i}/>
                    
                })
                // <button type="button" id={`page_button_${i}`} key={i} value={i+1} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">{i+1}</button>)
            }

            {/* This is used for the next page */}
            <PageChangeButton icon={BiChevronRight} id="next" disabled={currentPage === totalPages} clickHandler={navigationButtonClickHandler}/>

            {/* This is used to goto the last page */}
            <PageChangeButton icon={BiChevronsRight} id="last" disabled={currentPage === totalPages} clickHandler={navigationButtonClickHandler}/> 
        </div>
    )
} 

export default PageSelector;