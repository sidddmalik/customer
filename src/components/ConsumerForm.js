import { useEffect, useState } from "react";

function ConsumerForm(props) {
    const [Name, setName] = useState(props.NameValue);
    const [ID, setID] = useState(props.IDValue);
    const [PhoneNo, setPhoneNo] = useState(props.PhoneNoValue);
    const [EmailID, setEmailID] = useState(props.EmailIDValue);
    const [Services, setServices] = useState(props.ServicesValue);
    const [Pincode, setPincode] = useState(props.PincodeValue);
    const [errors, setErrors] = useState({
        Name: '',
        ID: '',
        PhoneNo: '',
        EmailID: '',
        Pincode: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setName(props.NameValue);
        setID(props.IDValue);
        setPhoneNo(props.PhoneNoValue);
        setEmailID(props.EmailIDValue);
        setServices(props.ServicesValue);
        setPincode(props.PincodeValue);
    }, [props.NameValue, props.IDValue, props.PhoneNoValue, props.EmailIDValue, props.ServicesValue, props.PincodeValue]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'Name':
                setName(value);
                break;
            case 'ID':
                setID(value);
                break;
            case 'PhoneNo':
                setPhoneNo(value);
                break;
            case 'EmailID':
                setEmailID(value);
                break;
            case 'Services':
                setServices(value);
                break;
            case 'Pincode':
                setPincode(value);
                break;
            default:
                break;
        }
        validateInput(name, value);
    }

    const validateInput = (name, value) => {
        switch (name) {
            case 'PhoneNo':
                if (value.length !== 10) {
                    setErrors({ ...errors, [name]: 'Phone number must be 10 digits' });
                } else {
                    setErrors({ ...errors, [name]: '' });
                }
                break;
            case 'ID':
                if (!/^\d{12}$/.test(value)) {
                    setErrors({ ...errors, [name]: 'ID must be 12 digits' });
                } else {
                    setErrors({ ...errors, [name]: '' });
                }
                break;
            case 'EmailID':
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    setErrors({ ...errors, [name]: 'Invalid email format' });
                } else {
                    setErrors({ ...errors, [name]: '' });
                }
                break;
            case 'Pincode':
                if (value.length !== 6) {
                    setErrors({ ...errors, [name]: 'Pincode must be 6 digits' });
                } else {
                    setErrors({ ...errors, [name]: '' });
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const hasErrors = Object.values(errors).some(error => error !== '');
        setIsFormValid(!hasErrors);
    }, [errors]);

    const handleClick = () => {
        // Check for any validation errors before submitting the form
        if (!isFormValid) {
            return;
        }
        const arr = [Name, ID, PhoneNo, EmailID, Services, Pincode];
        props.getState(arr);
    }

    return (
        <div style={{ maxWidth: "40%", margin: "0px auto" }}>
            <input
                name="Name"
                value={Name}
                onChange={handleChange}
                className="form-control my-3"
                placeholder="Enter your Name"
            />
            {errors.Name && <div style={{ color: 'red' }}>{errors.Name}</div>}

            <input
                name="ID"
                value={ID}
                onChange={handleChange}
                className="form-control my-3"
                placeholder="Enter your Aadhar ID"
            />
            {errors.ID && <div style={{ color: 'red' }}>{errors.ID}</div>}

            <input
                name="PhoneNo"
                value={PhoneNo}
                onChange={handleChange}
                className="form-control my-3"
                placeholder="Enter your PhoneNo."
            />
            {errors.PhoneNo && <div style={{ color: 'red' }}>{errors.PhoneNo}</div>}

            <input
                name="EmailID"
                value={EmailID}
                onChange={handleChange}
                className="form-control my-3"
                placeholder="Enter your Email-ID"
            />
            {errors.EmailID && <div style={{ color: 'red' }}>{errors.EmailID}</div>}
            <select
                name="Services"
                value={Services}
                onChange={handleChange}
                className="form-control my-3"
            >
            <option value="">Select Service you offer</option>
                <option value="technical">Technical</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="carpentry">Carpentry</option>
                <option value="mechanic">Mechanic</option>
                <option value="painter">Painter</option>
            </select>
            {errors.Services && <div style={{ color: 'red' }}>{errors.Services}</div>}
            <input
                name="Pincode"
                value={Pincode}
                onChange={handleChange}
                className="form-control my-3"
                placeholder="Enter your Pincode"
            />
            {errors.Pincode && <div style={{ color: 'red' }}>{errors.Pincode}</div>}

            <button
                onClick={handleClick}
                className="btn btn-success my-3 d-block mx-auto"
                type="submit"
                disabled={!isFormValid}
            >
                {props.children}
            </button>
        </div>
    )
}

export default ConsumerForm;
