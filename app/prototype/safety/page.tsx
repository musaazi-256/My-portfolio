import { PageHero } from "@prototype/components/page-hero";
import { SiteHeader } from "@prototype/components/site-header";

export default function SafetyPage() {
  return (
    <>
      <SiteHeader />
      <main className="container" style={{ paddingBottom: 80 }}>
        <PageHero eyebrow="Safety" title="Travel safety and SOS" description="Emergency contacts, travel advisories, destination safety notes, and booking-context support." />
        <div className="grid three">
          <section className="card" style={{ padding: 22 }}><h2>SOS contacts</h2><p>Police, ambulance, hotel, operator, and SafariNexa support.</p></section>
          <section className="card" style={{ padding: 22 }}><h2>Advisories</h2><p>Weather, route, local safety, and destination updates.</p></section>
          <section className="card" style={{ padding: 22 }}><h2>Emergency detail</h2><p>Step-by-step support with booking context.</p></section>
        </div>
      </main>
    </>
  );
}
