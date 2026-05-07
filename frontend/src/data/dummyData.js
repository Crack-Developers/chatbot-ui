export const dummyQuestions = [
  { id: 1, title: "Explain the role of Governor in State Administration", category: "Polity", color: "orange" },
  { id: 2, title: "What were the major reforms during British India?", category: "History", color: "blue" },
  { id: 3, title: "Explain the Revolt of 1857", category: "History", color: "blue" },
  { id: 4, title: "Discuss India's Foreign Trade Policy", category: "Economy", color: "green" },
  { id: 5, title: "Basic Structure Doctrine and its evolution", category: "Polity", color: "orange" },
  { id: 6, title: "Impact of GST on Federalism", category: "Economy", color: "green" },
];

export const dummyMCQs = [
  {
    id: 1,
    question: "Which article of the Indian Constitution deals with the Amendment procedure?",
    options: ["Article 352", "Article 360", "Article 368", "Article 370"],
    correct: 2,
    explanation: "Article 368 provides the power to Parliament to amend the Constitution and its procedure."
  },
  {
    id: 2,
    question: "Who was the first Governor-General of Bengal?",
    options: ["Robert Clive", "Warren Hastings", "William Bentinck", "Lord Cornwallis"],
    correct: 1,
    explanation: "Warren Hastings became the first Governor-General of Bengal in 1773."
  }
];

