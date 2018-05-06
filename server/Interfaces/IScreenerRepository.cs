using System.Collections.Generic;
using System.Threading.Tasks;
using XueqiuApi.Model;

namespace XueqiuApi.Interfaces{
  public interface IScreenerRepository
  {
      Task<IEnumerable<Screener>> GetAllScreeners();
      Task<IEnumerable<Screener>> GetScreeners(string symbol);
  }
}