// ================================================================
// EXTRACT AFFECTED SERVICES TOOL
// ================================================================
//
// Purpose:
// Logs me se affected services identify karna.
//
// Example:
//
// Input:
// database
// database
// user-service
// payment-service
//
// Output:
// ["database", "user-service", "payment-service"]
// ================================================================

import { Log, logService } from '../../types/index.js';

// ================================================================
// Extract Affected Services
// ================================================================
export const extractAffectedServices = (logs: Log[]): logService[] => {
  // ------------------------------------------------
  // STEP 1
  // Unique services store karne ke liye Set banao
  // ------------------------------------------------
  const services = new Set<logService>();

  // ------------------------------------------------
  // STEP 2
  // Har log ko loop karo
  // ------------------------------------------------
  for (const log of logs) {
    // Service Set me add karo
    // Duplicate automatically ignore ho jayenge
    services.add(log.service);
  }

  // ------------------------------------------------
  // STEP 3
  // Set ko array me convert karke return karo
  // ------------------------------------------------
  return Array.from(services);
};

// 1
// const services = new Set<logService>();
// set ek spacial collection he

// agar
// database
// database
// database
// 3 dafa add karo to to set me just
// database ek hi rahega.

// 2
// for (const log of logs) Har log per loop.
// [
// { service:"database" },
// { service:"database" },
// { service:"user-service" }
// ]

// 3
// services.add(log.service);
// Pehle iteration:
// Set {
// "database"
// }

// Dusre iteration:
// Set {
// "database"
// }

// (duplicate ignore)
// Teesre iteration:
// Set {
// "database",
// "user-service"
// }

// 4
// return Array.from(services); Set ko normal array me convert kar deta hai.
// Result:
// [
// "database",
// "user-service"
// ]

// Set Javascript ka built-in data structure hai.

// Difference:

// Array
// const arr = [];

// arr.push("database");
// arr.push("database");
// arr.push("database");

// console.log(arr);

// [
//  "database",
//  "database",
//  "database"
// ]

// duplicate allow hain

// Set
// const services = new Set();

// services.add("database");
// services.add("database");
// services.add("database");

// console.log(services);

// Set {
// "database"
// }

// duplicate automatically reject

//  set isis liye use kia he take duplicate reject hu jai hame unique chaiye

// Set memory me store hota hai? yes
// Ye sirf runtime memory me hota hai.
// const services = new Set();
// Ye RAM me create hua.
// Function khatam:
// return ...
// to Set destroy ho jayega.
// db me save ni huta
//LangGraph state me bhi nahi jata jab tak tum khud return na karo.

// Ye tool ke andar local variable hai.
// Function finish:
// return result;
// to set gyab sirf result bachega

// Set aur Map ka difference
// Set -> Sirf unique values Set { "database", "user-service" }
// map -> Key + Value Map { "database" => 15, "user-service" => 4 }

// Unique cheezen chahiye? use -> set
// Counting ya grouping karni hai? use -> map
