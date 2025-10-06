import { Suspense } from 'react';
import LoginPage from './page';

// Define a simple loading state to show while search params are being resolved
const LoadingFallback = () => (
  <div className="pt-24 min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-4">
    <div className="text-xl text-gray-400">Loading Login...</div>
  </div>
);

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginPage /> 
    </Suspense>
  );
}