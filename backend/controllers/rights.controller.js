// import Right from "../models/rights.model.js";

// const rightsController = async (req, res) => {
//     try {
//         let rights = await Right.find();

//         if (rights.length === 0) {
//             rights = await Right.insertMany([
//                 { title: "Right to Dignity and Equality", description: "Sex workers are entitled to dignity and equality under Articles 14 and 21 of the Constitution." },
//                 { title: "Right Against Exploitation", description: "Under Article 23, forced prostitution and trafficking are illegal." },
//                 { title: "Protection Under Immoral Traffic (Prevention) Act, 1956", description: "Sex work in private is legal, but brothels, pimping, and public solicitation are prohibited." },
//                 { title: "Right to Healthcare", description: "Under the HIV/AIDS Act, 2017, sex workers must receive medical care without discrimination." },
//                 { title: "Right to Legal Protection", description: "They can file complaints under IPC Sections 354 (outraging modesty), 370 (trafficking), and 375 (rape)." },
//                 { title: "Right to Work and Livelihood", description: "Voluntary sex work is not a criminal offense, and they can take up other jobs without discrimination." },
//                 { title: "Supreme Court Protection", description: "The SC in Budhadev Karmaskar v. State of WB ruled that sex workers should not be harassed and should be rehabilitated voluntarily." },
//                 { title: "Right to Custody of Children", description: "Sex workers can raise their children unless proven unfit in court." },
//                 { title: "Right to Rehabilitation", description: "ITPA Section 19 allows sex workers to seek rehabilitation and exit sex work if they choose." },
//                 { title: "Right Against Police Harassment", description: "Police cannot arbitrarily arrest sex workers engaged in voluntary work." }
//             ]);
//         }

//         res.status(200).json(rights);
//     } catch (error) {
//         console.error("Error fetching rights:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// export default rightsController;

