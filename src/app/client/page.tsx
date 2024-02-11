'use client';

import { useSession } from 'next-auth/react';

const Client = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    console.log(session, 'from client');
  }

  if (status === 'authenticated') {
    return <p>Signed in as {session?.user?.email}</p>;
  }
  return <div>Client</div>;
};

export default Client;
