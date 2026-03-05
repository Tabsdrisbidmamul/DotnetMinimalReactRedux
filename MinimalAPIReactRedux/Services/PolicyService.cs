using MinimalAPIReactRedux.Models.DTOs;

namespace MinimalAPIReactRedux.Services
{
    public sealed class PolicyService
    {
        private List<PoliciesDTO> _policies = new();
        public List<PoliciesDTO> policies { get { return _policies; } }

        public PolicyService() 
        {
            _policies = new List<PoliciesDTO>
            {
                 new PoliciesDTO
                 {
                    ID = "1",
                    CustomerName = "test",
                    PolicyType = PolicyType.Health,
                    Status = Status.Active,
                    StartDate = DateTime.Now
                 }
            };
        }

        public void AddPolicy(PoliciesDTO policy)
        {
            _policies.Add(policy);
        }

        
    }
}
