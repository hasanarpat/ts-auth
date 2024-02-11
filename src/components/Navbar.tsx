import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await getServerSession();

  console.log(session);

  return (
    <div className='flex gap-3 items-center justify-around'>
      <Link href='/'>Home</Link>
      <Link href='/public'>Public</Link>
      <Link href='/client'>Client</Link>
      <Link href='/server'>Server</Link>
      {session != null ? (
        <div className='flex items-center gap-1'>
          <Link href='/api/auth/signout?callbackUrl=/'>SignOut</Link>
          <p className='mx-8'>{session.user?.name}</p>
          {session.user?.image != null && (
            <Image
              alt='avatar'
              width={25}
              height={25}
              src={session.user.image}
            />
          )}
        </div>
      ) : (
        <Link href='/api/auth/signin'>Signin</Link>
      )}
    </div>
  );
};

export default Navbar;
