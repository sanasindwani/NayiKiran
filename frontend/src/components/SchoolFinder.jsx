import React, { useState, useEffect } from 'react';
import OpenStreetMapService from '../services/openStreetMapService';

const SchoolFinder = () => {
    const [schools, setSchools] = useState([]);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [filters, setFilters] = useState({
        distance: 5,
        medium: 'all',
        class: 'all',
        showOnlyWithSeats: true
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [openStreetMapService] = useState(() => new OpenStreetMapService());

    // Get user's location on component mount
    useEffect(() => {
        getUserLocation();
    }, []);

    // Fetch schools when location is available
    useEffect(() => {
        if (userLocation) {
            fetchSchools();
        }
    }, [userLocation]);

    const getUserLocation = async () => {
        try {
            setLoading(true);
            const location = await openStreetMapService.getCurrentLocation();
            setUserLocation(location);
            setLocationError(null);
        } catch (error) {
            console.error('Error getting location:', error);
            setLocationError('Unable to get your location. Please enable location services.');
            // Use default location (Delhi center)
            setUserLocation({ lat: 28.6139, lng: 77.2090 });
        } finally {
            setLoading(false);
        }
    };

    const fetchSchools = async () => {
        if (!userLocation) return;

        try {
            setLoading(true);
            const radius = filters.distance * 1000; // Convert km to meters
            const schoolsData = await openStreetMapService.searchSchools(userLocation, radius);

            setSchools(schoolsData);
            setFilteredSchools(schoolsData);
        } catch (error) {
            console.error('Error fetching schools:', error);
            // Fallback to static data if API fails
            setSchools(getStaticSchoolData());
            setFilteredSchools(getStaticSchoolData());
        } finally {
            setLoading(false);
        }
    };

    // Static fallback data
    const getStaticSchoolData = () => [
        {
            id: 'SCH001',
            name: 'Government Primary School, Sector 15',
            type: 'government',
            address: 'Sector 15, Rohini, Delhi - 110085',
            coordinates: { lat: 28.7134, lng: 77.1234 },
            rteQuota: {
                totalSeats: 40,
                availableSeats: 12,
                categories: ['EWS', 'SC', 'ST', 'Disadvantaged']
            },
            classes: ['1', '2', '3', '4', '5'],
            medium: ['Hindi', 'English'],
            facilities: ['Library', 'Playground', 'Mid-day Meal'],
            contact: '9876543210',
            distance: 2.5,
            rating: 4.2
        },
        {
            id: 'SCH002',
            name: 'Delhi Public School, Rohini',
            type: 'private',
            address: 'Sector 9, Rohini, Delhi - 110085',
            coordinates: { lat: 28.7156, lng: 77.1198 },
            rteQuota: {
                totalSeats: 60,
                availableSeats: 8,
                categories: ['EWS', 'SC', 'ST', 'Disadvantaged']
            },
            classes: ['1', '2', '3', '4', '5', '6', '7', '8'],
            medium: ['English'],
            facilities: ['Library', 'Science Lab', 'Computer Lab', 'Playground', 'Transport'],
            contact: '9876543211',
            distance: 3.2,
            rating: 4.5
        }
    ];

    // Apply filters
    React.useEffect(() => {
        let filtered = schools.filter(school => {
            // Distance filter
            if (school.distance > filters.distance) return false;
            
            // Medium filter
            if (filters.medium !== 'all' && !school.medium.includes(filters.medium)) return false;
            
            // Class filter
            if (filters.class !== 'all' && !school.classes.includes(filters.class)) return false;
            
            // RTE seats filter
            if (filters.showOnlyWithSeats && school.rteQuota.availableSeats === 0) return false;
            
            // Search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    school.name.toLowerCase().includes(query) ||
                    school.address.toLowerCase().includes(query) ||
                    school.type.toLowerCase().includes(query)
                );
            }
            
            return true;
        });
        
        setFilteredSchools(filtered);
    }, [filters, searchQuery, schools]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        
        // Refetch schools when distance changes
        if (filterName === 'distance' && userLocation) {
            fetchSchools();
        }
    };

    const refreshSchools = () => {
        if (userLocation) {
            fetchSchools();
        }
    };

    const getDistanceColor = (distance) => {
        if (distance <= 2) return 'text-green-600';
        if (distance <= 5) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getSeatsColor = (available) => {
        if (available >= 10) return 'text-green-600';
        if (available >= 5) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getSchoolTypeColor = (type) => {
        return type === 'government' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
                Nearby Schools Finder
            </h2>
            <p className="text-center text-gray-600 mb-8">
                Find schools with RTE quota near your location
            </p>

            {/* Location Status */}
            {locationError && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.084 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-yellow-800">{locationError}</span>
                    </div>
                </div>
            )}

            {userLocation && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-green-800">Location detected: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
                    </div>
                </div>
            )}

            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Search & Filter Schools</h3>
                    <button
                        onClick={refreshSchools}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Refresh</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Schools
                        </label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, address..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Distance Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Distance (km)
                        </label>
                        <select
                            value={filters.distance}
                            onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={1}>Within 1 km</option>
                            <option value={2}>Within 2 km</option>
                            <option value={5}>Within 5 km</option>
                            <option value={10}>Within 10 km</option>
                        </select>
                    </div>

                    {/* Medium Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Medium of Instruction
                        </label>
                        <select
                            value={filters.medium}
                            onChange={(e) => handleFilterChange('medium', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Mediums</option>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                    </div>

                    {/* Class Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Class Required
                        </label>
                        <select
                            value={filters.class}
                            onChange={(e) => handleFilterChange('class', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Classes</option>
                            <option value="1">Class 1</option>
                            <option value="2">Class 2</option>
                            <option value="3">Class 3</option>
                            <option value="4">Class 4</option>
                            <option value="5">Class 5</option>
                        </select>
                    </div>
                </div>

                {/* Additional Filters */}
                <div className="mt-4">
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={filters.showOnlyWithSeats}
                            onChange={(e) => handleFilterChange('showOnlyWithSeats', e.target.checked)}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">Show only schools with available RTE seats</span>
                    </label>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Finding schools near you...</p>
                    </div>
                </div>
            )}

            {/* Results Summary */}
            {!loading && (
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                            Found <span className="font-bold text-blue-600">{filteredSchools.length}</span> schools
                        </span>
                        <div className="flex space-x-4 text-sm">
                            <span className="text-gray-600">
                                Government: {filteredSchools.filter(s => s.type === 'government').length}
                            </span>
                            <span className="text-gray-600">
                                Private: {filteredSchools.filter(s => s.type === 'private').length}
                            </span>
                            <span className="text-gray-600">
                                With RTE seats: {filteredSchools.filter(s => s.rteQuota.availableSeats > 0).length}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Schools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchools.map((school) => (
                    <div key={school.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{school.name}</h3>
                                    <p className="text-sm text-gray-600">{school.address}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSchoolTypeColor(school.type)}`}>
                                    {school.type.charAt(0).toUpperCase() + school.type.slice(1)}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <span className="text-sm text-gray-500">Distance</span>
                                    <p className={`font-bold ${getDistanceColor(school.distance)}`}>
                                        {school.distance} km
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Rating</span>
                                    <p className="font-bold text-gray-800">
                                        {school.rating} / 5
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">RTE Quota</span>
                                    <span className={`text-sm font-bold ${getSeatsColor(school.rteQuota.availableSeats)}`}>
                                        {school.rteQuota.availableSeats} seats available
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${(school.rteQuota.availableSeats / school.rteQuota.totalSeats) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {school.rteQuota.availableSeats} of {school.rteQuota.totalSeats} seats
                                </p>
                            </div>

                            <div className="mb-4">
                                <span className="text-sm font-medium text-gray-700">Medium:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {school.medium.map((med, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                            {med}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="text-sm font-medium text-gray-700">Classes:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {school.classes.map((cls, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                            {cls}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="text-sm font-medium text-gray-700">Facilities:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {school.facilities.slice(0, 3).map((facility, index) => (
                                        <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                            {facility}
                                        </span>
                                    ))}
                                    {school.facilities.length > 3 && (
                                        <span className="text-gray-500 text-xs">+{school.facilities.length - 3} more</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setSelectedSchool(school)}
                                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                    View Details
                                </button>
                                <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSchools.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No schools found matching your criteria.</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
                </div>
            )}

            {/* School Details Modal */}
            {selectedSchool && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{selectedSchool.name}</h2>
                                <p className="text-gray-600">{selectedSchool.address}</p>
                            </div>
                            <button
                                onClick={() => setSelectedSchool(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">School Information</h3>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium">Type:</span>
                                        <span className="ml-2">{selectedSchool.type}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Distance:</span>
                                        <span className={`ml-2 font-bold ${getDistanceColor(selectedSchool.distance)}`}>
                                            {selectedSchool.distance} km
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Rating:</span>
                                        <span className="ml-2">{selectedSchool.rating} / 5</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Contact:</span>
                                        <span className="ml-2">{selectedSchool.contact}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">RTE Quota Details</h3>
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Total Seats:</span>
                                        <span className="font-bold">{selectedSchool.rteQuota.totalSeats}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Available:</span>
                                        <span className={`font-bold ${getSeatsColor(selectedSchool.rteQuota.availableSeats)}`}>
                                            {selectedSchool.rteQuota.availableSeats}
                                        </span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-medium">Categories:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {selectedSchool.rteQuota.categories.map((cat, index) => (
                                                <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-800 mb-3">Academic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="font-medium">Medium of Instruction:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedSchool.medium.map((med, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                {med}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-medium">Classes Offered:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedSchool.classes.map((cls, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                                {cls}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-800 mb-3">Facilities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {selectedSchool.facilities.map((facility, index) => (
                                    <div key={index} className="bg-green-50 border-l-4 border-green-500 p-2">
                                        <span className="text-green-700 text-sm">{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex space-x-4">
                            <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Apply for RTE Admission
                            </button>
                            <button className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                                Get Directions
                            </button>
                            <button
                                onClick={() => setSelectedSchool(null)}
                                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchoolFinder;
