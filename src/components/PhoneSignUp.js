import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Alert} from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useUserAuth } from '../context/UserAuthContext';   

const PhoneSignUp = () => {
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState("");
    const { setUpRecaptcha } = useUserAuth();
    const navigate = useNavigate();

    const getOtp = async (e) => {
        e.preventDefault();
        setError("");
        if(number === "" || number === undefined) return setError("Please Enter a valid Number");
        try{
            const response = await setUpRecaptcha(number);
            console.log(response);
            setConfirmObj(response);
            setFlag(true);
        }catch(err){
            setError(err.message);
        }
        console.log(number);
    };

    const verifyOtp = async (e) => {  
        e.preventDefault();
        setError("");
        if(otp === "" || otp === undefined) return setError("Please Enter a valid OTP");
        try{
            await confirmObj.confirm(otp);
            navigate("/home");
        }catch(err){
            setError(err.message);
        }
        console.log(otp);
    };
    return (
        <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Phone Auth</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style = {{ display: !flag ? "block" : "none "}}>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
           <PhoneInput
           defaultCountry='IN'
           value={number}
           onChange={setNumber}
           placeholder='Enter Phone Number'
              />
              <div id="recaptcha-container"></div>
          </Form.Group>
          <div className='button-right'>
            <Link to="/">
            <Button variant='secondary'>Cancel</Button> 
            </Link> &nbsp;
            <Button variant="primary" type="Submit">Send OTP</Button> 
          </div>
          </Form>

          <Form onSubmit={verifyOtp} style = {{ display: flag ? "block" : "none "}}>
          <Form.Group className="mb-3" controlId="formBasicotp">
           <Form.Control
           type='otp'
           placeholder='Enter OTP'
              onChange={(e) => setOtp(e.target.value)}
                />
          </Form.Group>
          <div className='button-right'>
            <Link to="/">
            <Button variant='secondary'>Cancel</Button> 
            </Link> &nbsp;
            <Button variant="primary" type="Submit">verfify OTP</Button> 
          </div>
          </Form>
          </div>
            </>
    );
};

export default PhoneSignUp;