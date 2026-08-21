# Security Policy

## Scope

DataSaathi is a static, browser-side application. It is intentionally designed without accounts, a database, cookies, analytics SDKs, or server-side storage of assessment input.

## Source-code visibility

This repository is public by design. The application contains no passwords, API keys, private tokens, signing keys, or other credentials. Do not add secrets to this repository. Client-side secrets cannot be kept secret because all shipped HTML, CSS and JavaScript are visible to visitors.

GitHub repository access used by maintainers is separate from website runtime code. The site's public source does not grant anyone access to the maintainer's GitHub account or integration credentials.

## Reporting a vulnerability

Please do not publish sensitive vulnerability details in a public issue. Contact the repository owner through GitHub's private security reporting mechanism if enabled, or contact the maintainer privately before public disclosure.

## Security design baseline

The project follows these principles:

- strict Content Security Policy with no inline JavaScript;
- HTTPS deployment;
- input length and type validation;
- safe URL parsing and rejection of obvious local/internal URL targets;
- control-character filtering for pasted policy text;
- context-appropriate output escaping;
- no `eval`, `Function`, or dynamic script execution;
- no third-party runtime JavaScript dependencies;
- no persistence of user-entered policy text or URLs;
- bounded fetch timeout and bounded policy input size;
- graceful handling of network/CORS failures;
- print-only PDF export, with no upload of report contents.

Client-side validation is a usability and risk-reduction control, not a substitute for server-side validation. The current architecture deliberately has no trusted backend. If a backend/proxy is introduced later, it must add independent server-side validation, rate limiting, SSRF protections, logging/monitoring and secret management before handling untrusted requests.
