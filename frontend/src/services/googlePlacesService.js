// Google Places API Service for School Finder
// Note: You need to get a Google Places API key from Google Cloud Console

const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your actual API key

class GooglePlacesService {
    constructor() {
        this.apiKey = GOOGLE_PLACES_API_KEY;
        this.baseURL = 'https://maps.googleapis.com/maps/api/place';
    }

    // Search for schools near a location
    async searchSchools(location, radius = 5000, filters = {}) {
        try {
            const params = new URLSearchParams({
                location: `${location.lat},${location.lng}`,
                radius: radius.toString(),
                type: 'school',
                keyword: 'school',
                key: this.apiKey
            });

            // Add filters if provided
            if (filters.language) {
                params.append('language', filters.language);
            }
            if (filters.region) {
                params.append('region', filters.region);
            }

            const response = await fetch(`${this.baseURL}/nearbysearch/json?${params}`);
            const data = await response.json();

            if (data.status === 'OK') {
                return this.transformSchoolData(data.results);
            } else {
                console.error('Google Places API error:', data.status, data.error_message);
                return [];
            }
        } catch (error) {
            console.error('Error fetching schools from Google Places:', error);
            return [];
        }
    }

    // Get detailed information about a specific school
    async getSchoolDetails(placeId) {
        try {
            const params = new URLSearchParams({
                place_id: placeId,
                fields: 'name,place_id,formatted_address,geometry,rating,reviews,photos,formatted_phone_number,website,opening_hours,user_ratings_total',
                key: this.apiKey
            });

            const response = await fetch(`${this.baseURL}/details/json?${params}`);
            const data = await response.json();

            if (data.status === 'OK') {
                return this.transformSchoolDetails(data.result);
            } else {
                console.error('Google Places API error:', data.status, data.error_message);
                return null;
            }
        } catch (error) {
            console.error('Error fetching school details:', error);
            return null;
        }
    }

