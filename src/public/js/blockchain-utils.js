/***
 * UI functions
 */

import aesjs from "aes-js";
import URLSearchParams from "@ungap/url-search-params";
import Web3 from "web3";
import InputDataDecoder from 'ethereum-input-data-decoder';
const axios = require('axios').default;


import { privateToAddress, toBuffer} from 'ethereumjs-util'

export function decrypt(text, key) {
  var encryptedBytes = aesjs.utils.hex.toBytes(text);

  // 解密時要建立另一個 Counter 實體
  key = key.getBytes();
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);

  // 將二進位資料轉換回文字
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}

export function convertToPureAccountObject({address,privateKey,USDTaddress}) {
  return { address,privateKey,USDTaddress };
}

// New Account
export async function newAccount(regionCode, mobile, accessCode, privateKey) {
  const accountName = regionCode + mobile;
  if (localStorage.getItem(accountName)) {
    // Registered, throw error
    throw new Error("ValueError: account name is already used.");
  }

  let acctobj;
  if (typeof privateKey === "string" && privateKey !== "") {
    try {
      privateKey = "0x" + privateKey;
      /*let address = privateToAddress(toBuffer(privateKey)).toString();
      console.log(address)
      acctobj = { address, privateKey };*/
      acctobj = web3js.eth.accounts.privateKeyToAccount(privateKey.toString());
    } catch (e) {
      console.log(e)
      throw new Error('RangeError: Wrong Private Key Format');
    }
  } else {
    acctobj = web3js.eth.accounts.create();
  }

  // TODO : Verify Phone Number & Access Code here
  // const res = await fetch (`https://api.quorum.mex.gold/account/${regionCode}/${mobile}/${accessCode}`);

  let USDTwallet = await createUSDTWallet(acctobj.address);
  console.log(USDTwallet)
  acctobj.USDTaddress = USDTwallet;

  //padding
  let key = ("000000000000000000000000" + accessCode).slice(-24);
  localStorage.setItem(
    `user-${accountName}`,
    encrypt(JSON.stringify({address:acctobj.address,privateKey:acctobj.privateKey, USDTWallet:USDTwallet.address}), key),
  );
  return acctobj;
}

export function readAccount(accountName, paraphrase) {
  let encryptedacctstring = localStorage.getItem(`user-${accountName}`);
  let key = ("000000000000000000000000" + paraphrase).slice(-24);
  let dec = decrypt(encryptedacctstring, key);
  //return convertToPureAccountObjefct(web3js.eth.accounts.privateKeyToAccount(JSON.parse(dec).privateKey));
  return JSON.parse(dec)
}

export function listenUSDTdeposit(USDTaddr,acctobj,callback){
  /*const decoder = new InputDataDecoder(minABI);
  let contract = new web3jsETHWS.eth.Contract(minABI, "0xdAC17F958D2ee523a2206206994597C13D831ec7");
  contract.events.Transfer({
    filter: {to: USDTaddr}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 'latest'
  }, async function(error, event) {
    console.log(event);

    let response = await verifyUSDTDeposit(event.transactionHash)
    console.log(response)
    if(!response.error){
      sendHistory(
        acctobj.address,
        "in",
        response.amount,
        response.hash,
        "exchange",
        "USDT",
        ""
      );
      callback(response.amount)
    }



  })
    .on('data', function(event){
      console.log(event); // same USDresults as the optional callback above

    })
    .on('changed', function(event){
      // remove event from local database
    })
    .on('error', console.error);*/
}

