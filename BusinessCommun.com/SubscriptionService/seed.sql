-- Create DB
CREATE DATABASE IF NOT EXISTS SubScriptionService;
USE SubScriptionService;

-- Investors
CREATE TABLE IF NOT EXISTS investors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  company VARCHAR(200),
  email VARCHAR(200),
  phone VARCHAR(50),
  details TEXT,
  premium TINYINT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId BIGINT NOT NULL,
  username VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  is_premium TINYINT DEFAULT 0,
  subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchases
DROP TABLE IF EXISTS purchases;
CREATE TABLE purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  plan VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  razorpay_order_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Seed premium investors
INSERT INTO investors (name, company, email, phone, details, premium) VALUES
('Asha Mehta', 'GrowthCap Ventures', 'asha@growthcap.com', '+919812345678', 'Focus on tech startups, seed to series A', 1),
('Rohit Sharma', 'BlueRiver Investments', 'rohit@blueriver.com', '+919876543210', 'Sector: manufacturing and logistics', 1),
('Sonia Kapoor', 'Alpha Partners', 'sonia@alphap.com', '+919700001234', 'Early-stage consumer brands', 1),
('Vikram Desai', 'NextWave Capital', 'vikram@nextwave.com', '+919711112222', 'Fintech and SaaS investor', 1),
('Priya Nair', 'Silverline Ventures', 'priya@silverline.com', '+919755553333', 'Healthcare and biotech focus', 1)
ON DUPLICATE KEY UPDATE name = VALUES(name);
