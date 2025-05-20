import React, {useState} from "react";
import app from '../firebaseConfig';
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Read(){

    const [fruitArray, setFruitArray] = useState([])
    const navigate = useNavigate()

    const fetchData = async () =>{
        const db = getDatabase(app);
        const dataRef = ref(db, "nature/fruits")
        const snapshot = await get(dataRef)
        if (snapshot.exists()){
            setFruitArray(Object.values(snapshot.val()))   
        } else{
            alert("Data not found")
        }
        
    }
    return(
        <div>
            <button onClick={fetchData} className="displayData">Display Data</button>
            <ul>
                {fruitArray.map((item,index) => (
                    <li key={index}>
                        {item.fruitName} - {item.fruitDefinition}
        
                    </li>
                ))}
            </ul>

            <div className="nav-buttons">
                <button onClick={() => navigate("/")}>Write</button>
                <button onClick={() => navigate("/updateread")}>Update</button>
            </div>
        </div>
    )
}

export default Read