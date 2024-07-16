import React, { useState } from 'react';
import './LoginPage.css';
import { ERROR_MESSAGES, PLACEHOLDERS, BUTTON_TEXT, TITLES } from '../../constants/uiTextSamples';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let emailError = '';
        let passwordError = '';

        if (!formData.email) {
            emailError = ERROR_MESSAGES.EMAIL_REQUIRED;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            emailError = ERROR_MESSAGES.EMAIL_INVALID;
        }

        if (!formData.password) {
            passwordError = ERROR_MESSAGES.PASSWORD_REQUIRED;
        } else if (formData.password.length < 6) {
            passwordError = ERROR_MESSAGES.PASSWORD_TOO_SHORT;
        }

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return false;
        }

        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            // Perform login logic here
            setErrors({ email: '', password: '' }); // Clear errors
        }
    };

    return (
        <div className="login-page5">
            {/* <h1 className='login-title'>{TITLES.LOGIN}</h1> */}
            <div className='login-container shadow-lg'>
                <div className='left-container'>
                    

                    <img src={require('../../assets/images/Group 9543@2x.png')} />
                    
                    <div className='left-sub-container'>

                    </div>

                </div>
                <div className='right-container'>
                <div class="swinging-word">
    </div>
                <div className="login-page5-inner shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder={PLACEHOLDERS.EMAIL}
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control mb-3 rounded-pill border-0 shadow-sm px-4"
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder={PLACEHOLDERS.PASSWORD}
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control rounded-pill mb-3 border-0 shadow-sm px-4"
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div>
                        <button type="submit" className='btn btn-primary'>{BUTTON_TEXT.SUBMIT}</button>
                    </div>
                </form>
            </div>

                </div>
           

            </div>
          
        </div>
    );
}

export default LoginPage;
