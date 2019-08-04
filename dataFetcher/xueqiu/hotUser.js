const EventEmitter = require('events');

const request = require('request');
const Screener = require('../models/screener')
const mongoose = require('mongoose');
import {cookieValue} from 'constants'

export default class Fetcher extends EventEmitter {
  constructor() {
    super();
    // const db_url = 'mongodb://localhost/xueqiuStock';
    // mongoose.connect(db_url);
    // var db = mongoose.connection;
    // db.on('error', function (err) {
    //   console.log('mongodb connection error', err)
    // })
    // db.once('open', function () {
    //   console.log('connectied');
    // })
  }

  fetch(page) {
    const startUrl = `https://xueqiu.com/snowman/service/cubes/rank?tid=PAMID&period=DAY&page=2&_=` +  new Date();
    var that = this;
    request(startUrl, {
      'headers': {
        'Cookie': cookieValue
      }
    }, function (error, response, body) {
      var arr = JSON.parse(body);
        console.log(body)
    //   that.jsonArrSave(arr.list).then(()=>{
    //     that.emit('nextpage', {
    //       records: arr.list,
    //       pageIndex: page
    //     });
    //   })
           
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
