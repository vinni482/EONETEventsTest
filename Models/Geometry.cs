using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EONETEventsTest.Models
{
    public class Geometry
    {
        public DateTime? date { get; set; }
        public string type { get; set; }
        public List<string> coordinates { get; set; }
    }
}
