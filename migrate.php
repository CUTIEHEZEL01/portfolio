<?php

require 'db.php';

// Create migrations table if not exists
$pdo->exec("CREATE TABLE IF NOT EXISTS migrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

// Scan migration files
$files = glob(__DIR__ . '/migrations/*.php');
foreach ($files as $file) {
    $name = basename($file);

    // Check if this migration was already run
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM migrations WHERE name = ?");
    $stmt->execute([$name]);

    if ($stmt->fetchColumn() == 0) {
        echo "Running migration: $name\n";
        $migration = include $file;
        $migration($pdo); // Run the migration

        // Save to migrations table
        $stmt = $pdo->prepare("INSERT INTO migrations (name) VALUES (?)");
        $stmt->execute([$name]);
    } else {
        echo "Already applied: $name\n";
    }
}
