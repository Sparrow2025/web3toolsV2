import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Base64Tool = () => {
  const [inputLeft, setInputLeft] = useState('');
  const [inputRight, setInputRight] = useState('');

  const handleEncode = () => {
    // 编码逻辑
  };

  const handleDecode = () => {
    // 解码逻辑
  };

  return (
    <Grid container spacing={4} style={{ height: '100vh', padding: '20px' }}>
      {/* 标题 */}
      <Grid item xs={12} style={{height: '10vh', padding: '20px'}}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Base64 编解码
          </Typography>
        </Paper>
      </Grid>
      {/* 摘要 */}
      <Grid item xs={12} style={{height: '20vh', padding: '20px'}}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="body1">
            Base64 编码是一种将二进制数据转换为文本字符串的方法。它将每三个字节的数据编码成四个字符的文本字符串，
            并且只使用了常见的 ASCII 字符。Base64 编码常用于在网络传输中传递二进制数据，或者在文本环境中存储二进制数据。
          </Typography>
        </Paper>
      </Grid>
      {/* 输入输出区域 */}
      <Grid item xs={12} container spacing={2} style={{ height: '70vh', padding:'20px' }}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ height: '100%', padding: '20px' }}>
            <TextField
              label="待编码数据"
              variant="outlined"
              multiline
              rows={50}
              fullWidth
              value={inputLeft}
              onChange={(e) => setInputLeft(e.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={2} container justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}
            onClick={handleEncode}
            disabled={!inputLeft}
          >
            编码
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}
            onClick={handleDecode}
            disabled={!inputRight}
          >
            解码
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ height: '100%', padding: '20px' }}>
            <TextField
              label="待解码数据"
              variant="outlined"
              multiline
              rows={50}
              fullWidth
              value={inputRight}
              onChange={(e) => setInputRight(e.target.value)}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Base64Tool;
