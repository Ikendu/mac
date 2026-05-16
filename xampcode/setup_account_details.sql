-- Account Details Table Setup
CREATE TABLE IF NOT EXISTS account_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    account_number VARCHAR(20) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default account details (adjust user_id as needed)
INSERT INTO account_details (user_id, account_number, account_name) 
VALUES (1, '3230350703', 'Tijani Barakat Olayinka')
ON DUPLICATE KEY UPDATE 
    account_number = VALUES(account_number),
    account_name = VALUES(account_name);
