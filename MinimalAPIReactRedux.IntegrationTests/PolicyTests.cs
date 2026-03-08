using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using MinimalAPIReactRedux.Models.DTOs;
using MinimalAPIReactRedux.Services;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace MinimalAPIReactRedux.IntegrationTests
{
    public class PolicyTests : BaseTestFixture
    {
        public PolicyTests(WebApplicationFactory<Program> factory): base(factory)
        {
            factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.AddSingleton<PolicyService, PolicyService>();
                });
            });
        }

        [Fact]
        public async Task Get_Policies_Returns_200()
        {
            var response = await _client.GetAsync("/policies?filter=All");

            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task CreatePolicy_Returns_201_Created()
        {
            var policiesRequestDTO = new PoliciesRequestDTO 
            { 
                CustomerName = "test", 
                PolicyStatus = "Active", 
                PolicyType = "Health", 
                PolicyStartDate = "2026-03-06" 
            };

            var response = await _client.PostAsJsonAsync("/policies", policiesRequestDTO);

            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task Check_If_Create_Policy_Returns_Correct_Body()
        {
            var policiesRequestDTO = new PoliciesRequestDTO
            {
                CustomerName = "test",
                PolicyStatus = "Active",
                PolicyType = "Health",
                PolicyStartDate = "2026-03-06"
            };

            var response = await _client.PostAsJsonAsync("/policies", policiesRequestDTO);

            response.EnsureSuccessStatusCode();

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                Converters = { new JsonStringEnumConverter() }
            };

            var policy = await response.Content.ReadFromJsonAsync<PoliciesResponseDTO?>(options);

            if (policy == null)
            {
                Assert.Fail("Returned policy was null");
            }

            Assert.Equal("test", policy.CustomerName);
        }
    }
}