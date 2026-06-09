import LegalDefense from "../models/legalDefense.model.js";
import dotenv from "dotenv";
dotenv.config();

const seedLegalDefenseData = async () => {
    try {
        // Clear existing data
        await LegalDefense.deleteMany({});
        console.log("Cleared existing legal defense data");

        // Police Harassment Module
        const policeHarassmentModule = new LegalDefense({
            title: "Police Harassment: What to Do During Unlawful Raids",
            category: "police-harassment",
            description: "Step-by-step guide for handling police harassment and unlawful raids",
            scenario: "Police arrive at your home without a warrant and demand entry",
            actionableSteps: [
                {
                    stepNumber: 1,
                    title: "Stay Calm and Don't Panic",
                    description: "Take deep breaths. Your calm demeanor can de-escalate the situation.",
                    urgency: "immediate",
                    timeEstimate: "0-2 minutes"
                },
                {
                    stepNumber: 2,
                    title: "Ask for Search Warrant",
                    description: "Politely ask to see the search warrant. Police must show it if they have one.",
                    urgency: "immediate",
                    timeEstimate: "1 minute"
                },
                {
                    stepNumber: 3,
                    title: "Record Everything",
                    description: "Start recording video/audio if possible. Note officer names, badge numbers, time.",
                    urgency: "immediate",
                    timeEstimate: "2-3 minutes"
                },
                {
                    stepNumber: 4,
                    title: "Call Your Lawyer",
                    description: "Contact a lawyer immediately. Have emergency legal numbers ready.",
                    urgency: "urgent",
                    timeEstimate: "5-10 minutes"
                },
                {
                    stepNumber: 5,
                    title: "Don't Sign Anything",
                    description: "Refuse to sign any documents without legal counsel present.",
                    urgency: "immediate",
                    timeEstimate: "1 minute"
                }
            ],
            whatToSay: [
                {
                    situation: "When police demand entry without warrant",
                    response: "I need to see a valid search warrant before I can allow entry into my home.",
                    legalBasis: "Fourth Amendment - Protection against unreasonable searches"
                },
                {
                    situation: "When questioned about your activities",
                    response: "I choose to remain silent until I have legal counsel present.",
                    legalBasis: "Fifth Amendment - Right against self-incrimination"
                },
                {
                    situation: "When asked to sign documents",
                    response: "I cannot sign anything without my lawyer reviewing it first.",
                    legalBasis: "Right to legal counsel"
                }
            ],
            whatNotToDo: [
                {
                    action: "Physically resist police",
                    consequence: "Can lead to assault charges and physical harm",
                    alternative: "Verbally assert your rights calmly"
                },
                {
                    action: "Lie or provide false information",
                    consequence: "Obstruction of justice charges",
                    alternative: "Remain silent or say you need legal counsel"
                },
                {
                    action: "Destroy evidence",
                    consequence: "Obstruction charges, makes situation worse",
                    alternative: "Preserve everything as evidence"
                }
            ],
            helplines: [
                {
                    name: "National Legal Services",
                    number: "1518",
                    available: "24/7",
                    purpose: "Free legal aid for harassment cases"
                },
                {
                    name: "Police Complaint Helpline",
                    number: "1091",
                    available: "24/7",
                    purpose: "File complaints against police misconduct"
                },
                {
                    name: "Women's Helpline",
                    number: "181",
                    available: "24/7",
                    purpose: "Emergency assistance for women"
                }
            ],
            legalReferences: [
                {
                    law: "Constitution of India",
                    section: "Article 21",
                    description: "Right to life and personal liberty"
                },
                {
                    law: "Criminal Procedure Code",
                    section: "Section 41",
                    description: "Arrest without warrant conditions"
                },
                {
                    law: "Criminal Procedure Code",
                    section: "Section 165",
                    description: "Search without warrant conditions"
                }
            ],
            evidenceCollection: {
                whatToDocument: [
                    "Officer names and badge numbers",
                    "Time and date of incident",
                    "Exact words spoken by officers",
                    "Any physical contact or force used",
                    "Witnesses present"
                ],
                howToDocument: [
                    "Video recording if safe to do so",
                    "Audio recording if video not possible",
                    "Written notes immediately after",
                    "Photos of any injuries or property damage",
                    "Save all communications"
                ],
                preservationTips: [
                    "Backup recordings to cloud storage",
                    "Share with trusted contacts immediately",
                    "Don't delete anything even if it seems incriminating",
                    "Keep original files intact"
                ]
            },
            followUpActions: [
                {
                    action: "File formal complaint with police department",
                    timeline: "Within 24 hours",
                    responsible: "You or your lawyer"
                },
                {
                    action: "Seek medical examination if injured",
                    timeline: "Immediately",
                    responsible: "You"
                },
                {
                    action: "Contact human rights organizations",
                    timeline: "Within 48 hours",
                    responsible: "You or advocate"
                }
            ],
            difficulty: "intermediate",
            estimatedTime: "30-60 minutes",
            tags: ["police", "harassment", "rights", "emergency", "legal"]
        });

        // Emergency Action Module
        const emergencyActionModule = new LegalDefense({
            title: "Emergency Action: Using Helpline Numbers and NGOs",
            category: "emergency-action",
            description: "Quick reference for emergency contacts and immediate action steps",
            scenario: "You're in immediate danger or need urgent legal assistance",
            actionableSteps: [
                {
                    stepNumber: 1,
                    title: "Call Emergency Helpline",
                    description: "Call 181 for women, 1091 for police complaints, or 112 for general emergency.",
                    urgency: "immediate",
                    timeEstimate: "1-2 minutes"
                },
                {
                    stepNumber: 2,
                    title: "Move to Safe Location",
                    description: "If possible, go to a safe public place or trusted friend's house.",
                    urgency: "immediate",
                    timeEstimate: "5-30 minutes"
                },
                {
                    stepNumber: 3,
                    title: "Document the Emergency",
                    description: "Take photos, videos, and notes of the situation.",
                    urgency: "urgent",
                    timeEstimate: "5 minutes"
                },
                {
                    stepNumber: 4,
                    title: "Contact Rescue NGOs",
                    description: "Call specialized NGOs for your specific situation.",
                    urgency: "urgent",
                    timeEstimate: "10-15 minutes"
                }
            ],
            whatToSay: [
                {
                    situation: "Calling emergency helpline",
                    response: "I need immediate assistance. I am [describe situation]. My location is [address/landmark].",
                    legalBasis: "Right to emergency protection"
                },
                {
                    situation: "Speaking to NGO representatives",
                    response: "I need urgent help with [specific issue]. Can you provide immediate assistance or shelter?",
                    legalBasis: "Right to seek help and protection"
                }
            ],
            whatNotToDo: [
                {
                    action: "Delay seeking help",
                    consequence: "Situation may worsen, evidence may be lost",
                    alternative: "Call immediately, even if unsure"
                },
                {
                    action: "Go to isolated places",
                    consequence: "Increased danger, no witnesses",
                    alternative: "Go to public, well-lit areas"
                }
            ],
            helplines: [
                {
                    name: "Women's Helpline",
                    number: "181",
                    available: "24/7",
                    purpose: "Emergency assistance for women in distress"
                },
                {
                    name: "Police Complaint Helpline",
                    number: "1091",
                    available: "24/7",
                    purpose: "File complaints against police misconduct"
                },
                {
                    name: "Child Helpline",
                    number: "1098",
                    available: "24/7",
                    purpose: "Child protection and emergency assistance"
                },
                {
                    name: "National Emergency",
                    number: "112",
                    available: "24/7",
                    purpose: "General emergency services"
                }
            ],
            legalReferences: [
                {
                    law: "Protection of Women from Domestic Violence Act",
                    section: "Section 9",
                    description: "Right to residence and protection"
                },
                {
                    law: "Juvenile Justice Act",
                    section: "Section 32",
                    description: "Child protection measures"
                }
            ],
            evidenceCollection: {
                whatToDocument: [
                    "Time of emergency calls",
                    "Names of officers/NGO workers spoken to",
                    "Case numbers assigned",
                    "Injuries sustained",
                    "Property damage"
                ],
                howToDocument: [
                    "Screenshot call logs",
                    "Save text messages",
                    "Take timestamped photos",
                    "Record conversations if legal"
                ],
                preservationTips: [
                    "Email evidence to yourself",
                    "Upload to secure cloud storage",
                    "Keep physical copies of documents"
                ]
            },
            followUpActions: [
                {
                    action: "Follow up with helpline agencies",
                    timeline: "Every 24 hours",
                    responsible: "You"
                },
                {
                    action: "File formal complaint if needed",
                    timeline: "Within 72 hours",
                    responsible: "You or lawyer"
                }
            ],
            difficulty: "beginner",
            estimatedTime: "15-30 minutes",
            tags: ["emergency", "helpline", "NGO", "immediate", "rescue"]
        });

        await policeHarassmentModule.save();
        await emergencyActionModule.save();

        console.log("Legal defense modules seeded successfully");
        console.log("Created modules:");
        console.log(`1. ${policeHarassmentModule.title} (Police Harassment)`);
        console.log(`2. ${emergencyActionModule.title} (Emergency Action)`);

    } catch (error) {
        console.error("Error seeding legal defense data:", error.message);
    }
};

// Run the seeder
seedLegalDefenseData().then(() => {
    console.log("Seeding completed");
    process.exit(0);
}).catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
});
