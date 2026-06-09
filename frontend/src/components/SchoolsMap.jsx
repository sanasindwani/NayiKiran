import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, Navigation, School, ChevronRight, MapPin, Phone, Star } from 'lucide-react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample school data - fallback if API fails
const sampleSchools = [
  {
    id: 1,
    name: "Delhi Public School",
    type: "Private",
    address: "Sector 12, R.K. Puram, New Delhi",
    lat: 28.5355,
    lng: 77.2001,
    rating: 4.5,
    facilities: ["Computer Lab", "Science Lab", "Library", "Sports Ground"],
    contact: "+91-11-26172469"
  },
  {
    id: 2,
    name: "Government Boys Senior Secondary School",
    type: "Government",
    address: "Karol Bagh, New Delhi",
    lat: 28.6517,
    lng: 77.1903,
    rating: 3.8,
    facilities: ["Library", "Sports Ground", "Computer Lab"],
    contact: "+91-11-28361542"
  },
  {
    id: 3,
    name: "Springdales School",
    type: "Private",
    address: "Pusa Road, New Delhi",
    lat: 28.6439,
    lng: 77.1802,
    rating: 4.7,
    facilities: ["Computer Lab", "Science Lab", "Library", "Swimming Pool", "Sports Ground"],
    contact: "+91-11-25841623"
  },
  {
    id: 4,
    name: "Sarvodaya Kanya Vidyalaya",
    type: "Government",
    address: "Kashmere Gate, New Delhi",
    lat: 28.6692,
    lng: 77.2300,
    rating: 3.9,
    facilities: ["Library", "Computer Lab", "Science Lab"],
    contact: "+91-11-23963341"
  },
  {
    id: 5,
    name: "Modern School",
    type: "Private",
    address: "Barakhamba Road, New Delhi",
    lat: 28.6315,
    lng: 77.2220,
    rating: 4.6,
    facilities: ["Computer Lab", "Science Lab", "Library", "Sports Ground", "Auditorium"],
    contact: "+91-11-23311618"
  }
];

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const SchoolsMap = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Default to Delhi
  const [mapZoom, setMapZoom] = useState(11);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [showRTEOnly, setShowRTEOnly] = useState(false);

  // Fetch schools from API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/schools');
        const schoolsData = response.data.data.map(school => ({
          id: school._id,
          name: school.name,
          type: school.type,
          address: school.address,
          lat: school.location.coordinates[1],
          lng: school.location.coordinates[0],
          rating: school.rating,
          facilities: school.facilities,
          contact: school.phone || 'N/A',
          established: school.established,
          grades: school.grades,
          totalStudents: school.totalStudents,
          studentTeacherRatio: school.studentTeacherRatio,
          affiliation: school.affiliation,
          description: school.description
        }));
        setSchools(schoolsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching schools:', err);
        setError('Failed to fetch schools data');
        // Use sample data as fallback
        setSchools(sampleSchools);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          setMapZoom(13);
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, []);

  const filteredSchools = schools.filter(school => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    // RTE filter
    const matchesRTE = !showRTEOnly || school.hasRteQuota;
    
    return matchesSearch && matchesRTE;
  });

  // Calculate distance and sort if enabled
  const schoolsWithDistance = filteredSchools.map(school => {
    let distance = null;
    if (userLocation && school.lat && school.lng) {
      const R = 6371; // Earth's radius in km
      const dLat = (school.lat - userLocation[0]) * Math.PI / 180;
      const dLon = (school.lng - userLocation[1]) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(userLocation[0] * Math.PI / 180) * Math.cos(school.lat * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      distance = R * c;
    }
    
    return {
      ...school,
      distance: distance ? distance.toFixed(2) : null,
      distanceScore: distance ? (1 / (1 + distance)) * 100 : 0, // Higher score for closer schools
      rteScore: school.hasRteQuota ? 100 : 0, // Higher score for RTE schools
      totalScore: (distance ? (1 / (1 + distance)) * 100 : 0) + (school.hasRteQuota ? 100 : 0)
    };
  });

  // Sort by distance if enabled, otherwise by score
  const sortedSchools = sortByDistance 
    ? schoolsWithDistance.sort((a, b) => (a.distance || 9999) - (b.distance || 9999))
    : schoolsWithDistance.sort((a, b) => b.totalScore - a.totalScore);

  const handleSchoolClick = (school) => {
    setSelectedSchool(school);
    setMapCenter([school.lat, school.lng]);
    setMapZoom(16);
  };

  const handleLocateMe = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      setMapZoom(14);
    }
  };

  const createCustomIcon = (type) => {
    const iconColor = type === 'Government' ? '#3B82F6' : '#10B981';
    return L.divIcon({
      html: `<div style="background-color: ${iconColor}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      </div>`,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <School className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Schools Directory</h1>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={sortByDistance}
                  onChange={(e) => setSortByDistance(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Sort by Distance</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showRTEOnly}
                  onChange={(e) => setShowRTEOnly(e.target.checked)}
                  className="rounded text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">RTE Schools Only</span>
              </label>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search schools by name, address, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Schools List */}
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {loading ? 'Loading Schools...' : `${sortedSchools.length} Schools Found`}
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            sortedSchools.map((school) => (
              <div
                key={school.id}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => handleSchoolClick(school)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {school.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      {school.address}
                    </div>
                    {school.distance && (
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Navigation className="w-4 h-4 mr-2" />
                        {school.distance} km away
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Phone className="w-4 h-4 mr-2" />
                      {school.contact}
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    school.type === 'Government' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {school.type}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <strong className="text-gray-900">Rating:</strong> 
                    <span className="flex items-center ml-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {school.rating}/5
                    </span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Students:</strong> 
                    <span className="ml-1">{school.totalStudents}</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Classes:</strong> 
                    <span className="ml-1">{school.classesOffered?.join(', ') || 'N/A'}</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">RTE Seats:</strong> 
                    <span className="ml-1">{school.rteSeatsAvailable || 'N/A'}</span>
                  </div>
                </div>
                
                {/* Facilities */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.facilities?.map((facility, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Contact School
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolsMap;
