import { useEffect, useState } from "react";

/* ───────────────────────────────────────────────────────────
   ROHAN SHARMA · PORTFOLIO
   Brief: a profile, not a pitch. He applies across four lanes
   (data/BI, EIT engineering, data engineering, software) plus
   econ-dev policy, so the page states facts plainly and lets
   the reader filter to their own domain. No slogans, no
   display-size headlines.
   Every claim traces to _system/master.md.
   ─────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root{
  --paper:#FBFAF8; --surface:#FFFFFF; --ink:#1B1D1F; --slate:#5C6266;
  --line:#E6E3DD; --line-soft:#EFEDE8;
  --accent:#24506E; --accent-soft:#ECF1F5; --accent-line:#CBDAE6;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--paper)}
.rs{background:var(--paper);color:var(--ink);font-family:'Public Sans',system-ui,sans-serif;
  font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
.rs a{color:inherit}
.mono{font-family:'IBM Plex Mono',ui-monospace,monospace}

/* shell */
.shell{max-width:1060px;margin:0 auto;padding:0 32px;display:grid;
  grid-template-columns:236px 1fr;gap:60px;align-items:start}

/* sidebar */
.side{position:sticky;top:0;height:100vh;padding:52px 0 32px;display:flex;
  flex-direction:column;gap:26px;min-width:0}
.name{font-size:23px;font-weight:700;letter-spacing:-.02em;line-height:1.2}
.role{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--slate);
  margin-top:7px;line-height:1.6}
.snav{display:flex;flex-direction:column;gap:1px}
.snav a{text-decoration:none;color:var(--slate);font-size:14.5px;padding:6px 10px;
  border-radius:6px;border-left:2px solid transparent;transition:all .14s ease}
.snav a:hover{color:var(--ink);background:var(--line-soft)}
.snav a.act{color:var(--accent);border-left-color:var(--accent);
  background:var(--accent-soft);font-weight:600}
.snav a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.side-foot{margin-top:auto;display:flex;flex-direction:column;gap:12px}
.status{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--accent);
  background:var(--accent-soft);border:1px solid var(--accent-line);border-radius:6px;
  padding:8px 11px;line-height:1.5}
.side-links{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13.5px}
.side-links a{color:var(--slate);text-decoration:none;border-bottom:1px solid var(--line)}
.side-links a:hover{color:var(--accent);border-bottom-color:var(--accent)}

/* main */
.main{padding:52px 0 80px;min-width:0}
.sec{padding:0 0 52px;scroll-margin-top:24px}
.sec-t{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--slate);padding-bottom:12px;
  border-bottom:1px solid var(--line);margin-bottom:26px}

/* about */
.about p{max-width:64ch;margin-bottom:15px;color:#31363A}
.about p:last-of-type{margin-bottom:0}
.facts{margin-top:28px;border:1px solid var(--line);border-radius:8px;background:var(--surface);
  overflow:hidden}
.fact{display:grid;grid-template-columns:150px 1fr;gap:16px;padding:11px 16px;
  border-top:1px solid var(--line-soft);font-size:14.5px}
.fact:first-child{border-top:none}
.fact dt{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.06em;
  text-transform:uppercase;color:var(--slate);padding-top:3px}
.fact dd{color:var(--ink)}

/* filter */
.filter{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
.filter button{font-family:'Public Sans',sans-serif;font-size:13px;font-weight:500;
  color:var(--slate);background:var(--surface);border:1px solid var(--line);
  border-radius:99px;padding:5px 13px;cursor:pointer;transition:all .14s ease}
.filter button:hover{border-color:var(--accent-line);color:var(--ink)}
.filter button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);
  color:#fff}
.filter button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.count{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--slate);
  margin:14px 0 4px}

