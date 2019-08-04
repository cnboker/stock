const mongoose = require('mongoose')
const Stock = require('../models/stock')
const Screener = require('../models/screener')


const db_url = 'mongodb://localhost/xueqiuStock'
mongoose.connect(db_url)
var db = mongoose.connection;

merge()

async function merge() {
  Stock.find({}).limit(100000).then(objs => {
    for (var obj of objs) {
      updateOne(obj)
    }

  })
}

async function updateOne(obj) {
  console.log('obj', obj)
  //obj._id = '';
  
  var screener = new Screener(obj)
  // you could set a new id
  screener._id = mongoose.Types.ObjectId()
  screener.isNew = true
    
  await screener.save((err, result)=> {
    if (err) return console.error(err);
    console.log(result + " ok");
  });
  // await Screener.findByIdAndUpdate(conditions, screener, options, (err, result) => {
  //   if (err) {
  //     console.log('something wrong when updating data!',err);
  //   } else {
  //     console.log(result + ' success');
  //   }
  // })
}