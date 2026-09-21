# UI and API Test Automation Suite

An automated testing portfolio project for the [Expand Testing practice application](https://practice.expandtesting.com/). It combines browser-based UI testing with API collection testing to validate authentication workflows at both layers.

## At a glance

| Area | Tool | Coverage |
| --- | --- | --- |
| UI | Playwright | 14 login and registration scenarios, run in Chromium and Firefox (28 executions) |
| API | Postman + Newman | 10 requests covering health check, registration, login, and logout |
| Test data | Faker | Unique registration data generated at runtime |

The suite demonstrates positive and negative testing, cross-browser execution, reusable test data, response validation, and chained API workflows.

## Test coverage

### UI tests

The Playwright tests target `https://practice.expandtesting.com` and validate:

- **Login:** successful login and logout, invalid username/password combinations, empty username, and empty password.
- **Registration:** successful account creation, minimum username and password lengths, mismatched passwords, required fields, and duplicate usernames.
- **Browser coverage:** Chromium and Firefox desktop profiles.
- **Assertions:** navigation, visible feedback messages, and expected success or validation states.

Fresh registration credentials are generated with Faker to keep the successful registration scenario independent between runs.

### API tests

The Postman collection [`postman/NotesAPI-Testing.postman_collection.json`](postman/NotesAPI-Testing.postman_collection.json) tests the Notes API:

| Group | Scenarios |
| --- | --- |
| Health | API availability and the expected success response |
| Register | Successful user creation; invalid name, email, and password |
| Login | Successful authentication; incorrect credentials; invalid email and password |
| Logout | Authenticated logout using the token returned by login |

Assertions verify HTTP status codes, success flags, response messages, returned user data, and authentication-token creation. The collection generates a unique user, saves its credentials and ID, logs in, stores the returned token, and uses that token to log out. Run the complete collection in its defined order so this workflow remains intact.

## Project structure

```text
.
├── tests/ui-tests/
│   ├── login.spec.js
│   └── register.spec.js
├── postman/
│   └── NotesAPI-Testing.postman_collection.json
├── utils/
│   └── fakeUser.js
├── playwright.config.js
└── package.json
```

## Setup

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer

Clone the repository, open it in a terminal, and install the project dependencies:

```bash
npm ci
```

Install the browsers used by the Playwright configuration:

```bash
npx playwright install chromium firefox
```

`npm ci` installs both Playwright and Newman from the versions locked in `package-lock.json`; no global installation is required.

## Run the tests

### UI suite with Playwright

Run all UI tests in Chromium and Firefox:

```bash
npx playwright test
```

Useful alternatives:

```bash
# Run in one browser
npx playwright test --project=chromium

# Run one test file
npx playwright test tests/ui-tests/login.spec.js

# Watch the browser during execution
npx playwright test --headed
```

Open the generated HTML report:

```bash
npx playwright show-report
```

### API suite with Newman

Run the full Postman collection from the command line:

```bash
npx newman run postman/NotesAPI-Testing.postman_collection.json
```

The collection is self-contained: its pre-request script creates unique account data, and collection variables pass credentials and the authentication token between requests.

## Technology stack

- JavaScript
- Playwright Test
- Postman / Newman
- Faker
