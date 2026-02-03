package com.backend.logger;

import org.apache.kafka.clients.producer.*;
import java.util.Properties;

public class KafkaLogger {
	private static Producer<String, String> producer;
	
	
	static {
        Properties props = new Properties();
        String bootstrapServers = System.getenv("KAFKA_BOOTSTRAP_SERVERS") != null 
                ? System.getenv("KAFKA_BOOTSTRAP_SERVERS") 
                : "localhost:9092";

		props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put("key.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");

        producer = new KafkaProducer<>(props);
    }
	
	public static void log(String message) {
        ProducerRecord<String, String> record =
                new ProducerRecord<>("user-logs", message);
        producer.send(record);
    }
	
}
