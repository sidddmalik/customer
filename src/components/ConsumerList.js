import Axios from "axios";
import { useEffect, useState } from "react";
import ConsumerListRow from "./ConsumerListRow";
function GetCurrentAddress(){
    const [add, setAdd] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const {latitude, longitude} = pos.coords;
            console.log(latitude, longitude);
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url)
                .then(res => res.json())
                .then(data => setAdd(data.address));
        });
    }, []);

    return add.postcode || '';
}
function ConsumerList()
{
    
    const [arr,setArr] = useState([]);
    useEffect(()=>{
        Axios.get("https://database-qzii.onrender.com/serRoute/")
        .then((res)=>{
            if(res.status === 200)
                setArr(res.data);
            else
                Promise.reject();
        })
        .catch((err)=> alert(err));
    },[]);
    const current=GetCurrentAddress();
    console.log(current);
    const ListItems = (current) => {
        return arr.filter(val => val.Pincode === current)
            .map((val, ind) => {
                return <ConsumerListRow obj={val} />;
            });
    };
    
    return (
        <table style={{maxWidth:"60%", margin: "50px auto"}} class="table table-bordered table-striped table-success">
            <thead>
                <tr>
                    <th class="text-center">Name</th>
                    <th class="text-center">ID</th>
                    <th class="text-center">PhoneNo</th>
                    <th class="text-center">Email-ID</th>
                    <th class="text-center">Services</th>
                    <th class="text-center">Pincode</th>
                    <th class="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {ListItems(current)}
            </tbody>
        </table>
    )
}
export default ConsumerList;
