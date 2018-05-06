using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

using XueqiuApi.Interfaces;
using XueqiuApi.Model;
using MongoDB.Bson;

namespace XueqiuApi.Data{
  public class ScreenerRepository:IScreenerRepository{
    private readonly XueqiuContext _context = null;
    public ScreenerRepository(IOptions<Settings> settings){
      _context = new XueqiuContext(settings);
    }

    public async Task<IEnumerable<Screener>> GetAllScreeners()
    {
      try{
        return await _context.Screeners.Find(_=>true).ToListAsync();
      }catch(Exception ex){
        throw ex;
      }
    }

    public async Task<IEnumerable<Screener>> GetScreeners(string symbol)
    {
      return await _context.Screeners.Find(x=>x.Symbol == symbol).ToListAsync();
    }
  }
}