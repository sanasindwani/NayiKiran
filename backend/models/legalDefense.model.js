import mongoose from "mongoose";

const legalDefenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['police-harassment', 'emergency-action', 'legal-rights', 'court-procedures']
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
        timeEstimate: String
    }],
    whatToSay: [{
        situation: String,
        response: String,
        legalBasis: String
    }],
    whatNotToDo: [{
        action: String,
        consequence: String,
        alternative: String
    }],
    helplines: [{
        name: String,
        number: String,
        available: String,
        purpose: String
    }],
    legalReferences: [{
        law: String,
        section: String,
        description: String
    }],
    evidenceCollection: {
        whatToDocument: [String],
        howToDocument: [String],
        preservationTips: [String]
    },
    followUpActions: [{
        action: String,
        timeline: String,
        responsible: String
    }],
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    estimatedTime: String,
    tags: [String]
}, { timestamps: true });

const LegalDefense = mongoose.model("LegalDefense", legalDefenseSchema);
export default LegalDefense;
