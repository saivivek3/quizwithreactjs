import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://mgjmmyzhiwydytyzcopc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nam1teXpoaXd5ZHl0eXpjb3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyOTg4NzIsImV4cCI6MjAyOTg3NDg3Mn0.QyRDrCEjpEsFZn5wX2kKBcYhc06oregl7frUoD1DKcM"
);
