import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AadharLocator = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const findNearestCenters = () => {
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
                setLoading(false);
            },
            () => {
                setError('Unable to retrieve your location. Please check your browser permissions.');
                setLoading(false);
            }
        );
    };

    return (
        <div className="mt-4 p-4 bg-white bg-opacity-70 backdrop-blur-sm border border-blue-200 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                <MapPin className="mr-2 text-blue-600" size={20} />
                Find Nearby Aadhar Centers
            </h4>

            {!location && !loading && (
                <button
                    onClick={findNearestCenters}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center"
                >
                    <MapPin className="mr-2" size={16} />
                    Locate Centers Near Me
                </button>
            )}

            {loading && (
                <div className="flex items-center text-blue-600 mt-3 p-2 rounded-md bg-blue-50">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Getting your location...
                </div>
            )}

            {error && (
                <div className="text-red-600 text-sm mt-3 p-2 rounded-md bg-red-50 border border-red-200">
                    {error}
                </div>
            )}

            {location && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                >
                    <p className="text-sm text-gray-700 mb-2 font-medium">Map centered around your location:</p>
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-inner border border-gray-200">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.05}%2C${location.lat - 0.05}%2C${location.lng + 0.05}%2C${location.lat + 0.05}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
                        ></iframe>
                    </div>
                    <div className="mt-3 flex justify-end">
                        <a
                            href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=14/${location.lat}/${location.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold hover:underline flex items-center transition-colors"
                        >
                            Open in Larger Map →
                        </a>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AadharLocator;
