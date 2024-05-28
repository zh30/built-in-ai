import { Button } from '@/components/ui/button';
import { Outlet, Link } from 'react-router-dom';
// import { TonConnectButton } from '@tonconnect/ui-react';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <Link to="/" unstable_viewTransition>
          <Button>Home</Button>
        </Link>
        {/* <TonConnectButton /> */}
        <nav>
          <ul>
            <li>
              <Link to={`/contacts/1`} unstable_viewTransition>Your Name</Link>
            </li>
            <li>
              <Link to={`/contacts/2`} unstable_viewTransition>Your Friend</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}