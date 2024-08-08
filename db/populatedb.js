#! /usr/bin/env node

const { Client } = require("pg");

// Get the connection string from command-line arguments
const connectionString = process.argv[2];

if (!connectionString) {
  console.error("Please provide a connection string as the first argument.");
  process.exit(1);
}

const SQL = `
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price INTEGER,
  quantity INTEGER
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price INTEGER,
  quantity INTEGER
);

INSERT INTO items (name, description, price, quantity) VALUES
('Laptop', 'A high-performance laptop with 16GB RAM and 512GB SSD', 1200, 15),
('Wireless Mouse', 'Ergonomic wireless mouse with adjustable DPI', 25, 50),
('Office Chair', 'Comfortable office chair with lumbar support', 150, 20),
('USB-C Hub', 'USB-C hub with multiple ports for connectivity', 35, 30),
('Bluetooth Headphones', 'Noise-cancelling Bluetooth headphones', 80, 25),
('External Hard Drive', '1TB external hard drive for extra storage', 60, 40),
('Monitor Stand', 'Adjustable monitor stand for ergonomic viewing', 45, 35),
('Keyboard', 'Mechanical keyboard with backlighting', 70, 45),
('Webcam', 'HD webcam for video conferencing', 50, 20),
('Docking Station', 'Docking station for connecting multiple peripherals', 100, 15);
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({ connectionString });
  try {
    await client.connect();
    await client.query(SQL);
  } catch (error) {
    console.error("Error during database operation:", error);
  } finally {
    await client.end();
  }
  console.log("Done");
}

main();
