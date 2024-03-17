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
    var inputval;
  const [inputType, setInputType] = useState('text');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputType(event.target.value);
    setInputValue(event.target.value); 
    inputval = event.target.value; 
  };
    
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
    let curr=inputValue;
    console.log(current);
    console.log(curr);
    const ListItems = (current,curr) => {
        return arr.filter(val => val.Pincode === current && val.Services === curr)
            .map((val, ind) => {
                return <ConsumerListRow obj={val} />;
            });
    };
    
    return (
        <>
        <div>
        <label htmlFor="inputType"></label>
        <select
          name="Services"
          value={inputType}
          onChange={handleInputChange}
          className="form-control my-3"
        >
          <option value="">Select Service you want</option>
          <option value="technical">Technical</option>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="carpentry">Carpentry</option>
          <option value="mechanic">Mechanic</option>
          <option value="painter">Painter</option>
        </select>
      </div>
        <table style={{maxWidth:"60%", margin: "50px auto"}} class="table table-bordered table-striped table-success">
            <thead>
                <tr>
                    <th class="text-center">Name</th>
                    <th class="text-center">ID</th>
                    <th class="text-center">PhoneNo</th>
                    <th class="text-center">Email-ID</th>
                    <th class="text-center">Services</th>
                    <th class="text-center">Pincode</th>
                </tr>
            </thead>
            <tbody>
                {ListItems(current,curr)}
            </tbody>
        </table>
        </>
    )
}
export default ConsumerList;
