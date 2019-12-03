namespace server.Controllers {
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    namespace server.Controllers {
        [Produces ("application/json")]
        [Route ("api/[controller]")]
        public class THSIndustryController : Controller {
            private readonly IHostingEnvironment _hostingEnvironment;
            public THSIndustryController (IHostingEnvironment hostingEnvironment) {
                _hostingEnvironment = hostingEnvironment;
            }
            public dynamic GetRecentData () {
                // string webRootPath = _hostingEnvironment.WebRootPath;
                string contentRootPath = _hostingEnvironment.ContentRootPath;
                string jsonFilesDir = Path.Combine (contentRootPath, "jsonFiles");
                DirectoryInfo info = new DirectoryInfo (jsonFilesDir);
                FileInfo[] files = info.GetFiles ().OrderByDescending (p => p.CreationTime).Take (3).ToArray ();
                dynamic data1 = null,
                    data2 = null,
                    data3 = null;
                if (files.Length > 0) {
                    Console.WriteLine (files[0].Name);
                    data3 = ReadFile (files[0].FullName);
                }
                if (files.Length > 1) {
                    Console.WriteLine (files[1].Name);
                    data2 = ReadFile (files[1].FullName);
                }
                if (files.Length > 2) {
                    Console.WriteLine (files[2].Name);
                    data1 = ReadFile (files[2].FullName);
                }
                return new {
                    data1 = data1,
                        data2 = data2,
                        data3 = data3
                };
            }

            object ReadFile (string filename) {
                StreamReader fs = new StreamReader (filename, Encoding.UTF8);
                string content = fs.ReadToEnd ();
                fs.Close ();
                return JsonConvert.DeserializeObject (content);

            }
        }
    }
}