import React from 'react';
import Cards_Client_Component from './page';

export default async function Cards_Server_Component() {
  return (
      <main className=''>
        <Cards_Client_Component />
      </main>
  );
}
