import { useParams } from "react-router-dom";
import ConsumerForm from "./ConsumerForm";
import { useEffect, useState } from "react";
import Axios from "axios";

function EditConsumer() {
    const { id } = useParams();
    const [initialValue, setInitialValue] = useState({ Name: "", ID: "", PhoneNo: "", EmailID: "", Services: "",Pincode:"" });
    const [newData, setNewData] = useState([]);

    useEffect(() => {
        Axios.get("https://database-qzii.onrender.com/serRoute/update-service/" + id)
            .then((res) => {
                if (res.status === 200) {
                    const { Name, ID, PhoneNo, EmailID, Services,Pincode} = res.data;
                    setInitialValue({ Name, ID, PhoneNo, EmailID, Services,Pincode });
                }
                else
                    Promise.reject();
            })
            .catch((err) => alert(err));
    }, [id])

    const getState = (childData) => {
        setNewData(childData);
    }

    const handleSubmit = () => {
        const data = { Name: newData[0],ID:newData[1],PhoneNo:newData[2],EmailID:newData[3],Services:newData[4],PetName:newData[5] };
        Axios.put("https://database-qzii.onrender.com/serRoute/update-service/" + id, data)
            .then((res) => {
                if (res.status === 200)
                    alert("Record updated successfully")
                else
                    Promise.reject();
            })
            .catch((err) => alert(err));
    }
    return (
        <form onSubmit={handleSubmit}>
            <ConsumerForm getState={getState}
                NameValue={initialValue.Name}
                IDValue={initialValue.ID}
                PhoneNoValue={initialValue.PhoneNo}
                EmailIDValue={initialValue.EmailID}
                ServicesValue={initialValue.Services}
                PincodeValue={initialValue.Pincode}
                >
                    Update ser
            </ConsumerForm>
        </form>
    )
}
export default EditConsumer;
