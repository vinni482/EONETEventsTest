using Enums;
using EONETEventsTest.Models;
using EONETEventsTest.Services.Interfaces;
using Interfaces.Repository;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EONETEventsTest.Services.Implementation
{
    public class EONETService : IEONETService
    {
        private readonly IEONETRepository _eONETRepository;
        private readonly IMemoryCache _cache;
        private readonly IConfiguration _configuration;

        public EONETService(IEONETRepository eONETRepository, IMemoryCache cache, IConfiguration configuration)
        {
            _eONETRepository = eONETRepository;
            _cache = cache;
            _configuration = configuration;
        }

        public async Task<List<Event>> GetEvents(TableParams tableParams)
        {
            List<Event> events = new List<Event>();
            List<Event> openEvents = null;
            List<Event> closedEvents = null;

            _cache.TryGetValue(EventStatus.Open, out openEvents);
            _cache.TryGetValue(EventStatus.Closed, out closedEvents);

            if (openEvents == null && closedEvents == null) //run in parallel
            {
                Task<EventsObject> openTask = _eONETRepository.GetEvents(EventStatus.Open);
                Task<EventsObject> closedTask = _eONETRepository.GetEvents(EventStatus.Closed);                
                await Task.WhenAll(openTask, closedTask); //wait for both
                openEvents = openTask.Result?.events;
                closedEvents = closedTask.Result?.events;
            }
            else if (openEvents == null)
            {
                var eventsObject = await _eONETRepository.GetEvents(EventStatus.Open);
                openEvents = eventsObject?.events;
            }
            else if (closedEvents == null)
            {
                var eventsObject = await _eONETRepository.GetEvents(EventStatus.Closed);
                closedEvents = eventsObject?.events;
            }

            if (openEvents != null && openEvents.Any()) {
                double cacheExp = 0;
                double.TryParse(_configuration[Configurations.OpenEventsCacheExpiration], out cacheExp);
                cacheExp = cacheExp == 0 ? 750 : cacheExp;
                _cache.Set(EventStatus.Open, openEvents, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(cacheExp)));

                events.AddRange(openEvents);
            }
            if (closedEvents != null && closedEvents.Any()) {
                double cacheExp = 0;
                double.TryParse(_configuration[Configurations.ClosedEventsCacheExpiration], out cacheExp);
                cacheExp = cacheExp == 0 ? 750 : cacheExp;
                _cache.Set(EventStatus.Closed, closedEvents, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(cacheExp)));

                events.AddRange(closedEvents);
            } 

            if (events.Any())
            {
                if (tableParams.Status != null && tableParams.Status.ToLower() == EventStatus.Open)
                    events = events.Where(x => x.closed == null).ToList();
                if (tableParams.Status != null && tableParams.Status.ToLower() == EventStatus.Closed)
                    events = events.Where(x => x.closed != null).ToList();
                if (!string.IsNullOrWhiteSpace(tableParams.Category))
                    events = events.Where(x => x.categories.Any(c => c.title != null && c.title.ToLower().Contains(tableParams.Category.Trim().ToLower()))).ToList();

                if (tableParams.OrderBy != null && tableParams.OrderBy.ToLower() == OrderBy.Date)
                    events = tableParams.Order == "asc" ? events.OrderBy(x => x.geometries.OrderBy(g => g.date).Select(g => g.date).FirstOrDefault()).ToList() :
                                                        events.OrderByDescending(x => x.geometries.OrderBy(g => g.date).Select(g => g.date).FirstOrDefault()).ToList();
                if (tableParams.OrderBy != null && tableParams.OrderBy.ToLower() == OrderBy.Status)
                    events = tableParams.Order == "asc" ? events.OrderBy(x => x.closed).ToList() :
                                                        events.OrderByDescending(x => x.closed).ToList();
                if (tableParams.OrderBy != null && tableParams.OrderBy.ToLower() == OrderBy.Category)
                    events = tableParams.Order == "asc" ? events.OrderBy(x => x.categories.Select(c => c.title).FirstOrDefault()).ToList() :
                                                        events.OrderByDescending(x => x.categories.Select(c => c.title).FirstOrDefault()).ToList();

                if (tableParams.PageNumber >= 1)
                    events = events.Skip((tableParams.PageNumber - 1) * tableParams.PageSize).Take(tableParams.PageSize).ToList();
            }
            return events;
        }

        public async Task<Event> GetEvent(string id)
        {
            return await _eONETRepository.GetEvent(id);
        }
    }
}
