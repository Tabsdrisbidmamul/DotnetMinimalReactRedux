using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using MinimalAPIReactRedux.Models.DTOs;
using MinimalAPIReactRedux.Services;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Xunit.Abstractions;


namespace MinimalAPIReactRedux.IntegrationTests
{
    public class PolicyTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public PolicyTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Testing");
                builder.ConfigureServices(services =>
                {
                    services.AddSingleton<PolicyService, PolicyService>();
                    services.ConfigureHttpJsonOptions(options =>
                    {
                        options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    });
                });
            })
                .CreateClient();

        }

        [Fact]
        public async Task CreatePolicy_Returns201Created()
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