
using Confluent.Kafka;
using MySqlConnector;

namespace LogService.Service
{
    public class KafkaConsumerService : BackgroundService
    {
        private readonly IConfiguration _configuration;

        public KafkaConsumerService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var bootstrapServers = _configuration["Kafka:BootstrapServers"];
            var groupId = _configuration["Kafka:GroupId"];

            var config = new ConsumerConfig
            {
                BootstrapServers = bootstrapServers,
                GroupId = groupId,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };

            using var consumer = new ConsumerBuilder<string, string>(config).Build();

            consumer.Subscribe("user-logs");

            while (!stoppingToken.IsCancellationRequested)
            {
                var result = consumer.Consume(stoppingToken);
                SavetoDatabase(result.Message.Value);
            }

            return Task.CompletedTask;
        }

        private void SavetoDatabase(string message) {
            Console.WriteLine("LOG RECEIVED: " + message);

            string connectionString = _configuration["ConnectionStrings:DefaultConnection"]; 

            using var connection = new MySqlConnection(connectionString);
            connection.Open();

            using var command = new MySqlCommand(
                "INSERT INTO logs (Message, CreatedAt) VALUES (@msg, NOW())",
                connection);

            command.Parameters.AddWithValue("@msg", message);

            command.ExecuteNonQuery();
        }
    }
}
