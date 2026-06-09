import mongoose from 'mongoose';
import School from '../models/school.model.js';
import dotenv from 'dotenv';
dotenv.config();

const sampleSchools = [
  {
    name: "Delhi Public School, R.K. Puram",
    type: "Private",
    address: "Sector 12, R.K. Puram, New Delhi, Delhi 110022",
    coordinates: [77.2001, 28.5355],
    rating: 4.5,
    facilities: ["Computer Lab", "Science Lab", "Library", "Sports Ground", "Swimming Pool", "Auditorium"],
    contact: {
      phone: "+91-11-26172469",
      email: "info@dpsrkp.net",
      website: "https://www.dpsrkp.net"
    },
    established: 1972,
    grades: ["6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    totalStudents: 3500,
    studentTeacherRatio: 25,
    affiliation: "CBSE",
    description: "One of the most prestigious schools in Delhi with excellent academic and sports facilities.",
    verified: true
  },
  {
    name: "Government Boys Senior Secondary School, Karol Bagh",
    type: "Government",
    address: "Karol Bagh, New Delhi, Delhi 110005",
    coordinates: [77.1903, 28.6517],
    rating: 3.8,
    facilities: ["Library", "Sports Ground", "Computer Lab", "Science Lab"],
    contact: {
      phone: "+91-11-28361542",
      email: "gsss.karolbagh@delhi.gov.in"
    },
    established: 1965,
    grades: ["6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    totalStudents: 1200,
    studentTeacherRatio: 30,
    affiliation: "CBSE",
    description: "A government school providing quality education to students from economically weaker sections.",
    verified: true
  },
  {
    name: "Springdales School, Pusa Road",
    type: "Private",
    address: "Pusa Road, New Delhi, Delhi 110005",
    coordinates: [77.1802, 28.6439],
    rating: 4.7,
    facilities: ["Computer Lab", "Science Lab", "Library", "Swimming Pool", "Sports Ground", "Music Room", "Art Studio"],
    contact: {
      phone: "+91-11-25841623",
      email: "springdales.pusa@gmail.com",
      website: "https://www.springdales.com"
    },
    established: 1955,
    grades: ["Nursery", "KG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    totalStudents: 2800,
    studentTeacherRatio: 20,
    affiliation: "CBSE",
    description: "A progressive school focusing on holistic development and experiential learning.",
    verified: true
  },
  {
    name: "Sarvodaya Kanya Vidyalaya, Kashmere Gate",
    type: "Government",
    address: "Kashmere Gate, New Delhi, Delhi 110006",
    coordinates: [77.2300, 28.6692],
    rating: 3.9,
    facilities: ["Library", "Computer Lab", "Science Lab", "Sports Ground"],
    contact: {
      phone: "+91-11-23963341",
      email: "skv.kashmeregate@delhi.gov.in"
    },
    established: 1980,
    grades: ["6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    totalStudents: 800,
    studentTeacherRatio: 28,
    affiliation: "CBSE",
    description: "A girls' government school dedicated to empowering young women through education.",
    verified: true
  },
  {
    name: "Modern School, Barakhamba Road",
    type: "Private",
    address: "Barakhamba Road, New Delhi, Delhi 110001",
    coordinates: [77.2220, 28.6315],
    rating: 4.6,
    facilities: ["Computer Lab", "Science Lab", "Library", "Sports Ground", "Auditorium", "Swimming Pool", "Tennis Courts"],
    contact: {
      phone: "+91-11-23311618",
      email: "info@modernschool.net",
      website: "https://www.modernschool.net"
    },
    established: 1920,
    grades: ["6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    totalStudents: 3200,
    studentTeacherRatio: 22,
    affiliation: "CBSE",
    description: "One of Delhi's oldest and most prestigious schools with a rich heritage of academic excellence.",
    verified: true
  },
  {
    name: "Mount Carmel School, Anand Niketan",
    type: "Private",
    address: "Anand Niketan, New Delhi, Delhi 110021",
    coordinates: [77.1678, 28.5852],
    rating: 4.4,
    facilities: ["Computer Lab", "Science Lab", "Library", "Sports Ground", "Music Room", "Art Studio"],
    contact: {
      phone: "+91-11-24671124",
      email: "info@mcsdelhi.com",
      website: "https://www.mcsdelhi.com"
    },
    established: 1972,
    grades: ["Nursery", "KG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    totalStudents: 2500,
    studentTeacherRatio: 24,
    affiliation: "CBSE",
    description: "A co-educational institution focusing on academic excellence and character development.",
    verified: true
  },
  {
    name: "Government Co-ed Senior Secondary School, Janakpuri",
    type: "Government",
    address: "Janakpuri, New Delhi, Delhi 110058",
    coordinates: [77.0833, 28.6219],
    rating: 3.7,
    facilities: ["Library", "Computer Lab", "Sports Ground", "Science Lab"],
    contact: {
      phone: "+91-11-25552345",
      email: "gcss.janakpuri@delhi.gov.in"
    },
    established: 1975,
    grades: ["6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    totalStudents: 1500,
    studentTeacherRatio: 32,
    affiliation: "CBSE",
    description: "A government school providing affordable education with focus on academic fundamentals.",
    verified: true
  },
  {
    name: "The Shri Ram School, Vasant Vihar",
    type: "Private",
    address: "Vasant Vihar, New Delhi, Delhi 110057",
    coordinates: [77.1583, 28.5634],
    rating: 4.8,
    facilities: ["Computer Lab", "Science Lab", "Library", "Sports Ground", "Swimming Pool", "Auditorium", "Art Studio", "Music Room"],
    contact: {
      phone: "+91-11-26149572",
      email: "info.tsrs@tsrs.org",
      website: "https://www.tsrs.org"
    },
    established: 1988,
    grades: ["Nursery", "KG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    totalStudents: 2000,
    studentTeacherRatio: 18,
    affiliation: "IB, IGCSE",
    description: "An international school offering world-class education with focus on inquiry-based learning.",
    verified: true
  }
];

const seedSchools = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing schools
    await School.deleteMany({});
    console.log('Cleared existing schools');

    // Insert sample schools
    const schools = sampleSchools.map(school => ({
      name: school.name,
      type: school.type,
      address: school.address,
      location: {
        type: 'Point',
        coordinates: school.coordinates
      },
      rating: school.rating,
      facilities: school.facilities,
      contact: school.contact,
      established: school.established,
      grades: school.grades,
      totalStudents: school.totalStudents,
      studentTeacherRatio: school.studentTeacherRatio,
      affiliation: school.affiliation,
      description: school.description,
      verified: school.verified
    }));

    await School.insertMany(schools);
    console.log(`Inserted ${schools.length} schools`);

    console.log('Schools seeded successfully!');
  } catch (error) {
    console.error('Error seeding schools:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeder
seedSchools();
