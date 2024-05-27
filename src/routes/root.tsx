import { Outlet, Link } from 'react-router-dom';
// import { TonConnectButton } from '@tonconnect/ui-react';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        {/* <TonConnectButton /> */}
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          {/* <form method="post">
            <button type="submit">New</button>
          </form> */}
        </div>
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