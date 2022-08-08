import React from 'react';
import { Outlet } from 'react-router-dom';
import ChangeRankingsMenu from './ChangeRankingsMenu';

function Rankings() {
  return (
    <>
      <ChangeRankingsMenu />
      <Outlet />
    </>
  );
}

export default Rankings;
