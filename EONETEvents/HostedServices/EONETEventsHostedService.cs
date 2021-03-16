using Enums;
using EONETEventsTest.Services.Interfaces;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EONETEventsTest.HostedServices
{
    public class EONETEventsHostedService : IHostedService, IDisposable
    {
        private Timer _timer;
        private readonly IEONETService _eONETService;

        public EONETEventsHostedService(IEONETService eONETService)
        {
            _eONETService = eONETService;
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromHours(2));
            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            _eONETService.UpdateEventsCache(EventStatus.Open);
            _eONETService.UpdateEventsCache(EventStatus.Closed);
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
