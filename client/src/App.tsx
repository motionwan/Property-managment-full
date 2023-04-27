import { colorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Layout from './components/layout/layout';
import { SignIn } from './components/sign-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';
import Unauthorized from './components/unauthorized/unauthorized';
import PersistLogin from './components/persist-login/persist-login';
import RequireAuth from './helpers/requireAuth';
//import { AddHotel } from './components/add-hotel/add-hotel';
import Dashboard from './components/dashboard/dashboard';
import Hotels from './scenes/hotels/hotels/hotels';
//import AddHotels from './scenes/hotels/add-hotels/add-hotels';
import UpdateHotels from './scenes/hotels/update-hotels/update-hotels';
import AddNewHotels from './scenes/hotels/add-hotels/add-hotels';
import HotelDashboard from './scenes/hotel/hotel-dashboard/hotel-dashboard';
import ViewRooms from './scenes/rooms/view-rooms/view-rooms';
import UpdateRoom from './scenes/rooms/update-rooms/update-room';
import AddRoom from './scenes/rooms/add-rooms/add-room';
import Amenities from './scenes/hotel/amenities/amenities';
import AddAmenity from './scenes/hotel/amenities/add-amenity/add-amentity';
import UpdateAmenity from './scenes/hotel/amenities/update-amenety/update-amenity';
import HotelSettings from './scenes/hotel/hotel-settings/hotel-settings';
import RoomReservation from './scenes/rooms/room-reservation/room-reservation';

function App() {
    const [theme, colorMode] = useMode();
    return (
        <colorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProSidebarProvider>
                    <div className="app">
                        <main className="content">
                            <Routes>
                                <Route path="/" element={<Layout />} />
                                <Route path="/login" element={<SignIn />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/unauthorized" element={<Unauthorized />} />
                                {/* <Route path="/dashboard" element={<Dashboard />} /> */}

                                <Route element={<PersistLogin />}>
                                    {/* PROTECTED ROUTES STARTS HERE */}
                                    <Route element={<RequireAuth permissions={['super-admin']} />}>
                                        <Route path="/view-hotels" element={<Hotels />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>
                                    {/* END OF ROUTE */}

                                    {/* PROTECTED ROUTES STARTS HERE */}
                                    <Route element={<RequireAuth permissions={['super-admin']} />}>
                                        <Route path="/add-hotel" element={<AddNewHotels />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>
                                    {/* END OF ROUTE */}

                                    {/* PROTECTED ROUTES STARTS HERE */}
                                    <Route element={<RequireAuth permissions={['super-admin']} />}>
                                        <Route path="/update-hotel" element={<UpdateHotels />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>
                                    {/* END OF ROUTE */}

                                    {/* END OF HOTEL MANAGEMENT ROUTES */}

                                    {/* HOTEL ROUTES */}

                                    {/* PROTECTED ROUTES STARTS HERE */}
                                    <Route
                                        element={
                                            <RequireAuth permissions={['super-admin', 'admin']} />
                                        }
                                    >
                                        <Route
                                            path="/hotel-dashboard"
                                            element={<HotelDashboard />}
                                        />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>
                                    <Route
                                        element={
                                            <RequireAuth permissions={['super-admin', 'admin']} />
                                        }
                                    >
                                        <Route path="/manage-amenities" element={<Amenities />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>
                                    <Route
                                        element={
                                            <RequireAuth permissions={['super-admin', 'admin']} />
                                        }
                                    >
                                        <Route path="/add-amenity" element={<AddAmenity />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>

                                    <Route
                                        element={
                                            <RequireAuth permissions={['super-admin', 'admin']} />
                                        }
                                    >
                                        <Route path="/update-amenity" element={<UpdateAmenity />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>
                                    {/* END OF ROUTE */}

                                    <Route
                                        element={
                                            <RequireAuth permissions={['super-admin', 'admin']} />
                                        }
                                    >
                                        <Route path="/hotel-settings" element={<HotelSettings />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>
                                    {/* END OF ROUTE */}

                                    {/* HOTEL ROUTES ENDS HERE */}

                                    {/* ROOM ROUTES */}

                                    <Route
                                        element={
                                            <RequireAuth permissions={['super-admin', 'admin']} />
                                        }
                                    >
                                        <Route path="/view-rooms" element={<ViewRooms />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>
                                    <Route
                                        element={
                                            <RequireAuth permissions={['super-admin', 'admin']} />
                                        }
                                    >
                                        <Route path="/update-room" element={<UpdateRoom />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>

                                    <Route
                                        element={
                                            <RequireAuth permissions={['super-admin', 'admin']} />
                                        }
                                    >
                                        <Route path="/add-room" element={<AddRoom />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>

                                    <Route
                                        element={
                                            <RequireAuth permissions={['super-admin', 'admin']} />
                                        }
                                    >
                                        <Route
                                            path="/room-reservation"
                                            element={<RoomReservation />}
                                        />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>

                                    {/* ROOM ROUTES ENDS HERE */}

                                    {/* PROTECTED ROUTES STARTS HERE */}
                                    <Route
                                        element={
                                            <RequireAuth
                                                permissions={['super-admin', 'admin', 'staff']}
                                            />
                                        }
                                    >
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        {/* routes to browse if permission is included in user permission */}
                                    </Route>
                                    {/* END OF ROUTE */}
                                </Route>
                            </Routes>
                        </main>
                    </div>
                </ProSidebarProvider>
            </ThemeProvider>
        </colorModeContext.Provider>
    );
}

export default App;
