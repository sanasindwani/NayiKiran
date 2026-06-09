import React, { useState } from 'react';
import { MapPin, Loader2, Clock } from 'lucide-react';

const ServiceLocator = ({ type }) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showMap, setShowMap] = useState(false);

    const isAadhar = type === 'aadhar';
    const title = isAadhar ? 'Nearest Enrolment Centers' : 'Nearest Banks for PMJDY';
    const buttonText = isAadhar ? 'Locate Centers Near Me' : 'Locate Banks Near Me';
    
    // Mock locations based on type
    const mockLocations = isAadhar ? [
        { name: 'Main Post Office Enrolment Center', distance: '0.8 km', time: '09:00 AM - 05:00 PM' },
        { name: 'State Bank of India (Aadhar services)', distance: '1.2 km', time: '10:00 AM - 04:00 PM' },
        { name: 'Municipal Corporation Zonal Office', distance: '2.5 km', time: '09:30 AM - 05:30 PM' }
    ] : [
        { name: 'State Bank of India', distance: '0.5 km', time: '10:00 AM - 04:00 PM' },
        { name: 'Punjab National Bank', distance: '1.1 km', time: '10:00 AM - 04:00 PM' },
        { name: 'Bank of Baroda', distance: '1.8 km', time: '10:00 AM - 04:00 PM' }
    ];

    const findNearestCenters = (e) => {
        // Prevent toggle step when clicking buttons inside this component
        e.stopPropagation();
        setLoading(true);
        setError('');

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setShowMap(true);
                setLoading(false);
            },
            () => {
                // If permission denied or error, use a mock location for demo purposes
                setLocation({ lat: 28.7041, lng: 77.1025 }); // Delhi coordinates
                setShowMap(true);
                setLoading(false);
            }
        );
    };

    return (
        <div 
            className="mt-4 pt-4 border-t border-gray-200 border-opacity-50" 
            onClick={(e) => e.stopPropagation()} // Stop step toggle on map clicks
        >
            {!showMap && !loading && (
                <button
                    onClick={findNearestCenters}
                    className="bg-green-100 text-green-800 border border-green-300 px-4 py-2 text-sm rounded shadow-sm hover:bg-green-200 transition flex items-center font-medium"
                >
                    <MapPin className="mr-2" size={16} />
                    {buttonText}
                </button>
            )}

            {loading && (
                <div className="flex items-center text-blue-600 mt-2 text-sm">
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Getting your location...
                </div>
            )}

            {error && (
                <div className="text-red-500 text-sm mt-2">
                    {error}
                </div>
            )}

            {showMap && location && (
                <div className="mt-2 bg-transparent">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-gray-800 flex items-center text-sm">
                            <MapPin className="mr-2 text-red-500" size={18} fill="currentColor" stroke="none" />
                            {title}
                        </h4>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowMap(false); }}
                            className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                        >
                            Close Map
                        </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Map Column */}
                        <div className="h-48 md:h-full min-h-[200px] rounded-lg overflow-hidden border border-gray-300 bg-gray-100 shadow-sm relative z-0">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight="0" 
                                marginWidth="0" 
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.05}%2C${location.lat - 0.05}%2C${location.lng + 0.05}%2C${location.lat + 0.05}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
                                className="pointer-events-auto"
                            ></iframe>
                        </div>
                        
                        {/* List Column */}
                        <div className="flex flex-col gap-3">
                            {mockLocations.map((loc, idx) => (
                                <div key={idx} className="bg-white border text-left border-gray-100 shadow-sm rounded-lg p-3 flex justify-between items-center hover:shadow-md transition">
                                    <div>
                                        <h5 className="font-bold text-gray-800 text-sm">{loc.name}</h5>
                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <Clock size={12} className="mr-1" />
                                            {loc.time}
                                        </div>
                                    </div>
                                    <div className="bg-indigo-50 text-indigo-700 font-semibold text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                        {loc.distance}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceLocator;
