using Enums;
using EONETEventsTest.Models;
using Interfaces.Repository;
using RestSharp;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository
{
    public class EONETRepository : IEONETRepository
    {
        private RestClient _client;

        public EONETRepository()
        {
            _client = new RestClient("https://eonet.sci.gsfc.nasa.gov");
        }

        public async Task<EventsObject> GetEvents(string status = EventStatus.Open)
        {
            var requestOpen = new RestRequest("api/v2.1/events", Method.GET);
            requestOpen.AddParameter("status", status);
            var queryResult = await _client.ExecuteAsync<EventsObject>(requestOpen);

            return queryResult.Data;
        }

        public async Task<Event> GetEvent(string id)
        {
            var request = new RestRequest("api/v2.1/events/{id}", Method.GET);
            request.AddUrlSegment("id", id);
            request.OnBeforeDeserialization = resp => { resp.ContentType = "application/json"; }; //this endpoint sends wrong content-type
            var queryResult = await _client.ExecuteAsync<Event>(request);

            return queryResult.Data;
        }
    }
}
