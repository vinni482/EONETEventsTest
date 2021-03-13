namespace Enums
{
    public static class EventStatus
    {
        public const string Open = "open";
        public const string Closed = "closed";
    }

    public static class OrderBy
    {
        public const string Title = "title";
        public const string Date = "date";
        public const string Status = "status";
        public const string Category = "category";
    }

    public static class Configurations
    {
        public const string ClosedEventsCacheExpiration = "ClosedEventsCacheExpiration";
        public const string OpenEventsCacheExpiration = "OpenEventsCacheExpiration";
    }
}
