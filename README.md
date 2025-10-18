# Python Version Scout

A utility for auditing Python dependency versions at a glance.

## Development

### Setup

Make sure to install dependencies:

```bash
npm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Terminology

- **Requirement** — A single entry from `requirements.txt` (PEP 508/440 specifier), e.g. `requests==2.31.0`.
- **Project** — The named entity on PyPI (canonical name), e.g. `requests`.
- **Release** — A specific version of a project (e.g. `2.31.0`).
- **Dependency** — A project required by another project.
- **Distribution** — The installable artifact for a release (wheel/sdist).

