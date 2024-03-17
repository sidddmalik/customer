import { useState } from "react";
import ConsumerForm from "./ConsumerForm";
import Axios from "axios";

function CreateConsumer()
{
    const [arr,setArr] = useState([]); 

    //Declaring a argument function
    const getState = (childData) => { 
        setArr(childData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {Name: arr[0],ID:arr[1],PhoneNo:arr[2],EmailID:arr[3],Services:arr[4],Pincode:arr[5]};
        Axios.post("https://database-qzii.onrender.com/serRoute/create-service",data)
        .then((res)=>{
            if(res.status === 200)
                alert("Record added successfully");
            else
                Promise.reject();
        })
        .catch((err)=>alert(err));
        event.target.reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <ConsumerForm getState={getState}
                    NameValue=""
                    IDValue=""
                    PhoneNoValue=""
                    EmailIDValue=""
                    ServicesValue=""
                    PincodeValue="">
                Submit
            </ConsumerForm>
        </form>
    )
}
export default CreateConsumer;
