/**
 * 国际化配置文件
 * ch:中文
 * en:英文
 */
export default {
  dashboards: {
    backUp: { ch: "備份", en: "Back up" },
    message: { ch: "消息", en: "Message" },
    manual:  { ch: "說明", en: "Manual" },
    hadOnline: { ch: "HAD上線", en: "HAD online" },
    market: { ch: "市場", en: "Market" },
    price: { ch: "最新價", en: "Price" },
    volume: { ch: "成交量(USDT)", en: "Volume(USDT)" },
    single: { ch: "單一錢包備份", en: "Single Wallet Private Key" },
    singlefull: { 
      ch: "您備份的是這個錢包，當你注冊錢包時可以導入這個錢包帳戶，亦和以太坊HEX制式互聯互通，唯一不同的是這個PFA錢包只適用PFA公有區塊鏈上的通證，若你將以太坊區塊鏈的通證發到你這個錢包，請導出私鑰到以太坊公有鏈錢包，便可找回你的代幣。", 
      en: "Your back up is only about one private key, it is compatible with Ethereum HEX address, but this PFA Wallet only applies PFA Public chain. If you have sending ethereum token to here, please export your private key to Eth wallet." 
    },
    showPrivateKey: { ch: "顯示密鑰", en: "Show private key" },
    entire: { ch: "整個錢包備份", en: "Back up entire account" },
    entirefull: { ch: "將你所有錢包備份一次，這包括了本程式上的所有錢包帳戶。請在登入頁面「導入PFA錢包使用」。", en: "This back up included all wallet account this wallet have, please use this at log-in page : Import PFA wallet" },
  },
  footNavigations: {
    message: { ch: "暫未提供，升級後開放市場新聞功能", en: "Will be updated shortly"}
  },
  convertPage: {
    pay: { ch: "支 付", en: "Pay" },
    receive: { ch: "收 取", en: "Receive" },
  },
  createAccountPage: {
    ERC20: { ch: "我已有 ERC-20 版本的 PFA", en: "I already have ERC20 Private Key" },
    remember: { ch: "請謹記你的私鑰及密碼", en: "Please remember your Private key and passeword" },
    rememberfull: {
      ch: "個人區塊鏈錢包生成後﹐密碼和私鑰不能再更改﹗\n" +
        "我們沒有辦法為你重設帳戶﹗<br/>\n" +
        "必須備份您的私鑰，我們不能為您重設及找回﹗<br/>\n" +
        "這些事情我們是做不到的<br/>\n" +
        "\n" +
        "<ul><li>為您操控這個錢包</li>\n" +
        "<li>恢復/ 重設/ 更改錢包上的任何資訊</li>\n" +
        "<li>取消或更改任何交易</li>\n" +
        "<li>凍結您的錢包</li></ul><br/>\n" +
        "\n" +
        "做任何交易前請再三核對資料<br/><br/>關閉此彈窗及繼續註冊即為同意。",
      en: "After your wallet created, password and private key in non-changeable ; We CANNOT reset the account for you;\n" +
        "Please back-up your account immediately, We CANNOT reset and find your decentralized wallet.<br/>\n" +
        "Here is something we cannot provide:<br/>\n" +
        "\n" +
        "<ul><li>control this wallet</li>\n" +
        "<li>restore/reset/change information in your wallet</li>\n" +
        "<li>cancel or change any transaction</li>\n" +
        "<li>Frozen your account</li></ul><br/>\n" +
        "\n" +
        "Please be very very careful of your transaction.<br/><br/>" +
        "Close this page means you understand and agree with this terms.",
    },
    onlyEn: { ch: "只支援英數字元", en: "Only support English account name" },
    onlyAz: { ch: "只支援拉丁字元（A-Z）", en: "Only support A-Z" },
  },

  //公共
  fta: { ch: "普惠資產" },
  password: { ch: "密碼", en: "Password" },
  username: { ch: "帳戶名稱", en: "User name" },
  passwordAgain: { ch: "重新輸入密碼", en: "Type in your password again", },
  accountCreationWarning1: {
    ch: "注意，請緊記密碼。", en: "Important: please remember your password",
  },
  accountCreationWarning2: {
    ch: "基於安全考慮，一旦遺失密碼，將永久丟失用戶存取權。", 
    en: "Base on security consideration, if you forgot your private key or password, you will forever lost your wallet.",
  },
  passwordLengthWarning: {
    ch: "密碼必須有八位以上", en: "Password requires 8 characters",
  },
  passwordAgainNotMatchWarning: {
    ch: "此欄位必須和上一個欄位一樣", en: "This password must be the same as previous one",
  },
  usernameEmptyWarning: {
    ch: "用戶名稱不能為空", en: "user name cannot be blank",
  },
  submit: {
    ch: "提交",
  },
  accountCreatedInfo: {
    ch: "帳戶已被新增", en: "Account have been created",
  },
  accountNotCreatedInfo: {
    ch: "不能新增帳戶，請檢查是否有同名帳戶。請考慮使用其他帳戶名稱。",
  },
  register: {
    ch: "註冊", en: "Sign-Up"
  },
  login: {
    ch: "登入", en: "Sign-In"
  },
  logOut:{
    ch: "退出", en: "Logout"
  },
  cannotLoginWarning: {
    ch: "未能登入，請檢查帳號及密碼是否輸入錯誤。", en: "Cannot login, please verify your password",
  },
  buy: {
    ch: "購買",en: "Purchase",
  },
  send: {
    ch: "傳送",en: "Transfer",
  },
  receive: {
    ch: "接收",en: "Accept"
  },

  privateKey: {
    ch: "密鑰",
  },
  from: {
    ch: "由",en: "From"
  },
  to: {
    ch: "到",en: "To"
  },
  asset: {
    ch: "資產",en: "Asset"
  },
  amount: {
    ch: "數量",en: "Amount"
  },
  transactionFinishedInfo: {
    ch: "交易已傳送，正等待網絡處理。", en: "Transaction have been broadcasted, please wait for network process.",
  },
  transactionFailedWarning: {
    ch: "交易未能傳送，請檢查輸入資料。", en: "Transaction cannot transfer, please check input information.",
  },
  exportInstructionInfo1: {
    ch: "先將以下方格的帳戶資料複製至另一裝置，然後將資料貼上至新裝置中的方格中，並按確定，即可完成帳戶轉移。",
    en: "Please copy below text and paste on other device, so that the account can be transfered to other device.",
  },
  exportInstructionInfo2: {
    ch: "注意，一旦貼上在新裝置上完成帳戶轉移，在新裝置的原有帳戶可能被移除。", 
    en: "Please be noted that once you pasted this text, the origin account will be removed.",
  },
  copyHere: {
    ch: "這裡複製", en: "Copy Here",
  },
  pasteHere: {
    ch: "這裡貼上", en: "Paste Here",
  },
  import: {
    ch: "匯入", en: "Import Key",
  },
  back: {
    ch: "返回", en: "Back",
  },
  importSuccessInfo: {
    ch: "匯入成功。", en: "Import successful",
  },
  importFailedWarning: {
    ch: "匯入失敗，請待匯入成功後才刪除原有裝置資料。", en: "Import fail, please dont delete original key before import successful",
  },
  accountImportExport: {
    ch: "帳戶匯入／匯出",
  },
  optionalExistingPrivateKey: {
    ch: "現有私鑰（選填）", en: "Import Private Key (Optional)"
  },
  transactionDelayInfo: {
    ch: "注意，網絡可能需要一定時間處理交易，請稍等。",en: "Aware: It may take some time"
  },
  transactionRecord: {
    ch: "交易記錄",en: "Transaction record"
  },
  hangqing: {
    ch: "幣市行情",
  },
  noTransactionInfo: {
    ch: "暫時未有記錄",en: "No record recently"
  },
  convert: {
    ch: "轉換",
  },
  wrongPrivateKeyFormat: {
    ch: "密鑰格式錯誤，請注意去掉密鑰前0x", en: 'Private key format incorrect, please aware any "0x" in the beginning was mistakenly input.',
  },
  dashboard: {
    ch: "儀表板",
  },
  history: {
    ch: "交易歷史",
  },
  aboutus: {
    ch: "關於我們", en: "About Us",
  },
  usemethod: {
    ch: "使用說明", en: "User Manual"
  },
  privacy: {
    ch: "私隱權條例", en: "Private policy",
  },
  tos: {
    ch: "使用細則", en: "Terms",
  },
  pfaMessage: {
    ch: "PFA消息", en: "PFA NEWS",
  },
  valuation:{
    ch: "資產估值(USDT)",en: "Asset value(USDT)"
  },
  UsdtVules:{
    ch: "0.01512701",
  },
  UsdtCode:{
    ch: "USDT",en: "USDT",
  },
  conversion:{
    ch: "≈￥1123.12",
  },
  Recharge:{
    ch: "充值", en: "Charge"
  },
  withdrawal:{
    ch: "提取",en: "Withdraw"
  },
  assets:{
    ch: "顯示所有資產",en: "Show all asset"
  },
  title:{
    ch: "資金",en: "Asset"
  },
  details:{
    ch: "詳細資料", en:"Details"
  },
  detailsTitle:{
    ch: "詳細資料",en:"Details"
  },
  detailsAddress:{
    ch: "NDJHSIAHDISHDSD",
  },
  currency:{
    ch: "幣種",en:"Token"
  },

  address:{
    ch: "地址",en:"Address"
  },
  date:{
    ch: "日期",en:"Date"
  },
  time:{
    ch: "時間",en:"Time"
  },
  dataCurrency:{
    ch:"收HAD",en:"rece.HAD"
  },
  dataAmount:{
    ch:"100",en:"100"
  },
  dataAddress:{
    ch:"Ox7B135..",en:"Ox7B135.."
  },
  dataDate:{
    ch:"8月7日",en:"8/7"
  },
  dataTime:{
    ch:"04:24",en:"04:24"
  },
  dataRamarks:{
    ch:"備註：XXXXX",en:"Note:xxxxxx"
  },

  dataCurrencyTwo:{
    ch:"發USDT",en:"send.USDT"
  },
  dataAmountTwo:{
    ch:"10000",en:"10000"
  },
  dataAddressTwo:{
    ch:"Ox7B135..",en:"Ox7B135.."
  },
  dataDateTwo:{
    ch:"8月7日",en:"8/7"
  },
  dataTimeTwo:{
    ch:"04:24",en:"04:24"
  },
  
  tosfull: {
    ch:
      "使用條款訪問或使用位於https://PriceFitchAsset.com的令牌流動性網絡網站和API，以及任何鏈接或定向的子域名（例如https://app.PriceFitchAsset.com）（“網站”）和任何通過本網站提供的內容，您（“用戶”和與使用本網站的其他人共同使用 - “用戶”）同意受這些使用條款（“條款”）的約束。<br/><p/>" +
      "請仔細閱讀這些條款。這些條款約束您訪問和使用本網站和內容（如本文所定義）。通過使用內容或訪問本網站，即表示您同意這些條款和我們的隱私政策，其當前版本可在https://www.PriceFitchAsset.com/privacy-policy獲得，該文件在此引用作為參考並且可以自行決定隨時修改，恕不另行通知。可能會不時對這些條款進行更改。這些更改將在該時刻應用於本網站的當前和後續使用。您放棄任何您可能必須收到此類更改或修改的特定通知的權利。您繼續使用本網站即表示接受此類更改或修改。如果您在訪問或使用本網站時不同意有效條款，則必須停止使用本網站。<br/><p/>" +
      "如果您不同意任何這些條款，請不要使用本網站或內容。<br/>" +
      "1.資格<br/>" +
      "通過訪問或使用本網站，您聲明並保證，如果您的居住國和/或公民身份所適用的法律禁止您根據這些條款禁止使用本網站，則您將不會使用本網站。<br/><p/>" +
      "2.網站內容<br/>" +
      "一個。該站點提供了一個在線平台，允許您訪問受支持的區塊鏈並與之交互，並提供自主轉換機制的選項，包括不同支持的區塊鏈之間。此類轉換可以是由中繼令牌（統稱為“令牌”）持有的不同智能令牌或其他支持的標準令牌（適用於相關支持的區塊鏈;例如，以太坊區塊鏈上的標準ERC20令牌）。灣通過本網站，您可以（以下內容稱為“內容”）：<br/>" +
      "i。查看有關不同令牌的信息; <br/>" +
      "II。查看支持的電子錢包（“電子錢包”或“電子錢包”）中的信息;<br/>" +
      "III。自己構建事務（在站點界面的幫助下），然後您可以將其發送到區塊鏈。<br/>" +
      "IV。 PriceFitchAssetX交叉區塊鏈接口，幫助您使用BNT，並在支持的區塊鏈上轉換令牌;<br/>" +
      "V。與本網站上的其他用戶進行互動和溝通，參與討論並從本網站的社區接收信息;<br/>" +
      "VI。管理您的電子錢包（與帳戶相關聯），使您能夠發送或接收令牌，在令牌之間進行轉換，查看歷史數據，並輕鬆地在區塊鏈上進行交易;<br/>" +
      "VII。接收有關您電子錢包中活動的通知;第i，ii和iii小節中詳述的服務可供本網站上的所有用戶使用（無需帳戶），而第iv，v和vi小節中詳述的服務可通過在網站上創建您自己的帳戶獲得（ “帳戶”）。要創建帳戶，您必須指定顯示名稱帳戶（“顯示名稱”）並將帳戶與指定的電子錢包相關聯。<br/><p/>" +
      "3.創建您的帳戶<br/>" +
      "上述第（ii）i，ii和iii節中詳述的內容可供本網站上的所有用戶使用（無需帳戶），而第2節（b）中iv，v和vi中詳述的內容均為可以通過在網站上創建自己的帳戶（“帳戶”）來獲得。創建帳戶：要創建帳戶，您必須指定顯示名稱帳戶（“顯示名稱”）並將帳戶與指定的電子錢包相關聯。您的顯示名稱：顯示名稱可以是您選擇的任何名稱，並將在本網站上公開顯示給所有其他用戶。選擇顯示名稱時，請考慮它主要用於使您能夠與本網站上的其他用戶進行交互。您可以隨時更改您的顯示名稱。<br/><p/>" +
      "4.創建您的電子錢包<br/>" +
      "PriceFitchAsset無法控制您的電子錢包。請注意，您的錢包由您自己負責，並始終由您自己控制。通過您的帳戶，您可以輕鬆訪問自己的電子錢包 - PriceFitchAsset無法訪問您的電子錢包，也無法控制每個帳戶。",
    en:
      "TERMS OF USE  By accessing or using the Token Liquidity Network website and API located at https://PriceFitchAsset.com, and any linked or directed subdomain (such as https://app.PriceFitchAsset.com) (the “Site”) and any content made available through the Site, you (the “User” and collectively with others using the Site - “Users”) agree to be bound by these Terms of Use (“Terms”). The rights in the Site are held by Bprotocol Foundation, a Swiss foundation, with legal seat in Zug, Switzerland, registered in the Swiss commercial register under UID CHE-181.679.849 (“PriceFitchAsset”), and the terms “we,” “us,” and “our” refer to PriceFitchAsset. Please read these Terms carefully. These Terms govern your access to and use of the Site and Content (as defined herein). By using the Content or visiting the Site, you signify your consent to both these Terms and our Privacy Policy, a current version of which is available at https://www.PriceFitchAsset.com/privacy-policy, which is incorporated herein by reference and which may be modified from time to time at our sole discretion and without prior notice. Changes may be made to these Terms from time to time. These changes will apply at that instant to all then current and subsequent uses of the Site. You waive any right you may have to receive specific notice of such changes or modifications. Your continued use of this Site acts as acceptance of such changes or modifications. If you do not agree to the Terms in effect when you access or use the Site, you must stop using the Site.\n" +
      "IF YOU DO NOT AGREE TO ANY OF THESE TERMS, PLEASE DO NOT USE THE SITE OR CONTENT.\n" +
      "1. Eligibility\n" +
      "By accessing or using the Site, you represent and warrant that you will not use the Site if the laws applicable to you of due to your country of residency and/or citizenship prohibit you from doing so in accordance with these Terms.\n" +
      "2. Site Content\n" +
      "a. The Site offers an online platform that allows you to gain access and interact with supported blockchains and presents options of autonomous conversion mechanisms, including between the different supported blockchains. Such conversions may be of different Smart Tokens or other supported standards tokens (applicable to the relevant supported blockchans; for example, standard ERC20 tokens on Ethereum blockchain) that are held by Relay Tokens (collectively, “Tokens”). b. Through the Site, you can (the following shall be referred to as the “Content”): i. View information relating different Tokens; ii. View the information from supported electronic wallets (“Electronic Wallet” or “Wallet”); iii. Build transactions yourself (with the assistance of the Site’s interfaces), which you may then send to the blockchain. iv. PriceFitchAssetX cross-blockchain interface, assisting you to use your BNT, and convert between Tokens on the supported blockchains; v. Interact and communicate with other Users on the Site, participate in discussions and receive information from the Site’s community; vi. Manage your Wallet (associated with the Account), enabling you to send or receive Tokens, convert between Tokens, view historical data, and easily transact on the blockchain; vii. Receive notifications regarding activities in your Wallet; The Services detailed in sub-sections i, ii and iii are available to all Users on the Site (without requiring an Account), while those detailed in sub-sections iv, v and vi are available by creating your own account on the Site (the “Account”).To create your Account, you must assign a display name Account (“Display Name”) and associate the Account to your designated Wallet.\n" +
      "3. Create Your Account\n" +
      "The Content detailed in Sections 2.(b) i, ii and iii above, are available to all Users on the Site (without requiring an Account), while those detailed in in Sections 2.(b) iv, v and vi above are available by creating your own account on the Site (the “Account”). Create Your Account: To create your Account, you must assign a display name Account (“Display Name”) and associate the Account to your designated Wallet. Your Display Name: The Display Name can be any name of your choosing and will be displayed openly on the Site to all other Users. When choosing your Display Name, consider it will mainly be used to enable you to interact with other users on the Site. You may change your Display Name at any time.\n" +
      "4. Create Your Electronic Wallet\n" +
      "a. PriceFitchAsset does not control your Wallet. When using the Site or when creating an Account, you can choose to use a Wallet provided by external service providers, or the PriceFitchAsset wallet provided on the Site. With your Wallet, you can store and engage in transactions using Ethereum cryptocurrency, either within the PriceFitchAsset Network or with other platforms. Please note that your Wallet is under your sole responsibility and will always remain under your sole control. While your Account enables you to access your Wallet with ease – PriceFitchAsset has no access to your Wallet nor any control over its use, and accordingly PriceFitchAsset and/or PriceFitchAsset Parties have no liability whatsoever regarding the use of your Wallet and/or any crypto-assets held in, or controlled through the Wallet. PriceFitchAsset will not be able to assist you regaining access to your wallet in case you lost your Wallet Access Information. b. Wallet Security: The access to your Wallet (and any cryptocurrency held in it) is available only with the access information and codes issued to you when establishing the Wallet (which commonly consist of a twelve (12) word mnemonic phrase, account keystore json file and/or private key) (“Wallet Access Information”). When creating an Account,your Wallet’s encrypted password file is encrypted once more before is stored in a protected file, accessible only by your password. We do not see, track, save or have access to your password which can unlock the password protected file. When choosing a password for your Wallet, remember that your Wallet may be subject to hacking attempts, the success of which may depend on the strength of the code you created. Subject to developments in general blockchain technology, You should be able to access your Wallet independently using your Wallet Access Information, even if at any time your access to the Site and Content shall be disabled for any reason whatsoever. For the protection of your interests, it is imperative you keep safe and guard the Wallet Access Information issued to you. You acknowledge and accept that you are solely responsible for the security of your Wallet and for any use of your Account as well as for any crypto-assets held or managed by them. PriceFitchAsset and/or PriceFitchAsset Parties will not be liable or accountable, nor shall be deemed to have any liability or accountability, for any loss or damage regarding your failure to keep your Account or Wallet information secret and protected. Furthermore, PriceFitchAsset has no control over your actions or transactions made using the Content. With that in mind, PriceFitchAsset and/or PriceFitchAsset Parties will have no liability to you or to any third party for any claims or damages that may arise as a result of any actions or transactions that you engage in while using the Content. PriceFitchAsset and/or PriceFitchAsset Parties shall not be liable for the acts or omissions of any third parties, nor will they be liable for any damage that you may suffer as a result of interacting with any third parties. We reserve the right to cancel or refuse to process any digital currency transaction due to requirements of any applicable laws or regulations, and without prior notice. c. We cannot guarantee that the Content will always function without disruptions, delay or errors. A number of factors may impact the quality of your communications on the Site and use of the Content, and may result in the failure of your communications including, without limitation, your local network, firewall, your internet service provider, the public internet and your power supply. For the avoidance of doubt and without derogating from the Terms hereunder, PriceFitchAsset and/or PriceFitchAsset Parties (as defined below) take no responsibility for any disruption, interruption or delay caused by any failure of or inade\n" +
      "5. Fees and Payments\n" +
      "The use of the Site and Content is not subject to or conditioned upon any payment or fee to PriceFitchAsset. You confirm that you are aware and agree to the following: a. All transactions on the Ethereum blockchain are subject to a fee (Gas), which is made in ETH and transferred internally into the system. To facilitate transactions on the blockchain you must have a sufficient amount of ETH. b. Tokens might include certain terms affecting conversion rates. Such terms are determined and affixed by the issuer of the Token at its own and exclusive discretion. c. When using the Content, you are able to construct and determine, at your own discretion, the parameters you wish to apply to your conversion of Tokens. The actions you wish to execute will be subject to those parameters you applied. Such terms, as may be applicable in each case individually, will be reflected and expressed in the conversion ratio and other applicable formulas, affecting the final outcome of your actions. By using the Content, you confirm and accept you are aware of the intrinsic risks regarding your use of the Content, that you are capable to assess and determine the outcomes of your actions using the Content, and that you are exclusively responsible and liable for your actions and their results. PriceFitchAsset and/or PriceFitchAsset Parties are not responsible for any taxes, levies, charges and/or expenses of any kind you may incur, resulting from your use of the Content and/or in connection therewith, whether such may be incurred pursuant to any applicable laws, rules or regulations, by any third party service provider(s), or otherwise. Any and all such taxes, levies, charges and/or expenses of any kind shall be borne solely by you. You agree that you shall have no claim, suit or demand of any kind, and by agreeing to these Terms, hereby irrevocably and completely waive any such claim, suit or demand of any kind, to the extent such may exist or hereafter arise, towards us, our affiliated entities, and any of our directors, managers, employees or consultants, in connection with or related to any of the foregoing.\n" +
      "6. Rules of Use\n" +
      "You represent and warrant that you have full right and authority to use the Content and to be bound by these Terms. You agree that you will comply fully with these Terms and all applicable domestic and international laws, regulations, statutes, ordinances that govern your use of the Content. Without limiting the foregoing and in recognition of the global nature of the Internet, you agree to comply with all local and international rules regarding online conduct. You also agree to comply with all applicable laws affecting the transmission of content or the privacy of persons. When using the Site or Content, you may not, nor may you assist other parties to pursuit or engage in unlawful or abusive uses, or any types of activities which contradict the purpose of the Site or Content, hinder the Site’s operation or Content to other users, or which may be deemed to do so (“Restricted Uses”). For Clarity and reference, Restricted Uses include, but are not limited to, these types of activities as detailed herein, as we may amend from time to time in our sole discretion (thus, not to be regarded as an exhaustive list): a. Unlawful Activities, such as activities which: i. violate any applicable law, rule or regulation; or ii. publish, distribute or disseminate any unlawful material or information; b. Undermining or Abusive Activities, such as activities which: i. take any action that imposes an unreasonable or disproportionately large load on our infrastructure, or detrimentally interfere with, intercept, or expropriate any system, data, or information; ii. institute, assist or become involved in any type of attack (deliberate or other), including distribution of a virus, attacks upon the Content, the PriceFitchAsset Protocol™ or the PriceFitchAsset Network™, that prevent access to or use of any of the above, other attempts to disrupt any of the above, gain unauthorized access to any of the above, or disrupt any other person’s use or enjoyment of any of the above; iii. enter or make an attempt to enter the Site and Content (including by accessing linked platforms, networks or systems) unauthorized, including by password mining and/or by using other users information; iv. design or assist in designing cheats, exploits, automation software, bots, hacks, modes or any other unauthorized third-party software to modify or interfere with the Site or Content; v. attempt to disable or circumvent any security or access control mechanism of the Site or Content; vi. use any unauthorized third-party software that accesses, intercepts, 'mines', or otherwise collects information from or through the Content or the Site, or that is in transit from or to the Site; vii. bypass any robot exclusion headers or other measures PriceFitchAsset uses to restrict access to the Content or use any software, technology, or device to send content or messages, scrape, spider, or crawl the Content, or harvest or manipulate data; viii. solicit another person’s password or other personal information under false pretenses; ix. copy, modify, or create derivative works of the Content or the Site; c. Activities Abusive to Other Users or Their Rights, such as activities which: i. Interfere with other Users ability to exploit or access the Site or any of the Content; ii. attempt to, or harass, abuse, or harm of another person or entity, including PriceFitchAsset employees and service providers; iii. collect, harvest or post anyone’s private information, in any media format; iv. impersonate another user or otherwise misrepresent yourself; v. violate the legal rights of others, including defaming, abuse, stalking or threatening users; vi defraud any other Users or any other person, including PriceFitchAsset employees and service providers, including by providing false, inaccurate, misleading, or partial information. d. Activities Infringing Intellectual Property, such as activities which: i. reverse engineer, decompile, disassemble, decipher or otherwise attempt to derive the source code for any underlying software or other intellectual property used to provide the Content, or to obtain any information from the Content using any method unless you have received PriceFitchAsset’s prior written approval; ii. infringe the intellectual property rights, privacy rights, or moral rights of any third party or PriceFitchAsset; e. Unfair or Abusive Transacting, such as activities which: i. create or enter a fictitious transaction or a transaction with fictitious elements of any kind; ii. exploit, disrupt or manipulate, or attempt to exploit, disrupt or manipulate the Site or the use of the Content, in a manner designed to create transaction conditions which are not available to other Users; iii. utilizes or applies technological abilities or foreknowledge not exploited or available to other Users, to perform (including off Site) transactions parallel to those performed by Users on the Site, and/or create unequal terms among Users regarding the use of Content on the Site, or influence the terms of transactions on the blockchain (including activities commonly referred to as Front-Running) and/or create an unfair or abusive advantage over other Users; Violation of any of these Restricted Uses may be cause for the taking of legal actions on the part of PriceFitchAsset according to the law, in addition to any right and remedies set forth hereunder or under any applicable law. Without derogating from the above, by accepting these Terms, you acknowledge that PriceFitchAsset makes no representation or warranty regarding its ability, nor assumes any liability, to detect, limit or prevent any Restricted Use.\n" +
      "7. Limitation or Termination of Access and Services\n" +
      "WE MAY, IN OUR SOLE DISCRETION, REFUSE TO MAKE THE CONTENT AVAILABLE TO ANY PERSON OR ENTITY. WE MAY, WITHOUT NOTICE AND IN OUR SOLE DISCRETION, TERMINATE YOUR RIGHT TO USE THE CONTENT OR ANY PORTION THEREOF, AND BLOCK OR PREVENT YOUR FUTURE ACCESS TO AND USE OF THE CONTENT OR ANY PORTION THEREOF. WE MAY, AT ANY TIME AND FOR ANY REASON AND IN OUR SOLE DISCRETION, DISCONTINUE THE CONTENT IN ITS ENTIRETY, OR ANY PART HEREOF, WITHOUT PRIOR NOTICE AND/OR LIABILITY OF ANY KIND. Subject to your agreement and compliance with these Terms, you are hereby granted with a personal, revocable, non-transferable and non-exclusive right to use the Content. Use of the Content shall be solely for your own, private purposes and for no other purpose whatsoever. You hereby acknowledge that your right to use the Content is limited by these Terms, and, if you violate or if, at any point, you do not agree to any of these Terms, your right to use the Content shall immediately terminate, and you shall immediately refrain from using the Content. Without derogating from the generality of the foregoing, any use of the Content that violates these Terms is strictly prohibited and can, at PriceFitchAsset's sole discretion, result in the immediate revocation of your limited rights granted by these Terms. Without limiting any other remedy, PriceFitchAsset may limit, suspend, revoke, terminate, modify, or delete your Account or access to the Content at its sole discretion without prior notice or liability, if you are, or if PriceFitchAsset suspects (in its sole discretion) that you are failing to comply with these Terms or for any actual or suspected Restricted Use of the Site and Content. Any of such actions, including the termination of your rights to use the Site and Content, may be applied by PriceFitchAsset permanently or temporarily. In such an event, PriceFitchAsset may terminate your Account and access to the Site and Content (however without affecting your Wallet, which remains exclusively yours, subject to any applicable third party terms of use or law). Upon termination of your Account, your Account log in credentials may not be reserved and it may not be possible to re-instate them. You hereby acknowledge and agree that PriceFitchAsset is under no obligation to compensate you for any losses of any kind whatsoever resulting from the cease of Content as set forth hereinabove, whether such closure was voluntary or involuntary, and you hereby irrevocably waive any demand or claim regarding the above.\n" +
      "8. Privacy Policy\n" +
      "When using the Content, you may be required to provide us with certain personal information that may include your full name, e-mail address, Wallet address etc. This information will be stored and used in accordance with our Privacy Policy, and we will not release such personal information to any third party without the User’s consent, except as not prohibited by law or as set forth in our Privacy Policy, as amended from time to time. In addition, we may use aggregate statistical information about Users’ activity on the Site for marketing or any other purpose.\n" +
      "9. Ownership, Copyrights\n" +
      "a. The Content and all of the content that appears in the Site, including without limitation, the use of the Site’s name, software, web technologies, source code, concepts, artwork, photos, animations, sounds, methods of operation, moral rights, documentation, and virtual items, is the exclusive property of PriceFitchAsset, or is being used with permission from its licensors. PriceFitchAsset (or its licensors as applicable) retain all rights, title and interest in and to the Content and all of the content that appears in the Site, and all intellectual property rights relating thereto, including without limitations all copyright, patent, trademarks, logos, design rights and any other proprietary rights connected with the Content. Notwithstanding any provision to the contrary herein, you agree that you have no right or title in or to the Content and/or to any content that appears in the Site. PriceFitchAsset’s name and logo, and any other trademarks included in the Content and/or appear on the Site, are trademarks of PriceFitchAsset. b. All third party product names that may legitimately appear in the Site are trademarks of their respective owners. No transfer or grant of any rights under any names, marks or logos is made or is to be implied by any provision of these Terms or by anything on the Site, and all rights in such names, marks or logos is reserved to PriceFitchAsset or their respective owners, as applicable. c. You acknowledge and agree that any materials, including but not limited to questions, comments, feedback, suggestions, ideas, plans, notes, drawings, original or creative materials or other information or commentary you provide on our platform or one of our social media accounts, regarding PriceFitchAsset or the Content (collectively, “Feedback”) that are provided by you, whether by email, posting to the Site or otherwise, are non-confidential and will become the sole property of PriceFitchAsset. PriceFitchAsset will own exclusive rights, including all intellectual property rights, and will be entitled to the unrestricted use and dissemination of such Feedback for any purpose, commercial or otherwise, without acknowledgment or compensation to you.\n" +
      "10. Third Party Content\n" +
      "To the extent that the services contain links or any other information to third party websites, tokens or services, PriceFitchAsset does not control the availability and content of those websites, tokens and services. Any concerns regarding any such third party websites, tokens and/or service, or any link thereto, should be directed to such particular website and/or services provider. PriceFitchAsset makes no representation or warranty regarding any content, goods, tokens and/or services provided by any third party, even if linked to through the site or the service. The linked sites and tokens are not under the control of PriceFitchAsset and may collect data or solicit personal information from you. PriceFitchAsset is not responsible for their content, business practices or privacy policies, or for the collection, use or disclosure of any information those sites may collect. you agree that the services may feature advertisements from third parties. PriceFitchAsset is not responsible for the actions of third parties who advertise on the site. Your interactions with advertisers or entities that issued the tokens are agreements between you and them with PriceFitchAsset having no responsibility for such interactions.\n" +
      "11. RISKS Statement, Representations and Warranties\n" +
      "PriceFitchAsset provides an execution-only service and does not advise on the merits of any particular conversion of Tokens or its tax or legal consequences. As a general matter, Users should be aware of the following prior to utilizing our Content. a. Assumption of Risks of Cryptographic Systems and Currencies. By using the Content and the PriceFitchAsset Network in any way, you acknowledge the inherent risks associated with cryptographic systems and ecosystems; and warrant that you have an understanding of the usage and intricacies of native cryptographic tokens, like BNT, ETH, EOS, smart contract based tokens (for example, such as those that follow the Ethereum Token Standard) and blockchain-based software systems. You understand that blockchain technologies (such as Ethereum and EOS) and associated currencies or tokens are highly volatile due to many factors including but not limited to adoption, speculation, technology and security risks. You also acknowledge that the cost of transacting on such technologies (where applicable) is variable and may increase at any time causing impact to any activities taking place on the relevant blockchain (such as Ethereum). You acknowledge these risks and represent that PriceFitchAsset cannot be held liable for such fluctuations or increased costs. You acknowledge that you are solely responsible for the process of converting BNT or ETH and that PriceFitchAsset does not offer any such service. PriceFitchAsset cannot be held liable for any losses or damages of BNT, ETH or other cryptocurrencies resulting from the use of services of any third-party provider. b. Assumption of Risk of Regulatory Actions in One or More Jurisdictions. The Content as well as the PriceFitchAsset Network and relevant blockchain (such as Ethereum or EOS) could be impacted by one or more regulatory inquiries or regulatory action, which could impede or limit the ability of PriceFitchAsset to continue to develop, or which could impede or limit your ability to access or use the Content, the PriceFitchAsset Network or the applicable blockchain. PriceFitchAsset endeavours to comply with all applicable laws, i.e. all legal requests for information, and reserve the right to provide information, including Project Information, to law enforcement personnel and other third parties to answer inquiries, to respond to legal process, to respond to the order of a court of competent jurisdiction and those exercising the court’s authority and to protect PriceFitchAsset Network and its Users. c. Understanding Tokens requires advanced technical knowledge. Tokens are often described in exceedingly technical language that requires a comprehensive understanding of applied cryptography and computer science in order to appreciate inherent risks. Listing of a Token on the Site does not indicate approval or disapproval of the underlying technology regarding any Token, and should not be used as a substitute for your own understanding of the risks specific to each Token. In using the Content, you represent that you have been, are, and will be solely responsible for making your own independent appraisal and investigations into the risks relating to and concerning the Tokens. You represent that you have sufficient knowledge, market sophistication, professional advice and experience to make your own evaluation of the merits and risks of any conversion or any underlying Token. d. You accept the risk of converting Tokens. You understand the conversion of Tokens may use untested code and protocols. You accept the risk of conversion failure or fault. You agree not to hold PriceFitchAsset accountable for any related losses. Neither you nor we, can reverse, change or cancel a conversion of Tokens transaction marked as complete or pending. Conversion of Tokens using the Content is managed and confirmed via the relevant blockchain. You understand that your relevant blockchain (Ethereum, EOS or other) public address will be made publicly visible whenever you use the Content. e. You are responsible for complying with applicable law. You agree that PriceFitchAsset is not responsible for determining whether or which laws may apply to your conversions, including with respect to tax or money transferring regulations. You are solely responsible for reporting and paying any taxes arising from your use of the Content. f. You are aware of and accept the risk of operational challenges. The Site and the Content may experience sophisticated cyber-attacks, unexpected surges in activity, or other operational or technical difficulties, which may hinder the use of the Content or affect or even cause faults or failures in the conversion of Tokens. You agree not to hold PriceFitchAsset accountable for any related losses. g. PriceFitchAsset does not advise on converting risk. If at any point PriceFitchAsset or its representatives do provide converting recommendations, market commentary, or any other information, the act of doing so is incidental to your relationship with us and imposes no obligation of truth or due diligence on behalf of PriceFitchAsset or its representatives. h. Operation of Token Protocol. We do not own or control the underlying software protocols, which govern the operation of the Tokens (other than the BNT) supported on our platform. You acknowledge and agree (i) that the underlying protocols may be subject to sudden changes in operating rules (‘forks’), and that such forks may materially affect the value, function, and even the name of the Tokens you store. In the event of a fork, you agree that we may suspend the Content (with or without advance notice to you) and that we may decide whether or not to support (or cease supporting) either branch of the forked protocol entirely. You acknowledge and agree that we assume absolutely no responsibility whatsoever in respect of an unsupported branch of a forked protocol; and (ii) that we are not responsible for operation of the underlying protocols and that we make no guarantee of their functionality, security, or availability.\n" +
      "12. Ownership of Tokens\n" +
      "You hereby warrant and represent that any Tokens used by you in connection with the Content are either owned by you or that you are validly authorized to carry out conversions, and to take (or refrain from taking) any other actions which you perform while using the Content, using such Tokens.\n" +
      "13. Indemnification\n" +
      "You agree to indemnify, defend and hold PriceFitchAsset, its affiliates and service providers, and each of their respective officers, directors, agents, employees, and representatives, harmless from any claim (including, but without limitation, third party claims) or demand (including attorneys’ fees and costs and any fines, fees or penalties imposed by any regulatory authority) arising out of or related to (i) your breach of these Terms, (ii) your use or access of the Site and/or Content, or (iii) your violation of any law, rule, or regulation, or the rights of any third party.\n" +
      "14. WARRANTY DISCLAIMER\n" +
      "YOU UNDERSTAND, ACKNOWLEDGE AND ACCEPT THAT BLOCKCHAIN APPLICATIONS AND PROTOCOLS ARE GENERALLY STILL IN AN EARLY DEVELOPMENT STAGE AND THEREFORE OF EXPERIMENTAL NATURE. YOU THEREFORE UNDERSTAND THAT THE CONTENTS ARE PROVIDED TO YOU ‘AS IS’ AND WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND EITHER EXPRESSED OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, EACH OF PRICEFITCHASSET AND/OR PRICEFITCHASSET PARTIES DISCLAIMS ALL WARRANTIES, EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF ANY KIND IN CONNECTION WITH THE TOKENS, THE CONTENT, NON-INFRINGEMENT, AND FITNESS FOR ANY PARTICULAR PURPOSE, USEFULNESS, AUTHORITY, ACCURACY, COMPLETENESS AND/OR TIMELINESS. EACH OF PRICEFITCHASSET AND/OR PRICEFITCHASSET PARTIES MAKES NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE CONTENT OF THE CONTENTS, OF THE CONTENT OF ANY SITES LINKED TO THE CONTENTS, OF ANY THIRD PARTY MATERIALS OR THE UNDERLYING SOFTWARE PROTOCOL (THE SOFTWARE) THAT GOVERNS THE CONTENT AND THE PRICEFITCHASSET NETWORK. WITHOUT LIMITING THE FOREGOING, NEITHER PRICEFITCHASSET NOR ITS AFFILIATES OR SUBSIDIARIES, OR ANY OF ITS OR THEIR DIRECTORS, EMPLOYEES, AGENTS, ATTORNEYS, THIRD-PARTY CONTENT PROVIDERS, DISTRIBUTORS, JOINT-VENTURES, LICENSEES OR LICENSORS (COLLECTIVELY, “PRICEFITCHASSET PARTIES”) REPRESENT OR WARRANT THAT THE SITE AND THE CONTENT WILL BE UNINTERRUPTED, ERROR-FREE, BUG-FREE OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS. YOU AGREE THAT USE OF THE SITE AND THE CONTENT IS AT YOUR SOLE RISK. ADDITIONALLY, IN NO EVENT SHALL PRICEFITCHASSET AND/OR PRICEFITCHASSET PARTIES BE LIABLE FOR ANY UNAUTHORIZED ACCESS TO OR USE OF THIRD PARTY MATERIALS, SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN. YOU ACKNOWLEDGE AND AGREE THAT, TO THE FULLEST EXTENT PERMITTED BY ANY APPLICABLE LAW, THE DISCLAIMERS CONTAINED HEREIN SHALL APPLY TO ANY AND ALL DAMAGES OR INJURIES WHATSOEVER CAUSED BY OR RELATED TO THE USE OF, OR INABILITY TO USE, THE CONTENTS, UNDER ANY CAUSE OR ACTION WHATSOEVER OF ANY JURISDICTION, INCLUDING, WITHOUT LIMITATION, ACTIONS FOR BREACH OF WARRANTY, BREACH OF CONTRACT OR TORT (INCLUDING NEGLIGENCE). UNDER NO CIRCUMSTANCES WHATSOEVER WILL PRICEFITCHASSET AND/OR ANY OF PRICEFITCHASSET PARTIES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, BE RESPONSIBLE OR LIABLE TO YOU OR TO ANY OTHER ENTITY FOR ANY COMPENSATORY, INDIRECT, INCIDENTAL, CONSEQUENTIAL (INCLUDING FOR LOSS OF PROFITS, LOST BUSINESS OPPORTUNITIES, LOSS OF GOODWILL OR DATA DESTRUCTION OR IMPAIRMENT) SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES THAT RESULT FROM OR RELATE IN ANY MANNER WHATSOEVER TO YOUR USE OF OR INABILITY TO USE THE CONTENTS. IF YOU ARE DISSATISFIED WITH THE CONTENTS, OR WITH THESE TERMS, OR YOU HAVE ANY DISPUTE WITH PRICEFITCHASSET AND/OR ANY OF PRICEFITCHASSET PARTIES, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE CONTENTS. YOU FURTHER SPECIFICALLY ACKNOWLEDGE THAT NEITHER PRICEFITCHASSET NOR ANY PRICEFITCHASSET PARTIES ARE LIABLE, AND YOU AGREE NOT TO SEEK TO HOLD PRICEFITCHASSET AND/OR PRICEFITCHASSET PARTIES LIABLE, FOR THE CONDUCT OF THIRD PARTIES, INCLUDING OTHER USERS OF THE CONTENTS, ISSUERS OF TOKEN AND OPERATORS OF EXTERNAL SITES, AND THAT THE RISK REGARDING THE FOREGOING RESTS ENTIRELY WITH YOU. Additionally, we shall not be deemed to be in breach of these Terms, nor shall we incur any liability or bear any responsibility due to a delay or failure in performance caused by Force Majeure. `Force Majeure` referrers to circumstances beyond our reasonable control, including but not limited to acts of God, fire, flood, war, terrorism, embargo, accident, labor disputes, or shortage of material, equipment or transport, any law, regulation, or any ruling of court, tribunal or governmental agency\n" +
      "15. LIMITATION OF LIABILITY\n" +
      "WITHOUT DEROGATING FROM THE FOREGOING, IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL PRICEFITCHASSET, AND/OR ANY OF PRICEFITCHASSET PARTIES, BE LIABLE TO YOU FOR ANY DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE CONTENT AND/OR THE PRICEFITCHASSET NETWORK / SOFTWARE (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE SOFTWARE TO OPERATE WITH ANY OTHER SOFTWARE) EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. BECAUSE SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR CERTAIN TYPES OF DAMAGES, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. IN SUCH JURISDICTIONS, PRICEFITCHASSET'S LIABILITY IS LIMITED AND WARRANTIES ARE EXCLUDED TO THE GREATEST EXTENT PERMITTED BY THE CORRESPONDING APPLICABLE LAW. ADDITIONALLY, YOU ACKNOWLEDGE THAT NEITHER PRICEFITCHASSET NOR ANY PRICEFITCHASSET PARTIES DOES NOT ACTS OR SERVES AS YOUR BROKER, INTERMEDIARY, AGENT, OR ADVISOR WITH RESPECT TO ANY ACTION (INCLUDING REFRAINING FROM ANY ACTION), INCLUDING WITHOUT LIMITATION, ANY CONVERSION, YOU MAKE OR PROPOSE TO MAKE USING THE CONTENT AND OWES YOU NO FIDUCIARY DUTY.\n" +
      "16. Computer Viruses\n" +
      "You acknowledge and agree that neither PriceFitchAsset nor any PriceFitchAsset Party bears any liability, for any interruptions or damage caused by any computer viruses, worms, spyware, scareware, Trojan horses, defects, corrupted files, hoaxes, or other malware that may affect your computer or other equipment, or any phishing, spoofing or other attack. You should also be aware that SMS and email services are vulnerable to spoofing and phishing attacks and should use care in reviewing messages purporting to originate from us. We advise the regular use of a reputable and readily available virus screening and prevention software.\n" +
      "17. Dispute Resolution and Governing Law\n" +
      "These Terms are governed by and construed in accordance with the laws of the Swiss Confederation. You hereby consent that any claim, cause of action or dispute arising out of or relating to these Terms, the Content or the Site shall be submitted to the exclusive jurisdiction of the Cantonal Court of Zug, Switzerland, and you agree to submit to the personal jurisdiction of such courts for the purpose of litigating all such claims.\n" +
      "18. Miscellaneous\n" +
      "a. The controlling language for these terms of use is English; the meaning of terms, conditions and representations herein are subject to definitions and interpretations in the English language. Any translation is provided for your convenience and may not be deemed to represent accurately the information in the original English. b. If any provision of these Terms is determined to be invalid or unenforceable, the provision shall be deemed to be severable from the remainder of these Terms and will not cause their invalidity or unenforceability. c. These terms of use may be amended from time to time. It is your responsibility to check these terms of use periodically for changes. Your continued use of the Content following the posting of changes will mean that you accept and agree to the changes. If you do not agree with any such modification, you should not use the Content. d. YOU AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO THE CONTENT MUST COMMENCE WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES. OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY BARRED.\n" +
      "v.01 | May 29, 2019",
  },
  privacyfull: {
    ch: "PriceFotchAsset網絡（“PriceFotchAsset網絡”，“我們”，“我們”或“我們的”）是一個分散的流動性網絡，允許您持有任何以太坊令牌並將其轉換為網絡中的任何其他令牌，沒有對方，以自動計算的價格，使用簡單的網絡錢包（“服務”）。本隱私政策旨在告知我們如何管理，收集，存儲和使用我們收到的與PriceFotchAsset網絡相關的個人信息（“政策”）。<br/><p/>" +
      "接受政策<br/>" +
      "我們的註冊過程是使用聊天機器人完成的。因此，我們創建了一個對話流程，我們要求您同意我們的隱私政策條款，回复“是”您同意您已閱讀，理解，接受並同意受本隱私政策的約束。如果您不同意隱私政策，請不要使用我們的服務。<br/><p/>" +
      "我們隱私政策的變更<br/>" +
      "我們可能會更新本隱私政策，以反映我們的信息收集，使用和存儲實踐的變化。如果我們做出任何我們認為“重大”的變更（我們酌情決定），我們將通知您（在變更生效之前使用“通知”部分中規定的通知方法。我們鼓勵您定期查看此頁面以獲取有關我們隱私慣例的最新信息。<br/><p/>" +
      "我們收集的信息以及用於何種目的<br/>" +
      "我們收集了PriceFotchAsset Netwotk運行所需的信息以及通過它提供的服務。當您作為社區成員註冊我們的PriceFotchAsset網絡時，我們會直接收到您的信息，例如用戶名。您可以自願向我們提供您的聯繫信息和相關數據，包括個人信息。我們使用這些信息來管理我們的網絡和內部操作，包括故障排除，數據分析，測試，研究，統計和調查目的。我們還可能存儲您的計算機或移動設備提供給我們的與您使用服務相關的信息，例如您的瀏覽器類型，計算機或移動設備類型，瀏覽器語言，IP地址。如果您使用Facebook等第三方服務註冊PriceFotchAsset網絡，我們可能會從第三方服務處收到有關您的信息。<br/><p/>" +
      "披露您的信息<br/>" +
      "我們不會向您出租或出售任何有關您的信息，也不會交易任何此類信息。我們可能僱用第三方公司和個人來促進網絡的運營，並執行與網絡管理相關的服務（包括但不限於賬單和信用卡支付處理，維護，託管和數據庫管理服務，網絡分析和管理）。您理解並同意，如果法律要求或認為此類披露是合理必要的，以避免責任，我們可能被要求披露個人信息，以遵守法律程序，包括但不限於傳票，法規，搜查令或法院命令，或保護我們或第三方的財產和權利，以保護公眾或任何人的安全，或防止或停止我們可能認為的活動，或構成風險是，非法的，不道德的或法律上可行的。如果我們將被第三方實體收購或合併，或者在破產或類似事件中，我們保留轉讓或轉讓與上述事件相關的個人信息的權利。<br/><p/>",
    en: "PRIVACY POLICY\n" +
      "About Us\n" +
      "The PriceFitchAsset Network (the “PriceFitchAsset Network”, “We”, “Us” or “Our”) is a Decentralized Liquidity Network that allows you to hold any Ethereum token and convert it to any other token in the network, with no counter party, at an automatically calculated price, using a simple web wallet (the “Services”). This privacy policy has been created to inform about how we manage, collect, store and use the personal information we receive and collect in connection with the PriceFitchAsset Network (the `Policy`).\n" +
      "Acceptance of Policy\n" +
      "Our registration process is done by using a chatbot. As such, we create a conversation process where we ask you to agree to the terms of Our Privacy Policy, by replying “yes” you agree that you have read, understood, accept and agree to be bound by this Privacy Policy. If you don’t agree with the Privacy Policy, please do not use our Services.\n" +
      "Changes to Our Privacy Policy\n" +
      "We may update this Privacy Policy to reflect changes to our information collection, usage and storage practices. If we make any changes that we deem as “material” (in our sole good faith discretion), we will notify you (using the notification methods set forth in the “Notices” Section prior to the change becoming effective. We encourage you to periodically review this page for the latest information on our privacy practices.\n" +
      "Information we collect and for which purposes\n" +
      "We collect information that is necessary for the functioning of our PriceFitchAsset Netwotk and the provision of Services through it. We receive the Information, such as username directly from you when you register to our PriceFitchAsset Network as member of a community. You may voluntarily provide us your contact information and related data, including personal information. We use the information in order to administer our Network and for internal operations, including troubleshooting, data analysis, testing, research, statistical and survey purposes. We may also store information that your computer or mobile device provides us in connection with your use of the Service, such as your browser type, type of computer or mobile device, browser language, IP address. If you register to the PriceFitchAsset Network using a third party Service like Facebook, we may receive information about you from such third party Service.\n" +
      "Disclosure of Your Information\n" +
      "We do not rent or sell any information about you to others, or trade any such information. We may employ third party companies and individuals to facilitate the operation of the Network, and to perform services related to administration of the Network (including, but not limited to, bill and credit card payment processing, maintenance, hosting and database management services, web analytics and administration). You understand and agree that we may be required to disclose personal information if required to do so by law or in the belief that such disclosure is reasonably necessary to avoid liability, to comply with legal process, including, but not limited to a subpoena, statute, search warrant, or court order, or to protect our, or a third party, property and rights, to protect the safety of the public or any person, or to prevent or stop activity we may consider to be, or to pose a risk of being, illegal, unethical or legally actionable. In the event we will be acquired by or merged with a third party entity, or in the event of bankruptcy or a comparable event, We reserve the right to transfer or assign personal information in connection with the foregoing events.\n" +
      "   \n" +
      "Cookies Statement\n" +
      "We uses cookies. Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Cookies are typically stored on your computer's hard drive. Information collected from cookies is used by us to evaluate the effectiveness of our website and API located at https://PriceFitchAsset.com, and any linked or directed subdomain (such as https://app.PriceFitchAsset.com) (the “Site”), analyze trends, and manage the platform. The information collected from cookies allows us to determine such things as which parts of our Site are most visited and difficulties our visitors may experience in accessing our Site. With this knowledge, we can improve the quality of your experience on the platform by recognizing and delivering more of the most desired features and information, as well as by resolving access difficulties. We also use cookies and/or a technology known as web bugs or clear gifs, which are typically stored in emails to help us confirm your receipt of, and response to, our emails and to provide you with a more personalized experience when using our Site. We also use third party service provider(s), to assist us in better understanding the use of our Site. Our service provider(s) will place cookies on the hard drive of your computer and will receive information that we select that will educate us on such things as how visitors navigate around our site, what pages are browsed and general transaction information. Our service provider(s) analyses this information and provides us with aggregate reports. The information and analysis provided by our service provider(s) will be used to assist us in better understanding our visitors' interests in our Site and how to better serve those interests. The information collected by our service provider(s) may be linked to and combined with information that we collect about you while you are using the platform. Our service provider(s) is/are contractually restricted from using information they receive from our Site other than to assist us. Your continued use of our Site, as well as any subsequent usage, will be interpreted as your consent to cookies being stored on your device.\n" +
      "Security\n" +
      "Everything We save is encrypted and We have implemented the technical and organizational measures designed to secure your information from accidental loss and from unauthorized access, use, alteration or disclosure. However, we cannot guarantee that unauthorized third parties will never be able to overcome those measures or use your information for improper purposes.\n" +
      "Processing and transferring your information\n" +
      "The information provided will be saved and stored with the hosting and information backup providers (such as Google Cloud) in the U.S, held and operated by third parties other than PriceFitchAsset and/or which are not controlled by PriceFitchAsset. Upon providing the information the site visitor agrees and confirms that PriceFitchAsset may transfer to and/or save the information provided thereto on servers located in the U.S.\n" +
      "Your Rights\n" +
      "You may review, update, or delete the information collected by or through our Service by logging into your account and reviewing your account settings and profile. You have a right to access to your personal information held by us by requesting a copy in writing. We will provide you with such copy as soon as practicable after receiving a valid request. We may charge you a fee, which shall not exceed the cost for copies. We may request proof of identification to verify your access request and reject any unfair request. To exercise this right, please refer to the “Contact Us” section below.\n" +
      "Notices\n" +
      "Notices to you may be made via our website. PriceFitchAsset may also provide notices of changes to this Privacy Policy or other matters by displaying notices or links to notices to you generally on our website. You agree that all agreements, notices, disclosures and any other communications that PriceFitchAsset provide as aforementioned satisfy any legal requirement that such communications be in writing.\n" +
      "Contact Us\n" +
      "For any questions about this Privacy Policy or any other issue regarding the Bacnor Network or our Services please contact us at: privacy@PriceFitchAsset.com\n" +
      "Last Update: May 2018",
  },
  aboutusfull: {
    ch: "普惠資產區塊鏈公鏈系統<br/><p/>" +
      "PFA普惠資產採用JPMORGAN(摩根大通)及微軟(Mircosoft)開發的最新區塊鏈技術，將提供強大，安全可靠，穩定的一個區塊鏈技術，打造全新概念的環球支付系統。 普惠公鏈團隊參與到JPMORGAN(摩根大通)及微軟(Mircosoft)開發，屬於世界一流的區塊鏈技術團隊。<br/><p/>" +
      "普惠資產團隊及摩根大通在選擇區塊鏈技術上持相同意見：以太坊是技術最高的區塊鏈，但是以太坊速度慢及需要礦工費限制了非常大量的應用﹐往往一個幾千人的應用已經癱瘓了整個公有鏈；且 無法用於細額交易。<br/><p/>" +
      "鏈改後的普惠資產公有鏈是將原有以太坊公鏈上的普惠資產，升級至獨立的一個主網絡上，技術層面稱為硬分叉，升級後在速度和供需方面非常完善，能應付日後高頻交易。<br/><p/>" +
      "普惠公有鏈的高速﹐共享區塊鏈技術 既解決了速度及細額交易的問題﹐而且增加了一些私隱的設定：私人性信息能夠永遠不會向網絡參與者廣播。私人數據經過加密，只與相關方直接共享﹐同時又不會失去可信任的優秀功能。<br/><p/>" +
      "摩根大通Quorum技術其實是一種基於以太坊的分佈式分類賬協議，包含 Go Ethereum 客戶端（也稱為 geth）的 簡約分支，旨在為金融，供應鏈，零售，房地產等行業提供允許的以太坊實施，支持交易和合同隱私。 因此，普惠團隊善用了以太坊開發人員社區所做的工作。 因為底層技術Quorum 的兼用性非常大﹐在未來更可以從算法層面鏈改。我們可以建立在大量已開發的以太坊技術上﹐例如熟悉的Truffle,MetaMask,Remix ,OpenZeppelin ﹐它們都已經可以直接在普惠資產公有鏈上使用，避免了重複開發的資源浪費。",
    en: "Price Fitch Asset Public Blockchain System<br/><p/>" +
      "Price Fitch Asset (PFA) assets use the latest blockchain technology developed by J.P.MORGAN and Mircosoft to provide a powerful, secure, and stable blockchain technology to create a new concept of global payment system. PFA is involved in the development of J.P.MORGAN and Microsoft which belongs to a world-class blockchain technology team.<br/><p/>" +
      "Price Fitch Asset and JPMorgan hold the same opinion on the choice of blockchain technology: Ethereum is the most technological blockchain, but Ethereum is slow and requires miners which limit many applications. Usually, a few thousand people will lead Ethereum slow. The application has already smashed the entire public chain; it cannot be used for small amount transactions.<br/><p/>" +
      "The new public chain reform is a upgrade the original on the Ethereum public chain to an independent main network. Technically called hard fork, and the upgrade is very perfect in terms of speed and supply and demand. Which can handle a large number of high-frequency transactions in the future.<br/><p/>" +
      "Therefore, the high-speed, shared blockchain technology of PFA public chain not only solves the problem of speed and fine transactions, but also adds some privacy settings: private information can never be broadcast to network participants. Private data is encrypted and shared directly with related parties without losing the trustworthy features.<br/><p/>" +
      "JPMorgan's Quorum technology is actually a distributed ledger agreement based on Ethereum, including a simple branch of the Go Ethereum client base (also known as geth), designed to provide the Ethereum for the financial, supply chain, retail, real estate and other industries. Implementation, support for transaction and contract privacy. As a result, the PFA team was able to take advantage of the work done by the Ethereum developer community. Because the underlying technology Quorum is very versatile, it can be changed from the algorithm level in the future. We can build on a large number of developed Ethereum technologies, such as the familiar Truffle, MetaMask, Remix, OpenZeppelin, which can all be used directly on Quorum, avoiding waste of resources for repetitive development.",
  },
  usemethodfull: {
    ch: "1)重要說明<br/>" +
      "在建立錢包後﹐馬上備份你的私鑰﹐帳戶不儲存在服務器上﹐而是一條私鑰。<br/><p/>" +
      "2)導入錢包<br/>" +
      "從Imtoken導入:在Imtoken中按[管理錢包] 再找到 [導出私鑰]<br/>" +
      "然後在注冊時填上私鑰  #私鑰是一串文字<br/>" +
      "例如:<br/>" +
      "f9338567f005a02a5609c161e84d1ab1f47aaa429a01e2299abe8c7d386228fa<br/><p/>" +
      "3)充值USDT<br/>" +
      "充值USDT到PFA錢包時﹐必須在交易所選擇ERC-20版的錢包﹐並貼在購買頁面。<br/><p/>" +
      "4)提取USDT/賣出USDT<br/>" +
      "提取USDT時﹐在傳送時﹐輸入目標交易所的地址。<br/><p/>" +
      "5)備份<br/>" +
      "用戶必須要妥善儲存自己的私鑰。",
    en: "1) Most Important <br/>" +
      "Once you create account, please back up your private key immediately, your key is not stored on any server but on your phone’s private key <br/><p/>" +
      "2)Import Wallet<br/>" +
      "Import from Imtoken: In Imtoken, find “manage wallet” then click “Export Private Key” then paste this private key when you Import your private key here #Private key is a text like: f9338567f005a02a5609c161e84d1ab1f47aaa429a01e2299abe8c7d386228fa<br/><p/>" +
      "3)Charge USDT<br/>" +
      "when you chaege USDT to this PFA wallet﹐please select ERC-20 USDT, then send to this ERC20 USDT<br/><p/>" +
      "4)Withdraw USDT/ Sell USDT<br/>" +
      "Please click withdraw and select USDT(Send to ETH Network need 1USDT)﹐then input target address on ETH network.<br/><p/>" +
      "5)Back up<br/>" +
      "Please well store your private key",
  },
  pfaMessagefull: {
    ch: "普惠資產已完成主網升級，應用了摩根大通的GoQuorum，沿用ERC20制式，持舊PFA的用戶只要將私鑰導入即可在未來置換鏈改後的PFA。",
    en: "PFA have been upgraded to a main blockchain network, applied GoQuorum. It is ERC20 compatible, those PFA holders please import your private key, you will receive new PFA in future."
  },
  walletImportExport: {
    ch: "從PFA錢包", en: "from PFA Wallet",
  },
  importExport: {
    ch: "導入", en: "Import",
  },
  copy: {
    ch: "複製", en: "Copy",
  },
  copied: {
    ch: "已複製", en: "Copied",
  },
  footNavigation: {
    ch: ["首頁", "錢包", "兌換", "幣訊", "我的"], en: ["HOME", "WALLET", "EXCHANGE", "NEWS", "MY WALLET"],
  },
  purchaseAddress: {
    ch: "請把外部購買的 USDT 傳入以下地址：",en: "Please send USDT from Ethereum network(ERC20) to this ETH network address:",
  },
  completeRecharge: {
    ch: "完成充值前請勿關閉此頁面。完成充值後你會收到通知。",en: "Please do not close this page before charge finished.",
  },
  uploadQRCode: {
    ch: "上傳二維碼",en: "Upload QR"
  },
  recognitionQRcode: {
    ch: "識別二維碼",en: "Scan QR"
  },
  note: {
    ch: "備註",en: "Note"
  },
  fillInFormat:{
    ch: "備註可用中英文填寫，最多顯示30字",en: "Note can be either Chinese/English, 30 words most"
  },
  pfa:{
    ch: "PFA",en: "PFA"
  },
  ihad:{
    ch: "HAD",en: "HAD"
  },
  usdt:{
    ch: "USDT（轉外部以太網絡 每筆需付1USDT）",en: "USDT(Send to ETH Network need 1USDT)"
  },
  usdti:{
    ch: "USDT（PFA內部互轉 免網絡費）",en: "USDT(PFA internal network transfer)"
  },
  noInformation:{
    ch: "沒有相關資料",en: "No relevant information"
  },
  received:{
    ch: "收到 ",en: "Received "
  },
  continue:{
    ch: " USDT。你可以繼續充值。",en: " USDT, you can continue to recharge."
  },
  transactionVC:{
    ch: "交易憑證",en: "Transaction Code"
  },
  sendAddress:{
    ch: "發送地址",en: "Send Address"
  },
  designationAddress:{
    ch: "目標地址",en: "Designation Address"
  },
  type:{
    ch: "種類",en: "Type"
  },
  quantity:{
    ch: "數量",en: "Quantity"
  },
  remark:{
    ch: "備註",en: "Remark"
  },

  myWallet:{
    timeZone:{
      ch: "時區",en: "Timezone"
    },
  },
  rotaryPlantingMap: {
    ch: [ '2019/07/31/5d40f6c9e692d73793.jpg', '2019/06/26/5d12c2c61668934580.png','2019/07/03/5d1c3296bd17e13109.jpeg'],
    en: [ '2019/07/31/5d413d05c946c44072.png', '2019/08/01/5d42532f28d1794181.jpg', '2019/07/31/5d412ff18bffe69494.jpg'],
  },
  qrTips: {
    ch: "未能識別二維碼", en: "Cannot scan QR",
  }
};
