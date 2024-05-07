// BasicToolsPage.js
import React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const BasicToolsPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <List>
          <ListItemButton component={Link} to="/basic/base64">
            <ListItemIcon>
              {/* Add icon if needed */}
            </ListItemIcon>
            <ListItemText primary="Base64 编解码" />
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/basic/mnemonic-generator">
            <ListItemIcon>
              {/* Add icon if needed */}
            </ListItemIcon>
            <ListItemText primary="助记词生成" />
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/basic/batch-address-generator">
            <ListItemIcon>
              {/* Add icon if needed */}
            </ListItemIcon>
            <ListItemText primary="批量地址生成" />
          </ListItemButton>
        </List>
      </Grid>
      <Grid item xs={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default BasicToolsPage;
