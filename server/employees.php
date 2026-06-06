<?php
require_once 'config.php';

function getSampleEmployees() {
    return [
        [
            'employee_number' => 'EMP001',
            'full_name' => 'Ana Reyes',
            'role' => 'Store Manager',
            'salary' => 42000.00,
            'hired_at' => '2023-01-15'
        ],
        [
            'employee_number' => 'EMP002',
            'full_name' => 'Carlo Dela Cruz',
            'role' => 'Sales Lead',
            'salary' => 35000.00,
            'hired_at' => '2023-03-22'
        ],
        [
            'employee_number' => 'EMP003',
            'full_name' => 'Mia Santos',
            'role' => 'Operations Specialist',
            'salary' => 32000.00,
            'hired_at' => '2023-05-05'
        ],
        [
            'employee_number' => 'EMP004',
            'full_name' => 'Juan Garcia',
            'role' => 'Customer Support',
            'salary' => 28000.00,
            'hired_at' => '2023-07-10'
        ]
    ];
}

function createEmployeesTable($pdo) {
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS admin_employees (
            employee_number VARCHAR(20) PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            role VARCHAR(100) NOT NULL,
            salary DECIMAL(12, 2) NOT NULL DEFAULT 0,
            hired_at DATE NOT NULL
        )");
    } catch (Exception $e) {
        
    }
}

function ensureEmployeesTableSchema($pdo) {
    createEmployeesTable($pdo);

    $requiredColumns = [
        'employee_number' => 'VARCHAR(20) PRIMARY KEY',
        'full_name' => 'VARCHAR(255) NOT NULL',
        'role' => 'VARCHAR(100) NOT NULL',
        'salary' => 'DECIMAL(12, 2) NOT NULL DEFAULT 0',
        'hired_at' => 'DATE NOT NULL'
    ];

    try {
        $stmt = $pdo->prepare("SHOW COLUMNS FROM admin_employees");
        $stmt->execute();
        $existing = [];
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $column) {
            $existing[strtolower($column['Field'])] = true;
        }
    } catch (Exception $e) {
        return;
    }

    foreach ($requiredColumns as $column => $definition) {
        if (!isset($existing[$column])) {
            try {
                $pdo->exec("ALTER TABLE admin_employees ADD COLUMN $column $definition");
            } catch (Exception $e) {
                
            }
        }
    }
}

function sendEmployeesResponse($pdo) {
    ensureEmployeesTableSchema($pdo);

    try {
        $stmt = $pdo->prepare('SELECT employee_number, full_name, role, salary, hired_at FROM admin_employees ORDER BY hired_at DESC, employee_number ASC');
        $stmt->execute();
        $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$employees) {
            sendResponse(getSampleEmployees());
        }

        $result = [];
        foreach ($employees as $employee) {
            $result[] = [
                'employee_number' => $employee['employee_number'],
                'full_name' => $employee['full_name'],
                'role' => $employee['role'],
                'salary' => (float)$employee['salary'],
                'hired_at' => $employee['hired_at']
            ];
        }
        sendResponse($result);
    } catch (Exception $e) {
        sendResponse(getSampleEmployees());
    }
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    sendEmployeesResponse($pdo);
}

if ($method === 'POST') {
    requireAdmin();
    ensureEmployeesTableSchema($pdo);

    $input = json_decode(file_get_contents('php://input'), true);
    $input = is_array($input) ? $input : [];

    $employeeNumber = trim($input['employee_number'] ?? '');
    if ($employeeNumber === '') {
        $stmt = $pdo->prepare("SELECT employee_number FROM admin_employees WHERE employee_number REGEXP '^EMP[0-9]+$' ORDER BY CAST(SUBSTRING(employee_number, 4) AS UNSIGNED) DESC LIMIT 1");
        $stmt->execute();
        $lastEmployee = $stmt->fetchColumn();

        $lastNumber = 0;
        if ($lastEmployee && preg_match('/(\d+)$/', $lastEmployee, $matches)) {
            $lastNumber = (int)$matches[1];
        }

        $employeeNumber = 'EMP' . str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
    }

    $fullName = trim($input['full_name'] ?? '');
    $role = trim($input['role'] ?? 'Staff');
    $salary = is_numeric($input['salary'] ?? null) ? (float)$input['salary'] : 0.0;
    $hiredAt = trim($input['hired_at'] ?? date('Y-m-d'));

    if ($fullName === '') {
        sendResponse(['error' => 'Employee name is required'], 400);
    }

    $stmt = $pdo->prepare('INSERT INTO admin_employees (employee_number, full_name, role, salary, hired_at) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$employeeNumber, $fullName, $role, $salary, $hiredAt]);
    sendEmployeesResponse($pdo);
}

if ($method === 'PUT') {
    requireAdmin();
    ensureEmployeesTableSchema($pdo);

    $input = json_decode(file_get_contents('php://input'), true);
    $input = is_array($input) ? $input : [];

    $employeeNumber = trim($input['employee_number'] ?? '');
    if ($employeeNumber === '') {
        sendResponse(['error' => 'Employee number is required'], 400);
    }

    $fullName = trim($input['full_name'] ?? '');
    $role = trim($input['role'] ?? 'Staff');
    $salary = is_numeric($input['salary'] ?? null) ? (float)$input['salary'] : 0.0;
    $hiredAt = trim($input['hired_at'] ?? date('Y-m-d'));

    if ($fullName === '') {
        sendResponse(['error' => 'Employee name is required'], 400);
    }

    $stmt = $pdo->prepare('UPDATE admin_employees SET full_name = ?, role = ?, salary = ?, hired_at = ? WHERE employee_number = ?');
    $stmt->execute([$fullName, $role, $salary, $hiredAt, $employeeNumber]);
    sendEmployeesResponse($pdo);
}

if ($method === 'DELETE') {
    requireAdmin();
    ensureEmployeesTableSchema($pdo);

    $employeeNumber = trim($_GET['employee_number'] ?? $_GET['id'] ?? '');
    if ($employeeNumber === '') {
        sendResponse(['error' => 'Employee number is required'], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM admin_employees WHERE employee_number = ?');
    $stmt->execute([$employeeNumber]);
    sendEmployeesResponse($pdo);
}

sendResponse(['error' => 'Method not allowed'], 405);
