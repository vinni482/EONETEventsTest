using System.Collections.Generic;

namespace EONETEventsTest.Models
{
    public class EventsObject : ErrorMessage
    {
        public string title { get; set; }
        public string description { get; set; }
        public string link { get; set; }
        public List<Event> events { get; set; }
    }


}
