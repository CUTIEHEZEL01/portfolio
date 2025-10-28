<?php
return function (PDO $pdo) {
    // --- USERS TABLE ---
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            otp VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // --- PROJECTS TABLE ---
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            project_title VARCHAR(255) NOT NULL,
            project_description TEXT,
            file VARCHAR(500),
            project_link VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // Optional: Add missing columns if table exists but some columns were added later
    $columns = [
        'users' => [
            'otp' => 'VARCHAR(50)',
        ],
        'projects' => [
            'file' => 'VARCHAR(255)',
            'project_link' => 'VARCHAR(255)',
        ]
    ];

    foreach ($columns as $table => $cols) {
        foreach ($cols as $col => $type) {
            $stmt = $pdo->query("SHOW COLUMNS FROM `$table` LIKE '$col'");
            if ($stmt->rowCount() === 0) {
                $pdo->exec("ALTER TABLE `$table` ADD COLUMN `$col` $type");
            }
        }
    }

    echo "✅ Migration completed successfully.\n";
};
