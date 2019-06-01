/***
 * UI functions
 */

import aesjs from "aes-js";
import URLSearchParams from "@ungap/url-search-params";
import Web3 from "web3";

export function decrypt(text, key) {
  var encryptedBytes = aesjs.utils.hex.toBytes(text);

  // 解密時要建立另一個 Counter 實體
  key = key.getBytes();
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);

  // 將二進位資料轉換回文字
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}

export function convertToPureAccountObject({ address, privateKey }) {
  return { address, privateKey };
}

export function newAccount(accountName, paraphrase, privateKey) {
  if (localStorage.getItem(accountName)) {
    // Registered, throw error
    throw new Error("ValueError: account name is already used.");
  }
  //string,string(length<16)
  let acctobj =
    typeof privateKey === "string" && privateKey !== ""
      ? web3js.eth.accounts.privateKeyToAccount(privateKey)
      : web3js.eth.accounts.create();

  //padding
  let key = ("000000000000000000000000" + paraphrase).slice(-24);
  localStorage.setItem(
    `user-${accountName}`,
    encrypt(JSON.stringify(convertToPureAccountObject(acctobj)), key),
  );
  return acctobj;
}

export function readAccount(accountName, paraphrase) {
  let encryptedacctstring = localStorage.getItem(`user-${accountName}`);
  let key = ("000000000000000000000000" + paraphrase).slice(-24);
  let dec = decrypt(encryptedacctstring, key);
  return web3js.eth.accounts.privateKeyToAccount(JSON.parse(dec).privateKey);
}

export async function sendEther(acctobj, toa, valuea) {
  const amtInWei = web3js.utils.toWei(valuea);
  const signedTransaction = await acctobj.signTransaction({
    to: toa,
    value: amtInWei,
    // gas: 21000,
    gas: 2000000,
    gasPrice: "0x0",
    // chainId: "48170",
    chainId: "0x0",
  });

  //object,string,string

  const receipt = await sendTransaction(signedTransaction);

  sendHistory(
    acctobj.address,
    "out",
    valuea,
    signedTransaction.transactionHash,
    toa,
    "PFA",
  );
  sendHistory(
    toa,
    "in",
    valuea,
    signedTransaction.transactionHash,
    acctobj.address,
    "PFA",
  );
}

export const ihadAddress = "0x33259094d0341c908d1d589b0677a714e58a9183";

export async function sendToken(contractaddress, acctobj, _to, amount) {
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
      .transfer(_to, web3js.utils.toBN(amount * 1e18).toString()) // michaellee8: changed from data.amount to amount
      .encodeABI(),
    // chainId: "48170",

    chainId: "0x0",
  };
  const signedTransaction = await acctobj.signTransaction(rawTransaction);

  const transactionHash = await sendTransaction(signedTransaction);

  sendHistory(
    acctobj.address,
    "out",
    amount,
    signedTransaction.transactionHash,
    _to,
    contractaddress === ihadAddress
      ? "IHAD"
      : `Smart Contract at ${contractaddress}`,
  );
  sendHistory(
    _to,
    "in",
    amount,
    signedTransaction.transactionHash,
    acctobj.address,
    contractaddress === ihadAddress
      ? "IHAD"
      : `Smart Contract at ${contractaddress}`,
  );
  return;
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
    return balance;
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

export async function sendHistory(
  address,
  type,
  absvalue,
  hash,
  counterpartyaddress,
  currency,
) {
  try {
    let params = new URLSearchParams();
    params.set("address", address);
    params.set("type", type);
    params.set("absvalue", absvalue);
    params.set("hash", hash);
    params.set("counterpartyaddress", counterpartyaddress);
    params.set("currency", currency);
    await fetch(`https://history.quorum.mex.gold/transaction`, {
      method: "POST",
      body: params,
    });
  } catch (err) {
    console.log(err);
  }
}

export { web3js };
