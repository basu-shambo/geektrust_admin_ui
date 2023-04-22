import React from 'react'
import { IconType } from 'react-icons/lib';

interface PageChangeButtonInterfaceWithIcon{
    icon:IconType,
    text?:never,
    id:string,
    disabled?:boolean,
    clickHandler:(e:any)=>void
}

interface PageChangeButtonInterfaceWithString{
    icon?:never,
    text:string,
    id:string,
    disabled?:boolean,
    clickHandler:(e:any)=>void
}
const PageChangeButton = ({id,disabled,clickHandler,...content}:PageChangeButtonInterfaceWithIcon|PageChangeButtonInterfaceWithString)=>{
    const buttonContent = (con:typeof content):React.ReactNode=>{
        if(con.icon){
            return React.createElement(con.icon,{id:id})
        }
        else if(con.text){
            return React.createElement(React.Fragment,null,con.text)
        }
        return React.createElement("div",{},"Wrong option given")
    }
    return(
        <button type="button" id={id} disabled={disabled} onClick={clickHandler} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"> 
            {
                buttonContent(content)
            }
        </button>
    )
}

export default PageChangeButton;