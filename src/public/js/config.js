// 全局配置文件
export default {
  lang : "ch",                    //使用语言种类，国际化处理（中文）
  imgPath: "https://i.loli.net/", //图片访问路径url
  equipmentType: "PC",            //访问设备类型(pc / mobile /iPad),
  smsUrl: 'https://api.quorum.mex.gold/sms/',
  rates: {
    usdt: { ihad: 1,   pfa:  1 / 1.5,  yhad:1 },
    ihad: { usdt: 1,   pfa:  1 / 1.5,  yhad:1 },
    yhad: { ihad: 1,   pfa:  1 / 1.5,  usdt:1 },
    pfa:  { usdt: 1.5, yhad: 1.5,      ihad:1.5 }
  }
};
