
import { createBrowserClient } from '@supabase/ssr'
export async function createClient() {
  return createBrowserClient(
    "https://mfveuxmroshxertdsesy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdmV1eG1yb3NoeGVydGRzZXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NTg1MTMsImV4cCI6MjA2MjEzNDUxM30.LOzEtEme-pnUFLsNW3SFH36NQ86IQDGNSGqRA5H7D-c",
  )
}