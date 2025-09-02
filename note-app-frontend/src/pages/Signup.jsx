import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google'; // <-- IMPORT THIS
import { jwtDecode } from 'jwt-decode'; // Helper to decode the credential for debugging

import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/auth/Input';
import Button from '../components/core/Button';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', otp: '' });
    const [errors, setErrors] = useState({});
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { requestOtp, signup, googleSignIn } = useAuth(); // googleSignIn is now the real function
    const navigate = useNavigate();

    // ... (keep all your existing handler functions like handleInputChange, handleGetOtp, handleSubmit)
    
    const handleGoogleSuccess = async (credentialResponse) => {
        toast.loading('Signing you up...');
        try {
            // The credentialResponse object contains the JWT ID token from Google
            await googleSignIn(credentialResponse.credential);
            toast.dismiss();
            toast.success('Signed up successfully!');
            navigate('/');
        } catch (error) {
            toast.dismiss();
            toast.error(error.message || 'Google signup failed.');
        }
    };

    const handleGoogleError = () => {
        toast.error('Google signup failed. Please try again.');
    };

    // ... (keep the rest of your component logic)

    return (
        <AuthLayout title="Create an Account" subtitle="Start your journey with us today.">
            {/* ... (keep your existing OTP form) ... */}
            
             <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
            </div>

            {/* --- THIS IS THE UPDATED PART --- */}
            <div className="flex justify-center">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                />
            </div>
            {/* ------------------------------- */}

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Signup;
