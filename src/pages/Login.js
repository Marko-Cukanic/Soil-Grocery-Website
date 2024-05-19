import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(){
  // State variables for email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Hook to handle navigation
  const navigate = useNavigate()


  // Function to handle login button click
  const onButtonClick = () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');
  
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    
    // Check if user data exists
    if(!userData){
      setEmailError('User not found');
      return;
    }


    // Validate email format
    if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
      setEmailError('Please enter a valid email');
      return;
    }
    
    // Check if entered email matches the stored email
    if(email.toLowerCase() !== userData.email.toLowerCase()){
      setEmailError('Incorrect email');
      return;
    }
  
    // Check if entered password matches the stored password
    if(password !== userData.password){
      setPasswordError('Incorrect password');
      return;
    }
    
    // If email and password are correct, navigate to the profile page
    navigate('/profile');
    localStorage.setItem('isLoggedIn', 'true'); // Set login status in local storage
    window.location.reload(); // Reload the page to reflect changes

};

const goToSignUp = () => {
  navigate('/signup');
};

    
  return(
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br/>
      <form noValidate>
        <div className={'inputContainer'}>
          <input type="email" value={email} placeholder="Enter your email here" onChange={(ev) => setEmail(ev.target.value)} className={'inputBox'} required/>
          <label className="errorLabel">{emailError}</label>
        </div>
        <br/>
        <div className={'inputContainer'}>
          <input type="password" value={password} placeholder="Enter your password here" onChange={(ev) => setPassword(ev.target.value)} className={'inputBox'} required minLength={8}/>
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br/>
        <div className={'inputContainer'}>
            <div className="buttonGroup">
                <button className={'inputButton'} onClick={onButtonClick}>Log in</button>
                <button className={'inputButton'} onClick={goToSignUp}>Sign up</button>
            </div>
        </div>
      </form>
    </div>
  );
}
