-- ============================================
-- Inventory Management System Database Schema
-- Open with: MySQL Workbench
-- Version: 1.0
-- ============================================

-- Создание базы данных
CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- ============================================
-- Таблица: users (пользователи)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Таблица: orders (приходы)
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_created_at (created_at),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Таблица: products (продукты)
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    sn VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(100) NOT NULL,
    status ENUM('Свободен', 'В ремонте', 'Списан', 'Зарезервирован') DEFAULT 'Свободен',
    warranty_start DATE NOT NULL,
    warranty_end DATE NOT NULL,
    price_usd DECIMAL(10, 2) NOT NULL,
    price_uah DECIMAL(12, 2) NOT NULL,
    order_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_sn (sn),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_order_id (order_id),
    INDEX idx_warranty_end (warranty_end)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Таблица: sessions (активные сессии для WebSocket)
-- ============================================
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INT,
    socket_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_last_activity (last_activity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Таблица: audit_log (аудит действий)
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_entity (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Вставка тестовых данных
-- ============================================

-- Пользователь admin (пароль: admin123, хэш для bcrypt)
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@inventory.com', '$2a$10$XQwvKJZzXqJ5qJ5qJ5qJ5u', 'admin'),
('manager', 'manager@inventory.com', '$2a$10$XQwvKJZzXqJ5qJ5qJ5qJ5u', 'manager'),
('user1', 'user1@inventory.com', '$2a$10$XQwvKJZzXqJ5qJ5qJ5qJ5u', 'user');

-- Тестовые приходы
INSERT INTO orders (name, description, created_by) VALUES
('Поставка комплектующих Gigabyte', 'Майская поставка материнских плат', 1),
('Серверное оборудование', 'Оборудование для ЦОДа', 1),
('Периферия и аксессуары', 'Клавиатуры, мыши, мониторы', 2);

-- Тестовые продукты
INSERT INTO products (name, sn, type, status, warranty_start, warranty_end, price_usd, price_uah, order_id) VALUES
('Gigabyte Technology X58-USB3', 'SN-12.3456789', 'материнская плата', 'Свободен', '2025-04-06', '2027-04-06', 2500.00, 250000.50, 1),
('Gigabyte Technology X58-USB3', 'SN-98.7654321', 'материнская плата', 'В ремонте', '2025-04-06', '2027-04-06', 2500.00, 250000.50, 1),
('Kingston HyperX DDR3 8GB', 'RAM-112233', 'оперативная память', 'Свободен', '2025-04-06', '2027-04-06', 85.50, 3500.00, 1),
('Intel Xeon E5-2690', 'CPU-443322', 'процессор', 'Свободен', '2025-04-10', '2028-04-10', 1200.00, 50000.00, 2),
('Supermicro X10DRi', 'MB-998877', 'материнская плата', 'Свободен', '2025-04-10', '2028-04-10', 850.00, 35000.00, 2);

-- ============================================
-- Полезные VIEW
-- ============================================

-- VIEW: Статистика по приходам
CREATE OR REPLACE VIEW order_statistics AS
SELECT
    o.id,
    o.name,
    COUNT(p.id) as products_count,
    SUM(p.price_usd) as total_usd,
    SUM(p.price_uah) as total_uah,
    o.created_at
FROM orders o
LEFT JOIN products p ON o.id = p.order_id
GROUP BY o.id;

-- VIEW: Продукты с истекающей гарантией (30 дней)
CREATE OR REPLACE VIEW expiring_warranty AS
SELECT
    p.*,
    o.name as order_name,
    DATEDIFF(p.warranty_end, CURDATE()) as days_left
FROM products p
JOIN orders o ON p.order_id = o.id
WHERE p.warranty_end BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
ORDER BY days_left ASC;

-- ============================================
-- Полезные хранимые процедуры
-- ============================================

DELIMITER //

-- Процедура: безопасное удаление прихода (с аудитом)
CREATE PROCEDURE safe_delete_order(IN order_id INT, IN user_id INT)
BEGIN
    DECLARE order_name VARCHAR(255);

    -- Получаем название прихода для аудита
    SELECT name INTO order_name FROM orders WHERE id = order_id;

    -- Записываем в аудит
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, old_values)
    VALUES (user_id, 'DELETE', 'order', order_id, JSON_OBJECT('name', order_name));

    -- Удаляем приход (каскадно удалит продукты)
    DELETE FROM orders WHERE id = order_id;
END //

-- Процедура: очистка старых сессий (старше 1 часа)
CREATE PROCEDURE cleanup_old_sessions()
BEGIN
    DELETE FROM sessions WHERE last_activity < DATE_SUB(NOW(), INTERVAL 1 HOUR);
END //

DELIMITER ;

-- ============================================
-- Триггеры
-- ============================================

-- Триггер: автоматическое обновление updated_at
DELIMITER //
CREATE TRIGGER update_orders_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

CREATE TRIGGER update_products_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- ============================================
-- Индексы для производительности
-- ============================================

-- Составные индексы для частых запросов
CREATE INDEX idx_products_order_status ON products(order_id, status);
CREATE INDEX idx_products_type_price ON products(type, price_usd);
CREATE INDEX idx_orders_created_user ON orders(created_at, created_by);