export async function sendEther(acctobj, toa, valuea,memo) {
  const amtInWei = web3js.utils.toWei(valuea);
  const signedTransaction = await web3js.eth.accounts.signTransaction({
    to: toa,
    value: amtInWei,
    // gas: 21000,
    gas: 2000000,
    gasPrice: "0x0",
    // chainId: "48170",
    chainId: "0x0",
  },acctobj.privateKey);

  //object,string,string

  const receipt = await sendTransaction(signedTransaction);


  sendHistory(
    acctobj.address,
    "out",
    valuea,
    signedTransaction.transactionHash,
    toa,
    "PFA",
    memo
  );
  sendHistory(
    toa,
    "in",
    valuea,
    signedTransaction.transactionHash,
    acctobj.address,
    "PFA",
    memo
  );
  var currentDate = new Date();

  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();

  var dateString = date + "-" +(month + 1) + "-" + year +` ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  let storeobj = {
    from:acctobj.address,
    to:toa,
    type:"PFA",
    amt:valuea,
    time:dateString,
    memo:memo
  }
  localStorage.setItem(
    `hist-${signedTransaction.transactionHash}`,
    JSON.stringify(storeobj)
  )
}

export const ihadAddress = "0x33259094d0341c908d1d589b0677a714e58a9183";

export async function sendToken(contractaddress, acctobj, _to, amount,memo) {
  let _from = acctobj.address;
  var count = await web3js.eth.getTransactionCount(_from);
  let contract = new web3js.eth.Contract(minABI, contractaddress);

  var rawTransaction = {
    from: _from,
    nonce: "0x" + count.toString(16),
    gasPrice: "0x0",
    gas: "0x30D40",
    to: contractaddress,
    value: "0x0",
    data: contract.methods
      .transfer(_to, web3js.utils.toWei(amount)) // michaellee8: changed from data.amount to amount
      .encodeABI(),
    // chainId: "48170",

    chainId: "0x0",
  };
  const signedTransaction = await web3js.eth.accounts.signTransaction(rawTransaction,acctobj.privateKey);

  const transactionHash = await sendTransaction(signedTransaction);

  //if(contractaddress==="0xfbd0f2a657633c15637c6c21d45d1d5f78860e27"){
    //verifyUSDTWithdrawal(signedTransaction.transactionHash)
  //}

  let symbol ;
  switch (contractaddress) {
    case ihadAddress:
      symbol="HAD";
      break;
    default:
      symbol="USDT"
      break
  }
  var currentDate = new Date();

  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();

  var dateString = date + "-" +(month + 1) + "-" + year +` ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  let storeobj = {
    from:acctobj.address,
    to:_to,
    type:symbol,
    amt:amount,
    time:dateString,
    memo:memo
  }
  localStorage.setItem(
    `hist-${signedTransaction.transactionHash}`,
    JSON.stringify(storeobj)
  )

  sendHistory(
    acctobj.address,
    "out",
    amount,
    signedTransaction.transactionHash,
    _to,
    symbol,
    memo
  );
  sendHistory(
    _to,
    "in",
    amount,
    signedTransaction.transactionHash,
    acctobj.address,
    symbol,
    memo
  );
  return;
 /* await web3.eth.accounts.signTransaction(rawTX, acctobj.privateKey, function(error, success) {
      if (!error) {
        //something for UI
          sendTransaction(success.rawTransaction,function(receipt){
            //TODO: post
        })
      } else {
        //something for UI
      }
    });*/


}
export const USDTaddress = "0xfbd0f2a657633c15637c6c21d45d1d5f78860e27";
export async function USDTToIHAD(acctobj, amount) {
  let _from = acctobj.address;
  var count = await web3js.eth.getTransactionCount(_from);
  let contractaddress = USDTaddress;
  let contract = new web3js.eth.Contract(minABI, contractaddress);
  var exchangeaddress = "0xebc5e7221ac1c1ffeaee3e49bf1912a189192f6d";
  var rawTX = {
    from: _from,
    nonce: "0x" + count.toString(16),
    gasPrice: "0x0",
    gas: "0x30D40",
    to: contractaddress,
    value: "0x0",
    data: contract.methods
      .approve(exchangeaddress,web3js.utils.toWei(amount)) // michaellee8: changed from data.amount to amount
      .encodeABI(),
    chainId: '0x0'
  };
  const st1 = await web3js.eth.accounts.signTransaction(rawTX, acctobj.privateKey)
      //something for UI

  await sendTransaction(st1)


  let contract2 = new web3js.eth.Contract(USDTtoIHADABI, exchangeaddress);
  var rawTX2 = {
        from: _from,
        nonce: "0x" + (count+1).toString(16),
        gasPrice: "0x0",
        gas: "0x30D40",
        to: exchangeaddress,
        value: "0x0",
        data: contract2.methods
          .convertToIHAD() // michaellee8: changed from data.amount to amount
          .encodeABI(),
        chainId: '0x0'
  };
  var st2 = await web3js.eth.accounts.signTransaction(rawTX2, acctobj.privateKey)

  await sendTransaction(st2)
          // COMPLETE EXCHSNGE
          sendHistory(
            acctobj.address,
            "out",
            amount,
            st2.transactionHash,
            exchangeaddress,
            "USDT","交換")
          sendHistory(
            acctobj.address,
            "in",
            amount / 1.5,
            st2.transactionHash,
            exchangeaddress,
            "HAD","交換")






}

