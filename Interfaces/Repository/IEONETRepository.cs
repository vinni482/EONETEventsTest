using Enums;
using EONETEventsTest.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Interfaces.Repository
{
    public interface IEONETRepository
    {
        Task<EventsObject> GetEvents(string status = EventStatus.Open);
        Task<Event> GetEvent(string id);
    }
}
