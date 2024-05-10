import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import * as bip39 from '@scure/bip39';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import { wordlist as japanese } from '@scure/bip39/wordlists/japanese';
import { wordlist as korean } from '@scure/bip39/wordlists/korean';
import { wordlist as simplifiedChinese } from '@scure/bip39/wordlists/simplified-chinese';
import { wordlist as traditionalChinese } from '@scure/bip39/wordlists/traditional-chinese';


const MnemonicGenerator = () => {
  const [language, setLanguage] = useState('english');
  const [wordCount, setWordCount] = useState(128);
  // 可以进行UI上的优化
  const [mnemonicChunks, setMnemonicChunks] = useState([]);
  const [mnemonic, setMnemonic] = useState('');

  const generateMnemonic = () => {
    // 根据选择的语言和助记词长度生成助记词的逻辑
    let wl = english;
    if (language === 'chinese_simplified') {
      wl = simplifiedChinese;
    } else if (language === 'chinese_traditional') {
      wl = traditionalChinese;
    } else if (language === 'japanese') {
      wl = japanese
    } else if (language === 'korean') {
      wl = korean
    }
    // 这里你需要编写生成助记词的代码
    const mnemonic = bip39.generateMnemonic(wl, wordCount);
    // 生成的助记词存储在mnemonic变量中
    setMnemonic(mnemonic);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
  };

  const clearClipboard = () => {
    navigator.clipboard.writeText('');
  };

  return (
    <Grid container spacing={4} style={{ padding: '20px' }}>
      {/* 标题 */}
      <Grid item xs={12} style={{ height: '80px', padding: '20px' }}>
        <Paper elevation={3} style={{ height: '90%', padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            助记词生成工具
          </Typography>
        </Paper>
      </Grid>
      {/* 摘要 */}
      <Grid item xs={12} style={{ height: '120px', padding: '20px', paddingTop: '30px' }}>
        <Paper elevation={3} style={{ height: '100%', padding: '20px' }}>
          <Typography variant="body1">
            该工具用于生成助记词。请选择语言和助记词长度，然后点击生成按钮生成一组助记词。
          </Typography>
          <br />
          <Typography variant="body1">
            助记词（mnemonic phrase）是从一个固定的单词列表中选出的12、15、18、21或24个单词，这些单词按照顺序排列，可用于备份和恢复加密货币钱包。
          </Typography>
        </Paper>
      </Grid>
      {/* 选项区域 */}
      <Grid item xs={12} sm={6} style={{ height: '30px', padding: '20px', paddingTop: '60px' }}>
        <FormControl fullWidth>
          <InputLabel id="language-select-label">选择语言</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            label="选择语言"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="english">英文</MenuItem>
            <MenuItem value="chinese_simplified">简体中文</MenuItem>
            <MenuItem value="chinese_traditional">繁体中文</MenuItem>
            <MenuItem value="japanese">日文</MenuItem>
            <MenuItem value="korean">韩文</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} style={{ padding: '20px', paddingTop: '60px' }}>
        <FormControl fullWidth>
          <InputLabel id="word-count-select-label">选择助记词长度</InputLabel>
          <Select
            labelId="word-count-select-label"
            id="word-count-select"
            value={wordCount}
            label="选择助记词长度"
            onChange={(e) => setWordCount(e.target.value)}
          >
            <MenuItem value={128}>12个</MenuItem>
            <MenuItem value={160}>15个</MenuItem>
            <MenuItem value={192}>18个</MenuItem>
            <MenuItem value={224}>21个</MenuItem>
            <MenuItem value={256}>24个</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* 生成按钮 */}
      <Grid item xs={6} sm={6} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Button variant="contained" color="primary" onClick={generateMnemonic} fullWidth>
          随机生成
        </Button>
      </Grid>
      {/* 复制按钮 */}
      <Grid item xs={3} sm={3} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Button variant="contained" color="primary" onClick={copyToClipboard} disabled={!mnemonic} fullWidth>
          复制助记词到剪贴板
        </Button>
      </Grid>
      <Grid item xs={3} sm={3} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Button variant="contained" color="primary" onClick={clearClipboard}>
          清除剪贴板
        </Button>
      </Grid>
      {/* 助记词展示区域 */}
      <Grid item xs={12} style={{ height: '30vh', padding: '20px', textAlign: 'center', fontFamily: '"PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei"' }}>
        <Paper elevation={3} style={{ height: '100%', padding: '20px', lineHeight: '1.8', }}>
          {mnemonic.split(' ').map((word, index) => (
            word && (<span key={index} style={{ marginRight: '10px', marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px', display: 'inline-block', width: 'calc(100% / 6)', boxSizing: 'border-box' }}>
              {index + 1}. {word}
            </span>
          )))
          }
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MnemonicGenerator;