// ─── Rich News Articles ──────────────────────────────────────────────────────
export const dummyNews = [
  {
    id: "n001", title: "Supreme Court Expands Bench Strength to 38 Judges",
    source: "The Hindu", tag: "Polity", date: "2026-05-07", priority: "high", isImportant: true,
    summary: "The Union Cabinet approved raising the number of Supreme Court judges from 34 to 38, the largest single expansion since 1960. The move aims to address the mounting backlog of over 80,000 pending cases. Chief Justice of India called it a historic step toward timely justice delivery.",
    keyPoints: ["Bench strength raised from 34 to 38 judges","Addresses 80,000+ pending case backlog","Requires amendment to Supreme Court (Number of Judges) Act, 1956","Largest expansion since the 1960 amendment"],
    whyImportant: "Directly relevant to GS Paper 2 — Indian Polity. Questions on judiciary, pendency, judicial reforms frequently appear in both Prelims and Mains. This also links to the concept of judicial independence vs executive role in judicial appointments.",
    syllabusLinks: ["GS Paper 2 — Structure, Organization of Judiciary","GS Paper 2 — Appointment of Judges, Collegium System","Essay — Justice Delayed is Justice Denied"],
    prelimsQuestions: ["The number of Supreme Court judges (excluding CJI) is determined by which Act?", "Which constitutional article empowers Parliament to regulate the number of SC judges?"],
    mainsAnswer: "Introduction: Brief on SC pendency crisis. Body: (1) Constitutional basis — Art. 124, SC (Number of Judges) Act 1956. (2) Need — 80k+ pending cases, vacancy-driven delays. (3) Significance — Access to justice, Art. 21 implications. (4) Challenges — Infrastructure, quality over quantity debate. Conclusion: Structural reforms needed alongside expansion.",
    url: "https://www.thehindu.com/news/national/cabinet-approves-proposal-to-increase-number-of-supreme-court-judges-to-38/article70943624.ece"
  },
  {
    id: "n002", title: "India-Japan Healthcare Summit: New MoU on Digital Health",
    source: "The Hindu", tag: "Science", date: "2026-05-07", priority: "medium", isImportant: false,
    summary: "India and Japan signed a landmark MoU on digital health cooperation during a bilateral summit in New Delhi. The agreement covers telemedicine frameworks, AI-assisted diagnostics, and pharmaceutical supply chain resilience. This is part of India's broader push under Ayushman Bharat Digital Mission.",
    keyPoints: ["MoU covers telemedicine, AI diagnostics, pharma supply chains","Aligns with Ayushman Bharat Digital Mission (ABDM)","Japan to co-invest in health data interoperability standards","Focus on rural healthcare delivery via digital tools"],
    whyImportant: "Relevant for GS Paper 2 (Health Policy, International Relations) and GS Paper 3 (S&T). The India-Japan partnership is a key bilateral relationship tested in Mains. Digital health is an emerging UPSC theme.",
    syllabusLinks: ["GS Paper 2 — India's bilateral relations with Japan","GS Paper 2 — Health sector policies, Ayushman Bharat","GS Paper 3 — Role of Technology in Healthcare"],
    prelimsQuestions: ["ABDM (Ayushman Bharat Digital Mission) operates under which ministry?", "Which year was Ayushman Bharat PM-JAY launched?"],
    mainsAnswer: "Introduction: India-Japan 'Special Strategic Global Partnership'. Body: (1) MoU provisions — telemedicine, AI diagnostics. (2) ABDM linkage — health stack, ABHA ID. (3) Significance for rural India. (4) Challenges — data privacy, interoperability. Conclusion: Bilateral tech cooperation as a force multiplier for SDG-3.",
    url: "https://www.thehindu.com/news/national/india-japan-hold-key-meeting-on-healthcare-in-delhi/article70942708.ece"
  },
  {
    id: "n003", title: "RBI: 30 Banks Now on UDGAM Portal for Unclaimed Deposits",
    source: "The Hindu", tag: "Economy", date: "2026-05-07", priority: "medium", isImportant: false,
    summary: "The Reserve Bank of India informed the Supreme Court that 30 banks are now integrated with the UDGAM (Unclaimed Deposits – Gateway to Access inforMation) portal. The portal allows legal heirs to trace funds in dormant accounts. Total unclaimed deposits across banks exceeded ₹42,000 crore.",
    keyPoints: ["30 banks live on UDGAM portal","₹42,000 crore in unclaimed deposits across the banking system","Helps legal heirs locate dormant account funds","Part of RBI's consumer protection initiative"],
    whyImportant: "Tests knowledge of RBI's consumer protection role, financial inclusion initiatives, and the concept of dormant accounts. Frequently tested in Economy section of Prelims.",
    syllabusLinks: ["GS Paper 3 — Indian Economy, Banking Sector Reforms","GS Paper 2 — Consumer Protection, RBI's Regulatory Role","Prelims — Current Affairs: RBI initiatives"],
    prelimsQuestions: ["UDGAM portal was launched by which institution?", "Deposits become 'unclaimed' if not operated for how many years as per RBI guidelines?"],
    mainsAnswer: "Introduction: Financial inclusion and dormant accounts. Body: (1) UDGAM — purpose, coverage. (2) Scale — ₹42k crore unclaimed funds. (3) Consumer protection dimension. (4) Comparison with DEAF (Depositor Education and Awareness Fund). Conclusion: Technology as enabler for financial rights.",
    url: "https://www.thehindu.com/news/national/30-banks-integrated-with-udgam-portal/article70942244.ece"
  },
  {
    id: "n004", title: "Strait of Hormuz: Global Energy Chokepoint Under Pressure",
    source: "The Hindu", tag: "International", date: "2026-05-07", priority: "high", isImportant: true,
    summary: "With rising Iran-Gulf tensions, the Strait of Hormuz — through which 21% of global oil trade passes — faces renewed closure threats. India, importing 80% of its crude from the region, has activated strategic petroleum reserve protocols. The US 5th Fleet has increased naval presence in the area.",
    keyPoints: ["21% of global oil transits through Hormuz","India imports 80% crude from Gulf region","Strategic Petroleum Reserve (SPR) protocols activated","US 5th Fleet increased presence; Iran threatens to close strait"],
    whyImportant: "Critical for GS Paper 3 (Energy Security) and GS Paper 2 (International Relations, India's foreign policy). Energy security is a perennial UPSC Mains theme. Hormuz appears regularly in Prelims geography questions.",
    syllabusLinks: ["GS Paper 3 — Energy Security, Strategic Petroleum Reserves","GS Paper 2 — India's West Asia Policy, Gulf Relations","Geography — Major Sea Straits and their strategic importance"],
    prelimsQuestions: ["Which two water bodies does the Strait of Hormuz connect?", "India's Strategic Petroleum Reserve (SPR) is managed by which body?"],
    mainsAnswer: "Introduction: India's energy vulnerability. Body: (1) Hormuz — geography, traffic volume. (2) India's exposure — import dependency, SPR capacity. (3) Diplomatic response — Gulf outreach, diversification. (4) Long-term — renewable transition imperative. Conclusion: Energy security as a national security issue.",
    url: "https://www.thehindu.com/news/international/why-is-the-strait-of-hormuz-critical/article70865249.ece"
  },
  // ── May 6 ────────────────────────────────────────────────────────────────
  {
    id: "n005", title: "Assembly Election 2026: Historic Verdict Reshapes Political Map",
    source: "The Hindu", tag: "Polity", date: "2026-05-06", priority: "high", isImportant: true,
    summary: "Assembly election results marked a seismic shift — BJP secured decisive wins in West Bengal and Assam while TVK emerged as a powerful new force in Tamil Nadu. The results signal growing anti-incumbency in southern states and consolidation of BJP's dominance in eastern India.",
    keyPoints: ["BJP wins West Bengal & Assam with comfortable majority","TVK displaces DMK in Tamil Nadu, ending bipolar politics","Kerala retains Left Democratic Front government","Coalition mathematics will define parliamentary arithmetic in 2027"],
    whyImportant: "Polity & Governance — State elections, role of Election Commission, federalism implications. Also relevant for essay on 'Democracy in India: Challenges and Opportunities'.",
    syllabusLinks: ["GS Paper 2 — Elections, Electoral Reforms, Role of ECI","GS Paper 2 — Federalism, Centre-State Relations","Essay — Regional parties and Indian Democracy"],
    prelimsQuestions: ["The Model Code of Conduct (MCC) is issued by which body?", "Which schedule of the Constitution deals with anti-defection?"],
    mainsAnswer: "Introduction: India's democratic vitality shown through elections. Body: (1) Results snapshot. (2) Federalism implications — regional parties' role. (3) ECI's role in free & fair polls. (4) Coalition era implications. Conclusion: Elections as barometer of democratic health.",
    url: "https://www.thehindu.com/news/national/assembly-elections-2026-results/article6812345.ece"
  },
  {
    id: "n006", title: "Forest Rights Act Reaffirmed by Allahabad High Court",
    source: "The Hindu", tag: "Environment", date: "2026-05-06", priority: "high", isImportant: true,
    summary: "The Allahabad High Court delivered a landmark ruling strengthening the implementation of the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006. The court directed states to expedite pending claims and barred eviction without due process.",
    keyPoints: ["FRA 2006 claims must be processed before any eviction","States directed to form grievance redressal committees","~40 lakh claims still pending across India","Court invokes Art. 21 — right to livelihood for forest communities"],
    whyImportant: "FRA is a core GS Paper 2 and 3 topic. This judgment links tribal rights, environmental governance, and judicial activism — a powerful mains answer framework. Also tests knowledge of scheduled areas under 5th Schedule.",
    syllabusLinks: ["GS Paper 2 — Rights of Vulnerable Sections, Tribal Welfare","GS Paper 3 — Conservation, Biodiversity, Forest Governance","GS Paper 2 — Judicial Activism, Judicial Review"],
    prelimsQuestions: ["FRA 2006 recognizes rights of forest dwellers over how many types of rights?", "Which schedule of the Constitution deals with administration of Tribal Areas?"],
    mainsAnswer: "Introduction: Tribal communities and forest dependency. Body: (1) FRA 2006 — provisions, coverage. (2) HC verdict — key directions. (3) Implementation gap — 40L pending claims. (4) Art. 21 linkage — right to livelihood. Conclusion: Balancing conservation with tribal rights.",
    url: "https://www.thehindu.com/news/national/allahabad-hc-forest-rights-act/article6812348.ece"
  },
  {
    id: "n007", title: "India-UK FTA: Luxury Vehicle Prices Drop Significantly",
    source: "The Hindu", tag: "Economy", date: "2026-05-06", priority: "medium", isImportant: false,
    summary: "The India-UK Free Trade Agreement's implementation has led to significant tariff reductions on CBU (Completely Built Unit) luxury vehicles, with some models seeing price reductions of 15-40%. Economists warn of widening trade deficit while industry hails greater competition.",
    keyPoints: ["CBU vehicle tariffs reduced under FTA provisions","15-40% price drop on luxury Range Rover and Bentley models","Trade deficit concerns raised by economists","FTA also covers services, digital trade, and professional mobility"],
    whyImportant: "FTAs are a recurring Economy topic. Tests knowledge of trade policy, WTO frameworks, and India's FTA strategy. Relevant for both Prelims (current affairs) and Mains (GS3 — trade).",
    syllabusLinks: ["GS Paper 3 — Indian Economy — Trade Policy, FTAs","GS Paper 2 — India-UK bilateral relations","Prelims — Economic Survey themes on trade"],
    prelimsQuestions: ["India-UK FTA negotiations were launched in which year?", "CBU vehicles attract what base customs duty rate in India currently?"],
    mainsAnswer: "Introduction: India's evolving FTA strategy. Body: (1) India-UK FTA key provisions. (2) Winners — auto sector, consumers. (3) Losers — domestic manufacturers, trade deficit risk. (4) Broader FTA strategy — EU, GCC talks. Conclusion: FTAs as instruments of economic diplomacy.",
    url: "https://www.thehindu.com/business/Economy/india-uk-fta-luxury-cars/article6812347.ece"
  },
  {
    id: "n008", title: "Dual-Use Satellites Blur Military-Civilian Space Lines",
    source: "The Hindu", tag: "Science", date: "2026-05-06", priority: "medium", isImportant: false,
    summary: "A new UN report warns that proliferation of dual-use satellites — capable of both civilian and military functions — is accelerating space militarization. India's ISRO faces pressure to clarify the dual-use status of upcoming surveillance satellites under its Space Vision 2047 plan.",
    keyPoints: ["UN report flags rapid growth of dual-use satellite fleets","Space militarization risks destabilizing arms control frameworks","ISRO's surveillance satellites under scrutiny","Outer Space Treaty 1967 has no explicit dual-use provisions"],
    whyImportant: "Space policy is an emerging UPSC theme under GS Paper 3 (S&T) and GS Paper 2 (International Relations — arms control). Outer Space Treaty questions appear in Prelims.",
    syllabusLinks: ["GS Paper 3 — Space Technology, ISRO, Indigenization","GS Paper 2 — International Treaties, Arms Control","Prelims — Space missions, Outer Space Treaty"],
    prelimsQuestions: ["The Outer Space Treaty was signed in which year?", "Which UN body oversees peaceful uses of outer space (COPUOS)?"],
    mainsAnswer: "Introduction: Space as the new strategic frontier. Body: (1) Dual-use satellite concept. (2) Arms control gaps — OST 1967 limitations. (3) India's position — ISRO Space Vision 2047. (4) Global norms — need for updated space governance. Conclusion: Multilateral framework essential for space peace.",
    url: "https://www.thehindu.com/sci-tech/science/space-war-dual-use-satellites/article6812349.ece"
  },
  // ── May 5 ────────────────────────────────────────────────────────────────
  {
    id: "n009", title: "Rare Caracals Spotted Near India-Pakistan Border in Thar",
    source: "PIB", tag: "Environment", date: "2026-05-05", priority: "medium", isImportant: false,
    summary: "Wildlife Institute of India (WII) researchers documented rare Asiatic caracal sightings in the Thar Desert region near the Rajasthan border, using camera traps. The species, listed as 'Least Concern' globally but critically endangered in India, had not been reliably recorded in this zone since 2007.",
    keyPoints: ["Caracal (Caracal caracal) spotted in Thar after 19 years","WII used camera trap methodology","Listed as Schedule I species under Wildlife Protection Act 1972","Thar hosts unique desert biodiversity — Great Indian Bustard also critical here"],
    whyImportant: "Biodiversity and species conservation is tested frequently. Schedule I species, Wildlife Protection Act, and biosphere reserves are common Prelims topics. Great Indian Bustard linkage makes this doubly relevant.",
    syllabusLinks: ["GS Paper 3 — Biodiversity, Conservation, Protected Areas","Prelims — Species in News, Wildlife Protection Act 1972","GS Paper 3 — Desert Ecosystem Conservation"],
    prelimsQuestions: ["Schedule I of Wildlife Protection Act, 1972 provides protection to how many categories of species?", "The Great Indian Bustard is found primarily in which Indian state?"],
    mainsAnswer: "Introduction: India's biodiversity conservation challenges. Body: (1) Caracal — IUCN status, India status. (2) Thar ecosystem — unique biodiversity. (3) WPA 1972 protections. (4) Conflict with border security infrastructure. Conclusion: Conservation corridors as policy imperative.",
    url: "https://pib.gov.in/PressReleasePage.aspx?PRID=caracal-thar-2026"
  },
  {
    id: "n010", title: "PM Modi Launches PM Surya Ghar Phase-2 with Expanded Subsidy",
    source: "PIB", tag: "Economy", date: "2026-05-05", priority: "high", isImportant: true,
    summary: "The PM Surya Ghar Muft Bijli Yojana Phase-2 was officially launched, expanding rooftop solar coverage to 2 crore additional households. The scheme offers free electricity up to 300 units/month for beneficiaries and a direct subsidy of ₹78,000 per household for installation.",
    keyPoints: ["Phase-2 targets 2 crore additional households","₹78,000 direct subsidy per household for installation","Up to 300 units/month free electricity for beneficiaries","Linked to India's 500 GW renewable target by 2030"],
    whyImportant: "Government schemes on renewable energy directly appear in Prelims. Solar energy policy links GS Paper 3 (Energy, Environment) with GS Paper 2 (Welfare Schemes). Must-know for current affairs.",
    syllabusLinks: ["GS Paper 3 — Renewable Energy Policy, Solar Mission","GS Paper 2 — Government Welfare Schemes","Prelims — Schemes launched by PM, renewable targets"],
    prelimsQuestions: ["PM Surya Ghar Yojana is administered under which ministry?", "India's National Solar Mission target for 2030 is how many GW?"],
    mainsAnswer: "Introduction: India's renewable energy transition imperative. Body: (1) Scheme provisions — subsidy, coverage. (2) India's solar ambition — 500 GW by 2030. (3) Benefits — energy access, emission reduction. (4) Challenges — grid integration, financing. Conclusion: Decentralized solar as energy democracy.",
    url: "https://pib.gov.in/PressReleasePage.aspx?PRID=pm-surya-ghar-phase2"
  },
];