    // Transform Google Places data to our format
    transformSchoolData(places) {
        return places.map(place => ({
            id: place.place_id,
            name: place.name,
            type: this.detectSchoolType(place.name),
            address: place.vicinity || place.formatted_address,
            coordinates: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
            },
            rating: place.rating || 0,
            userRatingsTotal: place.user_ratings_total || 0,
            photos: place.photos || [],
            openingHours: place.opening_hours || null,
            // Default RTE quota (will be updated with real data)
            rteQuota: {
                totalSeats: this.generateTotalSeats(place),
                availableSeats: this.generateAvailableSeats(place),
                categories: ['EWS', 'SC', 'ST', 'Disadvantaged']
            },
            classes: this.generateClasses(place),
            medium: this.detectMedium(place),
            facilities: this.detectFacilities(place),
            contact: place.formatted_phone_number || 'Not available',
            website: place.website || null,
            distance: 0, // Will be calculated based on user location
            lastUpdated: new Date().toISOString()
        }));
    }

    // Transform detailed school information
    transformSchoolDetails(place) {
        return {
            id: place.place_id,
            name: place.name,
            type: this.detectSchoolType(place.name),
            address: place.formatted_address,
            coordinates: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
            },
            rating: place.rating || 0,
            userRatingsTotal: place.user_ratings_total || 0,
            reviews: place.reviews || [],
            photos: place.photos || [],
            openingHours: place.opening_hours || null,
            contact: place.formatted_phone_number || 'Not available',
            website: place.website || null,
            // Enhanced RTE information
            rteQuota: {
                totalSeats: this.generateTotalSeats(place),
                availableSeats: this.generateAvailableSeats(place),
                categories: ['EWS', 'SC', 'ST', 'Disadvantaged']
            },
            classes: this.generateClasses(place),
            medium: this.detectMedium(place),
            facilities: this.detectFacilities(place),
            distance: 0,
            lastUpdated: new Date().toISOString()
        };
    }

    // Detect school type from name
    detectSchoolType(name) {
        const nameLower = name.toLowerCase();
        if (nameLower.includes('government') || nameLower.includes('govt') || nameLower.includes('municipal') || nameLower.includes('mcd')) {
            return 'government';
        } else if (nameLower.includes('public') || nameLower.includes('sarvodaya') || nameLower.includes('kendriya vidyalaya')) {
            return 'government';
        } else {
            return 'private';
        }
    }

    // Detect medium of instruction from name
    detectMedium(place) {
        const nameLower = place.name.toLowerCase();
        const mediums = [];
        
        if (nameLower.includes('english') || nameLower.includes('convent') || nameLower.includes('public school')) {
            mediums.push('English');
        }
        if (nameLower.includes('hindi') || nameLower.includes('vidyalaya') || nameLower.includes('primary school')) {
            mediums.push('Hindi');
        }
        
        // Default to both if not detected
        if (mediums.length === 0) {
            return ['Hindi', 'English'];
        }
        
        return mediums;
    }

    // Detect facilities from place types and name
    detectFacilities(place) {
        const facilities = [];
        const nameLower = place.name.toLowerCase();
        const types = place.types || [];

        // Basic facilities for all schools
        facilities.push('Classrooms');

        // Detect from name
        if (nameLower.includes('senior secondary') || nameLower.includes('higher secondary')) {
            facilities.push('Science Lab', 'Computer Lab');
        }
        if (nameLower.includes('primary') || nameLower.includes('elementary')) {
            facilities.push('Playground');
        }
        if (nameLower.includes('convent') || nameLower.includes('english medium')) {
            facilities.push('Library', 'Computer Lab');
        }

        // Detect from place types
        if (types.includes('school')) {
            facilities.push('Library');
        }

        // Add common facilities based on school type
        if (this.detectSchoolType(place.name) === 'government') {
            facilities.push('Mid-day Meal');
        }

        return [...new Set(facilities)]; // Remove duplicates
    }

    // Generate classes based on school name and type
    generateClasses(place) {
        const nameLower = place.name.toLowerCase();
        const classes = [];

        if (nameLower.includes('primary') || nameLower.includes('elementary')) {
            classes.push('1', '2', '3', '4', '5');
        } else if (nameLower.includes('secondary')) {
            classes.push('6', '7', '8', '9', '10');
        } else if (nameLower.includes('senior secondary') || nameLower.includes('higher secondary')) {
            classes.push('11', '12');
        } else {
            // Default to primary classes
            classes.push('1', '2', '3', '4', '5');
        }

        return classes;
    }

    // Generate total RTE seats based on school size/type
    generateTotalSeats(place) {
        const nameLower = place.name.toLowerCase();
        const type = this.detectSchoolType(place.name);

        if (type === 'government') {
            if (nameLower.includes('senior secondary') || nameLower.includes('higher secondary')) {
                return 80; // Larger government schools
            } else if (nameLower.includes('secondary')) {
                return 60;
            } else {
                return 40; // Primary schools
            }
        } else {
            // Private schools typically have more seats
            if (nameLower.includes('senior secondary') || nameLower.includes('higher secondary')) {
                return 120;
            } else if (nameLower.includes('secondary')) {
                return 80;
            } else {
                return 45;
            }
        }
    }

    // Generate available seats (simulate real-time data)
    generateAvailableSeats(place) {
        const totalSeats = this.generateTotalSeats(place);
        // Simulate some seats being taken (random between 20-70% available)
        const availablePercentage = Math.random() * 0.5 + 0.2; // 20-70%
        return Math.floor(totalSeats * availablePercentage);
    }

    // Calculate distance between two points
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.deg2rad(lat2 - lat1);
        const dLng = this.deg2rad(lng2 - lng1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    // Get user's current location
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }

    // Search schools by address (geocoding)
    async searchByAddress(address) {
        try {
            const params = new URLSearchParams({
                address: address,
                key: this.apiKey
            });

            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`);
            const data = await response.json();

            if (data.status === 'OK' && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                return location;
            } else {
                throw new Error('Address not found');
            }
        } catch (error) {
            console.error('Error geocoding address:', error);
            throw error;
        }
    }
}

export default GooglePlacesService;
