export interface Choice {
  text: string;
  effects: {
    capital: number;
    team: number;
    reputation: number;
  };
  outcome: string;
}

interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
}

interface Stage {
  id: number;
  city: string;
  industry: string;
  title: string;
  description: string;
  backgroundImage: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme' | 'Legendary';
  targetCapital: number;
  events: GameEvent[];
  bossChallenge: {
    title: string;
    description: string;
    choices: Choice[];
  };
}

export const stages: Stage[] = [
  {
    id: 1,
    city: "Bangalore",
    industry: "IT Services",
    title: "The Silicon Valley of India",
    description: "Start your journey in India's tech capital. Build an IT services company from scratch in the bustling startup ecosystem of Bangalore. The competition is fierce but the opportunities are endless.",
    backgroundImage: "https://image.qwenlm.ai/generated-images/24772277-6ffb-4f74-8b5e-2627a8b02ea9/_result.png",
    difficulty: "Easy",
    targetCapital: 50,
    events: [
      {
        id: "b1",
        title: "First Client Meeting",
        description: "A major MNC wants to outsource their backend development. They're offering a lucrative contract but with tight deadlines. Your team is small but talented.",
        choices: [
          {
            text: "Accept the full contract - Show them you can handle it",
            effects: { capital: 15, team: -10, reputation: 10 },
            outcome: "You delivered! But your team is exhausted. The client is impressed though."
          },
          {
            text: "Negotiate for a phased delivery with realistic timelines",
            effects: { capital: 8, team: 5, reputation: 5 },
            outcome: "Smart move! The client respects your professionalism. Sustainable growth."
          },
          {
            text: "Decline - Focus on building your own product first",
            effects: { capital: -5, team: 10, reputation: -5 },
            outcome: "Bold choice. Your team is happy but you've burned some capital."
          }
        ]
      },
      {
        id: "b2",
        title: "Talent War",
        description: "A well-funded startup is poaching your best developers with 2x salaries. Your lead architect just got an offer.",
        choices: [
          {
            text: "Match the salary - Keep your star performer",
            effects: { capital: -12, team: 15, reputation: 5 },
            outcome: "You retained your best talent, but the burn rate just increased significantly."
          },
          {
            text: "Offer ESOPs and vision - Make them believe in the dream",
            effects: { capital: -3, team: 8, reputation: 10 },
            outcome: "Your vision sold! They stayed, inspired by the equity stake."
          },
          {
            text: "Let them go - Hire fresh talent and train them",
            effects: { capital: 5, team: -15, reputation: -5 },
            outcome: "Painful but practical. You saved money but lost momentum."
          }
        ]
      }
    ],
    bossChallenge: {
      title: "The Funding Pitch",
      description: "Sequoia Capital has invited you for a Series A pitch. This is your make-or-break moment. The partners are known for grilling founders.",
      choices: [
        {
          text: "Present aggressive growth numbers - Promise 10x returns",
          effects: { capital: 25, team: 5, reputation: 5 },
          outcome: "They loved the ambition! You got the funding, but now expectations are sky-high."
        },
        {
          text: "Show realistic projections with clear unit economics",
          effects: { capital: 15, team: 10, reputation: 15 },
          outcome: "Impressive discipline! They respect your grounded approach. Solid funding secured."
        },
        {
          text: "Walk away - You don't need their money or their pressure",
          effects: { capital: 0, team: 15, reputation: -10 },
          outcome: "Bold move! Your team is proud but investors remember this... not always positively."
        }
      ]
    }
  },
  {
    id: 2,
    city: "Mumbai",
    industry: "Fintech",
    title: "Financial Capital Showdown",
    description: "Mumbai - where money never sleeps. Enter the high-stakes world of Indian fintech. Navigate RBI regulations, compete with Paytm and PhonePe, and build the next unicorn.",
    backgroundImage: "https://image.qwenlm.ai/generated-images/8cf83cf8-576f-45cd-bce5-580dcfd90c8d/_result.png",
    difficulty: "Medium",
    targetCapital: 100,
    events: [
      {
        id: "m1",
        title: "RBI Compliance Crisis",
        description: "The Reserve Bank of India just issued new KYC norms. Your app needs major compliance updates within 30 days or face shutdown. Your CTO says it's barely possible.",
        choices: [
          {
            text: "Go all-night mode - Burn the team to meet the deadline",
            effects: { capital: 5, team: -20, reputation: 15 },
            outcome: "You made it! RBI approved your app. But 3 developers quit from burnout."
          },
          {
            text: "Hire a compliance consultancy firm immediately",
            effects: { capital: -15, team: 5, reputation: 10 },
            outcome: "Expensive but smooth. The consultants knew the system inside out."
          },
          {
            text: "Request extension - Be transparent with RBI about challenges",
            effects: { capital: -5, team: 10, reputation: -10 },
            outcome: "RBI gave 15 more days. Some media called you 'unprepared' though."
          }
        ]
      },
      {
        id: "m2",
        title: "The Cashback War",
        description: "PhonePe just announced massive cashback offers. Users are migrating. Your board wants you to match or risk losing market share.",
        choices: [
          {
            text: "Match their cashback - Spend aggressively to retain users",
            effects: { capital: -20, team: 5, reputation: 10 },
            outcome: "Users stayed but your runway just got shorter. This is a war of attrition."
          },
          {
            text: "Differentiate - Launch unique features they can't copy",
            effects: { capital: -8, team: -5, reputation: 15 },
            outcome: "Your investment banking integration became a game-changer. Users love the value."
          },
          {
            text: "Ignore the noise - Focus on profitability over growth",
            effects: { capital: 10, team: 5, reputation: -15 },
            outcome: "Smart financially but you lost 30% of users. The board is not happy."
          }
        ]
      }
    ],
    bossChallenge: {
      title: "The Data Breach",
      description: "CRISIS! A hacker has accessed 10,000 user records. Media is calling. Users are panicking. You have 2 hours before this goes viral on Twitter.",
      choices: [
        {
          text: "Full transparency - Announce publicly and take responsibility",
          effects: { capital: -10, team: 5, reputation: 20 },
          outcome: "Brave decision! The public respected your honesty. Trust rebuilt stronger than before."
        },
        {
            text: "Quiet fix - Resolve silently and hope no one notices",
            effects: { capital: -5, team: -10, reputation: -25 },
            outcome: "DISASTER! A journalist found out. You're trending for all the wrong reasons."
          },
          {
            text: "Blame a third-party vendor - Shift the narrative",
            effects: { capital: -8, team: -5, reputation: -15 },
            outcome: "The vendor fired back with evidence. You look worse now. Lesson learned."
          }
      ]
    }
  },
  {
    id: 3,
    city: "Delhi NCR",
    industry: "E-Commerce & D2C",
    title: "The Capital's Commerce Wars",
    description: "Delhi - the heart of Indian consumerism. Launch your D2C brand in a market where Flipkart, Amazon, and Meesho dominate. Win the hearts of 1.4 billion consumers.",
    backgroundImage: "https://image.qwenlm.ai/generated-images/a739f4ae-4354-4c07-a7ea-39a5f5856e0b/_result.png",
    difficulty: "Hard",
    targetCapital: 200,
    events: [
      {
        id: "d1",
        title: "Supply Chain Nightmare",
        description: "Diwali season is approaching - your biggest sales opportunity. But your main warehouse in Gurugram just flooded. 40% of inventory is damaged.",
        choices: [
          {
            text: "Emergency procurement - Source from alternate suppliers at premium",
            effects: { capital: -25, team: 5, reputation: 10 },
            outcome: "Costly but you delivered! Customers got their Diwali gifts on time."
          },
          {
            text: "Pivot to digital-only - Launch virtual products and gift cards",
            effects: { capital: 5, team: -10, reputation: -5 },
            outcome: "Creative but confusing for customers. Some loved it, many were disappointed."
          },
          {
            text: "Be honest - Inform customers of delays with heavy discounts",
            effects: { capital: -15, team: 10, reputation: 5 },
            outcome: "Customers appreciated honesty. Most waited, some left. Fair outcome."
          }
        ]
      },
      {
        id: "d2",
        title: "Influencer Scandal",
        description: "Your brand ambassador (a major Bollywood star) just got caught in a controversy. #BoycottYourBrand is trending. Sales dropped 60% overnight.",
        choices: [
          {
            text: "Drop them immediately - Issue a strong statement",
            effects: { capital: -20, team: 5, reputation: 15 },
            outcome: "Swift action! The public appreciated your values. New influencer partnerships forming."
          },
          {
            text: "Stand by them - Wait for the storm to pass",
            effects: { capital: -30, team: -10, reputation: -20 },
            outcome: "The storm didn't pass. You lost major retail partners. A costly lesson."
          },
          {
            text: "Turn it into a campaign - Address the issue head-on with purpose",
            effects: { capital: -10, team: 10, reputation: 20 },
            outcome: "Genius move! Your purpose-driven response went viral positively."
          }
        ]
      }
    ],
    bossChallenge: {
      title: "The Amazon Ultimatum",
      description: "Amazon wants to acquire your brand. They're offering 500 Cr but want full control. Your co-founder wants to sell. Your investors are split. This defines your legacy.",
      choices: [
        {
          text: "Accept the deal - Secure generational wealth for everyone",
          effects: { capital: 50, team: -15, reputation: -10 },
          outcome: "You're rich! But you lost your baby. Your co-founder left. Was it worth it?"
        },
        {
          text: "Reject firmly - This company is your legacy, not for sale",
          effects: { capital: -10, team: 20, reputation: 25 },
          outcome: "Legendary move! Your team is fired up. India's business media calls you the next big rebel."
        },
        {
          text: "Counter-offer - Propose a strategic partnership instead",
          effects: { capital: 20, team: 10, reputation: 15 },
          outcome: "Masterful negotiation! You got Amazon's distribution without losing control."
        }
      ]
    }
  },
  {
    id: 4,
    city: "Hyderabad",
    industry: "Pharma & Biotech",
    title: "The Pharma Capital Challenge",
    description: "Hyderabad - India's Pharma Hub. Enter the complex world of drug manufacturing, clinical trials, and FDA approvals. One wrong move costs lives and billions.",
    backgroundImage: "https://image.qwenlm.ai/generated-images/daf0c286-965e-493e-a2ed-bf66ef58cc0a/_result.png",
    difficulty: "Extreme",
    targetCapital: 350,
    events: [
      {
        id: "h1",
        title: "FDA Inspection Alert",
        description: "US FDA announced a surprise inspection of your manufacturing facility next week. Your last audit had 3 minor observations. The stakes: import ban could destroy exports.",
        choices: [
          {
            text: "Full prep mode - Halt production, deep clean everything",
            effects: { capital: -20, team: -10, reputation: 15 },
            outcome: "FDA was impressed! Zero observations. Your stock jumped 15%."
          },
          {
            text: "Hire ex-FDA consultants to prepare your team",
            effects: { capital: -15, team: 5, reputation: 10 },
            outcome: "Smart investment! They knew exactly what inspectors look for."
          },
          {
            text: "Confident approach - Continue normal operations, you're compliant",
            effects: { capital: 5, team: 5, reputation: -20 },
            outcome: "Overconfidence! FDA found 2 critical issues. Import alert issued. Stock crashed."
          }
        ]
      },
      {
        id: "h2",
        title: "Clinical Trial Results",
        description: "Your flagship drug's Phase 3 trial results are in. They're... borderline. Statistically significant but barely. Your CRO says you could 'massage' the data.",
        choices: [
          {
            text: "Publish as-is - Let the data speak for itself",
            effects: { capital: -10, team: 10, reputation: 20 },
            outcome: "Integrity wins! The scientific community respects you. Partners approach for collaboration."
          },
          {
            text: "Run additional analysis - Find subgroups where it worked better",
            effects: { capital: -5, team: -5, reputation: 5 },
            outcome: "Technically ethical but borderline. Some scientists call it 'cherry-picking'."
          },
          {
            text: "Shelve the drug - Invest in the next candidate",
            effects: { capital: -25, team: 5, reputation: 10 },
            outcome: "Painful but wise. Your pipeline is strong. Long-term thinking pays off."
          }
        ]
      }
    ],
    bossChallenge: {
      title: "The Patient Safety Crisis",
      description: "ALERT: Reports of adverse reactions in 15 patients using your drug. Media is screaming. The drug minister is asking questions. Your entire company's future hangs in the balance.",
      choices: [
        {
          text: "Immediate voluntary recall - Patient safety above everything",
          effects: { capital: -40, team: 10, reputation: 30 },
          outcome: "Heroic decision! You lost billions but saved lives. The world remembers your integrity."
        },
        {
          text: "Investigate first - These could be coincidental",
          effects: { capital: -10, team: -15, reputation: -20 },
          outcome: "Too slow! 3 more patients affected while you investigated. Public fury erupts."
        },
        {
          text: "Blame the patients - Issue statement about non-compliance",
          effects: { capital: -5, team: -20, reputation: -35 },
          outcome: "CATASTROPHIC! Internal docs leaked showing you knew. Criminal cases filed."
        }
      ]
    }
  },
  {
    id: 5,
    city: "Chennai",
    industry: "EV Manufacturing",
    title: "The Electric Revolution",
    description: "Chennai - Detroit of India. Lead the EV revolution in a country transitioning from fossil fuels. Compete with Tata Motors, Ola Electric, and global giants entering India.",
    backgroundImage: "https://image.qwenlm.ai/generated-images/fa3a2041-7d99-4891-8d83-621e4bde6ba8/_result.png",
    difficulty: "Legendary",
    targetCapital: 500,
    events: [
      {
        id: "c1",
        title: "Battery Supply Crisis",
        description: "China just restricted lithium exports. Your battery supplier can only deliver 30% of orders. Production line is stalled. 5000 workers idle.",
        choices: [
          {
            text: "Secure alternative from Australia - Pay premium price",
            effects: { capital: -30, team: 10, reputation: 10 },
            outcome: "Expensive but reliable! You're now seen as supply-chain smart. Long-term contract secured."
          },
          {
            text: "Pivot to sodium-ion batteries - Indian-made alternative",
            effects: { capital: -15, team: -10, reputation: 20 },
            outcome: "Visionary move! IIT Madras collaboration makes headlines. Government supports you."
          },
          {
            text: "Lay off workers temporarily - Wait for supply to normalize",
            effects: { capital: 10, team: -30, reputation: -20 },
            outcome: "Workers union protests went viral. 'Anti-labor' tag sticks. Recovery will be hard."
          }
        ]
      },
      {
        id: "c2",
        title: "The Fire Incident",
        description: "One of your EV scooters caught fire in Bangalore. Video is viral. 50,000 pre-orders at risk. Competitors are already running negative campaigns.",
        choices: [
          {
            text: "Full investigation + public recall of affected batch",
            effects: { capital: -25, team: 5, reputation: 15 },
            outcome: "Transparent response! Investigation found isolated issue. Trust slowly rebuilding."
          },
          {
            text: "Counter-attack - Expose competitor's own safety issues",
            effects: { capital: -10, team: -5, reputation: -15 },
            outcome: "Backfired! Public sees it as deflection. 'Not owning mistakes' narrative grows."
          },
          {
            text: "Innovate response - Launch next-gen safety features immediately",
            effects: { capital: -20, team: 15, reputation: 20 },
            outcome: "Turned crisis into opportunity! New safety tech becomes your USP. Orders recovering."
          }
        ]
      }
    ],
    bossChallenge: {
      title: "The Government Policy Shift",
      description: "The Union Budget just removed EV subsidies entirely. Your entire business model depended on FAME II benefits. Competitors with deep pockets can survive. Can you?",
      choices: [
        {
          text: "Absorb the cost - Keep prices same, eat the margin",
          effects: { capital: -35, team: 5, reputation: 20 },
          outcome: "Noble but painful. You survive but barely. Some investors exit. You're battle-tested now."
        },
        {
          text: "Pass to consumers - Raise prices by 15%",
          effects: { capital: -5, team: -10, reputation: -10 },
          outcome: "Sales dropped 40%. Customers switched to competitors who absorbed costs."
        },
        {
          text: "Pivot strategy - Focus on commercial EVs where subsidies aren't critical",
          effects: { capital: -15, team: 10, reputation: 15 },
          outcome: "Brilliant pivot! Fleet operators love your commercial vehicles. New revenue stream unlocked."
        }
      ]
    }
  }
];

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Easy': return 'text-green-400';
    case 'Medium': return 'text-yellow-400';
    case 'Hard': return 'text-orange-400';
    case 'Extreme': return 'text-red-400';
    case 'Legendary': return 'text-purple-400';
    default: return 'text-white';
  }
};

export const getDifficultyBg = (difficulty: string): string => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-500/20 border-green-500/50';
    case 'Medium': return 'bg-yellow-500/20 border-yellow-500/50';
    case 'Hard': return 'bg-orange-500/20 border-orange-500/50';
    case 'Extreme': return 'bg-red-500/20 border-red-500/50';
    case 'Legendary': return 'bg-purple-500/20 border-purple-500/50';
    default: return 'bg-gray-500/20 border-gray-500/50';
  }
};
