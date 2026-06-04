# Metric-Imperial Converter

A full-stack API and responsive frontend interface that handles conversions between imperial and metric units. Built with Node.js and Express, this project features robust input parsing for fractions and decimals, comprehensive error handling, and an automated test suite.

Developed as a graduation requirement for the **freeCodeCamp Quality Assurance Certification**.

## 🚀 Features

- **Robust Input Parsing:** Handles whole numbers, decimals, and fractional inputs (e.g., `4`, `3.5`, `1/2`, `2.5/5`).
- **Strict Validation:** Detects invalid units or malformed numerical inputs (such as double-fractions like `3/2/3`) and returns detailed error messages.
- **Precision Conversions:** Converts between `gal <-> L`, `lbs <-> kg`, and `mi <-> km` rounded precisely to 5 decimal places.
- **Automated Testing:** Covered by a suite of 21 tests, including 16 isolated unit tests and 5 functional route integration tests.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Testing:** Mocha, Chai, Chai-Http
- **Environment Management:** Dotenv, Nodemon

## 📋 API Usage

### Live Endpoint
`GET /api/convert?input=<number><unit>`

### Example Requests & Responses

| Input | URL | JSON Response Payload |
| :--- | :--- | :--- |
| **Valid input** | `/api/convert?input=10L` | `{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}` |
| **Invalid unit** | `/api/convert?input=32g` | `"invalid unit"` |
| **Invalid number** | `/api/convert?input=3/7.2/4kg` | `"invalid number"` |
| **Invalid both** | `/api/convert?input=3/7.2/4g` | `"invalid number and unit"` |
| **No number (defaults to 1)** | `/api/convert?input=kg` | `{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}` |

## 💻 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Johnezmy/metric-imperial-converter.git](https://github.com/Johnezmy/metric-imperial-converter.git)
   cd metric-imperial-converter

   Install dependencies:

Bash
npm install

Configure Environment Variables:
Create a .env file in the root directory and add:

Code snippet
PORT=3000
NODE_ENV=test


Configure Environment Variables:
Create a .env file in the root directory and add:

Code snippet
PORT=3000
NODE_ENV=test

📄 License
This project is open-source and available under the MIT License.

### Step 2: Push the Update to GitHub
Once you save the updated `README.md`, run these quick commands in PowerShell to update your repo:

```powershell
git add README.md
git commit -m "docs: update README with comprehensive API documentation and setup instructions"
git push origin main