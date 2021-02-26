using System;
using System.Collections.Generic;

namespace EONETEventsTest.Models
{
    public class Event : ErrorMessage
    {
        public string id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string link { get; set; }
        public List<Category> categories { get; set; }
        public List<Source> sources { get; set; }
        public List<Geometry> geometries { get; set; }
        public DateTime? closed { get; set; }
    }
}
