import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdInventory, MdBuild, MdEngineering, MdDirectionsCar, MdAssignmentReturn, MdLocalShipping, MdAssessment, MdAnalytics } from 'react-icons/md';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-100 h-screen p-4 flex flex-col justify-between">
            {/* User Profile Section */}
            <div>
                <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold mt-2">User name</h2>
                    <p className="text-sm text-gray-500">
                        <Link to="/profile">View profile</Link>
                    </p>
                </div>

                {/* Navigation Links */}
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/dashboard" className="flex items-center p-2 bg-green-100 text-green-500 rounded">
                                <MdDashboard className="text-xl" />
                                <span className="ml-2">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/inventory" className="flex items-center p-2 hover:bg-gray-200 rounded">
                                <MdInventory className="text-xl" />
                                <span className="ml-2">Inventory</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/retreaders" className="flex items-center p-2 hover:bg-gray-200 rounded">
                                <MdBuild className="text-xl" />
                                <span className="ml-2">Retreaders</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/fitters" className="flex items-center p-2 hover:bg-gray-200 rounded">
                                <MdEngineering className="text-xl" />
                                <span className="ml-2">Fitters</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/vehicle-allocation" className="flex items-center p-2 hover:bg-gray-200 rounded">
                                <MdDirectionsCar className="text-xl" />
                                <span className="ml-2">Vehicle Allocation</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/collection-request" className="flex items-center p-2 hover:bg-gray-200 rounded">
                                <MdAssignmentReturn className="text-xl" />
                                <span className="ml-2">Collection Request</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dispatch-request" className="flex items-center p-2 hover:bg-gray-200 rounded">
                                <MdLocalShipping className="text-xl" />
                                <span className="ml-2">Dispatch Request</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports" className="flex items-center p-2 hover:bg-gray-200 rounded">
                                <MdAssessment className="text-xl" />
                                <span className="ml-2">Reports</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/analytics" className="flex items-center p-2 hover:bg-gray-200 rounded">
                                <MdAnalytics className="text-xl" />
                                <span className="ml-2">Analytics</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Version and Logo Section */}
            <div className="text-center">
                <div className="mb-2">
                    <img src="/path/to/logo.png" alt="Logo" className="w-20 mx-auto" />
                </div>
                <p className="text-sm text-gray-500">Version 23.34 [2004234]</p>
            </div>
        </div>
    );
};

export default Sidebar;
