using MinimalAPIReactRedux.Models.DTOs;
using System.Globalization;

namespace MinimalAPIReactRedux.Services
{
    public sealed class PolicyService
    {
        private List<PoliciesResponseDTO> _policies = new();
        public List<PoliciesResponseDTO> policies { get { return _policies; } }

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
                    StartDate = DateTime.Now.ToString("O")
                 }
            };
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
            if(!DateTime.TryParseExact(policy.StartDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out policyDate))
            {
                _logger.LogError($"AddPolicy(): Failed to parse policy start date. Got {policy.StartDate}");
                return (null, false);
            }

            var newPolicy = new PoliciesResponseDTO
            {
                ID = Guid.NewGuid(),
                CustomerName = policy.CustomerName,
                PolicyType = policyType,
                Status = policyStatus,
                StartDate = policyDate.ToString("O")
            };

            _policies.Add(newPolicy);

            return (newPolicy, true);
        }
    }
}
