using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

// name:String, //股票名称
//   symbol:String,//股票代码
//   current:Number, //当前价格
//   pct:Number, //本日涨跌幅%
//   pb:Number, //市净率（倍）
//   pettm:Number, //动态市盈率（倍）
//   roediluted:mongoose.Schema.Types.Mixed, //净资产收益率%
//   pct5:Number, //前5日涨跌幅%
//   pct10:Number, //前10日涨跌幅%
//   pct20:Number, //前20日涨跌幅%
//   pct1m:Number, //近1个月涨跌幅%
//   chgpct:Number,//本日震幅%,
//   chgpct10:Number,//前10日震幅%
//   chgpct20:Number,  //前20日震幅%
//   chgpct1m:Number,//近1月震幅%
//   volume:Number,//本日成交量（万）
//   volavg30:Number,//30日均量(万)	
//   amount:Number,//成交额(万)	
//   tr:Number,//本日换手率(%)	
//   tr5:Number,//前5日换手率%
//   tr10:Number,//前10日换手率%
//   tr20:Number,//前20日换手率(%)	
//   tr1m:Number,//近1月换手率(%)	
//   mc:Number,//总市值(亿),
//   date:Date

namespace XueqiuApi.Model
{
  [BsonIgnoreExtraElements]
  public class Screener
  {
    [BsonId]
    [BsonElement("id")]
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("symbol")]
    public string Symbol { get; set; }

    [BsonElement("current")]
    public decimal Current { get; set; }
    [BsonElement("pct")]
    public decimal PCT { get; set; }
    
    [BsonElement("pb")]
    public decimal PB { get; set; }
    [BsonElement("pettm")]
    public decimal Pettm { get; set; }

    [BsonElement("pct5")]
    public decimal PCT5 { get; set; }

    [BsonElement("pct10")]
    public decimal PCT10 { get; set; }

    [BsonElement("pct20")]
    public decimal PCT20 { get; set; }

    [BsonElement("pct1m")]
    public decimal PCT1m { get; set; }

    [BsonElement("chgpct")]
    public decimal Chgpct { get; set; }

    [BsonElement("chgpct5")]
    public decimal Chgpct5 { get; set; }

    [BsonElement("chgpct10")]
    public decimal Chgpct10 { get; set; }
    [BsonElement("chgpct20")]
    public decimal Chgpct20 { get; set; }
    [BsonElement("chgpct1m")]
    public decimal Chgpct1m { get; set; }
    [BsonElement("volume")]
    public decimal Volume { get; set; }
    [BsonElement("volavg30")]
    public decimal Volavg30 { get; set; }
    [BsonElement("amount")]
    public decimal Amount { get; set; }
    [BsonElement("tr")]
    public decimal Tr { get; set; }
    [BsonElement("tr5")]
    public decimal Tr5 { get; set; }
    [BsonElement("tr10")]
    public decimal Tr10 { get; set; }
    [BsonElement("tr20")]
    public decimal Tr20 { get; set; }
    [BsonElement("tr1m")]
    public decimal Tr1m { get; set; }
    [BsonElement("mc")]
    public decimal MC { get; set; }
    [BsonElement("date")]
    public DateTime Date { get; set; }
  }
}