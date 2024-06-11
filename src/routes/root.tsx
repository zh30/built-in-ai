import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { Outlet, Link } from 'react-router-dom';
// import { TonConnectButton } from '@tonconnect/ui-react';

export default function Root() {
  return (
    <>
      <nav className='flex gap-4 justify-center items-center flex-wrap p-2'>
        <Link to="/" unstable_viewTransition>
          <Button variant="outline">Home</Button>
        </Link>
        {/* <Link to={`/genai`} unstable_viewTransition>
          <Button variant="outline">Gen AI</Button>
        </Link> */}
        {/* <Link to={`/contacts/2`} unstable_viewTransition>Your Friend</Link> */}
      </nav>
      <main className='p-4'>
        <Outlet />
      </main>
      <Toaster position="top-center" />
    </>
  );
}