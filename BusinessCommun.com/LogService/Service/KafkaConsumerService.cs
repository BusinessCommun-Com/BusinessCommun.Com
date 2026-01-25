
using Confluent.Kafka;
using MySqlConnector;

namespace LogService.Service
{
    public class KafkaConsumerService : BackgroundService
    {
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = "localhost:9092",
                GroupId = "log-service",
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

            string connectionString =
        "Server=localhost;Port=3306;Database=BusinessCommun;User=D2_92610_Rahul;Password=manager;";

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
