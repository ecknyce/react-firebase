

import React, {useState, useEffect} from "react";
import app from '../firebaseConfig';
import { getDatabase, ref, set, get } from "firebase/database";
import {useNavigate, useParams} from 'react-router-dom'

function UpdateWrite(){
    const {firebaseId} = useParams();
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const navigate = useNavigate()

    useEffect(() =>{
        const fetchData = async () =>{
            const db = getDatabase(app);
            const dataRef = ref(db, "nature/fruits/" + firebaseId);
            const snapshot = await get(dataRef)
            if (snapshot.exists()){
                const targetObject = snapshot.val()  
                setInputValue1(targetObject.fruitName)
                setInputValue2(targetObject.fruitDefinition)
            } else{
                alert("Data not found")
            }
        
        }
        fetchData()
    },[firebaseId])

    const saveData = async () =>{
        const db = getDatabase(app);
        const newDocRef = ref(db, "nature/fruits/"+firebaseId);
        set(newDocRef, {
            fruitName: inputValue1,
            fruitDefinition: inputValue2
        }).then(() => {
            console.log("Data saved successfully");
            alert("Data saved successfully")
        }).catch ((err) =>{
            alert("Error: ", err.message)
        })

    }

    return(
        <div>
            <div className="main-container">

                <div className="form-group">
                <label htmlFor="fruit-name">Fruit name</label>
                <input type="text" value={inputValue1} name="fruit-name" onChange={(e) => setInputValue1(e.target.value)}/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="fruit-defination">Fruit definition</label>
                    <input type="text" value={inputValue2} name="fruit-definition" onChange={(e) => setInputValue2(e.target.value)}/>
                </div>

                <button onClick={saveData} id="savefruit">Save Data</button>

                <div className="nav-buttons">
                    <button onClick={() => navigate("/read")}>Read</button>
                    <button onClick={() => navigate("/updateread")}>Update</button>
                </div>

            </div>

            
        </div>
    )
}
export default UpdateWrite