import axios from "axios";
import dotenv from "dotenv";
import Right from "../models/rights.model.js";
// Fetch rights
export const rightsController = async (req, res) => {
    try {
        let rights = await Right.find();
        if (rights.length === 0) {
            rights = await Right.insertMany([
                {
                    title: "Right to Equality (Article 14)",
                    description: "Every Indian woman has the right to equality before the law and equal protection under it.",
                    title_hindi: "समानता का अधिकार (अनुच्छेद 14)",
                    description_hindi: "हर भारतीय महिला को कानून के समक्ष समानता और उसके तहत समान संरक्षण का अधिकार है।"
                },
                {
                    title: "Right Against Discrimination (Article 15)",
                    description: "Women cannot be discriminated against on grounds of religion, race, caste, sex, or place of birth.",
                    title_hindi: "भेदभाव के खिलाफ अधिकार (अनुच्छेद 15)",
                    description_hindi: "महिलाओं के साथ धर्म, जाति, लिंग या जन्मस्थान के आधार पर भेदभाव नहीं किया जा सकता।"
                },
                {
                    title: "Right to Equal Opportunities (Article 16)",
                    description: "Women have equal rights to employment and opportunity in public offices.",
                    title_hindi: "समान अवसर का अधिकार (अनुच्छेद 16)",
                    description_hindi: "महिलाओं को सरकारी सेवाओं में समान रोजगार और अवसरों का अधिकार है।"
                },
                {
                    title: "Right to Freedom (Article 19)",
                    description: "Women have the right to free speech, expression, and movement within India.",
                    title_hindi: "स्वतंत्रता का अधिकार (अनुच्छेद 19)",
                    description_hindi: "महिलाओं को स्वतंत्र रूप से बोलने, अभिव्यक्ति और भारत में कहीं भी जाने का अधिकार है।"
                },
                {
                    title: "Right to Life and Personal Liberty (Article 21)",
                    description: "Women have the right to live with dignity and personal freedom.",
                    title_hindi: "जीवन और व्यक्तिगत स्वतंत्रता का अधिकार (अनुच्छेद 21)",
                    description_hindi: "महिलाओं को गरिमा और व्यक्तिगत स्वतंत्रता के साथ जीने का अधिकार है।"
                },
                {
                    title: "Right Against Human Trafficking (Article 23)",
                    description: "Human trafficking and forced labor are illegal in India.",
                    title_hindi: "मानव तस्करी के खिलाफ अधिकार (अनुच्छेद 23)",
                    description_hindi: "भारत में मानव तस्करी और जबरन श्रम अवैध हैं।"
                },
                {
                    title: "Right Against Domestic Violence (Domestic Violence Act, 2005)",
                    description: "Women are protected against physical, mental, emotional, and economic abuse.",
                    title_hindi: "घरेलू हिंसा के खिलाफ अधिकार (घरेलू हिंसा अधिनियम, 2005)",
                    description_hindi: "महिलाओं को शारीरिक, मानसिक, भावनात्मक और आर्थिक शोषण से बचाया जाता है।"
                },
                {
                    title: "Right Against Dowry (Dowry Prohibition Act, 1961)",
                    description: "Giving or taking dowry is a punishable offense.",
                    title_hindi: "दहेज के खिलाफ अधिकार (दहेज निषेध अधिनियम, 1961)",
                    description_hindi: "दहेज लेना या देना एक दंडनीय अपराध है।"
                },
                {
                    title: "Right to Protection from Sexual Harassment (POSH Act, 2013)",
                    description: "Women have the right to a safe workplace, free from sexual harassment.",
                    title_hindi: "यौन उत्पीड़न से सुरक्षा का अधिकार (POSH अधिनियम, 2013)",
                    description_hindi: "महिलाओं को कार्यस्थल पर सुरक्षित माहौल और यौन उत्पीड़न से सुरक्षा का अधिकार है।"
                },
                {
                    title: "Right to Maternity Benefits (Maternity Benefit Act, 1961)",
                    description: "Working women have the right to paid maternity leave and benefits.",
                    title_hindi: "मातृत्व लाभ का अधिकार (मातृत्व लाभ अधिनियम, 1961)",
                    description_hindi: "कामकाजी महिलाओं को भुगतान किए गए मातृत्व अवकाश और लाभों का अधिकार है।"
                },
                {
                    title: "Right to Inheritance (Hindu Succession Act, 1956)",
                    description: "Daughters have equal rights in ancestral property as sons.",
                    title_hindi: "विरासत का अधिकार (हिंदू उत्तराधिकार अधिनियम, 1956)",
                    description_hindi: "बेटियों को पैतृक संपत्ति में बेटों के समान अधिकार प्राप्त हैं।"
                },
                {
                    title: "Right to Abortion (Medical Termination of Pregnancy Act, 1971)",
                    description: "Women have the legal right to abortion under certain conditions.",
                    title_hindi: "गर्भपात का अधिकार (गर्भावस्था समापन अधिनियम, 1971)",
                    description_hindi: "महिलाओं को कानूनी रूप से कुछ शर्तों के तहत गर्भपात कराने का अधिकार है।"
                },
                {
                    title: "Right to Education (Right to Education Act, 2009)",
                    description: "Girls have the right to free and compulsory education up to 14 years of age.",
                    title_hindi: "शिक्षा का अधिकार (शिक्षा का अधिकार अधिनियम, 2009)",
                    description_hindi: "लड़कियों को 14 वर्ष की आयु तक मुफ्त और अनिवार्य शिक्षा का अधिकार है।"
                },
                {
                    title: "Right to Register a Complaint",
                    description: "Women can file complaints against any abuse, violence, or discrimination.",
                    title_hindi: "शिकायत दर्ज कराने का अधिकार",
                    description_hindi: "महिलाएं किसी भी प्रकार के शोषण, हिंसा या भेदभाव के खिलाफ शिकायत दर्ज करा सकती हैं।"
                },
                {
                    title: "Right to Legal Aid",
                    description: "Women have the right to free legal aid and support in court cases.",
                    title_hindi: "निःशुल्क कानूनी सहायता का अधिकार",
                    description_hindi: "महिलाओं को अदालत मामलों में निःशुल्क कानूनी सहायता और समर्थन प्राप्त करने का अधिकार है।"
                }
            ]);
        }
        res.status(200).json(rights);
    } catch (error) {
        console.error("Error fetching rights:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};






dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = process.env.RIGHTS_API_KEY;



const formatResponse = (text) => {
    return text
        .replace(/\\/g, '') // Remove unnecessary backslashes
        .replace(/\*/g, '') // Remove asterisks
    
        .replace(/\n\s*/g, (match) => match.trim() ? '\n• ' : '\n'); // Add bullet points for valid points
};



const askRights = async (req, res) => {
    try {
        const { userMessage, conversationHistory = [] } = req.body;  // Get conversation history from request body
        const therapyPrompt = "Provide a concise response in 3-5 points. Use a numbered list format. " + userMessage + " Women laws for India";

        // Append the new message to the conversation history
        const newConversationHistory = [...conversationHistory, { role: "user", text: therapyPrompt }];

        // Make the API call
        const fullUrl = `${GEMINI_API_URL}?key=${API_KEY}`;
        console.log("Full API URL:", fullUrl);
        console.log("API KEY exists:", !!API_KEY);
        console.log("API KEY length:", API_KEY?.length);
        
        const response = await axios.post(
            fullUrl,
            {
                contents: newConversationHistory.map(message => ({ role: message.role === "assistant" ? "model" : message.role, parts: [{ text: message.text }] }))
            }
        );

        if (response.data.candidates && response.data.candidates.length > 0) {
            const rawText = response.data.candidates[0].content.parts[0].text;
            const formattedText = "• " + formatResponse(rawText); // Add bullet point to the first line
            
            // Add the response from Gemini to the conversation history
            newConversationHistory.push({ role: "assistant", text: formattedText });
            
            // Send the response and the updated conversation history
            res.json({ reply: formattedText, conversationHistory: newConversationHistory });
        } else {
            res.json({ reply: "No meaningful response received from Gemini.", conversationHistory: newConversationHistory });
        }
    } catch (error) {
        console.error("Error communicating with Gemini API:", error.message);
        console.error("Full error:", error);
        console.error("API KEY being used:", API_KEY ? "exists" : "missing");
        res.status(500).json({ error: "Error communicating with Gemini API", details: error.message });
    }
};

export default askRights;

