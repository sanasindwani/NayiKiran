// OpenStreetMap Service for School Finder
// 100% FREE - No API keys required

class OpenStreetMapService {
    constructor() {
        this.nominatimBaseURL = 'https://nominatim.openstreetmap.org';
        this.overpassBaseURL = 'https://overpass-api.de/api/interpreter';
    }

    // Search for schools near a location using Overpass API
    async searchSchools(location, radius = 5000) {
        try {
            // Overpass QL query to find schools
            const query = `
                [out:json][timeout:25];
                (
                    node["amenity"="school"](around:${radius},${location.lat},${location.lng});
                    way["amenity"="school"](around:${radius},${location.lat},${location.lng});
                    relation["amenity"="school"](around:${radius},${location.lat},${location.lng});
                );
                out body;
                >;
                out skel qt;
            `;

            const response = await fetch(this.overpassBaseURL, {
                method: 'POST',
                body: query,
                headers: {
                    'Content-Type': 'text/plain',
                    'User-Agent': 'SchoolFinderApp/1.0'
                }
            });

            const data = await response.json();
            
            if (data.elements && data.elements.length > 0) {
                return this.transformSchoolData(data.elements, location);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching schools from OpenStreetMap:', error);
            return [];
        }
    }

    // Get detailed information about a specific school
    async getSchoolDetails(schoolId) {
        try {
            const query = `
                [out:json][timeout:15];
                node(${schoolId});
                out body;
                >;
                out skel qt;
            `;

            const response = await fetch(this.overpassBaseURL, {
                method: 'POST',
                body: query,
                headers: {
                    'Content-Type': 'text/plain',
                    'User-Agent': 'SchoolFinderApp/1.0'
                }
            });

            const data = await response.json();
            
            if (data.elements && data.elements.length > 0) {
                return this.transformSchoolDetails(data.elements[0]);
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching school details:', error);
            return null;
        }
    }

    // Convert address to coordinates using Nominatim
    async geocodeAddress(address) {
        try {
            const params = new URLSearchParams({
                q: address,
                format: 'json',
                limit: 1,
                countrycodes: 'in' // India
            });

            const response = await fetch(`${this.nominatimBaseURL}/search?${params}`, {
                headers: {
                    'User-Agent': 'SchoolFinderApp/1.0'
                }
            });

            const data = await response.json();

            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                    address: data[0].display_name
                };
            } else {
                throw new Error('Address not found');
            }
        } catch (error) {
            console.error('Error geocoding address:', error);
            throw error;
        }
    }

    // Reverse geocoding - get address from coordinates
    async reverseGeocode(lat, lng) {
        try {
            const params = new URLSearchParams({
                lat: lat.toString(),
                lon: lng.toString(),
                format: 'json',
                addressdetails: 1
            });

            const response = await fetch(`${this.nominatimBaseURL}/reverse?${params}`, {
                headers: {
                    'User-Agent': 'SchoolFinderApp/1.0'
                }
            });

            const data = await response.json();
            return data.display_name || 'Unknown location';
        } catch (error) {
            console.error('Error reverse geocoding:', error);
            return 'Unknown location';
        }
    }

    // Transform OpenStreetMap data to our format
    transformSchoolData(elements, userLocation) {
        const schools = [];
        const processedIds = new Set();

        elements.forEach(element => {
            // Only process nodes (points) and avoid duplicates
            if (element.type === 'node' && !processedIds.has(element.id)) {
                processedIds.add(element.id);

                const school = {
                    id: element.id.toString(),
                    name: element.tags?.name || 'Unnamed School',
                    type: this.detectSchoolType(element.tags),
                    address: this.formatAddress(element.tags),
                    coordinates: {
                        lat: element.lat,
                        lng: element.lon
                    },
                    rating: this.generateRating(),
                    userRatingsTotal: Math.floor(Math.random() * 100) + 10,
                    openingHours: element.tags?.opening_hours || null,
                    contact: element.tags?.phone || 'Not available',
                    website: element.tags?.website || null,
                    // Enhanced RTE information
                    rteQuota: {
                        totalSeats: this.generateTotalSeats(element.tags),
                        availableSeats: this.generateAvailableSeats(element.tags),
                        categories: ['EWS', 'SC', 'ST', 'Disadvantaged']
                    },
                    classes: this.generateClasses(element.tags),
                    medium: this.detectMedium(element.tags),
                    facilities: this.detectFacilities(element.tags),
                    distance: this.calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        element.lat,
                        element.lon
                    ),
                    lastUpdated: new Date().toISOString()
                };

                schools.push(school);
            }
        });

