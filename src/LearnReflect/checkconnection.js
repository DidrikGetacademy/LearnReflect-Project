import React, { useEffect } from 'react';

const CheckDatabaseConnection = () => {
    useEffect(() => {
        // Function to check database connection
        const checkConnection = async () => {
            try {
                const response = await fetch('https://learnreflects.com/Server/config.php'); // Use your backend URL here
                const result = await response.json();

                if (response.ok) {
                    console.log(result.message); // Logs 'Database connected successfully' if connection works
                    return (
                        <div>
                            <h1>Check Database Connection</h1>
                            <p>Database connection ok</p>
                        </div>
                    );
                } else {
                    console.error(result.error); // Logs the error message if connection fails
                    return (
                        <div>
                            <h1>Check Database Connection</h1>
                            <p>Database connection FAIL</p>
                        </div>
                    );
                }
            } catch (error) {
                console.error("Error:", error); // Catches network or other errors
            }
        };

        // Call the function to check connection on component load
        checkConnection();
    }, []);

 
};

export default CheckDatabaseConnection;
