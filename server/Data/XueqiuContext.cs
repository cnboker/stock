using Microsoft.Extensions.Options;
using MongoDB.Driver;
using XueqiuApi.Model;

namespace XueqiuApi.Data
{
    public class XueqiuContext
    {
        private readonly IMongoDatabase _database = null;

        public XueqiuContext(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<Note> Notes
        {
            get
            {
                return _database.GetCollection<Note>("Note");
            }
        }

        public IMongoCollection<Screener> Screeners{
            get{
                return _database.GetCollection<Screener>("screener");
            }
        }
    }
}
