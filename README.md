# UI & API Test Automation Suite

End-to-end test automation for the [Expand Testing practice application](https://practice.expandtesting.com/), combining Playwright browser tests with Postman/Newman API tests.

| Test layer | Tools | Latest saved result |
| --- | --- | --- |
| UI | Playwright + Faker | **28/28 passed** across Chromium and Firefox |
| API | Postman + Newman | **12 requests, 40 assertions, 0 failures** |

[UI coverage](#1-ui-testing) · [API coverage](#2-api-testing) · [Setup and execution](#3-setup-and-execution) · [Project structure](#project-structure)

## 1. UI testing

The Playwright suite validates the public login and registration workflows through the browser. Fourteen scenarios run against both Chromium and Firefox, producing 28 total test executions.

![Playwright UI test summary](/assets/playwright-ui-test-summary.png)

### What is tested?

| Feature | Scenarios |
| --- | --- |
| Login | Successful login and logout; invalid username/password combinations; empty username; empty password |
| Registration | Successful registration; short username; short password; password mismatch; missing required fields; duplicate username |
| Validation | URL changes, visible status messages, error text, and logout availability |
| Test data | Unique registration credentials generated at runtime with Faker |
| Browsers | Chromium and Firefox desktop profiles |

**Test source:** [`login.spec.js`](tests/ui-tests/login.spec.js) · [`register.spec.js`](tests/ui-tests/register.spec.js)  
**Execution evidence:** [Open the saved Playwright HTML report](playwright-report/index.html)

## 2. API testing

The Postman collection tests the Notes API as an ordered authentication workflow. A pre-request script generates a unique user; collection variables carry the credentials, user ID, and authentication token between requests.

![Newman Notes API test report](/assets/newman-api-test-report.png)

### What is tested?

| Group | Requests | Coverage |
| --- | ---: | --- |
| Health | 1 | API availability, status, success flag, and response message |
| Register | 4 | Successful account creation and invalid name, email, and password validation |
| Login | 4 | Successful authentication, token creation, incorrect credentials, and missing/invalid inputs |
| Logout | 3 | Missing token, successful logout with a valid token, and rejection of the logged-out token |

Assertions verify HTTP status codes, success flags, response messages, returned user data, and authentication-token behavior. The collection must run in its defined order because later requests use data created by earlier requests.

**Collection:** [`NotesAPI-Testing.postman_collection.json`](postman/NotesAPI-Testing.postman_collection.json)  
**Execution evidence:** [Open the saved Newman HTML report](postman-report/api-test-report.html)

## 3. Setup and execution

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer

### Step 1: Clone and install

```bash
git clone https://github.com/kushagrasinha123ks/expand-testing-automation.git
cd expand-testing-automation
npm ci
```

`npm ci` installs Playwright, Newman, Faker, and the Newman HTML reporter using the locked dependency versions.

### Step 2: Install Playwright browsers

```bash
npx playwright install chromium firefox
```

### Step 3: Run the UI tests

Run all scenarios in Chromium and Firefox:

```bash
npx playwright test
```

Open the generated report:

```bash
npx playwright show-report
```

Useful focused runs:

```bash
# Chromium only
npx playwright test --project=chromium

# Login scenarios only
npx playwright test tests/ui-tests/login.spec.js

# Watch browser execution
npx playwright test --headed
```

### Step 4: Run the API tests

Run the Postman collection in the terminal:

```bash
npx newman run postman/NotesAPI-Testing.postman_collection.json
```

Generate both terminal output and the standalone HTML report:

```bash
npx newman run postman/NotesAPI-Testing.postman_collection.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export postman-report/api-test-report.html \
  --reporter-htmlextra-title "Notes API Test Report"
```

Open `postman-report/api-test-report.html` in a browser to inspect request-level assertions, status codes, response times, and failures.

## Project structure

```text
.
├── assets/
│   ├── playwright-ui-test-summary.png
│   └── newman-api-test-report.png
├── tests/ui-tests/
│   ├── login.spec.js
│   └── register.spec.js
├── postman/
│   └── NotesAPI-Testing.postman_collection.json
├── playwright-report/
│   └── index.html
├── postman-report/
│   └── api-test-report.html
├── utils/
│   └── fakeUser.js
├── playwright.config.js
└── package.json
```

## Skills demonstrated

- Positive, negative, boundary, and authentication-lifecycle testing
- Cross-browser UI automation and accessible Playwright locators
- Dynamic test-data generation and reusable setup
- API chaining with collection variables and pre-request scripts
- Response, schema-field, status-code, navigation, and UI-message assertions
- CLI execution and shareable HTML test reporting
