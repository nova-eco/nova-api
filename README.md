# nova-api

[![Code Quality](https://github.com/nova-eco/nova-api/actions/workflows/code-quality.yml/badge.svg)](https://github.com/nova-eco/nova-api/actions/workflows/code-quality.yml)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
[![CSpell](https://img.shields.io/badge/spell_check-cspell-blue.svg)](https://cspell.org/)

REST API for the Nova booking and management system, built with Express and TypeScript.

## Project Status

This project is **actively maintained**. We welcome contributions, bug reports, and
feature requests.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
- [Docker Deployment](#docker-deployment)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running with Docker Compose](#running-with-docker-compose)
- [Architecture](#architecture)
  - [API Structure](#api-structure)
  - [Database Integration](#database-integration)
- [CI/CD & GitHub Actions](#cicd--github-actions)
  - [Automated Workflows](#automated-workflows)
  - [Pull Request Validation](#pull-request-validation)
  - [Code Quality Checks](#code-quality-checks)
  - [Docker Image Publishing](#docker-image-publishing)
  - [Upstream Deployment Trigger](#upstream-deployment-trigger)
  - [Required Secrets](#required-secrets)
- [Development](#development)
  - [Code Quality Standards](#code-quality-standards)
    - [Formatting](#formatting)
    - [Linting](#linting)
    - [Spell Checking](#spell-checking)
    - [Code Analysis](#code-analysis)
  - [Testing](#testing)
  - [Building](#building)
  - [Pushing Changes](#pushing-changes)
  - [Running All Checks Manually](#running-all-checks-manually)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)
- [Changelog](#changelog)
- [License](#license)
- [Author](#author)

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10
- Git
- MariaDB/MySQL database (or use the nova-deploy database infrastructure)

### Installation

1. **Clone the repository from GitHub:**

   ```bash
   git clone https://github.com/nova-eco/nova-api.git
   cd nova-api
   ```

2. **Install dependencies:**

   ```bash
   npm i
   ```

   This will automatically:
   - Install all required packages
   - Set up Husky git hooks for commit validation and pre-push checks
   - Copy `.env.TEMPLATE` to `.env` (if it doesn't already exist)

3. **Configure environment variables:**

   Edit the `.env` file and set the required variables for your database connection and
   other configuration.

### Configuration

The API uses environment variables for configuration. Key variables include:

- Database connection settings
- API port configuration
- Authentication configuration
- Email/notification settings

Refer to `.env.TEMPLATE` for a complete list of required environment variables.

### Usage

#### Development Mode

To start the API in development mode with hot-reload:

```bash
npm run dev
```

The API will start on the configured port (default: 3000) and automatically restart when
you make changes.

#### Production Mode

To build and run the API in production mode:

1. **Build the application:**

   ```bash
   npm run build
   ```

   This compiles TypeScript to JavaScript and resolves path aliases.

2. **Start the application:**

   ```bash
   node dist/index.js
   ```

## Docker Deployment

The nova-api can be deployed using Docker and Docker Compose for containerized
environments.

### Building the Docker Image

The project includes a multi-stage Dockerfile that:

- Builds the TypeScript application in a build stage
- Creates a minimal production image with only runtime dependencies
- Runs as a non-root user for security
- Includes health checks

**Build the image manually:**

```bash
docker build \
  --build-arg NOVA_API__AUTHOR="Nova Admin <admin@nova.eco>" \
  --build-arg NOVA_API__NAME="nova-api" \
  --build-arg NOVA_API__PORT="3000" \
  --build-arg API_NAME="nova-api" \
  --build-arg API_PORT="3000" \
  -t nova-api:latest .
```

### Running with Docker Compose

The recommended way to run nova-api is using Docker Compose, which automatically handles
build arguments from your `.env` file.

**Start the service:**

```bash
npm run start
```

Or use Docker Compose directly:

```bash
docker compose up --build
```

**Stop the service:**

```bash
npm run stop
```

Or use Docker Compose directly:

```bash
docker compose down
```

**Configuration:**

The `compose.yaml` file automatically passes build arguments from your `.env` file:

- `NOVA_API__AUTHOR` - Author metadata for the image
- `NOVA_API__NAME` - Application name
- `NOVA_API__PORT` - External port mapping
- `API_NAME` - Internal application name
- `API_PORT` - Internal application port (default: 3000)

The container includes:

- Automatic health checks via `/healthcheck` endpoint
- Port mapping from `.env` configuration
- Network configuration via `compose.override.yaml`
- Volume mounting for development (if configured)

## Architecture

### API Structure

The nova-api follows a modular architecture:

- **`src/app.ts`**: Express application setup with middleware configuration
- **`src/index.ts`**: Application entry point
- **`src/routers/`**: API route handlers organized by resource
- **`src/models/`**: Sequelize database models
- **`src/config/`**: Configuration files and constants
- **`src/core/`**: Core business logic and utilities
- **`src/interfaces/`**: TypeScript interfaces and types

### Database Integration

The API uses Sequelize ORM to interact with MariaDB/MySQL databases. Database models are
defined in the `src/models/` directory, and migrations can be found in the `migrations/`
directory.

## CI/CD & GitHub Actions

This project uses GitHub Actions for continuous integration and deployment. Four automated
workflows ensure code quality and streamline the deployment process.

### Automated Workflows

The following workflows are configured in `.github/workflows/`:

| Workflow                    | Trigger              | Purpose                             |
| --------------------------- | -------------------- | ----------------------------------- |
| **Pull Request Validation** | PR to master         | Validates code quality before merge |
| **Code Quality**            | Push/PR to master    | Runs comprehensive quality checks   |
| **Docker Build & Publish**  | Push to master       | Builds and publishes Docker image   |
| **Trigger Deploy Rebuild**  | After Docker publish | Notifies nova-deploy of new image   |

### Pull Request Validation

**Workflow:** `.github/workflows/pr-validation.yml`

Automatically runs when a pull request is opened, synchronized, or reopened against the
`master` branch.

**Checks performed:**

- ✅ Code formatting (Prettier)
- ✅ Linting (ESLint)
- ✅ Spell checking (CSpell)
- ✅ Code analysis (fta-cli)
- ✅ Unit tests (Jest)

All checks must pass before the PR can be merged. This ensures that only quality code
enters the main branch.

### Code Quality Checks

**Workflow:** `.github/workflows/code-quality.yml`

Runs on every push to `master` and on pull requests. Executes multiple quality checks in
parallel for fast feedback:

**Jobs:**

- **Prettier Format Check** - Ensures consistent code formatting
- **ESLint Check** - Validates code quality and TypeScript standards
- **CSpell Check** - Catches spelling errors in code and comments
- **Code Analysis** - Analyses code structure and complexity
- **Unit Tests** - Runs the complete unit test suite

Each job runs independently, allowing partial results if one check fails.

### Docker Image Publishing

**Workflow:** `.github/workflows/docker-publish.yml`

Automatically builds and publishes the Docker image to GitHub Container Registry (ghcr.io)
when changes are pushed to `master`.

**Process:**

1. Checks out the repository code
2. Sets up Docker Buildx for multi-platform builds
3. Authenticates with GitHub Container Registry
4. Extracts metadata (tags, labels) for the image
5. Builds the Docker image using the Dockerfile
6. Pushes the image to `ghcr.io/nova-eco/nova-api`

**Image tags:**

- `latest` - Most recent build from master branch
- `master-<sha>` - Tagged with the git commit SHA
- `master` - Branch name tag

**Build arguments** (from repository variables):

- `NOVA_API__AUTHOR` - Author metadata
- `NOVA_API__NAME` - Application name
- `NOVA_API__PORT` - Port configuration
- `API_NAME` - Internal application name
- `API_PORT` - Internal port (default: 3000)

**Image features:**

- Multi-stage build for minimal image size
- Production-only dependencies
- Non-root user for security
- Built-in health checks
- Layer caching for faster builds

### Upstream Deployment Trigger

**Workflow:** `.github/workflows/trigger-deploy.yml`

Automatically notifies the `nova-deploy` repository when a new Docker image is
successfully published.

**Process:**

1. Monitors the "Docker Build & Publish" workflow
2. Waits for successful completion
3. Triggers a `repository_dispatch` event on `nova-deploy`
4. Passes metadata about the new image

**Event payload:**

```json
{
  "image_tag": "latest",
  "ref": "refs/heads/master",
  "sha": "<commit-sha>",
  "source": "nova-api",
  "triggered_by": "<github-username>"
}
```

This enables automatic deployment updates in `nova-deploy` whenever the API image changes.

### Required Secrets

Configure these secrets in your GitHub repository settings (`Settings` →
`Secrets and variables` → `Actions`):

#### Repository Secrets

| Secret                 | Description                             | Required For                    |
| ---------------------- | --------------------------------------- | ------------------------------- |
| `DEPLOY_TRIGGER_TOKEN` | Personal access token with `repo` scope | Triggering nova-deploy rebuilds |

**Creating the DEPLOY_TRIGGER_TOKEN:**

1. Go to GitHub Settings → Developer settings → Personal access tokens → Fine-grained
   tokens
2. Create a new token with:
   - **Repository access:** Only select repositories (nova-deploy)
   - **Permissions:** Contents (read), Metadata (read), Actions (write)
3. Copy the token and add it as a secret named `DEPLOY_TRIGGER_TOKEN`

#### Repository Variables

Configure these variables in `Settings` → `Secrets and variables` → `Actions` →
`Variables`:

| Variable           | Description                      | Example                       |
| ------------------ | -------------------------------- | ----------------------------- |
| `NOVA_API__AUTHOR` | Author metadata for Docker image | `Nova Admin <admin@nova.eco>` |
| `NOVA_API__NAME`   | Application name                 | `nova-api`                    |
| `NOVA_API__PORT`   | External port mapping            | `3000`                        |
| `API_NAME`         | Internal application name        | `nova-api`                    |
| `API_PORT`         | Internal application port        | `3000`                        |

These variables are automatically passed as build arguments when building the Docker
image.

## Development

### Code Quality Standards

This project enforces strict code quality standards using automated tools:

#### Formatting

- **Tool**: [Prettier](https://prettier.io/)
- **Configuration**: `.prettierrc.json`
- **Standards**:
  - Line width: 90 characters
  - Single quotes for strings
  - Semicolons required
  - 2-space indentation
  - LF line endings
  - Trailing commas in multi-line structures

**Commands**:

```bash
npm run format:check # Check formatting without making changes
npm run format:fix   # Automatically fix formatting issues
```

#### Linting

- **Tool**: [ESLint](https://eslint.org/)
- **Configuration**: `eslint.config.mjs`
- **Standards**:
  - TypeScript-specific rules
  - Integration with Prettier
  - Console warnings for `console.log` statements

**Commands**:

```bash
npm run lint:check # Check for linting issues
npm run lint:fix   # Automatically fix linting issues
```

#### Spell Checking

- **Tool**: [cspell](https://cspell.org/)
- **Configuration**: `cspell.json`
- **Standards**:
  - British English (en-gb)
  - Checks JavaScript, TypeScript, and Bash files
  - Custom dictionary for technical terms

**Commands**:

```bash
npm run spell # Check spelling
```

#### Code Analysis

- **Tool**: [fta-cli](https://www.npmjs.com/package/fta-cli)
- **Purpose**: Analyses code structure and complexity

**Commands**:

```bash
npm run analysis # Run code analysis
```

### Testing

The project uses [Jest](https://jestjs.io/) for testing with separate unit and integration
test suites.

#### Running Tests

**Default test suite:**

```bash
npm run test # Runs unit tests (default)
npm test     # Alternative command
```

**Specific test suites:**

```bash
npm run test:unit        # Run unit tests only
npm run test:integration # Run integration tests only
npm run test:it          # Alias for integration tests
```

#### Test Configuration

- **Configuration file**: `jest.config.ts`
- **Test environment**: Node.js
- **Test framework**: Jest with ts-jest for TypeScript support
- **Coverage collection**: Enabled for unit tests
- **Coverage reporters**: lcov, json-summary, and text

The test configuration automatically determines which tests to run based on the
`TEST_TYPE` environment variable:

- `TEST_TYPE='unit'` - Runs tests in `test/unit/`
- `TEST_TYPE='integration'` - Runs tests in `test/integration/`

#### Test Structure

Test files are organised in the `test/` directory:

```
test/
├── unit/               # Unit tests (isolated component tests)
│   ├── models/         # Database model tests
│   └── engines/        # Business logic engine tests
├── integration/        # Integration tests (multiple components)
├── fixtures/           # Test data and fixtures
│   ├── userFixtures.ts
│   ├── sessionFixtures.ts
│   └── bookingPreFixtures.ts
└── setup/              # Test environment setup
    └── envVars.ts      # Environment variable configuration
```

#### Coverage Reports

Unit tests generate coverage reports in the `coverage/` directory:

- `coverage/lcov-report/index.html` - HTML coverage report
- `coverage/coverage-summary.json` - JSON summary
- Terminal output shows coverage percentages

**View coverage:**

```bash
npm run test:unit
# Open coverage/lcov-report/index.html in your browser
```

#### Test Patterns

**Unit test example:**

```typescript
// test/unit/models/UserModel/userModel.positive.test.ts
describe('UserModel', () => {
  it('should create a user successfully', async () => {
    // Test implementation
  });
});
```

**Integration test example:**

```typescript
// test/integration/api/login.test.ts
describe('Login API', () => {
  it('should authenticate user and return token', async () => {
    // Test implementation
  });
});
```

#### CI/CD Integration

Tests are automatically run in GitHub Actions:

- **Pull Request Validation**: Runs `npm run test` on every PR
- **Code Quality Workflow**: Runs `npm run test` on push to master

All tests must pass before code can be merged to the master branch.

### Building

Build the TypeScript project to JavaScript:

```bash
npm run build
```

This command:

1. Compiles TypeScript using `tsc`
2. Resolves TypeScript path aliases to relative paths
3. Outputs compiled files to the `dist/` directory

To clean build artefacts:

```bash
npm run clean          # Remove both coverage and dist directories
npm run clean:dist     # Remove only dist directory
npm run clean:coverage # Remove only coverage directory
```

### Pushing Changes

This repository uses Git hooks to ensure code quality before changes are pushed. Follow
these steps:

#### 1. Make Your Changes

Edit files as needed for your feature or bugfix.

#### 2. Stage Your Changes

```bash
git add .
```

#### 3. Commit Your Changes

**IMPORTANT**: All commits must follow the
[Conventional Commits](https://www.conventionalcommits.org/) standard:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Commit Types**:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes only
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI/CD configuration
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

**Examples**:

```bash
git commit -m "feat: add user authentication endpoint"
git commit -m "fix: correct validation logic in booking service"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for login router"
```

**Commit Hooks**:

- The `commit-msg` hook will automatically validate your commit message format using
  Commitlint. If the format is incorrect, the commit will be rejected.
- The `prepare-commit-msg` hook will automatically generate/update the CHANGELOG.md file
  and add it to your commit. This ensures the changelog is always up to date with all
  commits.

#### 4. Push Your Changes

```bash
git push
```

**Pre-push Hook**: Before your changes are pushed, the `pre-push` hook will automatically
run:

1. **Format check** - Ensures all files are properly formatted
2. **ESLint check** - Validates TypeScript code quality
3. **Spell check** - Ensures no spelling errors
4. **Code analysis** - Analyses code structure

If any of these checks fail, the push will be blocked. You must fix the issues before
pushing:

```bash
npm run format:fix # Fix formatting issues
npm run lint:fix   # Fix linting issues
npm run check      # Run all checks manually
```

### Running All Checks Manually

To run all quality checks before committing:

```bash
npm run check
```

This runs the same checks that will be executed during the pre-push hook.

## API Documentation

The API documentation is available via Swagger UI when the application is running:

- **Swagger UI**: `http://localhost:3000/api-docs`
- **OpenAPI Spec**: `/var/www/nova-api/public/openapi.spec.json`

The API uses OpenAPI specification for validation and documentation.

### Available Endpoints

- **Health Check**: `GET /healthcheck` - Returns API health status
- **Authentication**: `/v2/login` - User authentication endpoints
- Additional endpoints are being migrated and will be documented here

## Scripts

| Script                     | Description                                         |
| -------------------------- | --------------------------------------------------- |
| `npm start`                | Run all checks and start Docker containers          |
| `npm stop`                 | Stop Docker containers and clean up                 |
| `npm run dev`              | Start development server with hot-reload            |
| `npm run build`            | Build TypeScript to JavaScript                      |
| `npm run docker`           | Start Docker Compose services                       |
| `npm run docker:stop`      | Stop Docker Compose services                        |
| `npm run test`             | Run default test suite (unit tests)                 |
| `npm run test:unit`        | Run unit tests                                      |
| `npm run test:integration` | Run integration tests                               |
| `npm run changelog`        | Generate changelog from git commits                 |
| `npm run check`            | Run all quality checks (format/lint/spell/analysis) |
| `npm run format`           | Check code formatting                               |
| `npm run format:fix`       | Fix code formatting issues                          |
| `npm run lint`             | Check code with ESLint                              |
| `npm run lint:fix`         | Fix ESLint issues automatically                     |
| `npm run spell`            | Check spelling in source files                      |
| `npm run analysis`         | Run code analysis                                   |
| `npm run clean`            | Remove build and coverage directories               |

## Changelog

All notable changes to this project are automatically documented in
[CHANGELOG.md](CHANGELOG.md). The changelog is generated from git commits using
[auto-changelog](https://github.com/CookPete/auto-changelog) and follows the
[Conventional Commits](https://www.conventionalcommits.org/) standard.

The changelog is automatically updated with each commit via the `prepare-commit-msg` git
hook.

## License

MIT

## Author

Nova Admin <admin@nova.eco>
