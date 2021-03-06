﻿using EONETEventsTest.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EONETEventsTest.Services.Interfaces
{
    public interface IEONETService
    {
        Task<PagedModel<Event>> GetEvents(TableParams tableParams);
        Task<Event> GetEvent(string id);
        Task<List<Event>> UpdateEventsCache(string eventStatus);
    }
}
