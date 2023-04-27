import React,{useState,useEffect} from 'react';
import { UserObject } from '../../features/userSlice';

interface DataHeaderRowProps{
    selected: UserObject
    setSelected:React.Dispatch<React.SetStateAction<UserObject>>
    showUsers:UserObject
}


const DataHeaderRow = ({showUsers,setSelected,selected}:DataHeaderRowProps) =>{

    const [selectAllCheckboxSelected,setSelectAllCheckboxSelected] = useState<boolean>(false);
    // if(selectedLength === 0){
    //     setSelectAllCheckboxSelected(false)
    // }
    const handleSelectAllCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.stopPropagation();
        let checkStatus:boolean = e.target.checked;
        if(checkStatus == true){
            setSelectAllCheckboxSelected(true);
            setSelected(showUsers);
        }
        else if(checkStatus == false){
            setSelectAllCheckboxSelected(false);
            setSelected({});
        }
    }

    useEffect(()=>{
        if(Object.keys(selected).length === 0){
            setSelectAllCheckboxSelected(false)
        }
    },[selected])
    return(
            <div className="table-row">
                <div className='table-cell'>id</div>
                <div className='table-cell'><input type="checkbox" checked={selectAllCheckboxSelected} onChange={handleSelectAllCheckboxChange}/></div>
                <div className="table-cell">Name</div>
                <div className="table-cell">Email</div>
                <div className="table-cell">Role</div>
                <div className="table-cell">Actions</div>
            </div>
    )
}

export default DataHeaderRow