import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import bs58 from 'bs58';

const Base58Tool = () => {
  const [inputLeft, setInputLeft] = useState('');
  const [inputRight, setInputRight] = useState('');

    const handleEncode = () => {
        try {
            const utf8Bytes = new TextEncoder().encode(inputLeft);
            const encodedData = bs58.encode(utf8Bytes).toString('utf-8');
            setInputRight(encodedData);
        } catch (error) {
            setInputRight('Invalid input!');
        }
    };

    const handleDecode = () => {
        try {
            const decodedData = new TextDecoder().decode(bs58.decode(inputRight));
            setInputLeft(decodedData);
        } catch (error) {
            console.error(error);
            setInputLeft('Invalid input!');
        }
    };

  return (
    <Grid container spacing={4} style={{ height: '100vh', padding: '20px' }}>
      {/* 标题 */}
      <Grid item xs={12} style={{height: '7vh', padding: '20px'}}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Base58 编解码（基于UTF-8字符集）
          </Typography>
        </Paper>
      </Grid>
      {/* 摘要 */}
      <Grid item xs={12} style={{height: '20vh', padding: '20px'}}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="body1">
            Base58 编码是一种将二进制数据转换为文本字符串的方法，类似于 Base64 编码。
          </Typography>
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            与 Base64 不同，Base58 不使用易混淆的字符（数字 0 和字母 O）和易混淆的大小写字母（大写字母 I 和小写字母 l），以及 + 和 / ，共 6 个字符。这也是 Base58 名称的由来，因为 64 - 6 = 58。
          </Typography>
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            与 Base64 相比，Base58 编码后的字符串长度稍长，但更适合用于在人类可读的环境中传递。Base58 编码常用于比特币等加密货币的地址表示。
          </Typography>
        </Paper>
      </Grid>
      {/* 输入输出区域 */}
      <Grid item xs={12} container spacing={2} style={{ height: '70vh', padding:'20px' }}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{  }}>
            <TextField
              label="待编码数据"
              variant="outlined"
              multiline
              rows={30}
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
          <Paper elevation={3} style={{  }}>
            <TextField
              label="待解码数据"
              variant="outlined"
              multiline
              rows={30}
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

export default Base58Tool;