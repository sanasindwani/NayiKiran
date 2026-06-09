import mongoose from "mongoose";

const childcareProtectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['school-enrollment', 'government-schemes', 'child-rights', 'exploitation-prevention']
    },
    description: {
        type: String,
        required: true
    },
    scenario: {
        type: String,
        required: true
    },
    actionableSteps: [{
        stepNumber: Number,
        title: String,
        description: String,
        urgency: {
            type: String,
            enum: ['immediate', 'urgent', 'normal'],
            default: 'normal'
        },
        timeEstimate: String,
        documents: [String],
        authorities: [String]
    }],
    legalFramework: {
        constitutionalRights: [{
            article: String,
            title: String,
            description: String,
            implications: String
        }],
        acts: [{
            name: String,
            year: Number,
            keyProvisions: [String],
            penalties: [String],
            implementation: String
        }],
        childProtectionLaws: [{
            law: String,
            ageLimit: String,
            restrictions: [String],
            penalties: [String]
        }]
    },
    governmentSchemes: [{
        name: String,
        type: {
            type: String,
            enum: ['scholarship', 'hostel', 'education', 'healthcare', 'financial']
        },
        eligibility: [String],
        benefits: String,
        applicationProcess: [{
            step: String,
            documents: [String],
            timeline: String
        }],
        contactInfo: {
            website: String,
            helpline: String,
            office: String
        },
        amount: String,
        deadline: String
    }],
    schoolEnrollment: {
        rightToEducation: {
            act: String,
            provisions: [String],
            ageGroup: String,
            freeEducation: String
        },
        reservationSystem: {
            percentage: String,
            categories: [String],
            applicationProcess: [String],
            requiredDocuments: [String]
        },
        admissionRights: [String],
        denialGrounds: [String],
        complaintProcess: [{
            authority: String,
            process: String,
            timeline: String,
            appealProcess: String
        }]
    },
    exploitationPrevention: {
        identification: [{
            sign: String,
            description: String,
            warningSigns: [String]
        }],
        reporting: [{
            channel: String,
            anonymous: Boolean,
            contact: String,
            process: String
        }],
        rescue: [{
            organization: String,
            helpline: String,
            process: String,
            immediateActions: [String]
        }],
        rehabilitation: [{
            service: String,
            provider: String,
            process: String,
            duration: String
        }],
        legalAction: [{
            action: String,
            process: String,
            timeline: String,
            requiredEvidence: [String]
        }]
    },
    resources: {
        documents: [{
            name: String,
            purpose: String,
            howToObtain: String
        }],
        helplines: [{
            name: String,
            number: String,
            available: String,
            purpose: String
        }],
        organizations: [{
            name: String,
            type: String,
            services: [String],
            contact: String,
            location: String
        }]
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    estimatedTime: String,
    tags: [String]
}, { timestamps: true });

const ChildcareProtection = mongoose.model("ChildcareProtection", childcareProtectionSchema);
export default ChildcareProtection;
