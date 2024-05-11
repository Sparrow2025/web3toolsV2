import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CustomAlert from '../common/CustomAlert';
import { HDKey } from '@scure/bip32';
import * as bip39 from '@scure/bip39';
import { hexToBytes, bytesToHex as toHex } from '@noble/hashes/utils';

const AddressGenerator = () => {

  const coinList = [
    { value: '0', label: '比特币' },
    { value: '1', label: '以太坊' }
  ];

  const [mnemonic, setMnemonic] = useState('');
  const [addressPairs, setAddressPairs] = useState([]);
  const [numPairs, setNumPairs] = useState(10);
  const [selectedCoin, setSelectedCoin] = useState('0');
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleAlertClose = () => {
    setAlertOpen(false);
  };


  const handleGenerate = () => {
    // 检查助记词是否为空或长度不够
    if (mnemonic.trim() === '' || mnemonic.split(' ').length < 12) {
      // setAlertMessage('请输入有效的助记词');
      // setAlertOpen(true);
      alert("请输出有效的助记词，助记词由12，15，18，21，24个单词组成")
      return;
    }
    const coinType = selectedCoin;
    const addressSize = numPairs;
    let newAddressList = [];
    bip39.mnemonicToSeed(mnemonic).then(seed => {
      const hdKey = HDKey.fromMasterSeed(seed);
      for (let i = 0; i < addressSize; i++) {
        const path = "m/44'/" + coinType + "'/0'/0/" + i;
        const oneKey = hdKey.derive(path);
        const publicKey = toHex(oneKey.publicKey);
        const privateKey = toHex(oneKey.privateKey);
        const address = toHex(oneKey.pubKeyHash);
        newAddressList[i] = {
          derivationPath: path,
          privateKey: privateKey,
          publicKey: publicKey
        }
      }
      setAddressPairs(newAddressList);
    });
  };

  const handleCopy = () => {
    const jsonAddressPairs = JSON.stringify(addressPairs, null, 2);
    navigator.clipboard.writeText(jsonAddressPairs);
  };

  return (
    <Grid container spacing={4} style={{ padding: '20px' }}>
      {/* 标题 */}
      <Grid item xs={12} style={{ height: '80px', padding: '20px' }}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            批量生成地址 - 基于BIP44
          </Typography>
        </Paper>
      </Grid>
      {/* 摘要 */}
      <Grid item xs={12} style={{ height: '120px', padding: '20px', paddingTop: '30px' }}>
        <Paper elevation={3} style={{ height: '100%', padding: '20px' }}>
          <Typography variant="body1">
            BIP-044是钱包层次确定性生成地址的规范，允许从单个助记词中生成多个地址。在此输入您的助记词，选择要生成的地址对数，然后点击生成按钮。
          </Typography>
          <Typography variant="body1">
            派生规则参考：https://blog.csdn.net/weixin_29491885/article/details/135863277
          </Typography>
        </Paper>
      </Grid>
      {/* 输入部分 */}
      <Grid item xs={12} style={{ padding: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <TextField
            label="输入助记词"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
          />
          <FormControl fullWidth style={{ marginTop: '20px' }}>
            <InputLabel id="num-pairs-select-label">生成地址对数</InputLabel>
            <Select
              labelId="num-pairs-select-label"
              id="num-pairs-select"
              value={numPairs}
              label="生成地址数"
              onChange={(e) => setNumPairs(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: '20px' }}>
            <InputLabel id="coin-select-label">选择币种</InputLabel>
            <Select
              labelId="coin-select-label"
              id="coin-select"
              value={selectedCoin}
              label="选择币种"
              onChange={(e) => setSelectedCoin(e.target.value)}
            >
              {coinList.map((coin) => (
                <MenuItem key={coin.value} value={coin.value}>{coin.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            disabled={!mnemonic.trim()} // 只有当助记词不为空时才可点击
            style={{ marginTop: '20px' }}
          >
            生成
          </Button>
        </Paper>
      </Grid>
      {/* 输出部分 */}
      <Grid item xs={12} style={{ height: "500px", padding: '20px', textAlign: 'left', fontFamily: '"PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei"'  }}>
        <Paper elevation={3} style={{ height: '100%', padding: '20px',  overflow: 'auto', overflowY: 'auto'}}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>派生路径</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>私钥</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>公钥</th>
              </tr>
            </thead>
            <tbody>
              {addressPairs.map((pair, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '8px', textAlign: 'left' }}>{pair.derivationPath}</td>
                  <td style={{ padding: '8px', textAlign: 'left' }}>{pair.privateKey}</td>
                  <td style={{ padding: '8px', textAlign: 'left' }}>{pair.publicKey}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ padding: '20px', paddingTop: '40px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            disabled={addressPairs.length === 0} // 只有在有生成的地址时才可点击
          >
            复制为JSON格式
          </Button>
      </Grid>
    </Grid>
  );
};

export default AddressGenerator;