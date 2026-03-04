namespace MinimalAPIReactRedux.Models.DTOs
{
    public class PoliciesDTO
    {
        public required string ID { get; set; }
        public required string CustomerName { get; set; }
        public required PolicyType PolicyType { get; set; }
        public required Status Status { get; set; }
        public required DateTime StartDate { get; set; }
    }

    public enum PolicyType
    {
        Health,
        Dental,
        Vision
    }

    public enum Status
    {
        Active,
        Expired,
        Pending
    }
}
