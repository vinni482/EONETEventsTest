using EONETEventsTest.Models;
using EONETEventsTest.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EONETEventsTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EONETController : ControllerBase
    {
        private readonly IEONETService _eONETService;

        public EONETController(IEONETService eONETService)
        {
            _eONETService = eONETService;
        }

        [HttpPost]
        [Route("/events")]
        public async Task<ActionResult<PagedModel<Event>>> GetEvents([FromBody]TableParams tableParams)
        {
            var result = await _eONETService.GetEvents(tableParams);
            return Ok(result);
        }

        [HttpGet]
        [Route("/events/{id}")]
        public async Task<ActionResult<Event>> GetEvent(string id)
        {
            var result = await _eONETService.GetEvent(id);
            return Ok(result);
        }
    }
}
