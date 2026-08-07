import { ProtectedAction } from "@prototype/components/protected-action";
import { SiteHeader } from "@prototype/components/site-header";

export default function TripPlannerPage() {
  return (
    <>
      <SiteHeader />
      <main className="container" style={{ padding: "48px 0 80px" }}>
        <h1>Trip planner</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: 18 }}>
          Guests can explore trip ideas. Saving a trip requires an account.
        </p>
        <div className="grid two">
          <section className="card" style={{ padding: 24 }}>
            <h2>Draft itinerary</h2>
            <p>Day 1: Kampala arrival</p>
            <p>Day 2: Murchison Falls</p>
            <p>Day 3: Safari and return</p>
          </section>
          <ProtectedAction action="Save trip plan" returnTo="/trip-planner" />
        </div>
      </main>
    </>
  );
}