/* work items */
.item{padding:22px 0;border-top:1px solid var(--line-soft)}
.item:first-of-type{border-top:none}
.item-h{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 14px;margin-bottom:8px}
.item h3{font-size:17px;font-weight:700;letter-spacing:-.01em}
.item-links{display:flex;gap:14px;font-size:13.5px;font-weight:600}
.item-links a{color:var(--accent);text-decoration:none;border-bottom:1px solid transparent}
.item-links a:hover{border-bottom-color:var(--accent)}
.item p{color:var(--slate);font-size:15px;max-width:66ch}
.item .metric{margin-top:9px;font-size:14.5px;color:var(--ink);background:var(--surface);
  border:1px solid var(--line);border-left:2px solid var(--accent);border-radius:0 6px 6px 0;
  padding:9px 13px;max-width:66ch}
.tags{margin-top:11px;display:flex;flex-wrap:wrap;gap:6px}
.tag{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.04em;
  color:var(--slate);background:var(--paper);border:1px solid var(--line);
  border-radius:4px;padding:3px 7px}
.tag.dom{color:var(--accent);background:var(--accent-soft);border-color:var(--accent-line)}

/* experience */
.job{padding:20px 0;border-top:1px solid var(--line-soft)}
.job:first-of-type{border-top:none;padding-top:0}
.job-h{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 18px;align-items:baseline}
.job h3{font-size:16.5px;font-weight:700}
.job .when{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--slate);
  white-space:nowrap}
.job .org{font-size:14.5px;color:var(--accent);font-weight:600;margin:2px 0 8px}
.job ul{margin:0;padding-left:17px;color:var(--slate);font-size:14.5px;max-width:66ch}
.job li{margin-bottom:4px}
.job li b{color:var(--ink);font-weight:600}

/* skills */
.sk{margin-bottom:20px}
.sk:last-child{margin-bottom:0}
.sk h3{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--slate);margin-bottom:9px}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{font-family:'IBM Plex Mono',monospace;font-size:12px;background:var(--surface);
  border:1px solid var(--line);border-radius:5px;padding:4px 9px;color:var(--ink)}

/* education */
.ed{padding:15px 0;border-top:1px solid var(--line-soft)}
.ed:first-of-type{border-top:none;padding-top:0}
.ed b{font-size:15.5px;font-weight:600;display:block}
.ed span{font-size:14px;color:var(--slate)}
.ed .meta{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--slate);margin-top:3px}
.cert{padding:12px 0;border-top:1px solid var(--line-soft);display:flex;flex-wrap:wrap;
  justify-content:space-between;align-items:baseline;gap:2px 20px}
.cert:first-of-type{border-top:none;padding-top:0}
.cert b{font-size:15.5px;font-weight:600;color:var(--ink)}
.cert span{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--slate)}

