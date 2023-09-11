import React, { useState, useEffect } from 'react'
import './style.css'

const getLocalStorageData = ()=>{
    const data = localStorage.getItem("myItems")
    if(data)
        return JSON.parse(data)
    else
        return []
}

const ShoppingList = ()=>{
    const [inpVal, SetInpVal] = useState("") //to get the current string in input as soon as user types/deletes a single letter

    const [inpArr, SetInpArr] = useState(getLocalStorageData())  //to store each string in an array as soon as user clicks '+' in input bar

    const [toggleBtn, SetToggleBtn] = useState(false)  //to change '+' btn to edit btn on editing items

    const [item_Id,SetItem_Id] = useState("") //to get unique ID of the item selected to get edited

    useEffect(()=>{
        localStorage.setItem("myItems", JSON.stringify(inpArr))
    },[inpArr])  //update local storage whenever list of items is edited


    const addItem = ()=>{
      
        if(inpVal === ""){
            alert("enter something")
        }
        else if(toggleBtn === true){
            const newInpArr = inpArr.map((curElm)=>{
                if(curElm.id === item_Id){
                    curElm.name = inpVal
                }
                return curElm
                
            })
            SetInpArr(newInpArr)
            SetInpVal("")
            SetToggleBtn(false)
        }
        else{
            const item = {
                id : new Date().getTime().toString(),
                name : inpVal
            }
            SetInpArr([...inpArr, item])
            SetInpVal("")
        }
    
    }

    const removeItem = (itemId)=>{
        const updatedInpArr = inpArr.filter((curElm)=>{
            return curElm.id != itemId
        })

        SetInpArr(updatedInpArr)
    }

    const editItem = (itemId)=>{
        const item_to_be_edited = inpArr.find((curElm)=>{
            return curElm.id === itemId
        })
        SetInpVal(item_to_be_edited.name)
        SetToggleBtn(true)
        SetItem_Id(itemId)
    }
    

    return(
        <>
            <div className='parent'>
                <i className="fa fa-list"></i>
                <p>add your items here<span>✌️</span></p>
                <div className='addItem'>
                    <span>✍️</span>
                    <input className="inp" type='text' placeholder='Add item...' value={inpVal} onChange={(ele)=>SetInpVal(ele.target.value)} />
                    {toggleBtn ? <i className="toggleEdit fa fa-edit" onClick={addItem}></i> : <i className="fa fa-plus" onClick={addItem}></i> }
                    
                </div>
                {inpArr.map((curEle)=>{
                    const {id, name} = curEle
                    return(
                        <>
                            <div className='item' key={id}>
                                <span className='itemName'>{name}</span>
                                <span className='item-btns'>
                                    <i className="edit fa fa-edit" onClick={()=>editItem(id)}></i>
                                    <i className="delete fa fa-trash-o" onClick={()=>removeItem(id)}></i>
                                </span>
                          
                            </div>
                        </>
                    )
                })}
                
                <div className='check-remove' onClick={()=>SetInpArr([])}>
                    <span>check list</span>
                </div>
                
            </div>
        </>
    )
}

export default ShoppingList