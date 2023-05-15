import Link from 'next/link';
import { useRouter } from 'next/router';
import React , { useEffect } from 'react';

const Welcome = () => {
  const router = useRouter();
  useEffect(() => {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (!connectedUser) {
      router.push('/');
    }
  }, []);
  
  return (
    <div className=" min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className='text-3xl font-extrabold text-blue-600'>Welcome Back !!!</h1> 
        </div>
      </div>
        <Link href={'/myaccount'}><a href="#" className="font-medium border-8 text-blue-600 hover:text-blue-500"> MyAccount Details </a></Link>
    </div>
  );
}

export default Welcome;