CREATE DATABASE IF NOT EXISTS `businesscommun`;
USE `businesscommun`;

-- ==========================================
-- 1. Table Definitions
-- ==========================================

-- 1. Users Table
CREATE TABLE `users` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(254) UNIQUE NOT NULL,
  `password_hash` varchar(500) NOT NULL,
  `role` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL DEFAULT 'User',
  `last_name` varchar(50) NOT NULL DEFAULT 'Name',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Domains Table
CREATE TABLE `domains` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL
);

-- 3. Organization Types Table
CREATE TABLE `organization_types` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL
);

-- 4. Company Owners Table
CREATE TABLE `company_owners` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `owner_name` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- 5. Companies Table
CREATE TABLE `companies` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `owner_id` bigint,
  `domain_id` bigint NOT NULL,
  `org_type_id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `establishment_year` int,
  `gst_number` varchar(255) UNIQUE NOT NULL,
  `annual_revenue` bigint NOT NULL,
  `address` varchar(255),
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `logo_url` varchar(512),
  `status` varchar(50) DEFAULT 'PENDING',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`owner_id`) REFERENCES `company_owners` (`id`),
  FOREIGN KEY (`domain_id`) REFERENCES `domains` (`id`),
  FOREIGN KEY (`org_type_id`) REFERENCES `organization_types` (`id`)
);

-- 6. Pitches Table
CREATE TABLE `pitches` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `company_id` bigint NOT NULL,
  `title` varchar(512),
  `description` text,
  `product_image_url` varchar(512),
  `website_url` varchar(512),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
);

-- 7. Investor Connects
CREATE TABLE `investor_connects` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `company_id` bigint NOT NULL,
  `requirement` text NOT NULL,
  `minimum_qualification` varchar(255) NOT NULL,
  `skills` varchar(255) NOT NULL,
  `investment_range` varchar(255),
  `equity_percentage` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
);

-- 8. Partner Connects
CREATE TABLE `partner_connects` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `company_id` bigint NOT NULL,
  `requirement` text NOT NULL,
  `minimum_qualification` varchar(255) NOT NULL,
  `skills` varchar(255) NOT NULL,
  `equity_percentage` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
);

-- 9. Premier Investors
CREATE TABLE `premier_investors` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `introduction` text NOT NULL
);

-- 10. Admin Activity Logs
CREATE TABLE `admin_activity_logs` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `action` enum('APPROVED','PENDING','REJECTED') DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. Seed Data
-- ==========================================

-- Populate Domains (Let DB assign IDs)
INSERT INTO `domains` (`name`) VALUES 
('3D Printing and Additive Manufacturing'),('Aerospace and Defense'),('Agri-Farming, IoT and Technology'),
('Agriculture and AgriTech'),('Artificial Intelligence (AI) and Robotics'),('Automobile'),
('Banking and Financial Services'),('Beauty and Lifestyle'),('Biotechnology and Life Sciences'),
('Blockchain'),('Chemicals and Petrochemicals'),('Civil Aviation'),('Cloud Computing and Hosting Services'),
('Construction and Engineering'),('Construction Materials and Cement'),('Cryptocurrency and Blockchain'),
('Cybersecurity'),('Digital Marketing and Advertising'),('Education and EdTech'),('Energy and Power'),
('Entertainment and Media'),('Environment and Sustainability'),('Environmental and Waste Management'),
('Event Management and Conferences'),('Financial Auditing and Accounting Services'),('Financial Technology (FinTech)'),
('Food and Beverages'),('Freight and Shipping'),('Gaming and eSports'),('Healthcare and Pharmaceuticals'),
('Hospitality and Tourism'),('Human Resources (HR) and Recruitment'),('Information Technology (IT) and Software'),
('Insurance'),('Interior Design and Architecture'),('Legal and Consulting Services'),
('Logistics and Supply Chain'),('Luxury Real Estate and Property Development'),('Manufacturing and Industrial Goods'),
('Marine and Shipping'),('Mining and Metal Industries'),('Nonprofit Organizations (NGOs)'),
('Oil, Gas and Petroleum Services'),('Packaging'),('Petroleum and Natural Gas'),
('Pharmaceutical and Biotech Research'),('Printing and Publishing'),('Public Sector Enterprises (PSU)'),
('Real Estate and Infrastructure'),('Renewable Energy and Green Energy'),('Retail and E-commerce'),
('Retail Consumer Electronics'),('Security Services and Systems'),('Smart Home and IoT (Internet of Things)'),
('Social Media and Online Content Creation'),('Space and Cosmos'),('Sports and Fitness'),
('Supply Chain and Procurement Services'),('Technology and Electronics'),('Telecommunications'),
('Textiles and Apparel'),('Travel and Travel Services'),('Waste Recycling and Smoke Recovery'),
('Waste to Energy'),('Water Purification and Management');

-- Populate Organization Types (Let DB assign IDs)
INSERT INTO `organization_types` (`name`) VALUES 
('Sole propriertorship'),('Partnership'),('Limited Liability Company'),
('Limited Liability Partnership'),('Non profitable Organization'),('Private limited company(PLC)'),
('Public limited company'),('Corporation(Ccom)'),('S Corporation(Scom)'),
('Join Venture'),('Other');
