-- Hide public schema objects from GraphQL/PostgREST discovery for API roles.
-- Service-role/admin access is unaffected by these revokes.

revoke select on all tables in schema public from anon, authenticated;

alter default privileges in schema public
  revoke select on tables from anon, authenticated;