        return schools;
    }

    // Transform detailed school information
    transformSchoolDetails(element) {
        return {
            id: element.id.toString(),
            name: element.tags?.name || 'Unnamed School',
            type: this.detectSchoolType(element.tags),
            address: this.formatAddress(element.tags),
            coordinates: {
                lat: element.lat,
                lng: element.lon
            },
            rating: this.generateRating(),
            userRatingsTotal: Math.floor(Math.random() * 100) + 10,
            openingHours: element.tags?.opening_hours || null,
            contact: element.tags?.phone || 'Not available',
            website: element.tags?.website || null,
            rteQuota: {
                totalSeats: this.generateTotalSeats(element.tags),
                availableSeats: this.generateAvailableSeats(element.tags),
                categories: ['EWS', 'SC', 'ST', 'Disadvantaged']
            },
            classes: this.generateClasses(element.tags),
            medium: this.detectMedium(element.tags),
            facilities: this.detectFacilities(element.tags),
            distance: 0,
            lastUpdated: new Date().toISOString()
        };
    }

    // Detect school type from OpenStreetMap tags
    detectSchoolType(tags) {
        const name = (tags?.name || '').toLowerCase();
        
        if (tags?.school?.includes('government') || 
            tags?.operator?.includes('government') ||
            name.includes('government') || 
            name.includes('govt') || 
            name.includes('municipal') || 
            name.includes('mcd') ||
            name.includes('sarvodaya') ||
            name.includes('kendriya vidyalaya')) {
            return 'government';
        } else if (name.includes('public') || 
                   name.includes('convent') || 
                   name.includes('private')) {
            return 'private';
        } else {
            // Default to government for Indian schools
            return 'government';
        }
    }

    // Detect medium of instruction from tags
    detectMedium(tags) {
        const name = (tags?.name || '').toLowerCase();
        const mediums = [];
        
        if (name.includes('english') || name.includes('convent') || name.includes('public school')) {
            mediums.push('English');
        }
        if (name.includes('hindi') || name.includes('vidyalaya') || name.includes('primary school')) {
            mediums.push('Hindi');
        }
        
        // Default to both if not detected
        if (mediums.length === 0) {
            return ['Hindi', 'English'];
        }
        
        return mediums;
    }

    // Detect facilities from tags
    detectFacilities(tags) {
        const facilities = [];
        const name = (tags?.name || '').toLowerCase();

        // Basic facilities for all schools
        facilities.push('Classrooms');

        // Detect from name
        if (name.includes('senior secondary') || name.includes('higher secondary')) {
            facilities.push('Science Lab', 'Computer Lab');
        }
        if (name.includes('primary') || name.includes('elementary')) {
            facilities.push('Playground');
        }
        if (name.includes('convent') || name.includes('english medium')) {
            facilities.push('Library', 'Computer Lab');
        }

        // Add government school facilities
        if (this.detectSchoolType(tags) === 'government') {
            facilities.push('Mid-day Meal');
        }

        return [...new Set(facilities)];
    }

    // Generate classes based on school type
    generateClasses(tags) {
        const name = (tags?.name || '').toLowerCase();
        const classes = [];

        if (name.includes('primary') || name.includes('elementary')) {
            classes.push('1', '2', '3', '4', '5');
        } else if (name.includes('secondary')) {
            classes.push('6', '7', '8', '9', '10');
        } else if (name.includes('senior secondary') || name.includes('higher secondary')) {
            classes.push('11', '12');
        } else {
            // Default to primary classes
            classes.push('1', '2', '3', '4', '5');
        }

        return classes;
    }

    // Format address from tags
    formatAddress(tags) {
        const parts = [];
        
        if (tags?.['addr:housenumber']) parts.push(tags['addr:housenumber']);
        if (tags?.['addr:street']) parts.push(tags['addr:street']);
        if (tags?.['addr:suburb']) parts.push(tags['addr:suburb']);
        if (tags?.['addr:city']) parts.push(tags['addr:city']);
        if (tags?.['addr:postcode']) parts.push(tags['addr:postcode']);
        
        return parts.length > 0 ? parts.join(', ') : 'Address not available';
    }

    // Generate total RTE seats based on school size/type
    generateTotalSeats(tags) {
        const name = (tags?.name || '').toLowerCase();
        const type = this.detectSchoolType(tags);

        if (type === 'government') {
            if (name.includes('senior secondary') || name.includes('higher secondary')) {
                return 80;
            } else if (name.includes('secondary')) {
                return 60;
            } else {
                return 40;
            }
        } else {
            if (name.includes('senior secondary') || name.includes('higher secondary')) {
                return 120;
            } else if (name.includes('secondary')) {
                return 80;
            } else {
                return 45;
            }
        }
    }

    // Generate available seats (simulate real-time data)
    generateAvailableSeats(tags) {
        const totalSeats = this.generateTotalSeats(tags);
        const availablePercentage = Math.random() * 0.5 + 0.2; // 20-70%
        return Math.floor(totalSeats * availablePercentage);
    }

    // Generate rating (simulated)
    generateRating() {
        return Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0 to 5.0
    }

    // Calculate distance between two points (Haversine formula)
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
}

export default OpenStreetMapService;
