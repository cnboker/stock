import axios from "axios";

var moment = require("moment");
var week = moment().day();
var beforeDays = -2;
var yestodayDays = -1;
console.log("week=", week);
if (week == 1) {
  beforeDays = -4;
  yestodayDays = -3;
} else if (week == 2) {
  beforeDays = -4;
}
const beforedayFile = `/json/${moment()
  .add("days", beforeDays)
  .format("YYYY-MM-DD")}.json`;
const yestodayFile = `/json/${moment()
  .add("days", yestodayDays)
  .format("YYYY-MM-DD")}.json`;
const nowFile = `/json/${moment().format("YYYY-MM-DD")}.json`;

/*[
        "1", //3day 排名         0
        "新股与次新股",           1
        "138", //公司数量         2
        "22823.80", //行业指数    3
        "4.94%", //涨跌幅         4
        "139.71", //流入资金      5
        "128.55", //流出资金      6
        "11.17", //净额           7
        //----------------------------------------
        "3", //5day 排名          8
        "22823.80", //行业指数    9
        "5.61%", //涨跌幅         10
        "170.97", //流入资金      11
        "185.94", //流出资金      12
        "-14.97", //净额          13
        //-----------------------------------------
        "24", //10day 排名        14
        "22823.80",               15
        "0.83%",                  16
        "56.06",                  17
        "69.97",                  18
        "-13.91",                 19
        //------------------------------------------
        "41",  //20day 排名       20
        "22823.80",               21
        "-1.63%",                 22
        "68.33",                  23
        "82.70",                  24
        "-14.37"                  25
    ]*/
/*
optType:1.连涨, 2.前20排名
*/
var resultData;
export function dataLoader(optType) {
  if (resultData) {
    var [data1,
      data2,
      data3] = resultData;
    var data = {
      beforedayData: parseData(optType, data1.data),
      yestodayData: parseData(optType, data2.data),
      nowData: parseData(optType, data3.data),
      tags: Object.keys(data1.data)
    };
    return Promise.resolve(data);
  }
  return Promise.all([
    axios.get(`${process.env.REACT_APP_URL}${beforedayFile}`),
    axios.get(`${process.env.REACT_APP_URL}${yestodayFile}`),
    axios.get(`${process.env.REACT_APP_URL}${nowFile}`)
  ]).then((result) => {
    resultData = result;
    var [data1,
      data2,
      data3] = result;
    return {
      beforedayData: parseData(optType, data1.data),
      yestodayData: parseData(optType, data2.data),
      nowData: parseData(optType, data3.data),
      tags: Object.keys(data1.data)
    };
  }).catch(e => {
    console.log(e);
  });
};

export function dataByTag(tag) {
  var [data1,
    data2,
    data3] = resultData;
  var data = {
    beforedayData: parseData(-1, data1.data).filter(x=>x.name === tag),
    yestodayData: parseData(-1, data2.data).filter(x=>x.name === tag),
    nowData: parseData(-1, data3.data).filter(x=>x.name === tag)
  };
  return data;
}

function parseData(optType, jsonData) {
  var data = Object
    .values(jsonData)
    .map((x, i) => {
      const [rank,
        name,
        companyCount,
        index,
        pcr,
        assertIn,
        assertOut,
        assertBalance,
        rank3,
        index3,
        pcr3,
        assertIn3,
        assertOut3,
        assertBalance3,
        rank5,
        index5,
        pcr5,
        assertIn5,
        assertOut5,
        assertBalance5,
        rank10,
        index10,
        pcr10,
        assertIn10,
        assertOut10,
        assertBalance10,
        rank20,
        index20,
        pcr20,
        assertIn20,
        assertOut20,
        assertBalance20] = x;
      return {
        rank: + rank,
        name,
        companyCount: + companyCount,
        index: + index,
        pcr: + pcr.replace("%", ""),
        assertIn: + assertIn,
        assertOut: + assertOut,
        assertBalance: + assertBalance,
        rank3: + rank3,
        index3: + index3,
        pcr3: + pcr3.replace("%", ""),
        assertIn3: + assertIn3,
        assertOut3: + assertOut3,
        assertBalance3: + assertBalance3,
        rank5: + rank5,
        index5,
        pcr5: + (pcr5 || "").replace("%", ""),
        assertIn5: + assertIn5,
        assertOut5: + assertOut5,
        assertBalance5: + assertBalance5,
        rank10: + rank10,
        index10,
        pcr10: + (pcr10 || "").replace("%", ""),
        assertIn10: + assertIn10,
        assertOut10: + assertOut10,
        assertBalance10: + assertBalance10,
        rank20: + rank20,
        index20,
        pcr20: + (pcr20 || "").replace("%", ""),
        assertIn20: + assertIn20,
        assertOut20: + assertOut20,
        assertBalance20: + assertBalance20
      };
    });
  if (optType === 1) {
    //连涨
    return data.filter(x => {
      return (x.rank < x.rank3 && x.rank3 < x.rank5 && x.rank5 < x.rank10 && x.assertBalance3 > 0 //三天净值>0
      );
    });
  } else if (optType === 2) {
    //排名前20
    return data.filter(x => {
      return x.rank < 20;
    });
  } else if(optType === 3){
    //资金前50
    var sortby = require("./sort_by");
    var data = data
      .filter(x => {
      return x.assertBalance > 0 && x.assertBalance3 > 0 && x.rank < 50;
    })
      .sort(sortby("assertBalance", true))
      .sort(sortby("assertBalance3", true))
      .sort(sortby("assertBalance5", true))
      .sort(sortby("assertBalance10", true));
    console.log(data);
    return data;
  }else{
    return data;
  }
}
