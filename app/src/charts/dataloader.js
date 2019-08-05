import axios from 'axios'

var moment = require("moment");
const beforedayFile = `/json/${moment()
  .add("days", -2)
  .format("YYYY-MM-DD")}.json`;
const yestodayFile = `/json/${moment()
  .add("days", -1)
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

var DataLoader =  function () {
  return Promise.all([
    axios.get(`${process.env.REACT_APP_URL}${beforedayFile}`),
    axios.get(`${process.env.REACT_APP_URL}${yestodayFile}`),
    axios.get(`${process.env.REACT_APP_URL}${nowFile}`)
  ]).then(([data1, data2, data3]) => {
    return {
      beforedayData: parseData(data1.data),
      yestodayData: parseData(data2.data),
      nowData: parseData(data3.data)
    }
  }).catch(e => {
    console.log(e)
  })
};

export default DataLoader;

function parseData(jsonData) {
  var data = Object
    .values(jsonData)
    .map((x, index) => {
      const [rank3,
        name,
        companyCount,
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
        rank3: + rank3,
        name,
        companyCount: + companyCount,
        index3: + index3,
        pcr3: + pcr3.replace("%", ""),
        assertIn3: + assertIn3,
        assertOut3: + assertOut3,
        assertBalance3: + assertBalance3 * 100,
        rank5: + rank5,
        index5,
        pcr5: + (pcr5 || "").replace("%", ""),
        assertIn5: + assertIn5,
        assertOut5: + assertOut5,
        assertBalance5: + assertBalance5 * 100,
        rank10: + rank10,
        index10,
        pcr10: + (pcr10 || "").replace("%", ""),
        assertIn10: + assertIn10,
        assertOut10: + assertOut10,
        assertBalance10: + assertBalance10 * 100,
        rank20: + rank20,
        index20,
        pcr20: + (pcr20 || "").replace("%", ""),
        assertIn20: + assertIn20,
        assertOut20: + assertOut20,
        assertBalance20: + assertBalance20 * 100
      };
    });

  return data.filter(x => {
    return x.rank3 < x.rank5 && x.rank5 < x.rank10 && x.rank10 < x.rank20;
  });
}