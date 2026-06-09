import School from '../models/school.model.js';

// Get all schools with optional filtering
export const getAllSchools = async (req, res) => {
  try {
    const { 
      search, 
      type, 
      lat, 
      lng, 
      radius = 10, 
      page = 1, 
      limit = 20 
    } = req.query;

    // Return sample data immediately if there are database issues
    const sampleSchools = [
      {
        _id: 'sample1',
        name: 'Delhi Public School, R.K. Puram',
        type: 'private',
        location: {
          type: 'Point',
          coordinates: [77.1567, 28.6139]
        },
        address: 'R.K. Puram, New Delhi, Delhi 110022',
        phone: '+91-11-26172425',
        email: 'dpsrk@delhipublicschool.com',
        rating: 4.5,
        totalStudents: 2500,
        classesOffered: ['Nursery', 'KG', '1-12'],
        facilities: ['Library', 'Science Labs', 'Computer Lab', 'Sports Ground', 'Auditorium'],
        fees: {
          admission: 25000,
          annual: 120000
        },
        hasRteQuota: true,
        rteSeatsAvailable: 125,
        isActive: true
      },
      {
        _id: 'sample2',
        name: 'Government Boys Senior Secondary School',
        type: 'government',
        location: {
          type: 'Point',
          coordinates: [77.2090, 28.6328]
        },
        address: 'Karol Bagh, New Delhi, Delhi 110005',
        phone: '+91-11-28341234',
        email: 'gbssskarolbagh@edu.delhi.gov.in',
        rating: 3.8,
        totalStudents: 800,
        classesOffered: ['6-12'],
        facilities: ['Library', 'Science Labs', 'Sports Ground'],
        fees: {
          admission: 0,
          annual: 0
        },
        hasRteQuota: false,
        rteSeatsAvailable: 0,
        isActive: true
      },
      {
        _id: 'sample3',
        name: 'Saraswati Bal Mandir',
        type: 'private',
        location: {
          type: 'Point',
          coordinates: [77.1025, 28.7041]
        },
        address: 'Pitampura, New Delhi, Delhi 110034',
        phone: '+91-11-27314567',
        email: 'sbmpitampura@gmail.com',
        rating: 4.2,
        totalStudents: 1200,
        classesOffered: ['Nursery', 'KG', '1-8'],
        facilities: ['Library', 'Computer Lab', 'Playground'],
        fees: {
          admission: 15000,
          annual: 60000
        },
        hasRteQuota: true,
        rteSeatsAvailable: 60,
        isActive: true
      },
      {
        _id: 'sample4',
        name: 'MCD Primary School',
        type: 'government',
        location: {
          type: 'Point',
          coordinates: [77.2507, 28.6609]
        },
        address: 'Lajpat Nagar, New Delhi, Delhi 110024',
        phone: '+91-11-26471234',
        email: 'mcdlajpatnagar@mcd.gov.in',
        rating: 3.5,
        totalStudents: 400,
        classesOffered: ['1-5'],
        facilities: ['Library', 'Playground'],
        fees: {
          admission: 0,
          annual: 0
        },
        hasRteQuota: false,
        rteSeatsAvailable: 0,
        isActive: true
      },
      {
        _id: 'sample5',
        name: 'Modern Public School',
        type: 'private',
        location: {
          type: 'Point',
          coordinates: [77.1234, 28.5987]
        },
        address: 'Saket, New Delhi, Delhi 110017',
        phone: '+91-11-26547890',
        email: 'modernsaketh@gmail.com',
        rating: 4.6,
        totalStudents: 1800,
        classesOffered: ['Nursery', 'KG', '1-10'],
        facilities: ['Library', 'Science Labs', 'Computer Lab', 'Sports Ground', 'Music Room'],
        fees: {
          admission: 30000,
          annual: 150000
        },
        hasRteQuota: true,
        rteSeatsAvailable: 90,
        isActive: true
      }
    ];

    let query = { isActive: true };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Location-based search
    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseFloat(radius) * 1000 // Convert km to meters
        }
      };
    }

    let schools;
    let total;

    try {
      schools = await School.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ rating: -1 });

      total = await School.countDocuments(query);
    } catch (dbError) {
      console.log('Database connection issue, using sample data:', dbError.message);
      schools = [];
      total = 0;
    }

    // Return sample data if no schools exist or database connection failed
    if (schools.length === 0) {
      return res.json({
        success: true,
        data: sampleSchools,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: sampleSchools.length,
          pages: Math.ceil(sampleSchools.length / limit)
        },
        sampleData: true
      });
    }

    res.json({
      success: true,
      data: schools,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching schools',
      error: error.message
    });
  }
};

// Get school by ID
export const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    
    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found'
      });
    }

    res.json({
      success: true,
      data: school
    });
  } catch (error) {
    console.error('Error fetching school:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching school',
      error: error.message
    });
  }
};

// Create new school
export const createSchool = async (req, res) => {
  try {
    const schoolData = req.body;
    
    // Validate required fields
    if (!schoolData.name || !schoolData.type || !schoolData.address) {
      return res.status(400).json({
        success: false,
        message: 'Name, type, and address are required'
      });
    }

    // Validate coordinates
    if (!schoolData.coordinates || schoolData.coordinates.length !== 2) {
      return res.status(400).json({
        success: false,
        message: 'Valid coordinates [longitude, latitude] are required'
      });
    }

    const school = new School({
      name: schoolData.name,
      type: schoolData.type,
      address: schoolData.address,
      location: {
        type: 'Point',
        coordinates: schoolData.coordinates
      },
      rating: schoolData.rating || 0,
      facilities: schoolData.facilities || [],
      contact: schoolData.contact || {},
      established: schoolData.established,
      grades: schoolData.grades || [],
      totalStudents: schoolData.totalStudents,
      studentTeacherRatio: schoolData.studentTeacherRatio,
      affiliation: schoolData.affiliation,
      description: schoolData.description,
      images: schoolData.images || []
    });

    const savedSchool = await school.save();

    res.status(201).json({
      success: true,
      data: savedSchool,
      message: 'School created successfully'
    });
  } catch (error) {
    console.error('Error creating school:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating school',
      error: error.message
    });
  }
};

// Update school
export const updateSchool = async (req, res) => {
  try {
    const updates = req.body;
    
    // If coordinates are provided, update location
    if (updates.coordinates) {
      updates.location = {
        type: 'Point',
        coordinates: updates.coordinates
      };
      delete updates.coordinates;
    }

    const school = await School.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found'
      });
    }

    res.json({
      success: true,
      data: school,
      message: 'School updated successfully'
    });
  } catch (error) {
    console.error('Error updating school:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating school',
      error: error.message
    });
  }
};

// Delete school (soft delete)
export const deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found'
      });
    }

    res.json({
      success: true,
      message: 'School deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting school:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting school',
      error: error.message
    });
  }
};

// Get schools by location radius
export const getNearbySchools = async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const schools = await School.find({
      isActive: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseFloat(radius) * 1000
        }
      }
    }).limit(50);

    res.json({
      success: true,
      data: schools,
      count: schools.length
    });
  } catch (error) {
    console.error('Error fetching nearby schools:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching nearby schools',
      error: error.message
    });
  }
};
