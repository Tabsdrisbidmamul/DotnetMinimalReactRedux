using MinimalAPIReactRedux.Models.DTOs;
using System.Globalization;

namespace MinimalAPIReactRedux.Services
{
    public sealed class PolicyService
    {
        private List<PoliciesResponseDTO> _policies = new();

        private readonly ILogger<PolicyService> _logger;

        public PolicyService(ILogger<PolicyService> logger) 
        {
            _logger = logger;

            _policies = new List<PoliciesResponseDTO>
            {
                 new PoliciesResponseDTO
                 {
                    ID = Guid.NewGuid(),
                    CustomerName = "test",
                    PolicyType = PolicyType.Health,
                    Status = Status.Active,
                    PolicyStartDate = DateTime.Now.ToString("O")
                 },
                  
                new PoliciesResponseDTO
                 {
                    ID = Guid.NewGuid(),
                    CustomerName = "test2",
                    PolicyType = PolicyType.Health,
                    Status = Status.Active,
                    PolicyStartDate = DateTime.Now.ToString("O")
                 },
                   
                new PoliciesResponseDTO
                 {
                    ID = Guid.NewGuid(),
                    CustomerName = "test3",
                    PolicyType = PolicyType.Dental,
                    Status = Status.Active,
                    PolicyStartDate = DateTime.Now.ToString("O")
                 },

                 new PoliciesResponseDTO
                 {
                    ID = Guid.NewGuid(),
                    CustomerName = "test4",
                    PolicyType = PolicyType.Vision,
                    Status = Status.Active,
                    PolicyStartDate = DateTime.Now.ToString("O")
                 }
            };
        }

        public List<PoliciesResponseDTO> GetPolicies(string? policyFilter)
        {
            if(policyFilter == "All")
            {
                return _policies;
            }

            PolicyType policyType;
            if(!Enum.TryParse(policyFilter, out policyType))
            {
                _logger.LogError($"Failed to parse policy filter. Got {policyFilter}.");
                return _policies;
            }

            return _policies.Where(p => p.PolicyType == policyType).ToList();
        }

        public (PoliciesResponseDTO?, bool) AddPolicy(PoliciesRequestDTO policy)
        {
            PolicyType policyType;
            if(!Enum.TryParse(policy.PolicyType, out policyType))
            {
                _logger.LogError($"AddPolicy(): Failed to parse policy type. Got {policy.PolicyType}");
                return (null, false);
            }

            Status policyStatus;
            if(!Enum.TryParse(policy.PolicyStatus, out policyStatus))
            {
                _logger.LogError($"AddPolicy(): Failed to parse policy status. Got {policy.PolicyStatus}");
                return (null, false);
            }

            DateTime policyDate;
            if(!DateTime.TryParseExact(policy.PolicyStartDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out policyDate))
            {
                _logger.LogError($"AddPolicy(): Failed to parse policy start date. Got {policy.PolicyStartDate}");
                return (null, false);
            }

            var newPolicy = new PoliciesResponseDTO
            {
                ID = Guid.NewGuid(),
                CustomerName = policy.CustomerName,
                PolicyType = policyType,
                Status = policyStatus,
                PolicyStartDate = policyDate.ToString("O")
            };

            _policies.Add(newPolicy);

            return (newPolicy, true);
        }
    }
}