export async function IHADToUSDT(acctobj, amount) {
  let _from = acctobj.address;
  var count = await web3js.eth.getTransactionCount(_from);
  let contractaddress = ihadAddress;
  let contract = new web3js.eth.Contract(minABI, contractaddress);
  var exchangeaddress = "0xebc5e7221ac1c1ffeaee3e49bf1912a189192f6d";
  var rawTX = {
    from: _from,
    nonce: "0x" + count.toString(16),
    gasPrice: "0x0",
    gas: "0x30D40",
    to: contractaddress,
    value: "0x0",
    data: contract.methods
      .approve(exchangeaddress, web3js.utils.toWei(amount)) // michaellee8: changed from data.amount to amount
      .encodeABI(),
    chainId: '0x0'
  };
  console.log(web3js.utils.toWei(amount))
  const st1 = await web3js.eth.accounts.signTransaction(rawTX, acctobj.privateKey)
  //something for UI

  await sendTransaction(st1)


  let contract2 = new web3js.eth.Contract(USDTtoIHADABI, exchangeaddress);
  var rawTX2 = {
    from: _from,
    nonce: "0x" + (count+1).toString(16),
    gasPrice: "0x0",
    gas: "0x30D40",
    to: exchangeaddress,
    value: "0x0",
    data: contract2.methods
      .convertToUSDT() // michaellee8: changed from data.amount to amount
      .encodeABI(),
    chainId: '0x0'
  };
  var st2 = await web3js.eth.accounts.signTransaction(rawTX2, acctobj.privateKey)

  await sendTransaction(st2)
  // COMPLETE EXCHSNGE
  sendHistory(
    acctobj.address,
    "out",
    amount,
    st2.transactionHash,
    exchangeaddress,
    "HAD","交換")
  sendHistory(
    acctobj.address,
    "in",
    amount * 1.5,
    st2.transactionHash,
    exchangeaddress,
    "USDT","交換")






}

export async function etherBalance(acctobj) {
  //object

  try {
    let _from = acctobj.address;
    const weiBal = await web3js.eth.getBalance(_from, "latest");
    return web3js.utils.fromWei(weiBal);
  } catch (err) {
    console.log(err);
  }
}

export async function tokenBalance(acctobj, contractaddress) {
  //object

  try {
    let _from = acctobj.address;
    let contract = new web3js.eth.Contract(minABI, contractaddress);
    const balance = await contract.methods.balanceOf(_from).call();
    return balance/1000000000000000000;
  } catch (err) {
    console.log(err);
  }
}

export async function tokenBalanceETH(acctobj, contractaddress) {
  //object

  try {
    let _from = acctobj.address;
    let contract = new web3jsETH.eth.Contract(minABI, contractaddress);
    const balance = await contract.methods.balanceOf(_from).call();
    return balance/1000000;
  } catch (err) {
    console.log(err);
  }
}

export function readAccountList() {
  const accountNames = Array.apply(0, new Array(localStorage.length))
    .map(function(o, i) {
      return localStorage.key(i);
    })
    .filter(name => name.slice(0, 5) === "user-");
  return accountNames;
}

export function exportAccounts() {
  let obj = {};
  readAccountList().forEach(key => {
    obj[key] = localStorage.getItem(key);
  });
  return btoa(JSON.stringify(obj));
}

