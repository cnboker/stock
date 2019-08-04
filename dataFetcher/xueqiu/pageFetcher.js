const EventEmitter = require('events');

const request = require('request');
const Screener = require('../models/screener')
const mongoose = require('mongoose');
import {cookieValue} from 'constants'

class Fetcher extends EventEmitter {
  constructor() {
    super();
    const db_url = 'mongodb://localhost/xueqiuStock';
    mongoose.connect(db_url);
    var db = mongoose.connection;
    db.on('error', function (err) {
      console.log('mongodb connection error', err)
    })
    db.once('open', function () {
      console.log('connectied');
    })
  }
 

  fetch(page) {
    const startUrl = `https://xueqiu.com/stock/screener/screen.json?exchange=&areacode=&indcode=&orderby=symbol&order=desc&current=0_670.26&pct=-10.05_44&page=${page}&pb=0_5&pettm=0_50&roediluted.20171231=0_100&pct5=-34.3116_61.0704&pct10=-40.2525_144.123&pct20=-64.1414_423.2558&pct1m=-65.92_423.2558&chgpct=0_100&chgpct5=0_59.7652&chgpct10=0_149.3671&volume=0_80932.96&chgpct1m=0_506.4482&chgpct20=0_506.4482&volavg30=0_66262.76&amount=0_556965.75&tr=0_71.5&tr5=0_285.7058&tr10=0_430.5373&tr20=0_940.843&tr1m=0_991.7081&mc=0_21099.2504&_=1524317743031`;
    console.log(startUrl);
    var that = this;
    request(startUrl, {
      'headers': {
        'Cookie': cookieValue
      }
    }, function (error, response, body) {
      var arr = JSON.parse(body);

      that.jsonArrSave(arr.list).then(()=>{
        that.emit('nextpage', {
          records: arr.list,
          pageIndex: page
        });
      })
           
    });
  }

  async jsonArrSave(arr) {
    for (let item of arr) {
      await this.upsertStock(item)
    }
  }

  async upsertStock(jsonObj) {
    let conditions = {
      symbol: jsonObj.symbol
    }
    let options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };
    jsonObj.date = Date.now();
    var stock = new Screener(jsonObj)
    await stock
      .save()
      .then(doc => {
        console.log(doc.name)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = Fetcher;