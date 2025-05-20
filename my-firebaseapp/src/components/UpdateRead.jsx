import React, {useState} from "react";
import app from '../firebaseConfig';
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom"; 

function UpdateRead(){
    const [fruitArray, setFruitArray] = useState([])
    const navigate = useNavigate();

    const fetchData = async () =>{
        const db = getDatabase(app);
        const dataRef = ref(db, "nature/fruits")
        const snapshot = await get(dataRef)
        if (snapshot.exists()){
            const myData = snapshot.val()
            const temporaryArray = Object.keys(myData).map((myFireId =>{
                return {
                    ...myData[myFireId],
                    fruitId:myFireId
                }
            }))
            setFruitArray(temporaryArray)   
        } else{
            alert("Data not found")
        }
        
    }

    const deleteItem = async (fruitIdParam) =>{
        const db = getDatabase(app);
        const dataRef = ref(db, "nature/fruits/"+fruitIdParam)
        await remove(dataRef)
        window.location.reload()
    }
    return(
        <div>
            <button onClick={fetchData} className="displayData">Display Data</button>
            <ul>
                {fruitArray.map((item,index) => (
                    <li key={index}>
                        {item.fruitName} - {item.fruitDefinition} - {item.fruitId}
                        <button onClick={() => navigate(`/updatewrite/${item.fruitId}`)}>UPDATE</button>
                        <button onClick={() => deleteItem(item.fruitId)}>DELETE</button>
                    </li>
                ))}
            </ul>
            <div className="nav-buttons">
                <button onClick={() => navigate("/")}>Write</button>
                <button onClick={() => navigate("/read")}>Read</button>
            </div>
        </div>
    )

}
export default UpdateRead;