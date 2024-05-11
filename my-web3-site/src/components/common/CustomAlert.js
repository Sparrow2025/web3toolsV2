import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const CustomAlert = ({ open, handleClose, message }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>警告</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">确定</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;
