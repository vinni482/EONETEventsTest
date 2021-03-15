namespace EONETEventsTest.Models
{
    public class TableParams
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; } = 20;
        public string Order { get; set; } = "asc";
        public string OrderBy { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string Status { get; set; }
        public string Category { get; set; }
    }
}
