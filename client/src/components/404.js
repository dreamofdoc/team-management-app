import React from 'react';
import { Link } from "react-router-dom";

const Err404 = () => {
    return (
        <div>
            <h2 style={{color: 'red'}}>Error 404: Not Found</h2>
            <p>Go back to <Link to="/">home page</Link></p>
        </div>
    );
};

export default Err404;