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
        public async Task<ActionResult<List<Event>>> GetEvents([FromBody]TableParams tableParams)
        {
            var result = await _eONETService.GetEvents(tableParams);
            if (result == null || !result.Any())
                return NotFound();

            return Ok(result);
        }

        [HttpGet]
        [Route("/events/{id}")]
        public async Task<ActionResult<Event>> GetEvent(string id)
        {
            var result = await _eONETService.GetEvent(id);
            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}
