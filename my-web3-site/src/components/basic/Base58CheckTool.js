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
    const checksumHex = CryptoJS.SHA256(CryptoJS.SHA256(bytes)).toString(CryptoJS.enc.Hex);
    const data = inputLeft + checksumHex.substring(0, 8);
    const encodedData = bs58.encode(hexToBytes(data));
    setInputRight(encodedData);
  };

  // Convert a hex string to a byte array
  function hexToBytes(hex) {
    let bytes = [];
    for (let c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
  }

  const handleDecode = () => {
    try {
      // 解码 Base58Check 编码的数据
      const decodedData = bs58.decode(inputRight);
      // 分离校验和和数据部分
      const dataWithoutChecksum = decodedData.slice(0, -4);
      const originData = CryptoJS.lib.WordArray.create(dataWithoutChecksum);
      const checksum = CryptoJS.lib.WordArray.create(decodedData.slice(-4)).toString(CryptoJS.enc.Hex);
      // 计算数据部分的哈希
      const checkHashHex = CryptoJS.SHA256(CryptoJS.SHA256(originData)).toString(CryptoJS.enc.Hex).substring(0, 8);
      // 验证校验和
      if (checksum === checkHashHex) {
        // 校验和匹配，返回解码后的数据
        setInputLeft(originData);
      } else {
        // 校验和不匹配，提示错误
        setInputLeft('Invalid checksum');
      }
    } catch (error) {
      // 解码失败，提示错误
      setInputLeft('Invalid Base58Check data');
    }
  };


  return (
    <Grid container spacing={4} style={{ height: '100vh', padding: '20px' }}>
      {/* 标题 */}
      <Grid item xs={12} style={{ height: '7vh', padding: '20px' }}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Base58Check 编解码工具 - 基于Hex字符串（输入和输出都是Hex格式）
          </Typography>
        </Paper>
      </Grid>
      {/* 摘要 */}
      <Grid item xs={12} style={{ height: '30vh', padding: '20px' }}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="body1">
            编码步骤：<br />
            1. 对输入数据进行 两次SHA-256 哈希计算。<br />
            2. 取哈希值的前4个字节作为校验和。<br />
            3. 将校验和添加到原始数据末尾。<br />
            4. 使用 Base58 编码得到最终结果。<br />
          </Typography>
          <br />
          <Typography variant="body1">
            解码步骤：<br />
            1. 对输入数据进行 Base58 解码。<br />
            2. 分离出原始数据和检验和（最后4个字节为检验和）。<br />
            3. 通过原始数据计算出检验和。<br />
            4. 校验和匹配，则得到最终结果。<br />
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} container spacing={2} style={{ height: '70vh', padding: '20px' }}>
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