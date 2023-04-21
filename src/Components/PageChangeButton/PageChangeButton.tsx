import React from 'react'
import { IconType } from 'react-icons/lib';

interface PageChangeButtonInterfaceWithIcon{
    icon:IconType,
    id:string,
    disabled?:boolean,
    clickHandler:(e:any)=>void
}

interface PageChangeButtonInterfaceWithString{
    text:string,
    id:string,
    disabled?:boolean,
    clickHandler:(e:any)=>void
}
const PageChangeButton = ({id,disabled,clickHandler,...content}:PageChangeButtonInterfaceWithIcon|PageChangeButtonInterfaceWithString)=>{
    const buttonContent = (con:typeof content):React.ReactNode=>{
        if("icon" in con){
            return React.createElement(con.icon,{id:id})
        }
        else if("text" in con){
            return React.createElement(React.Fragment,null,con.text)
        }

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