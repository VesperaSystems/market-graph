-- Enable Row Level Security on public tables exposed through PostgREST.
-- Without explicit policies, Supabase denies anon/authenticated API access by default.

alter table public."Chat" enable row level security;
alter table public."Files" enable row level security;
alter table public."Message" enable row level security;
alter table public."Message_v2" enable row level security;
alter table public."Stream" enable row level security;
alter table public."Suggestion" enable row level security;
alter table public."Tenant" enable row level security;
alter table public."Vote" enable row level security;
alter table public."Vote_v2" enable row level security;
alter table public."User" enable row level security;
alter table public."Document" enable row level security;
alter table public."FileAccessLogs" enable row level security;
alter table public."FileShares" enable row level security;
alter table public.subscription_types enable row level security;
alter table public.user_message_counts enable row level security;
