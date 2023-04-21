import { userInterface,UserObject } from "../../features/userSlice";

export const filterUsers = (allUsers:UserObject,searchString:string) => {
    const resState:UserObject = {}
    for (let user in allUsers){
        if(checkString(allUsers[user],searchString)){
            resState[user] = allUsers[user]
        }
    }
    return resState;
}

const checkString = (user:userInterface,searchString:string) : boolean =>{
    
    if(user.email.includes(searchString) || user.name.includes(searchString) || user.role.includes(searchString)){
        return true;
    }
    return false;

}

export const pageUsers = (filteredUsers:UserObject,pageNo:number,singlePageLength:number):UserObject =>{
    const resState:UserObject={}
    // console.log(Object.keys(filteredUsers).length);
    // console.log(filteredUsers)
    let count:number = 0;
    const lastIndex = singlePageLength*pageNo;
    const startIndex = lastIndex-singlePageLength  + 1;
    for (let user in filteredUsers){
        count+=1;
        if(count >= startIndex && count <= lastIndex){
            resState[user] = filteredUsers[user]
        }
    }
    return resState;
}