// ─── Daily Analysis (category-wise overview per date) ────────────────────────
export const dailyAnalysis = {
  "2026-05-07": {
    date: "2026-05-07",
    title: "UPSC Daily Briefing — May 7, 2026",
    overview: "Today's briefing covers four high-significance developments: the historic expansion of Supreme Court bench strength to 38 judges addressing the justice pendency crisis; India-Japan digital health cooperation under the ABDM framework; the RBI's UDGAM portal reaching 30 banks for unclaimed deposits; and renewed geopolitical pressure on the Strait of Hormuz impacting India's energy security. Aspirants must particularly note the judicial reform and energy security angles for Mains answers.",
    source: "https://www.thehindu.com/",
    categories: {
      polity_governance: ["Cabinet approves raising SC bench strength to 38 judges — largest expansion since 1960, addressing 80,000+ case backlog"],
      international_relations: ["Strait of Hormuz tensions escalate — India activates SPR protocols as 21% of global oil supply faces closure risk"],
      economy: ["RBI: 30 banks integrated with UDGAM portal — ₹42,000 crore unclaimed deposits can now be traced by legal heirs"],
      science_technology: ["India-Japan MoU on digital health — telemedicine, AI diagnostics under Ayushman Bharat Digital Mission"],
      environment_ecology: [],
      defense_security: [],
      government_schemes: ["UDGAM portal expansion — part of RBI consumer protection and financial inclusion initiative"]
    }
  },
  "2026-05-06": {
    date: "2026-05-06",
    title: "UPSC Daily Briefing — May 6, 2026",
    overview: "May 6 was dominated by historic assembly election results reshaping India's political map, with BJP consolidating eastern India and new regional forces emerging in the south. The Allahabad HC's FRA judgment was a landmark ruling for tribal rights and environmental governance. The India-UK FTA's luxury vehicle impact tests trade policy knowledge, while the dual-use satellite report links space governance with arms control — a high-value Mains theme.",
    source: "https://www.thehindu.com/",
    categories: {
      polity_governance: ["2026 Assembly Elections — BJP wins West Bengal & Assam; TVK disrupts Tamil Nadu's political landscape", "Allahabad HC reaffirms Forest Rights Act — bars eviction without due process for 40L pending claimants"],
      international_relations: ["India-UK FTA in effect — luxury vehicle tariffs down 15-40%; broader services and digital trade provisions active"],
      economy: ["FTA trade deficit concerns — economists warn of widening gap despite consumer price benefits"],
      science_technology: ["UN report: Dual-use satellites accelerating space militarization; Outer Space Treaty 1967 has critical gaps"],
      environment_ecology: ["Allahabad HC FRA ruling — judicial backing for tribal forest communities; Art. 21 right to livelihood affirmed"],
      defense_security: [],
      government_schemes: []
    }
  },
  "2026-05-05": {
    date: "2026-05-05",
    title: "UPSC Daily Briefing — May 5, 2026",
    overview: "May 5 highlights include the PM Surya Ghar Phase-2 launch targeting 2 crore additional households for rooftop solar — a critical scheme for GS Paper 3. Rare caracal sightings in the Thar Desert bring biodiversity conservation and the Wildlife Protection Act into focus. Both items are high-probability Prelims questions and strong Mains answer supplementary points.",
    source: "https://pib.gov.in/",
    categories: {
      polity_governance: [],
      international_relations: [],
      economy: ["PM Surya Ghar Phase-2 — ₹78,000 subsidy per household; targets 2 crore homes; linked to India's 500 GW renewable goal"],
      science_technology: [],
      environment_ecology: ["Rare Asiatic caracal documented in Thar Desert after 19 years — Schedule I species, WPA 1972 protection highlighted"],
      defense_security: [],
      government_schemes: ["PM Surya Ghar Muft Bijli Yojana Phase-2 — free electricity up to 300 units/month for rooftop solar beneficiaries"]
    }
  }
};
