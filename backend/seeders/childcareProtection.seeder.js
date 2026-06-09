import mongoose from 'mongoose';
import ChildcareProtection from '../models/childcareProtection.model.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const childcareProtectionData = [
  {
    title: "Right to Education Act Implementation",
    category: "school-enrollment",
    description: "Comprehensive guide to implementing Right to Education Act for children",
    scenario: "A child is being denied admission to a government school despite meeting eligibility criteria",
    actionableSteps: [
      {
        stepNumber: 1,
        title: "Verify Eligibility",
        description: "Check if the child meets age criteria (6-14 years) and residence requirements",
        urgency: "immediate",
        timeEstimate: "1-2 days",
        documents: ["Birth certificate", "Residence proof", "Income certificate"],
        authorities: ["School Principal", "Education Department"]
      },
      {
        stepNumber: 2,
        title: "Submit Application",
        description: "File formal application with required documents to the school",
        urgency: "urgent",
        timeEstimate: "1 day",
        documents: ["Application form", "Supporting documents"],
        authorities: ["School Admission Committee"]
      },
      {
        stepNumber: 3,
        title: "File Complaint if Denied",
        description: "If admission is denied, file complaint with District Education Officer",
        urgency: "urgent",
        timeEstimate: "3-5 days",
        documents: ["Rejection letter", "Application copy", "Supporting documents"],
        authorities: ["District Education Officer", "State Education Department"]
      }
    ],
    schoolEnrollment: {
      rightToEducation: {
        act: "Right of Children to Free and Compulsory Education Act, 2009",
        provisions: ["Free education for children aged 6-14", "25% reservation in private schools", "No admission tests", "No capitation fees"],
        ageGroup: "6-14 years",
        freeEducation: "Government schools and 25% seats in private schools"
      },
      reservationSystem: {
        percentage: "25%",
        categories: ["EWS", "SC", "ST", "OBC"],
        applicationProcess: ["Submit income certificate", "Apply through school", "Verification by authorities"],
        requiredDocuments: ["Income certificate", "Caste certificate", "Birth certificate", "Address proof"]
      },
      admissionRights: ["Right to admission without discrimination", "Right to free education", "Right to transportation"],
      denialGrounds: ["Only valid ground: Lack of seats after fulfilling 25% quota"],
      complaintProcess: [
        {
          authority: "School Management Committee",
          process: "Submit written complaint to SMC",
          timeline: "7 days",
          appealProcess: "Appeal to District Education Officer"
        }
      ]
    },
    resources: {
      documents: [
        {
          name: "RTE Act Guidelines",
          purpose: "Official guidelines for RTE implementation",
          howToObtain: "Download from Education Department website"
        }
      ],
      helplines: [
        {
          name: "Education Helpline",
          number: "1075",
          available: "24/7",
          purpose: "Report education-related grievances"
        }
      ],
      organizations: [
        {
          name: "National Commission for Protection of Child Rights",
          type: "Government Body",
          services: ["Legal assistance", "Policy advocacy", "Complaint redressal"],
          contact: "011-23700738",
          location: "New Delhi"
        }
      ]
    },
    difficulty: "beginner",
    estimatedTime: "30 minutes",
    tags: ["education", "rights", "admission", "government"]
  },
  {
    title: "Child Labor Prevention and Reporting",
    category: "exploitation-prevention",
    description: "Guide to identify, report, and prevent child labor",
    scenario: "You suspect a child is being forced to work in hazardous conditions",
    actionableSteps: [
      {
        stepNumber: 1,
        title: "Document Evidence",
        description: "Gather photographic or video evidence safely without endangering yourself",
        urgency: "normal",
        timeEstimate: "1-2 days",
        documents: ["Photographs", "Videos", "Witness statements"],
        authorities: ["Local Police", "Child Labor Department"]
      },
      {
        stepNumber: 2,
        title: "Report to Authorities",
        description: "File complaint with local police and child labor department",
        urgency: "immediate",
        timeEstimate: "Same day",
        documents: ["Complaint form", "Evidence collected"],
        authorities: ["Police Station", "Child Labor Department"]
      },
      {
        stepNumber: 3,
        title: "Follow Up",
        description: "Track the complaint status and ensure action is taken",
        urgency: "urgent",
        timeEstimate: "1-2 weeks",
        documents: ["Complaint reference number", "Follow-up letters"],
        authorities: ["Child Welfare Committee", "NGO partners"]
      }
    ],
    exploitationPrevention: {
      identification: [
        {
          sign: "Working during school hours",
          description: "Child seen working when they should be in school",
          warningSigns: ["Absent from school regularly", "Appears tired", "Shows signs of physical stress"]
        },
        {
          sign: "Hazardous working conditions",
          description: "Child working in dangerous environments",
          warningSigns: ["Chemical exposure", "Heavy lifting", "Operating machinery"]
        }
      ],
      reporting: [
        {
          channel: "Police Helpline",
          anonymous: false,
          contact: "100",
          process: "Call 100 and provide details of child labor situation"
        },
        {
          channel: "Child Labor Helpline",
          anonymous: true,
          contact: "1098",
          process: "Report anonymously through Childline"
        }
      ],
      rescue: [
        {
          organization: "Child Welfare Committee",
          helpline: "1098",
          process: "Immediate rescue operation",
          immediateActions: ["Remove child from work", "Provide medical care", "Counseling"]
        }
      ],
      rehabilitation: [
        {
          service: "Education Support",
          provider: "Government Schools",
          process: "Enrollment in bridge schools",
          duration: "6-12 months"
        }
      ],
      legalAction: [
        {
          action: "File FIR against employer",
          process: "Submit complaint to police with evidence",
          timeline: "Immediate",
          requiredEvidence: ["Photographs", "Witness statements", "Work records"]
        }
      ]
    },
    resources: {
      documents: [
        {
          name: "Child Labor Act",
          purpose: "Legal provisions against child labor",
          howToObtain: "Labor Department website"
        }
      ],
      helplines: [
        {
          name: "Childline",
          number: "1098",
          available: "24/7",
          purpose: "Report child abuse and labor"
        }
      ],
      organizations: [
        {
          name: "Bachpan Bachao Andolan",
          type: "NGO",
          services: ["Child rescue", "Legal aid", "Rehabilitation"],
          contact: "011-26234847",
          location: "New Delhi"
        }
      ]
    },
    difficulty: "intermediate",
    estimatedTime: "45 minutes",
    tags: ["child-labor", "exploitation", "reporting", "rescue"]
  },
  {
    title: "Government Scholarship Schemes",
    category: "government-schemes",
    description: "Complete guide to available government scholarships for children",
    scenario: "A bright student from economically weak background needs financial support for education",
    actionableSteps: [
      {
        stepNumber: 1,
        title: "Check Eligibility",
        description: "Verify eligibility criteria for various scholarship schemes",
        urgency: "normal",
        timeEstimate: "2-3 days",
        documents: ["Income certificate", "Academic records", "Caste certificate"],
        authorities: ["School Counselor", "Scholarship Office"]
      },
      {
        stepNumber: 2,
        title: "Prepare Documents",
        description: "Gather all required documents for scholarship application",
        urgency: "urgent",
        timeEstimate: "1 week",
        documents: ["Income certificate", "Marksheets", "Bank account details", "Passport photos"],
        authorities: ["School Principal", "Revenue Department"]
      },
      {
        stepNumber: 3,
        title: "Apply Online",
        description: "Submit scholarship applications through National Scholarship Portal",
        urgency: "urgent",
        timeEstimate: "2-3 days",
        documents: ["Digital copies of all documents", "Application forms"],
        authorities: ["National Scholarship Portal", "State Scholarship Office"]
      }
    ],
    governmentSchemes: [
      {
        name: "National Means Cum Merit Scholarship",
        type: "scholarship",
        eligibility: ["55% marks in Class 7", "Income below Rs. 1.5 lakh per annum"],
        benefits: "Rs. 12,000 per annum",
        applicationProcess: [
          {
            step: "Apply through National Scholarship Portal",
            documents: ["Income certificate", "Marksheet", "Bank details"],
            timeline: "June-August"
          }
        ],
        contactInfo: {
          website: "scholarships.gov.in",
          helpline: "0120-6619540",
          office: "Directorate of School Education"
        },
        amount: "Rs. 12,000 per annum",
        deadline: "August 31"
      },
      {
        name: "Pre-Matric Scholarship for Minorities",
        type: "scholarship",
        eligibility: ["Minority community", "Income below Rs. 1 lakh"],
        benefits: "Admission and tuition fees, maintenance allowance",
        applicationProcess: [
          {
            step: "Apply through National Scholarship Portal",
            documents: ["Community certificate", "Income certificate", "School certificate"],
            timeline: "August-October"
          }
        ],
        contactInfo: {
          website: "scholarships.gov.in",
          helpline: "0120-6619540",
          office: "Minority Welfare Department"
        },
        amount: "Varies by class",
        deadline: "October 15"
      }
    ],
    resources: {
      documents: [
        {
          name: "Scholarship Guidelines",
          purpose: "Detailed information about all scholarships",
          howToObtain: "National Scholarship Portal"
        }
      ],
      helplines: [
        {
          name: "Scholarship Helpline",
          number: "0120-6619540",
          available: "10 AM - 5 PM",
          purpose: "Scholarship-related queries"
        }
      ],
      organizations: [
        {
          name: "Ministry of Education",
          type: "Government",
          services: ["Scholarship disbursement", "Policy implementation"],
          contact: "011-26172479",
          location: "New Delhi"
        }
      ]
    },
    difficulty: "beginner",
    estimatedTime: "25 minutes",
    tags: ["scholarship", "education", "financial-aid", "government"]
  },
  {
    title: "Child Rights Legal Framework",
    category: "child-rights",
    description: "Understanding constitutional and legal rights of children in India",
    scenario: "A child's fundamental rights are being violated and legal action is needed",
    actionableSteps: [
      {
        stepNumber: 1,
        title: "Identify Violated Rights",
        description: "Determine which specific rights are being violated",
        urgency: "immediate",
        timeEstimate: "1-2 days",
        documents: ["Incident report", "Evidence of violation", "Witness statements"],
        authorities: ["Legal aid cell", "Child rights commission"]
      },
      {
        stepNumber: 2,
        title: "File Legal Complaint",
        description: "Submit formal complaint with appropriate legal authorities",
        urgency: "urgent",
        timeEstimate: "3-5 days",
        documents: ["Competition form", "Evidence", "Legal documents"],
        authorities: ["Child Welfare Committee", "Police", "Court"]
      },
      {
        stepNumber: 3,
        title: "Seek Legal Representation",
        description: "Engage lawyer or legal aid organization for child's case",
        urgency: "urgent",
        timeEstimate: "1 week",
        documents: ["Power of attorney", "Case documents", "Evidence"],
        authorities: ["Legal Services Authority", "Child rights NGOs"]
      }
    ],
    legalFramework: {
      constitutionalRights: [
        {
          article: "Article 21-A",
          title: "Right to Education",
          description: "Free and compulsory education for children aged 6-14 years",
          implications: "State must provide free education to all children"
        },
        {
          article: "Article 24",
          title: "Prohibition of Child Labor",
          description: "Prohibits employment of children below 14 years in hazardous industries",
          implications: "Employers can be punished for violating child labor laws"
        }
      ],
      acts: [
        {
          name: "Protection of Children from Sexual Offenses (POCSO) Act",
          year: 2012,
          keyProvisions: ["Child-friendly judicial process", "Special courts", "Strict punishment"],
          penalties: ["Minimum 7 years imprisonment", "Life imprisonment for aggravated offenses"],
          implementation: "Special courts and child-friendly procedures"
        },
        {
          name: "Juvenile Justice (Care and Protection of Children) Act",
          year: 2015,
          keyProvisions: ["Rehabilitation of juveniles", "Child-friendly legal process", "Protection measures"],
          penalties: ["Varies by offense", "Focus on rehabilitation"],
          implementation: "Juvenile Justice Boards and Child Welfare Committees"
        }
      ],
      childProtectionLaws: [
        {
          law: "Child Labor (Prohibition and Regulation) Act",
          ageLimit: "Below 14 years for hazardous work, 14-18 for non-hazardous",
          restrictions: ["No work in hazardous industries", "Limited working hours for non-hazardous"],
          penalties: ["Imprisonment up to 2 years", "Fine up to Rs. 50,000"]
        }
      ]
    },
    resources: {
      documents: [
        {
          name: "Constitution of India",
          purpose: "Fundamental rights and duties",
          howToObtain: "Government publications"
        }
      ],
      helplines: [
        {
          name: "National Commission for Protection of Child Rights",
          number: "011-23700738",
          available: "9 AM - 6 PM",
          purpose: "Child rights violations"
        }
      ],
      organizations: [
        {
          name: "Supreme Court of India",
          type: "Judicial",
          services: ["Legal remedies", "Public Interest Litigation"],
          contact: "011-23386231",
          location: "New Delhi"
        }
      ]
    },
    difficulty: "advanced",
    estimatedTime: "60 minutes",
    tags: ["legal", "rights", "constitution", "child-protection"]
  }
];

const seedChildcareProtection = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Connected to MongoDB');

    // Clear existing childcare protection data
    await ChildcareProtection.deleteMany({});
    console.log('Cleared existing childcare protection data');

    // Insert sample data
    await ChildcareProtection.insertMany(childcareProtectionData);
    console.log(`Inserted ${childcareProtectionData.length} childcare protection modules`);

    console.log('Childcare protection data seeded successfully!');
  } catch (error) {
    console.error('Error seeding childcare protection data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeder
seedChildcareProtection();
