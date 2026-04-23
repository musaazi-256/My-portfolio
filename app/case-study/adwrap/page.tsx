import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADWrap / OOH OwnerHub — Case Study · Ignatius Musaazi",
  description:
    "UI/UX Design Lead case study: designing a B2B operations platform for out-of-home advertising. Four problems that forced me to think before I designed.",
};

/* ─── small helpers ─────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.09em",
      textTransform: "uppercase", color: "var(--color7)", marginBottom: "8px",
    }}>
      {children}
    </p>
  );
}

function Pill({
  color, dot, children,
}: {
  color: "gray" | "blue" | "green" | "amber" | "red" | "teal";
  dot: string;
  children: React.ReactNode;
}) {
  const palettes = {
    gray:  { bg: "#f0f0f0",            text: "#6d6d6d" },
    blue:  { bg: "rgba(0,85,204,0.1)", text: "#0055CC" },
    green: { bg: "rgba(26,110,60,0.1)",text: "#1A6E3C" },
    amber: { bg: "rgba(122,66,0,0.1)", text: "#7A4200" },
    red:   { bg: "rgba(185,28,28,0.1)",text: "#B91C1C" },
    teal:  { bg: "rgba(12,95,84,0.1)", text: "#0C5F54" },
  };
  const p = palettes[color];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      fontSize: "12px", fontWeight: 600, padding: "4px 11px",
      borderRadius: "20px", whiteSpace: "nowrap",
      background: p.bg, color: p.text,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />
      {children}
    </span>
  );
}

function Rejected({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(185,28,28,0.2)",
      borderRadius: "12px",
      overflow: "hidden",
      margin: "14px 0",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "9px 16px",
        borderBottom: "1px solid rgba(185,28,28,0.12)",
        background: "rgba(185,28,28,0.04)",
      }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="6" stroke="#B91C1C" strokeWidth="1.25"/>
          <path d="M4 4l5 5M9 4l-5 5" stroke="#B91C1C" strokeWidth="1.25" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#B91C1C" }}>
          {heading}
        </span>
      </div>
      <p style={{ fontSize: "0.875rem", color: "var(--color7)", lineHeight: 1.7, padding: "14px 16px", margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

function Insight({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(226,117,0,0.22)",
      borderRadius: "12px",
      overflow: "hidden",
      margin: "14px 0",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "9px 16px",
        borderBottom: "1px solid rgba(226,117,0,0.12)",
        background: "rgba(226,117,0,0.05)",
      }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="6" stroke="#e27500" strokeWidth="1.25"/>
          <path d="M6.5 4v3.5M6.5 9.2v.3" stroke="#e27500" strokeWidth="1.25" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)" }}>
          {heading}
        </span>
      </div>
      <p style={{ fontSize: "0.875rem", color: "var(--color7)", lineHeight: 1.7, padding: "14px 16px", margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

function Avoided({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--color1)", borderRadius: "10px",
      padding: "16px 20px", margin: "16px 0",
    }}>
      <Label>What I avoided</Label>
      <p style={{ fontSize: "0.875rem", color: "var(--color7)", lineHeight: 1.65 }}>{children}</p>
    </div>
  );
}

function ProblemBlock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid var(--color3)",
      borderRadius: "12px",
      overflow: "hidden",
      marginBottom: "36px",
    }}>
      <div style={{
        padding: "9px 20px",
        borderBottom: "1px solid var(--color3)",
        background: "var(--color1)",
      }}>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color7)" }}>
          The situation
        </span>
      </div>
      <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.7, padding: "20px 24px", margin: 0 }}>{children}</p>
    </div>
  );
}

function DecisionBlock({ header, children }: { header: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: "1px solid var(--color3)", borderRadius: "12px",
      overflow: "hidden", margin: "28px 0",
    }}>
      <div style={{
        padding: "14px 20px", background: "var(--color1)",
        fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
        textTransform: "uppercase", color: "var(--color7)",
        borderBottom: "1px solid var(--color3)",
      }}>{header}</div>
      <div style={{ padding: "20px", background: "#fff" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--color7)", lineHeight: 1.7 }}>{children}</p>
      </div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
      fontSize: "0.8125rem", background: "var(--color3)",
      padding: "2px 6px", borderRadius: "4px", color: "var(--color2)",
    }}>{children}</code>
  );
}

/* ─── step in the thinking timeline ─────────────────── */
function Thought({
  n, last = false, title, children,
}: {
  n: number; last?: boolean; title: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* marker */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "28px" }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%",
          background: "var(--color2)", color: "#fff",
          fontSize: "11px", fontWeight: 800,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>{n}</div>
        {!last && (
          <div style={{ width: "1px", background: "var(--color3)", flex: 1, marginTop: "8px", minHeight: "24px" }} />
        )}
      </div>
      {/* content */}
      <div style={{ paddingBottom: last ? 0 : "32px", flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontSize: "1.0625rem", fontWeight: 700, letterSpacing: "-0.01em",
          color: "var(--color2)", marginBottom: "10px",
        }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

/* ─── challenge section wrapper ─────────────────────── */
function Challenge({
  index, heading, children,
}: {
  index: string; heading: string; children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section style={{ padding: "72px 0", borderTop: "2px solid var(--color2)" }}>
        <p style={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--color7)", marginBottom: "10px",
        }}>{index}</p>
        <h2 style={{
          fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", fontWeight: 700,
          letterSpacing: "-0.015em", lineHeight: 1.2,
          color: "var(--color2)", marginBottom: "32px",
        }}>{heading}</h2>
        {children}
      </section>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════ */
export default function ADWrapCaseStudy() {
  return (
    <>
      <Nav />

      <main style={{ paddingBottom: "80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 5%" }}>

          {/* ── HERO ───────────────────────────────────── */}
          <section style={{ padding: "100px 0 72px" }}>
            <Reveal>
              <h5 className="section-label" style={{ marginBottom: "20px" }}>
                / Case Study — OOH OwnerHub
              </h5>
              <h1 style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 700, letterSpacing: "-0.03em",
                lineHeight: 1.08, color: "var(--color2)",
                marginBottom: "24px",
              }}>
                Designing for a domain where a wrong state costs a real client
              </h1>
              <p style={{
                fontSize: "1.125rem", lineHeight: 1.75,
                color: "var(--color7)", maxWidth: "620px", marginBottom: "40px",
              }}>
                OOH OwnerHub is a B2B operations platform for outdoor advertising — billboards,
                street poles, transit displays. Before it existed, agencies ran their entire
                business on WhatsApp threads, shared spreadsheets and institutional memory.
                This is an account of four problems that forced me to think before I designed.
              </p>

              {/* Meta grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                border: "1px solid var(--color3)",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#fff",
              }}>
                {[
                  { label: "My role",   value: "UI/UX Design Lead" },
                  { label: "Client",    value: "Covenant Media / ADWrap" },
                  { label: "Domain",    value: "Out-of-Home Advertising" },
                  { label: "Status",    value: "Ongoing — Live in production" },
                ].map((m, i) => (
                  <div key={i} style={{
                    padding: "18px 22px",
                    borderRight: i < 3 ? "1px solid var(--color3)" : undefined,
                  }}>
                    <p style={{
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
                      textTransform: "uppercase", color: "var(--color7)", marginBottom: "4px",
                    }}>{m.label}</p>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color2)" }}>
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ── CONTEXT ────────────────────────────────── */}
          <Reveal>
            <section style={{ padding: "64px 0", borderTop: "1px solid var(--color3)" }}>
              <h5 className="section-label" style={{ marginBottom: "0.5rem" }}>/ The domain</h5>
              <h2 style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", fontWeight: 700,
                letterSpacing: "-0.015em", color: "var(--color2)", marginBottom: "20px",
              }}>
                What makes OOH uniquely hard to design for
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "14px" }}>
                A billboard is a physical object. It can only exist in one state at any given
                moment — a face is either displaying an ad for a client or it is not. But the
                business processes around that physical object are layered: campaigns get approved
                before they launch, materials get printed before they&apos;re installed, leases with
                landlords run on different schedules than client campaigns, regulators require
                permits that expire independently of everything else.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "14px" }}>
                Most software treats this as a database problem. I treated it as a state machine
                problem. Every interface question I encountered on this product had a prior
                question:{" "}
                <strong style={{ color: "var(--color2)" }}>
                  what can this object actually be, and what causes it to change?
                </strong>{" "}
                Answering that first made every screen decision faster and more defensible.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                The four problems below are the ones where that discipline mattered most.
              </p>
            </section>
          </Reveal>

          {/* ══════════════════════════════════════════════
               CHALLENGE 01 — VACANCY IS NOT A BOOLEAN
          ══════════════════════════════════════════════ */}
          <Challenge
            index="Challenge 01 of 04"
            heading={`"Vacant" was being used to mean five different things, and the system treated them all the same`}
          >
            <ProblemBlock>
              Ops teams were selecting media marked Vacant in the campaign creation flow — only
              to discover later it was already reserved by another account manager. Double bookings
              were reaching clients. The engineering team was being asked to add more validation.
              I asked to look at the problem from the other direction first.
            </ProblemBlock>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Thought n={1} title={'I started by mapping what "Vacant" actually meant to different people on the team'}>
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  When I interviewed the ops team, I found that &ldquo;Vacant&rdquo; meant: no campaign.
                  But the sales team used it to mean: available for a new proposal. Finance used it
                  to mean: not generating revenue. None of them were wrong — they were looking at
                  the same data through different operational lenses. The interface had collapsed all
                  of these into a single binary because the underlying model was binary.
                </p>
                <Rejected heading="What I rejected first:">
                  Adding a warning banner inside the campaign creation flow that said &ldquo;this media
                  may be reserved.&rdquo; That&apos;s reactive. It treats the symptom — the user sees
                  Vacant and assumes it&apos;s free — without fixing the cause: the system was presenting
                  an incomplete view of the media&apos;s status.
                </Rejected>
                <Insight heading="The reframe:">
                  Vacancy is not the absence of a campaign. It&apos;s a specific confirmed operational
                  state. A media only becomes Vacant when an ops user explicitly confirms Done
                  Deflighting — because the physical advertising material may still be displayed on
                  the structure after a campaign ends. Until that action is taken, the media remains
                  Occupied regardless of what the campaign end date says.
                </Insight>
              </Thought>

              <Thought n={2} title="I defined every real state a media face can be in before drawing a single screen">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "16px" }}>
                  I ran a session with ops and sales to enumerate every condition. The result was a
                  seven-state model with explicit triggers — not UI decisions, domain decisions. Only
                  then did I look at where each state needed to appear in the interface.
                </p>
                {/* State flow */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", marginBottom: "16px" }}>
                  <Pill color="gray" dot="#6E6E73">Draft</Pill>
                  <span style={{ fontSize: "12px", color: "var(--color7)" }}>→</span>
                  <Pill color="blue" dot="#0055CC">Pending Approval</Pill>
                  <span style={{ fontSize: "12px", color: "var(--color7)" }}>→</span>
                  <Pill color="amber" dot="#7A4200">Scheduled</Pill>
                  <span style={{ fontSize: "12px", color: "var(--color7)" }}>→</span>
                  <Pill color="blue" dot="#0055CC">Launching</Pill>
                  <div style={{ width: "100%", marginTop: "6px", display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                    <Pill color="green" dot="#1A6E3C">Occupied (Active)</Pill>
                    <span style={{ fontSize: "12px", color: "var(--color7)" }}>→</span>
                    <Pill color="amber" dot="#7A4200">Awaiting Deflighting</Pill>
                    <span style={{ fontSize: "12px", color: "var(--color7)" }}>→</span>
                    <Pill color="teal" dot="#0C5F54">Vacant</Pill>
                  </div>
                  <p style={{ width: "100%", fontSize: "11px", color: "var(--color7)", fontStyle: "italic", marginTop: "4px" }}>
                    ↑ Only after Done Deflighting is explicitly confirmed by an ops user
                  </p>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  The critical rule: a campaign&apos;s end date passing does not make the face Vacant.
                  Only the confirmed human action of Done Deflighting does. This prevented an entire
                  class of premature re-booking errors where the system thought a face was free
                  because the date had passed, but the physical material was still up.
                </p>
              </Thought>

              <Thought n={3} title="With the model settled, the interface question became simple: where does each state need to be visible?">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  The campaign creation media selection table showed a binary Vacant/Occupied pill.
                  I enriched it with a secondary pipeline indicator — small, not competing with the
                  primary status — that surfaces when a Vacant face has a Draft, Pending or Scheduled
                  campaign against it. Users don&apos;t need to click into anything. The information is
                  in the table at the moment they&apos;re making the selection decision.
                </p>
                <Avoided>
                  A modal that fires when you select a reserved media warning you about the conflict.
                  This would have been a late-stage interruption — the user has already done the
                  cognitive work of choosing this media. Surfacing the information in the table,
                  before the choice, respects the user&apos;s mental flow and eliminates the conflict
                  before it happens.
                </Avoided>
              </Thought>

              <Thought n={4} last title="One precision that mattered: the X/Y format counts faces, not campaigns">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  A media showing <strong style={{ color: "var(--color2)" }}>10/20 Vacant</strong>{" "}
                  means 10 specific physical faces are available out of 20 total. Pipeline awareness
                  must be attached to specific faces — not averaged at the media level. A media with
                  3 faces could have Face 1 truly free, Face 2 with a pending approval, and Face 3
                  occupied. Treating them as one unit would have hidden the detail that determines
                  whether a booking is actually possible.
                </p>
              </Thought>
            </div>
          </Challenge>

          {/* ══════════════════════════════════════════════
               CHALLENGE 02 — ROLE-BASED ACTIVATION
          ══════════════════════════════════════════════ */}
          <Challenge
            index="Challenge 02 of 04"
            heading="The interface had to communicate different authorisation levels without exposing the permission system to the user"
          >
            <ProblemBlock>
              When a face was marked Occupied during media creation, the system triggered a
              campaign recording modal. That modal let users save the campaign — but it didn&apos;t
              capture actual launch or end dates, so the campaign sat in a &ldquo;Launching&rdquo; limbo
              state. Campaigns were piling up unactivated, faces were technically Occupied but
              operationally idle.
            </ProblemBlock>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Thought n={1} title="I identified what information was actually missing — not what action was missing">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  The instinct was to add an &ldquo;Activate&rdquo; button inside the modal. I pushed back
                  because it addressed the symptom not the cause. A campaign can only be Active when
                  its actual launch date is known. Without that, &ldquo;Active&rdquo; is a label on an
                  unverified claim.
                </p>
                <Rejected heading="What I rejected:">
                  A toggle inside the modal labelled &ldquo;Confirm Launch immediately.&rdquo; This communicates
                  the mechanism rather than the operational requirement. It also implies that not
                  toggling it is a valid choice — when actually, the dates are always needed.
                </Rejected>
                <Insight heading="The reframe:">
                  Make actual launch date and end date required fields. The campaign cannot be saved
                  without them. The dates are the gate — not a toggle, not an extra step, not a
                  confirmation button. When you have the dates, you have everything needed to
                  determine whether to activate immediately or submit for approval based on the
                  user&apos;s role.
                </Insight>
              </Thought>

              <Thought n={2} title="The role-based outcome is communicated through the save action itself, not through the form">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "16px" }}>
                  Different users produce different outcomes from the same form. Rather than showing
                  users a permission matrix, I let the save button carry the meaning. The form is
                  identical — only the primary action changes.
                </p>
                {/* Role split */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "16px 0" }} className="cs-role-split">
                  <div style={{ background: "rgba(26,110,60,0.08)", borderRadius: "10px", padding: "16px 18px" }}>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#1A6E3C", marginBottom: "6px" }}>Has approval rights</p>
                    <p style={{ fontSize: "0.8125rem", color: "#1A6E3C", lineHeight: 1.6 }}>
                      Button reads &ldquo;Save &amp; Activate&rdquo; — campaign becomes Active immediately,
                      face shows Occupied (Live) on Media Overview.
                    </p>
                  </div>
                  <div style={{ background: "rgba(122,66,0,0.08)", borderRadius: "10px", padding: "16px 18px" }}>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#7A4200", marginBottom: "6px" }}>No approval rights</p>
                    <p style={{ fontSize: "0.8125rem", color: "#7A4200", lineHeight: 1.6 }}>
                      Button reads &ldquo;Submit for Approval&rdquo; — campaign enters Pending Approval,
                      an approver activates it from Campaign flows.
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  A small preview text appears above the button once both dates are filled — so
                  neither user type is surprised by what happens when they press save.
                </p>
              </Thought>

              <Thought n={3} last title="The modal was built for one face. The actual product has media with multiple occupied faces">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "14px" }}>
                  The original modal fired once per media. But a media with three faces could have
                  Face 1 linked to an existing campaign and Face 2 starting a new one. I redesigned
                  the flow to render one inline panel per occupied face, each independently capable
                  of searching for an existing campaign or creating a minimal new one. The campaign
                  search defaults to showing existing campaigns — because the most common case is
                  linking a face to a campaign that already exists.
                </p>
                <Avoided>
                  A full campaign creation form at media creation time. Embedding the complete
                  campaign flow (customer details, contact person, reference, payment) into the modal
                  would have made media creation 10× slower. Instead I captured the minimum viable
                  information — campaign identity and dates — and deferred everything else to Campaign
                  flows where users can fill it in unhurried.
                </Avoided>
              </Thought>
            </div>
          </Challenge>

          {/* ══════════════════════════════════════════════
               CHALLENGE 03 — REMINDER SYSTEM
          ══════════════════════════════════════════════ */}
          <Challenge
            index="Challenge 03 of 04"
            heading="Eight iterations to find a reminder data model that didn't break under realistic conditions"
          >
            <ProblemBlock>
              The platform needed to send reminder emails to clients before their campaign end
              dates. The initial implementation fired one reminder per campaign. It broke
              immediately: campaigns contain multiple media with different end dates, so &ldquo;7 days
              before end&rdquo; fires on a different calendar date for each media. The feature was
              effectively unusable.
            </ProblemBlock>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Thought n={1} title="I mapped the four candidate models before choosing one">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "20px" }}>
                  Before sketching any UI, I tested each model against three realistic scenarios: a
                  campaign with 10 medias having different end dates, a campaign where some medias
                  were moved to Done Launching at different times, and a case where one media needed
                  different recipients from the rest of the batch.
                </p>
                {/* Trade-off table */}
                <div style={{ border: "1px solid var(--color3)", borderRadius: "12px", overflow: "hidden", margin: "4px 0 20px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                    <thead>
                      <tr style={{ background: "var(--color1)" }}>
                        {["Model","Different end dates","Different batches","Per-media override"].map((h,i) => (
                          <th key={i} style={{
                            textAlign: "left", fontSize: "10px", fontWeight: 700,
                            letterSpacing: "0.08em", textTransform: "uppercase",
                            color: "var(--color7)", padding: "10px 14px",
                            borderBottom: "1px solid var(--color3)",
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { model: "One config per campaign",         cols: ["Breaks","Breaks","Breaks"],       chosen: false },
                        { model: "Group by end date",               cols: ["Works","Breaks","Breaks"],        chosen: false },
                        { model: "Per individual media",            cols: ["Works","Works","Works"],          chosen: false },
                        { model: "Batch config + per-media firing ✓", cols: ["Works","Works","Works (deferred)"], chosen: true },
                      ].map((row) => (
                        <tr key={row.model} style={{ background: row.chosen ? "rgba(226,117,0,0.04)" : undefined }}>
                          <td style={{
                            padding: "11px 14px", borderBottom: "1px solid var(--color3)",
                            color: row.chosen ? "var(--accent)" : "var(--color7)",
                            fontWeight: row.chosen ? 600 : 400, fontSize: "0.875rem", lineHeight: 1.5,
                          }}>{row.model}</td>
                          {row.cols.map((c,i) => (
                            <td key={i} style={{ padding: "11px 14px", borderBottom: "1px solid var(--color3)" }}>
                              <span style={{
                                display: "inline-block", fontSize: "10px", fontWeight: 700,
                                padding: "2px 8px", borderRadius: "20px",
                                background: c === "Breaks" ? "rgba(185,28,28,0.1)" : "rgba(26,110,60,0.1)",
                                color: c === "Breaks" ? "#B91C1C" : "#1A6E3C",
                              }}>{c}</span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  Per individual media was technically correct but operationally unusable (20 config
                  cards for 20 medias). Batch config + per-media firing was the right answer: one
                  config set at the moment of moving medias to Done Launching, with the system
                  computing individual fire dates from each media&apos;s own end date.
                </p>
              </Thought>

              <Thought n={2} title="The fire schedule is derived data — computed, not stored">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "14px" }}>
                  A rule like &ldquo;Send 7 days before end&rdquo; produces a different fire date for every
                  media. Rather than asking ops to configure each date manually, I designed the
                  system to compute fire dates client-side:{" "}
                  <Code>fireDate = mediaEndDate − rule.days</Code>. The UI shows these computed
                  dates grouped by end date so ops can scan and verify without any additional data entry.
                </p>
                <Insight heading="Why this matters:">
                  It means no new API fields are required to show fire schedules. The information
                  was always in the data — it just needed to be computed and surfaced at the right
                  moment. The interface made the model legible.
                </Insight>
              </Thought>

              <Thought n={3} title="Resend logic required a three-state status model, not a two-state one">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "14px" }}>
                  The original spec said: if all reminders have been sent, the sequence is &ldquo;done.&rdquo;
                  But this ignored a real business need: a campaign might still be active when all
                  reminders fire, and a client might want a resend. I defined three distinct statuses:
                </p>
                {[
                  { color: "amber" as const, dot: "#7A4200", label: "Pending",   note: "— rules still firing, end date not passed → Edit only. A resend button here would cause duplicate sends." },
                  { color: "blue"  as const, dot: "#0055CC", label: "Sent",      note: "— all rules fired, end date not yet passed → Resend allowed. Campaign still live, resend has commercial value." },
                  { color: "gray"  as const, dot: "#AEAEB2", label: "Completed", note: "— all rules fired, end date has passed → Read only. Historical record, no action meaningful." },
                ].map((s) => (
                  <div key={s.label} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                    <Pill color={s.color} dot={s.dot}>{s.label}</Pill>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color7)", lineHeight: 1.65, paddingTop: "2px" }}>{s.note}</p>
                  </div>
                ))}
              </Thought>

              <Thought n={4} last title="Per-media override: when the batch config doesn't fit one specific case">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  I designed a per-media override layer on top of the batch config — where a single
                  media within a batch can have a different schedule, different recipients, or
                  different email copy from the rest. The override is set inline on that media&apos;s
                  row in the fire schedule table, and the row shows a &ldquo;Custom&rdquo; badge so ops can
                  see at a glance which medias are operating outside the batch config. Resetting to
                  batch default is one click.
                </p>
              </Thought>
            </div>
          </Challenge>

          {/* ══════════════════════════════════════════════
               CHALLENGE 04 — FINANCIAL ACCURACY
          ══════════════════════════════════════════════ */}
          <Challenge
            index="Challenge 04 of 04"
            heading="Designing financial interfaces where an ambiguous label causes a client dispute"
          >
            <ProblemBlock>
              Clients were approving proposals and then receiving invoices with different totals.
              Not errors — the same numbers, different because proposals were being shared at net
              rates while campaign costing included tax. The ops team was spending hours per week
              in clarification calls that should not have existed.
            </ProblemBlock>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Thought n={1} title="I traced the discrepancy back to where the number was first generated, not where it was displayed">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "14px" }}>
                  The instinct was to add a tax line item to proposals so clients could see the tax
                  separately. That would have made the discrepancy visible without fixing it. The
                  actual problem was upstream: the calculation rule for &ldquo;Total Amount&rdquo; was not
                  the same across proposals and campaign costing. I defined a single source-of-truth
                  calculation:
                </p>
                <DecisionBlock header="The rule — applied consistently across every surface the client sees">
                  <><Code>Total Amount = (Net Subtotal after discount) + Tax</Code>
                  <br /><br />
                  This value must match exactly between: Proposal Summary, Proposal PDF export,
                  Campaign Payment Summary, and client-facing invoice. Not approximately match.
                  Exactly match.</>
                </DecisionBlock>
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  Enforcing this rule meant removing a &ldquo;Gross Amount&rdquo; column that had been showing
                  pre-discount values and replacing it with &ldquo;Total Amount&rdquo; using the formula above.
                  One column change, but it required coordinating the fix across four surfaces.
                </p>
              </Thought>

              <Thought n={2} title="The Payment Summary table needed a structural rethink, not a visual refresh">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75, marginBottom: "14px" }}>
                  Campaigns contain media groups — static billboards in one group, street poles in
                  another — and each group contains individual faces with their own durations. A flat
                  list couldn&apos;t represent this hierarchy without losing the relationship between the
                  group total and the face-level breakdown.
                </p>
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  I designed a collapsible parent-child table: group rows show summarised values with
                  a chevron; expanding reveals individual face rows with their specific dates and
                  costs. This pattern became the standard across the platform — Landlord Bills,
                  Regulator Compliance and the Reminder system all use the same parent-child table
                  structure. I designed it once, documented the pattern, and it scaled to every
                  module that needed hierarchical data.
                </p>
              </Thought>

              <Thought n={3} last title="Terminology is a financial accuracy problem, not just a copy problem">
                <p style={{ fontSize: "0.9375rem", color: "var(--color7)", lineHeight: 1.75 }}>
                  The platform used &ldquo;Monthly Rental&rdquo; for both static billboards and street pole
                  groups. But for poles rented in groups, it referred to the per-pole unit price —
                  not the total for all poles. This caused misquotation errors where ops teams were
                  presenting per-pole rates as total costs. I defined the label as dynamic:{" "}
                  <strong style={{ color: "var(--color2)" }}>Monthly Rental</strong> for static
                  faces,{" "}
                  <strong style={{ color: "var(--color2)" }}>Unit Price (Per Pole)</strong> for
                  street pole routes. The same field, the right label based on media type.
                  Propagated across inventory, proposals, campaign tables and PDF exports.
                </p>
              </Thought>
            </div>
          </Challenge>

          {/* ── BRIDGE ─────────────────────────────────── */}
          <Reveal>
            <section style={{ padding: "72px 0", borderTop: "1px solid var(--color3)" }}>
              <h5 className="section-label" style={{ marginBottom: "0.5rem" }}>/ Why this is relevant to FOOTPASS</h5>
              <h2 style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", fontWeight: 700,
                letterSpacing: "-0.015em", color: "var(--color2)", marginBottom: "8px",
              }}>
                The problems are structurally identical
              </h2>
              <p style={{
                fontSize: "1rem", color: "var(--color7)",
                marginBottom: "40px", maxWidth: "560px", lineHeight: 1.7,
              }}>
                The domain changes. The discipline is the same: model the states before drawing
                the screens, design for the role not just the form, and recognise that an
                ambiguous label in a trust system is not a copy problem — it&apos;s a product integrity
                problem.
              </p>

              {[
                {
                  adwrap: "Media vacancy is action-based (Done Deflighting), not time-based (campaign end date). The physical state and the system state are different things.",
                  fp: "Player eligibility is not determined by contract dates alone. A player whose contract expired may still be cup-tied, transfer-blocked or under a sanction. The system state requires explicit confirmation.",
                },
                {
                  adwrap: "Same campaign recording form produces \"Active immediately\" for users with approval rights and \"Pending Approval\" for others — without exposing the permission model in the UI.",
                  fp: "A club secretary, a federation registrar and a licensed agent all interact with the same pass object — but only specific roles can certify, approve or transfer it. The interface should communicate role scope through available actions, not through visible permission labels.",
                },
                {
                  adwrap: "Per-face campaign recording: one media, three faces, each independently linked to a different campaign with its own dates and approval path.",
                  fp: "One player, multiple active relationships: a club registration, an agent mandate, a national team call-up. Each relationship has its own validity, its own authorisation chain, and its own state — independent of the others.",
                },
                {
                  adwrap: "Eight iterations on the reminder data model before a single screen was drawn. The model determined the interface — not the other way around.",
                  fp: "A Pass ID system is fundamentally a model problem. Before any screen shows a pass, someone has to define every state a pass can be in, every event that transitions it, and every role that can trigger that event. That work is design work, not engineering work.",
                },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr auto 1fr",
                  gap: "16px", padding: "20px 0",
                  borderTop: i === 0 ? "1px solid var(--color3)" : undefined,
                  borderBottom: "1px solid var(--color3)",
                  alignItems: "flex-start",
                }} className="cs-bridge-row">
                  <div>
                    <p style={{
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
                      textTransform: "uppercase", color: "var(--color7)", marginBottom: "6px",
                    }}>ADWrap</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--color7)", lineHeight: 1.65 }}>{row.adwrap}</p>
                  </div>
                  <div style={{ color: "var(--color7)", fontSize: "0.875rem", paddingTop: "22px" }}>→</div>
                  <div>
                    <p style={{
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
                      textTransform: "uppercase", color: "var(--accent)", marginBottom: "6px",
                    }}>FOOTPASS</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--accent)", fontWeight: 500, lineHeight: 1.65 }}>{row.fp}</p>
                  </div>
                </div>
              ))}
            </section>
          </Reveal>

          {/* ── CTA ────────────────────────────────────── */}
          <Reveal>
            <div style={{
              margin: "16px 0 80px",
              padding: "56px 48px",
              background: "linear-gradient(180deg, #0a0a0a 0%, #232323 100%)",
              borderRadius: "24px",
              textAlign: "center",
            }}>
              <h5 className="section-label" style={{ marginBottom: "12px", color: "rgba(255,255,255,0.4)" }}>
                / Let&apos;s build
              </h5>
              <h2 style={{
                fontFamily: '"Clash Display", sans-serif',
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700, letterSpacing: "-0.03em",
                color: "#fff", marginBottom: "12px",
              }}>
                Let&apos;s work on FOOTPASS
              </h2>
              <p style={{
                fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)",
                marginBottom: "32px", maxWidth: "400px",
                marginLeft: "auto", marginRight: "auto", lineHeight: 1.7,
              }}>
                20 hours per week. Senior product design on complex multi-role B2B systems.
              </p>
              <a
                href="mailto:musaaziignatius@gmail.com"
                className="btn-accent"
                style={{ fontSize: "0.9375rem", padding: "0.75rem 1.75rem" }}
              >
                <i className="fas fa-envelope" />
                Get in touch →
              </a>
            </div>
          </Reveal>

        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 560px) {
          .cs-role-split { grid-template-columns: 1fr !important; }
          .cs-bridge-row { grid-template-columns: 1fr !important; }
          .cs-bridge-row > :nth-child(2) { display: none; }
        }
      `}</style>
    </>
  );
}
