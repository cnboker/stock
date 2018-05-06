using XueqiuApi.Model;
using XueqiuApi.Infrastructure;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using XueqiuApi.Interfaces;

namespace XueqiuApi.Controllers{
  [Produces("application/json")]
  [Route("api/[controller]")]
  public class ScreenerController:Controller{
    private IScreenerRepository _screenerRepository;

    public ScreenerController(IScreenerRepository screenerRepository){
      _screenerRepository = screenerRepository;
    }

    [NoCache]
    [HttpGet]
    public async Task<IEnumerable<Screener>> Get(){
      return await _screenerRepository.GetAllScreeners();
    }

    [NoCache]
    [HttpGet("{symbol}")]
    public async Task<IEnumerable<Screener>> Get(string symbol){
      return await _screenerRepository.GetScreeners(symbol.ToUpper());
    }
  }
}