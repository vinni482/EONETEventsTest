using EONETEventsTest.Models;
using EONETEventsTest.Services.Interfaces;
using Interfaces.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EONETEventsTest.Services.Implementation
{
    public class EONETService : IEONETService
    {
        private readonly IEONETRepository _eONETRepository;

        public EONETService(IEONETRepository eONETRepository)
        {
            _eONETRepository = eONETRepository;
        }

        public async Task<List<Event>> GetEvents(TableParams tableParams)
        {
            List<Event> events = new List<Event>();

            var openEvents = await _eONETRepository.GetEvents();
            var closedEvents = await _eONETRepository.GetEvents("closed");

            if (openEvents != null && openEvents.Any())
            {
                events.AddRange(openEvents);
            }
            if (closedEvents != null && closedEvents.Any())
            {
                events.AddRange(closedEvents);
            }
            if (events.Any())
            {
                if (tableParams.OrderBy.ToLower() == "date")
                    events = tableParams.Order == "asc" ? events.OrderBy(x => x.geometries.OrderBy(g => g.date).FirstOrDefault()).ToList() :
                                                        events.OrderByDescending(x => x.geometries.OrderBy(g => g.date).FirstOrDefault()).ToList();
                if (tableParams.OrderBy.ToLower() == "status")
                    events = tableParams.Order == "asc" ? events.OrderBy(x => x.closed).ToList() :
                                                        events.OrderByDescending(x => x.closed).ToList();
                if (tableParams.OrderBy.ToLower() == "category")
                    events = tableParams.Order == "asc" ? events.OrderBy(x => x.categories.Select(c => c.title).FirstOrDefault()).ToList() :
                                                        events.OrderByDescending(x => x.categories.Select(c => c.title).FirstOrDefault()).ToList();
            }
            return events;
        }

        public async Task<Event> GetEvent(string id)
        {
            return await _eONETRepository.GetEvent(id);
        }
    }
}