/* contact */
.contact p{max-width:60ch;color:#31363A;margin-bottom:18px}
.cbtns{display:flex;flex-wrap:wrap;gap:9px}
.cbtn{font-size:14px;font-weight:600;text-decoration:none;padding:10px 17px;border-radius:7px;
  border:1px solid var(--line);background:var(--surface);color:var(--ink);transition:all .14s ease}
.cbtn:hover{border-color:var(--accent);color:var(--accent)}
.cbtn.on{background:var(--accent);border-color:var(--accent);color:#fff}
.cbtn.on:hover{background:#1C4159;color:#fff}
.cbtn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.colophon{margin-top:44px;padding-top:18px;border-top:1px solid var(--line);
  font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--slate);
  display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px}

@media (max-width:900px){
  .shell{grid-template-columns:1fr;gap:0;padding:0 24px}
  .side{position:static;height:auto;padding:36px 0 0;gap:20px}
  .side-foot{margin-top:0}
  .snav{flex-direction:row;overflow-x:auto;gap:2px;scrollbar-width:none;min-width:0;
    padding-bottom:2px;border-bottom:1px solid var(--line)}
  .snav::-webkit-scrollbar{display:none}
  .snav a{flex:0 0 auto;border-left:none;border-bottom:2px solid transparent;border-radius:6px 6px 0 0}
  .snav a.act{border-left:none;border-bottom-color:var(--accent)}
  .main{padding:34px 0 64px}
  .fact{grid-template-columns:1fr;gap:2px}
  .fact dt{padding-top:0}
}
`;

/* ── data, every item traces to _system/master.md ────────── */

const DOMAINS = [
  ["all", "Everything"],
  ["data", "Data & analytics"],
  ["eng", "Engineering"],
  ["sw", "Software"],
  ["policy", "Economic development"],
];

const FACTS = [
  ["Based in", "British Columbia · willing to relocate anywhere in Canada"],
  ["Registration", "Eligible for registration as an Engineer-in-Training with EGBC"],
  ["Licence", "Valid BC Class 5 driver's licence"],
];

const WORK = [
  {
    title: "Regional Industry Explorer",
    doms: ["data", "sw", "policy"],
    tech: ["React", "Vite", "Plotly", "Netlify"],
    body:
      "A live web tool that puts city-level industry, wage and workforce-readiness data in front of municipal staff and elected officials. Links NAICS and NOC employment data to occupation-level skill profiles.",
    metric: "Used live in municipal partner briefings.",
    links: [{ label: "Live site", href: "https://regionalindustryexplorer.netlify.app" }],
  },
  {
    title: "Canadian job-cell panel, 1971–2021",
    doms: ["data", "policy"],
    tech: ["Python", "pandas", "statsmodels", "SQL"],
    body:
      "A reproducible pipeline over a 925,000+ observation panel of Canadian census employment data, covering occupations, industries, wages and regions. Computes economic complexity indicators (ECI, PCI, RCA, density) across census regions to find diversification and investment-targeting opportunities.",
    metric: "",
    links: [],
  },
  {
    title: "City of eThekwini advisory (Durban, South Africa)",
    doms: ["policy"],
    tech: ["Economic complexity", "Advisory"],
    body:
      "A direct advisory engagement on employment and trade diversification priorities, from scoping through to final recommendations, applying economic complexity methods to the city's local economy.",
    metric: "",
    links: [],
  },
  {
    title: "Ontario grid analytics",
    doms: ["data", "eng"],
    tech: ["DuckDB", "dbt", "GitHub Actions", "pytest"],
    body:
      "An analytics engineering pipeline over 35,000+ hourly IESO electricity demand observations from 2022 to 2025, with staging and marts models, and peak-demand and seasonal load-profile analyses.",
    metric: "22 automated data tests, running in CI on every push.",
    links: [{ label: "Code", href: "https://github.com/rohansharmax/ontario-grid-analytics" }],
  },
  {
    title: "Canada grid analytics",
    doms: ["data", "eng"],
    tech: ["Python", "Streamlit", "SQL", "StatCan API"],
    body:
      "An ETL pipeline and dashboard over Statistics Canada electricity generation data, by province and fuel source.",
    metric:
      "Investigated 309 anomalous negative-generation records and documented them as legitimate net-generation values, rather than dropping the rows.",
    links: [{ label: "Code", href: "https://github.com/rohansharmax/canada-grid-analytics" }],
  },
  {
    title: "Realtime private chat app",
    doms: ["sw"],
    tech: ["React", "Firebase Auth", "Firestore"],
    body:
      "Authenticated real-time chat with persistent rooms, message history and input validation.",
    metric: "",
    links: [{ label: "Code", href: "https://github.com/rohansharmax/chat-app" }],
  },
];

const XP = [
  {
    when: "Sep 2024 – Present",
    role: "Graduate Research Assistant",
    org: "UBC Okanagan · Regional Economic Development",
    bullets: [
      "Build and maintain the <b>Python and SQL pipeline</b> and economic complexity indicators behind the group's regional research.",
      "Built a <b>workforce skills-fit model</b> linking NOC occupations to O*NET skill profiles; the transition and similarity scores feed site-selection and workforce recommendations.",
      "Delivered the Regional Industry Explorer, and present findings and live dashboards to municipal partners through OECD-connected regional development engagements.",
      "Translate technical findings into plain-language briefing notes and presentations for non-technical and government audiences.",
    ],
  },
  {
    when: "Jan 2025 – Present",
    role: "Teaching Assistant",
    org: "UBC Okanagan",
    bullets: [
      "Lab instruction across <b>7 engineering courses</b> for <b>500+ students</b>, spanning all four undergraduate years: network security, engineering computation, design studio, project management and engineering economics.",
      "Hands-on Raspberry Pi, Arduino and embedded systems; grade technical reports to published standards and firm deadlines.",
    ],
  },
  {
    when: "Sep 2024 – Sep 2025",
    role: "Mobile & Smart Living Advisor",
    org: "Best Buy Canada",
    bullets: [
      "<b>95% customer satisfaction</b>; top performer for <b>six consecutive months</b>.",
      "Reduced transaction errors <b>15%</b> by redesigning intake and hand-off processes with the in-store service team.",
    ],
  },
  {
    when: "Jun 2024 – Aug 2024",
    role: "Software Development Engineer Intern",
    org: "Bonwic Technologies · New Delhi, India",
    bullets: [
      "Implemented <b>JWT authentication</b> in Node.js, Express and MongoDB, with input validation and role-based access control.",
      "Built 5+ React components against REST APIs; diagnosed production issues alongside senior engineers and documented root causes and fixes.",
    ],
  },
  {
    when: "Mar 2022 – Apr 2022",
    role: "Full-Stack Web Development Intern",
    org: "Developers Infotech · New Delhi, India",
    bullets: [
      "Built responsive e-commerce pages on a Node.js, Express and MySQL backend covering authentication, validation, and cart and order REST endpoints.",
    ],
  },
];

const SKILLS = [
  {
    h: "Analysis",
    items: ["Python", "pandas", "NumPy", "statsmodels", "scikit-learn", "SQL", "DuckDB", "dbt", "Excel (advanced)"],
  },
  {
    h: "Engineering",
    items: ["Git", "GitHub Actions CI", "pytest", "Linux", "React", "Vite", "Node.js", "Express", "REST APIs", "MongoDB", "MySQL"],
  },
  { h: "Visualization", items: ["Plotly", "Power BI", "Streamlit", "Microsoft 365"] },
  {
    h: "Domain data",
    items: ["Canadian census microdata", "Statistics Canada APIs", "NOC / O*NET taxonomies", "IESO demand data"],
  },
];

const EDU = [
  {
    b: "Master of Applied Science, Engineering",
    s: "University of British Columbia Okanagan",
    m: "GPA 4.0/4.0 · UBCO Graduate Research Scholarship",
  },
  {
    b: "Bachelor of Technology, Information Technology",
    s: "Guru Gobind Singh Indraprastha University, New Delhi",
    m: "GPA 9.1/10.0 · Graduated with distinction",
  },
];

const CERTS = [
  ["Machine Learning Specialization", "DeepLearning.AI, 2024"],
  ["Python for Data Science, AI & Development", "IBM, 2023"],
  ["Python Specialization", "Google, 2023"],
];

const NAV = [
  ["about", "About"],
  ["education", "Education"],
  ["work", "Work"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
];

/* ── behaviour ────────────────────────────────────────────── */

function useActiveSection() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = NAV.map(([id]) => id);
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 90) current = id;
      }
      // the last section is short; flag it once the page bottom is reached
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

/* ── page ─────────────────────────────────────────────────── */

export default function Portfolio() {
  const active = useActiveSection();
  const [dom, setDom] = useState("all");

  const shown = dom === "all" ? WORK : WORK.filter((w) => w.doms.includes(dom));
  const domLabel = Object.fromEntries(DOMAINS);

  return (
    <div className="rs">
      <style>{CSS}</style>

      <div className="shell">
        <aside className="side">
          <div>
            <div className="name">Rohan Sharma</div>
            <div className="role">
              MASc Engineering, UBC Okanagan
              <br />
              Data · Analytics · Software
            </div>
          </div>

          <nav className="snav">
            {NAV.map(([id, label]) => (
              <a key={id} href={"#" + id} className={active === id ? "act" : ""}>
                {label}
              </a>
            ))}
          </nav>

          <div className="side-foot">
            <div className="side-links">
              <a href="mailto:rohansharma22r@gmail.com">Email</a>
              <a href="https://www.linkedin.com/in/rohansharma22" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/rohansharmax" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </aside>

        <main className="main">
          <section className="sec about" id="about">
            <h2 className="sec-t">About</h2>
            <p>
              I am a Master of Applied Science student at UBC Okanagan, finishing in November
              2026. Most of my work is building data pipelines and the tools that sit on top of
              them. I maintain a 925,000-observation panel of Canadian census employment data
              going back to 1971, and I have built the models and dashboards that turn it into
              something municipal staff can actually use in a decision.
            </p>
            <p>
              Before graduate school I worked as a software engineer, on authentication, REST
              APIs and React front-ends. I still build that way when a project needs a working
              tool rather than a report. Alongside the research I teach labs across seven
              engineering courses, which keeps me close to the hardware and systems side.
            </p>
            <p>
              I am looking for full-time work in data and analytics, engineering, or
              software. The work below is tagged by domain if you want to skip to the part
              that matters to you.
            </p>

            <dl className="facts">
              {FACTS.map(([k, v]) => (
                <div className="fact" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="sec" id="education">
            <h2 className="sec-t">Education</h2>
            {EDU.map((e) => (
              <div className="ed" key={e.b}>
                <b>{e.b}</b>
                <span>{e.s}</span>
                <div className="meta">{e.m}</div>
              </div>
            ))}
          </section>

          <section className="sec" id="work">
            <h2 className="sec-t">Selected work</h2>

            <div className="filter">
              {DOMAINS.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={dom === id}
                  onClick={() => setDom(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="count">
              {shown.length} of {WORK.length} shown
              {dom !== "all" ? " · " + domLabel[dom] : ""}
            </p>

            {shown.map((w) => (
              <article className="item" key={w.title}>
                <div className="item-h">
                  <h3>{w.title}</h3>
                  {w.links.length > 0 && (
                    <div className="item-links">
                      {w.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <p>{w.body}</p>
                {w.metric && <p className="metric">{w.metric}</p>}
                <div className="tags">
                  {w.doms.map((d) => (
                    <span className="tag dom" key={d}>
                      {domLabel[d]}
                    </span>
                  ))}
                  {w.tech.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section className="sec" id="experience">
            <h2 className="sec-t">Experience</h2>
            {XP.map((x) => (
              <div className="job" key={x.role}>
                <div className="job-h">
                  <h3>{x.role}</h3>
                  <span className="when">{x.when}</span>
                </div>
                <div className="org">{x.org}</div>
                <ul>
                  {x.bullets.map((b, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="sec" id="skills">
            <h2 className="sec-t">Skills</h2>
            {SKILLS.map((s) => (
              <div className="sk" key={s.h}>
                <h3>{s.h}</h3>
                <div className="chips">
                  {s.items.map((i) => (
                    <span className="chip" key={i}>
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="sec" id="certifications">
            <h2 className="sec-t">Certifications</h2>
            {CERTS.map(([c, w]) => (
              <div className="cert" key={c}>
                <b>{c}</b>
                <span>{w}</span>
              </div>
            ))}
          </section>

          <section className="sec contact" id="contact">
            <h2 className="sec-t">Contact</h2>
            <p>
              If something above lines up with a role you are filling, please get in touch.
            </p>
            <div className="cbtns">
              <a className="cbtn on" href="mailto:rohansharma22r@gmail.com">
                rohansharma22r@gmail.com
              </a>
              <a
                className="cbtn"
                href="https://www.linkedin.com/in/rohansharma22"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                className="cbtn"
                href="https://github.com/rohansharmax"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
            <div className="colophon">
              <span>© 2026 Rohan Sharma · British Columbia</span>
              <span>React · Vite · Netlify</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
