namespace MinimalAPIReactRedux.Models.DTOs
{
    public sealed class PoliciesResponseDTO
    {
        public required Guid ID { get; set; }
        public required string CustomerName { get; set; }
        public required PolicyType PolicyType { get; set; }
        public required Status Status { get; set; }
        public required string PolicyStartDate { get; set; }
    }

    public sealed class PoliciesRequestDTO
    {
        public required string CustomerName { get; set; }
        public required string PolicyType { get; set; }
        public required string PolicyStatus { get; set; }
        public required string PolicyStartDate { get; set; }
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
