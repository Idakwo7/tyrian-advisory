export type Service = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  icon: string;
  overview: string;
  offerings: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "corporate-strategy",
    title: "Corporate Strategy",
    tagline: "Clarity of direction, conviction in execution.",
    summary:
      "We help leadership teams define where to compete and how to win, translating ambition into a coherent, actionable strategy.",
    icon: "compass",
    overview:
      "Enduring value is built on decisions made with discipline. We partner with boards and executive teams to sharpen corporate strategy, allocate capital with intent, and build the organizational capabilities required to deliver sustained growth.",
    offerings: [
      "Corporate & business-unit strategy design",
      "Growth, market entry and diversification planning",
      "Portfolio strategy and capital allocation frameworks",
      "Competitive positioning and value-creation roadmaps",
      "Strategy activation and performance tracking",
    ],
    outcomes: [
      "A clear, prioritized strategic agenda",
      "Aligned leadership and measurable milestones",
      "Sharper capital deployment decisions",
    ],
  },
  {
    slug: "investment-capital-advisory",
    title: "Investment & Capital Advisory",
    tagline: "The right capital, on the right terms.",
    summary:
      "We advise on raising, structuring and deploying capital across the balance sheet, connecting ambition with the funding to realize it.",
    icon: "coins",
    overview:
      "Access to capital is rarely the constraint; access to the right capital is. We help clients structure funding, engage the appropriate investor base, and negotiate terms that protect long-term flexibility and value.",
    offerings: [
      "Equity and debt capital raising",
      "Capital structure optimization",
      "Investor targeting, materials and roadshow support",
      "Structured and hybrid financing solutions",
      "Investment appraisal and due diligence support",
    ],
    outcomes: [
      "Efficient, resilient capital structures",
      "Access to aligned, long-term investors",
      "Terms that preserve strategic optionality",
    ],
  },
  {
    slug: "mergers-acquisitions",
    title: "Mergers & Acquisitions",
    tagline: "Disciplined deals that create real value.",
    summary:
      "From origination to integration, we advise on transactions that are strategically sound and rigorously executed.",
    icon: "handshake",
    overview:
      "M&A rewards preparation and discipline. We guide clients through every stage of the transaction lifecycle, identifying the right opportunities, negotiating from strength, and ensuring value survives the closing table.",
    offerings: [
      "Buy-side and sell-side advisory",
      "Target identification and origination",
      "Valuation, deal structuring and negotiation",
      "Due diligence coordination",
      "Post-merger integration planning",
    ],
    outcomes: [
      "Transactions aligned to strategy",
      "Value protected through diligence and structure",
      "Smoother integration and faster synergy capture",
    ],
  },
  {
    slug: "family-office-services",
    title: "Family Office Services",
    tagline: "Stewardship across generations.",
    summary:
      "We help families preserve, grow and govern wealth with the same rigor and discretion applied to institutional capital.",
    icon: "shield",
    overview:
      "Family wealth is as much about legacy as it is about returns. We provide institutional-grade advisory to family offices, balancing investment performance with governance, succession and the values that define a family's purpose.",
    offerings: [
      "Family office design and governance",
      "Investment strategy and portfolio oversight",
      "Succession and intergenerational planning",
      "Wealth structuring and consolidation",
      "Bespoke reporting and advisory coordination",
    ],
    outcomes: [
      "Robust governance and clear decision rights",
      "A coherent, long-horizon investment approach",
      "Preserved legacy across generations",
    ],
  },
  {
    slug: "real-estate-infrastructure-advisory",
    title: "Real Estate & Infrastructure Advisory",
    tagline: "Building assets that endure.",
    summary:
      "We advise on real estate and infrastructure investment, development and financing, from single assets to complex portfolios.",
    icon: "building",
    overview:
      "Real assets demand a blend of financial, operational and market insight. We support clients across the lifecycle of real estate and infrastructure, from acquisition and development strategy to structured financing and portfolio optimization.",
    offerings: [
      "Investment and development advisory",
      "Project and structured finance",
      "Asset and portfolio strategy",
      "Feasibility, valuation and market analysis",
      "Public and private partnership advisory",
    ],
    outcomes: [
      "Well-structured, financeable projects",
      "Optimized asset and portfolio returns",
      "Risk allocated to the parties best able to bear it",
    ],
  },
  {
    slug: "business-transformation",
    title: "Business Transformation",
    tagline: "Change that holds.",
    summary:
      "We help organizations reshape their operating model, performance and culture, delivering transformation that lasts.",
    icon: "refresh",
    overview:
      "Transformation fails when it stops at the strategy deck. We work alongside management to redesign operating models, improve performance, and embed the capabilities and behaviors that make change permanent.",
    offerings: [
      "Operating model and organizational redesign",
      "Performance improvement and cost optimization",
      "Turnaround and restructuring support",
      "Digital and process transformation",
      "Change management and capability building",
    ],
    outcomes: [
      "Measurable, sustained performance gains",
      "A leaner, more resilient operating model",
      "Change embedded in culture and capability",
    ],
  },
  {
    slug: "board-ceo-advisory",
    title: "Board & CEO Advisory",
    tagline: "A trusted counsel in the room.",
    summary:
      "We support boards and chief executives with independent, discreet advice on the decisions that matter most.",
    icon: "podium",
    overview:
      "The most consequential decisions are often the loneliest. We serve as a trusted, independent sounding board to directors and CEOs, bringing perspective, rigor and candor to governance, strategy and leadership challenges.",
    offerings: [
      "Board effectiveness and governance advisory",
      "CEO and executive sounding-board support",
      "Strategic decision and scenario review",
      "Stakeholder and shareholder engagement",
      "Leadership transition and succession advisory",
    ],
    outcomes: [
      "Sharper, better-tested decisions",
      "Stronger alignment between board and management",
      "Confident navigation of critical moments",
    ],
  },
  {
    slug: "private-capital-venture-advisory",
    title: "Private Capital & Venture Advisory",
    tagline: "Backing the builders of tomorrow.",
    summary:
      "We advise founders, funds and investors across the private capital and venture landscape, from early growth to exit.",
    icon: "rocket",
    overview:
      "Private markets move quickly and reward those who are well-prepared. We support founders and investors across the venture and private capital lifecycle, helping raise capital, structure investments and position for a successful exit.",
    offerings: [
      "Venture and growth capital raising",
      "Fund formation and investor relations support",
      "Investment structuring and term negotiation",
      "Portfolio strategy and value creation",
      "Exit readiness and transaction advisory",
    ],
    outcomes: [
      "Capital raised from the right partners",
      "Well-structured, founder-friendly terms",
      "A clear path to value realization",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
