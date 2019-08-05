using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using XueqiuApi.Interfaces;
using XueqiuApi.Data;
using XueqiuApi.Model;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace XueqiuApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddPolicy("CorsPolicy",
                  builder => builder.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
      });

      services.AddMvc();

      services.Configure<Settings>(options =>
      {
        options.ConnectionString = Configuration.GetSection("MongoConnection:ConnectionString").Value;
        options.Database = Configuration.GetSection("MongoConnection:Database").Value;
      });

      services.AddTransient<INoteRepository, NoteRepository>();
      services.AddTransient<IScreenerRepository, ScreenerRepository>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseCors("CorsPolicy");
      app.UseStaticFiles();
      app.UseStaticFiles(new StaticFileOptions
      {
        FileProvider = new PhysicalFileProvider(
      Path.Combine(Directory.GetCurrentDirectory(), "jsonFiles")),
        RequestPath = "/json"
      });
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseMvc();
    }
  }
}
