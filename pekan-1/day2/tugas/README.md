## **Day 1: Node.js Dasar**

### **1. Apa itu Node.js dan untuk apa biasanya digunakan?**

**Node.js** adalah runtime environment berbasis **JavaScript** yang berjalan di **server-side** menggunakan mesin **V8 Engine** dari Google Chrome. 

**Biasa digunakan untuk:**
- **Backend Development** (API, web servers)
- **Real-time Applications** (chat, live updates)
- **Microservices Architecture**
- **CLI Tools & Scripting**
- **Data Streaming Applications**
- **IoT Applications**
- **Serverless Functions**

### **2. Perbedaan Node.js vs JavaScript di Browser**

| **Aspek**               | **Node.js**                              | **Browser JavaScript**                  |
|-------------------------|------------------------------------------|----------------------------------------|
| **Environment**         | Server-side                              | Client-side                            |
| **DOM Access**          | ❌ Tidak ada DOM                          | ✅ Memiliki DOM                        |
| **Global Object**       | `global`                                 | `window`                               |
| **Module System**       | CommonJS (require) & ES Modules          | ES Modules                             |
| **File System Access**  | ✅ Bisa baca/tulis file                  | ❌ Tidak bisa (kecuali File API)       |
| **Package Manager**     | npm / yarn                               | CDN / npm via bundler                  |
| **Use Case**            | Server, CLI, backend                     | Web interfaces, interactivity          |

### **3. Fungsi Module `import` dan `export`**

**Module System** memungkinkan pemisahan kode menjadi file terpisah untuk maintainability.

#### **Export (Mengekspor)**
```javascript
// Named Export (banyak variabel/fungsi)
export const apiKey = '12345';
export function sum(a, b) { return a + b; }
export class User { /* ... */ }

// atau ekspor sekaligus
const apiKey = '12345';
function sum(a, b) { return a + b; }
export { apiKey, sum };

// Default Export (hanya satu per module)
export default function() { console.log('Hello'); }
// atau
const myFunction = () => { /* ... */ };
export default myFunction;
```

#### **Import (Mengimpor)**
```javascript
// Named Import
import { apiKey, sum } from './utils.js';
import { apiKey as key } from './utils.js'; // alias
import * as utils from './utils.js'; // import semua

// Default Import
import myFunction from './module.js';

// Mixed Import
import myFunction, { apiKey } from './module.js';
```

