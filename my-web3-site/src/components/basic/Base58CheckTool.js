import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import bs58 from 'bs58';
import CryptoJS from 'crypto-js';

const Base58CheckTool = () => {
  const [inputLeft, setInputLeft] = useState('');
  const [inputRight, setInputRight] = useState('');

  const handleEncode = () => {
    const bytes = CryptoJS.enc.Hex.parse(inputLeft);
    const checksum = CryptoJS.SHA256(CryptoJS.SHA256(bytes));
    const checkSumHex = checksum.toString(CryptoJS.enc.Hex);
    const checksumBytes = new Uint8Array(checkSumHex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));
    const sourceBytes = new Uint8Array(inputLeft.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));
    const dataWithChecksum= new Uint8Array([...sourceBytes, ...checksumBytes.subarray(0, 4)]);
    const encodedData = bs58.encode(dataWithChecksum);
    setInputRight(encodedData);
  };

    const handleDecode = () => {
        try {
            // 解码 Base58Check 编码的数据
            const decodedData = bs58.decode(inputRight);
            // 分离校验和和数据部分
            const dataWithoutChecksum = decodedData.slice(0, -4);
            const checksum = CryptoJS.enc.Hex.parse(decodedData.slice(-4));
            // 计算数据部分的哈希
            const hash = CryptoJS.SHA256(CryptoJS.SHA256(dataWithoutChecksum)).toString(CryptoJS.enc.Hex).slice(0, 8);
            const checksumBytes = CryptoJS.enc.Hex.parse(hash);
            // 验证校验和
            if (checksum === checksumBytes) {
                // 校验和匹配，返回解码后的数据
                const decodedString = CryptoJS.enc.Hex.parse(dataWithoutChecksum).toString(CryptoJS.enc.Hex);
                setInputLeft(decodedString);
            } else {
                // 校验和不匹配，提示错误
                setInputLeft('Invalid checksum');
            }
        } catch (error) {
            // 解码失败，提示错误
            setInputLeft('Invalid Base58Check data');
        }
    };

    function toHexString(byteArray) {
        return byteArray.reduce((output, elem) => 
            (output + ('0' + elem.toString(16)).slice(-2)),
    '');
}


  return (
    <Grid container spacing={4} style={{ height: '100vh', padding: '20px' }}>
      {/* 标题 */}
      <Grid item xs={12} style={{ height: '10vh', padding: '20px' }}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Base58Check 编解码工具 - 基于Hex字符串
          </Typography>
        </Paper>
      </Grid>
      {/* 摘要 */}
      <Grid item xs={12} style={{ height: '20vh', padding: '20px' }}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="body1">
            编码步骤：<br />
            1. 对输入数据进行 SHA-256 哈希计算。<br />
            2. 对哈希结果进行两次 SHA-256 哈希计算，取前4个字节作为校验和。<br />
            3. 将校验和添加到原始数据末尾。<br />
            4. 使用 Base58 编码得到最终结果。<br />
          </Typography>
        </Paper>
      </Grid>
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

export default Base58CheckTool;