export function importAccounts(data) {
  let obj = JSON.parse(atob(data));
  Object.keys(obj).forEach(key => {
    localStorage.setItem(key, obj[key]);
  });
}

export function readHistory() {
  //TODO: implement history server
}

/***
 * Utility functions
 */
let web3js;
let web3jsETH,web3jsETHWS;

function ret(arg) {
  return arg;
}
export function initweb3() {
  /* Fallback to local node or remote node
       by default local HTTP-RPC server exposes port 8545.
       you can use web3js Node Urls also
       'https://ropsten.web3js.io/<API KEy>'*/
  web3js = new Web3(
    new Web3.providers.HttpProvider("https://quorum.mex.gold/"),
  );
  web3jsETH = new Web3(
    new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/f562f3edf8ea4f6f9ed87b518fc0ddc9"),
  );
  //wss://mainnet.infura.io/ws/v3/
  web3jsETHWS = new Web3(
    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/f562f3edf8ea4f6f9ed87b518fc0ddc9"),
  );
}

String.prototype.getBytes = function() {
  var bytes = [];
  for (var i = 0; i < this.length; ++i) {
    bytes.push(this.charCodeAt(i));
  }
  return bytes;
};
// You should initialize web3 instance after window load event has fired to avoid any race condition.

// window.addEventListener("load", initweb3);

export function encrypt(text, key) {
  //strings
  key = key.getBytes();
  var textBytes = aesjs.utils.utf8.toBytes(text);

  // Counter 可省略，若省略則從 1 開始
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

  // 加密過後的資料是二進位資料，若要輸出可轉為十六進位格式
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  console.log(encryptedHex);
  return encryptedHex;
}

// export async function sendTransaction(rawTX) {
//   //private, not intended for UI use
//   console.log(await web3js.eth.sendSignedTransaction(rawTX.rawTransaction)); //or define some functions
// }

export function sendTransaction(rawTX) {
  //private, not intended for UI use
  return new Promise((resolve, reject) =>
    web3js.eth
      .sendSignedTransaction(rawTX.rawTransaction)
      .on("transactionHash", function(hash) {
        resolve(hash);
      })
      .on("error", function(err) {
        reject(err);
      }),
  );
}

let minABI = [
  // transfer
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",

  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
];

export async function getHistory(addr) {
  const res = await fetch(
    `https://history.quorum.mex.gold/transactionlist/${addr}`,
  );
  let history = await res.json();
  history.sort(function(h1, h2) {
    return new Date(h2.time).getTime() - new Date(h1.time).getTime();
  });
  return history;
}

let DestroyerABI= [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "amt",
        "type": "uint256"
      }
    ],
    "name": "destroy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Destroyed",
    "type": "event"
  }
]

