import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Buffer } from 'buffer';

const HexConversionTool = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleEncode = () => {
    // 将输入的 UTF-8 格式字符串转换为十六进制表示
    const hexString = Buffer.from(inputText, 'utf-8').toString('hex');
    setOutputText(hexString); // 转换为大写显示
  };

  const handleDecode = () => {
    // 将输入的十六进制字符串转换为 UTF-8 格式
    const utf8String = Buffer.from(outputText, 'hex').toString('utf-8');
    setInputText(utf8String);
  };

  return (
    <Grid container spacing={4} style={{ height: '100vh', padding: '20px' }}>
      {/* 标题 */}
      <Grid item xs={12} style={{ height: '7vh', padding: '20px' }}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Hex 转换工具 - 基于UTF-8字符集
          </Typography>
        </Paper>
      </Grid>
      {/* 摘要 */}
      <Grid item xs={12} style={{ height: '20vh', padding: '20px' }}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="body1">
            这个工具可以将 UTF-8 格式的字符串转换为十六进制表示，也可以将十六进制字符串转换回 UTF-8 格式。
          </Typography>
        <Typography variant="body1" style={{ marginTop: '20px' }}>
            UTF-8 编码是一种将 Unicode 字符转换为字节序列的可变长度编码。
          </Typography>
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            十六进制表示法（或简称为十六进制）是一种数字表示法，其中使用 16 个符号来表示 0-9 的数字和 A-F 的字母。
          </Typography>
        </Paper>
      </Grid>
      {/* 输入输出区域 */}
      <Grid item xs={12} container spacing={2} style={{ height: '70vh', padding:'20px' }}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{}}>
            <TextField
              label="输入字符串"
              variant="outlined"
              multiline
              rows={30}
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={2} container justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}
            onClick={handleEncode}
            disabled={!inputText.trim()}
          >
            转换为 Hex
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}
            onClick={handleDecode}
            disabled={!outputText.trim()}
          >
            解码为字符串
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{}}>
            <TextField
              label="输出结果"
              variant="outlined"
              multiline
              rows={30}
              fullWidth
              value={outputText}
              readOnly
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HexConversionTool;