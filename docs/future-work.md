# Vespera Systems Future Work

This file tracks everything intentionally left beyond the first merged MVP so the project has no loose ends hiding in the carpet.

## Graph Data
- Replace fictional seed data with tenant-scoped ingestion.
- Add persistent graph storage, versioning, provenance, and graph snapshots.
- Add client-specific graph permissions and saved views.

## AI Analyst
- Persist chat/message history through Postgres once production credentials are attached.
- Add resumable streaming, citations, graph-context retrieval, and tenant memory.
- Add usage metering, model entitlements, and admin-visible audit trails.

## Legal Checker
- Add PDF parsing after DOCX/TXT review is stable.
- Apply recommendations back onto the original DOCX with true Word comments/tracked changes.
- Store legal analysis jobs with tenant retention settings and export history.

## Quant Bench
- Add secure Python execution through an isolated worker.
- Enforce package allowlists, CPU/memory/time limits, stdout/image capture, and signed audit logs.
- Add factor libraries, backtest templates, and graph-derived features.

## Auth and Enterprise Controls
- Finish production NextAuth + Drizzle credential provider.
- Add SSO/SAML, tenant roles, admin impersonation safeguards, and row-level data policies.
- Add billing/subscription enforcement beyond message limits.

## Operations
- Add OpenTelemetry/analytics for AI usage, upload failures, legal jobs, auth failures, and tenant activity.
- Add demo mode with synthetic data only and production-secret isolation.
- Add disaster recovery, backups, retention policies, and compliance exports.

## Company Site
- Expand `vesperasystems.com` with research, careers, contact, case-study, and private-demo conversion flows.
- Add richer structured data and editorial SEO content around graph-native finance technology.