export async function sendUSDT(addr,amount,acctobj,memo) {
  let balance = await tokenBalanceETH({address:"0x89D295497DDADaA6776c251dbEF33aCFB80918AF",privateKey:"xx"},"0xdac17f958d2ee523a2206206994597c13d831ec7")
  console.log(balance)
  console.log(web3js.utils.toWei(amount))
  if(balance<amount){
    throw new Error("pool lack balance")

  }
  let _from = acctobj.address;
  var count = await web3js.eth.getTransactionCount(_from);
  let contractaddress = USDTaddress;
  let contract = new web3js.eth.Contract(minABI, contractaddress);
  var exchangeaddress = "0x1851faec1214a4f46cabc208216541bca4400738";
  var rawTX = {
    from: _from,
    nonce: "0x" + count.toString(16),
    gasPrice: "0x0",
    gas: "0x30D40",
    to: contractaddress,
    value: "0x0",
    data: contract.methods
      .approve(exchangeaddress, web3js.utils.toWei(amount)) // michaellee8: changed from data.amount to amount
      .encodeABI(),
    chainId: '0x0'
  };
  const st1 = await web3js.eth.accounts.signTransaction(rawTX, acctobj.privateKey)
  //something for UI

  await sendTransaction(st1)

  let exchange = new web3js.eth.Contract(DestroyerABI, contractaddress);
  var rawTX2 = {
    from: _from,
    nonce: "0x" + (count+1).toString(16),
    gasPrice: "0x0",
    gas: "0x30D40",
    to: exchangeaddress,
    value: "0x0",
    data: exchange.methods
      .destroy(addr,web3js.utils.toWei(amount)) // michaellee8: changed from data.amount to amount
      .encodeABI(),
    chainId: '0x0'
  };

  const st2 = await web3js.eth.accounts.signTransaction(rawTX2, acctobj.privateKey)
  //something for UI

  let txHash = await sendTransaction(st2)

  console.log(txHash)

  verifyUSDTWithdrawal(txHash)

  sendHistory(
    acctobj.address,
    "out",
    amount,
    st2.transactionHash,
    "exchange",
    "USDT",
    memo
  );

  return st2.transactionHash;

  var currentDate = new Date();

  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();

  var dateString = date + "-" +(month + 1) + "-" + year +` ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  let storeobj = {
    from:acctobj.address,
    to:addr,
    type:"USDT",
    amt:amount,
    time:dateString,
    memo:memo
  }
  localStorage.setItem(
    `hist-${st2.transactionHash}`,
    JSON.stringify(storeobj)
  )
}

export async function sendHistory(
  address,
  type,
  absvalue,
  hash,
  counterpartyaddress,
  currency,
  memo
) {
  try {
    let params = new URLSearchParams();
    params.set("address", address);
    params.set("type", type);
    params.set("absvalue", absvalue);
    params.set("hash", hash);
    params.set("counterpartyaddress", counterpartyaddress);
    params.set("currency", currency);
    params.set("memo",encodeURIComponent(memo));
    await fetch(`https://history.quorum.mex.gold/transaction`, {
      method: "POST",
      body: params,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function createUSDTWallet(
  regionCode, mobile, token, privateKey, address
) {
  const response = await axios.post(`https://api.quorum.mex.gold/account/${regionCode}/${mobile}/${token}`, { privateKey, address });
  console.log(response.data);
}

export async function getUSDTWallet(regionCode, mobile, token) {
  const response = await axios.get(`https://api.quorum.mex.gold/account/${regionCode}/${mobile}/${token}`);
  console.log(response.data);
  return response.data; // { privateKey, address }
}

export async function verifyUSDTDeposit(
  address,

) {

  let response = await fetch(`https://api.quorum.mex.gold/verifyTransaction/`+address);

  let addr = await response.json();
  //response.json().then(data => {
  //console.log(data)
  //return data.address;
  // do something with your data
  //});
  //console.log(address+"sds")
  return addr


}

export async function verifyUSDTWithdrawal(
  address,

) {

  let response = await fetch(`https://api.quorum.mex.gold/verifyWithdrawalTransaction/`+address);

  let addr = await response.json();
  //response.json().then(data => {
  //console.log(data)
  //return data.address;
  // do something with your data
  //});
  //console.log(address+"sds")
  return addr


}



let USDTtoIHADABI = [
  {
    "constant": false,
    "inputs": [],
    "name": "convertToIHAD",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "convertToUSDT",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "rate",
        "type": "uint32"
      }
    ],
    "name": "setRetainRate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "rate",
        "type": "uint32"
      }
    ],
    "name": "setUSDTrate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawIHAD",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawUSDT",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from_",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to_",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount_",
        "type": "uint256"
      }
    ],
    "name": "ConvertSuccessful",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from_",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to_",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount_",
        "type": "uint256"
      }
    ],
    "name": "ConvertFailed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "addressEcho",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getRetainRate",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getUSDTrate",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

let associativeWalletABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_token",
        "type": "address"
      },
      {
        "name": "PFA",
        "type": "address"
      }
    ],
    "name": "createWallet",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "action",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WalletEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "ETH",
        "type": "address"
      }
    ],
    "name": "ETHWalletToPFAWallet",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getWallets",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "PFA",
        "type": "address"
      }
    ],
    "name": "PFAWalletToETHWallet",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "wallets",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export { web3js };
