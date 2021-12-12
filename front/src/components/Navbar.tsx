import React, { useState, FC } from 'react';

import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar } from '@mui/material';
import Aside from './Aside';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#2A2D33',
  },
});

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(!open);
  };

  return (
    <AppBar style={{ backgroundColor: '#2A2D33' }} position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        CarWash
      </Toolbar>
      <Aside open={open} onClose={() => setOpen(false)} onOpen={toggleDrawer} />
    </AppBar>
  );
};

export default Navbar;
