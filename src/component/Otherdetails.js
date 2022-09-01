import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

function Signup(props) {
    const [credinationl, setCredinational] = useState({age: "", gender: "", dob: "", mobile_number: ""})
    let history = useHistory()
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const {age, gender, dob, mobile_number} = credinationl;
        const response = await fetch(`http://localhost:3000/adddata`, {
            method: 'POST',
      
            headers: {
              'Content-Type': 'application/json',
             
      
            },
            body: JSON.stringify({age, gender, dob, mobile_number})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push('/login');
            props.showAlert("Details saved Successfully", "success")
          }
          else{
            props.showAlert("Invalid id", "danger")
          }
    }
    const onChange = (e) => {
        setCredinational({ ...credinationl, [e.target.name]: e.target.value })
    }


    return (
        <div className='col-md-6 col-10 mx-auto mt-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Age</label>
                    <input type="text" className="form-control"  onChange={onChange} id="age" name='age' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Gender</label>
                    <input type="email" className="form-control"  onChange={onChange} id="gender" name='gender' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">DOB</label>
                    <input type="password" className="form-control"  onChange={onChange} id="dob" name='dob' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Number</label>
                    <input type="password" className="form-control"  onChange={onChange} id="number" name='number'  minLength={10} required/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
