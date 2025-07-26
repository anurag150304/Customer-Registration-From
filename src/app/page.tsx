"use client"

// Importing necessary modules and components
// "use client" directive ensures this file is treated as a client-side component

import LocationContextProvider, { LocationContext } from "@/context/location.context";
import { Customer, customerSchema } from "@/validations/customer.validation";
import ToastContextProvider, { ToastContext } from "@/context/toast.context";
import { getAddressFromCoords } from "@/services/getLocationAddress";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import FormSection from "@/components/Section"
import Loader from "@/components/LoadingBar";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import Map from "@/components/Map";
import axios from "axios";

// HomePage component wraps the Home component with context providers for Toast and Location
export default function HomePage() {
    return (
        <ToastContextProvider>
            <LocationContextProvider>
                <Home />
            </LocationContextProvider>
        </ToastContextProvider>
    );
}

// Main Home component
function Home() {
    // React Hook Form setup with Zod schema validation
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Customer>({
        resolver: zodResolver(customerSchema),
        mode: "onSubmit"
    });

    // State variables for map coordinates, map loading status, and form submission loading state
    const [mapCoords, setMapCoords] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Contexts for location and toast notifications
    const locationCtx = useContext(LocationContext);
    const toastCtx = useContext(ToastContext);

    // Effect to set browser information in the form
    useEffect(() => setValue("browserInfo", navigator.userAgent, { shouldValidate: true }), [setValue]);

    // Effect to fetch and set address based on location context coordinates
    useEffect(() => {
        const { lat, lng } = locationCtx?.coords || {};
        if (!lat || !lng) return;

        const fetchAndSetAddress = async () => {
            const address = await getAddressFromCoords(lat, lng);

            if (address?.error) {
                // Show error toast if address is not found
                toastCtx?.setToast({
                    init: true,
                    heading: "Address Not Found",
                    message: "Address could not be found. Please try again.",
                    type: "error",
                });
                return;
            }

            // Update form values and map state with fetched address and coordinates
            setValue("lat", String(lat), { shouldValidate: true });
            setValue("lng", String(lng), { shouldValidate: true });
            setValue("address", address, { shouldValidate: true });
            setMapCoords({ lat, lng });
            setMapLoaded(true);
        };

        fetchAndSetAddress();
    }, [locationCtx?.coords?.lat, locationCtx?.coords?.lng, locationCtx?.coords, setValue, toastCtx]);

    // Form submission handler
    const onSubmit = (data: Customer) => {
        setIsLoading(true); // Show loading indicator

        axios.post("/api/v1/customer/register", data)
            .then((res) => {
                // Show success toast on successful account creation
                toastCtx?.setToast({
                    init: true,
                    heading: "Account Created",
                    message: res.data.message,
                    type: "success",
                });
                resetForm(); // Reset form fields
            })
            .catch((err) => {
                const errorData = err?.response?.data;

                if (errorData?.errors && Array.isArray(errorData.errors)) {
                    // Show validation warnings for each error
                    errorData.errors.forEach((val: string) => {
                        toastCtx?.setToast({
                            init: true,
                            heading: "Validation Warning",
                            message: val,
                            type: "warning",
                        });
                    });
                } else if (errorData?.error) {
                    // Show error toast for account creation failure
                    toastCtx?.setToast({
                        init: true,
                        heading: "Account Creation Failed",
                        message: errorData.error,
                        type: "error",
                    });
                } else {
                    // Show generic error toast
                    toastCtx?.setToast({
                        init: true,
                        heading: "Operation Failed",
                        message: "Something went wrong. Please try again.",
                        type: "error",
                    });
                }
            }).finally(() => setIsLoading(false)); // Hide loading indicator
    };

    // Function to reset form fields and map state
    function resetForm() {
        setValue("fullname", "");
        setValue("email", "");
        setValue("password", "");
        setValue("phone", "");
        setValue("dob", "");
        setValue("address", "");
        setValue("lat", "");
        setValue("lng", "");
        setMapCoords({ lat: 0, lng: 0 });
        setMapLoaded(false);
    }

    return (
        <main className="relative bg-[#a0a0a018] flex justify-center items-start p-5">
            {isLoading && <Loader />} {/* Show loader during form submission */}
            {toastCtx?.toast.init && <Toast />} {/* Display toast notifications */}
            <div className="h-fit w-full flex justify-center items-center">
                <div className="w-1/2 max-md:w-[70%] max-sm:w-[80%] shadow-lg bg-white rounded-lg p-6 flex flex-col justify-center items-center gap-7">
                    <div className="w-full flex flex-col justify-center items-center gap-2">
                        <h1 className="text-3xl font-bold text-center text-[#6b26d9]">Customer Registration</h1>
                        <h2 className="text-[#0000008d]">Create your account to get started</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-start gap-3 w-full">
                        {/* Personal Information Section */}
                        <FormSection
                            heading="Personal Information"
                            input={[
                                <Input
                                    key={0}
                                    label="Full Name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    register={register}
                                    registerType="fullname"
                                    errors={errors}
                                />,
                                <Input
                                    key={1}
                                    label="Email Address"
                                    type="email"
                                    placeholder="your.email@gmail.com"
                                    register={register}
                                    registerType="email"
                                    errors={errors}
                                />,
                                <Input
                                    key={2}
                                    label="Phone Number"
                                    type="tel"
                                    placeholder="Your phone number"
                                    register={register}
                                    registerType="phone"
                                    errors={errors}
                                />,
                                <Input
                                    key={3}
                                    label="Gender"
                                    type="select"
                                    placeholder="Your gender"
                                    register={register}
                                    registerType="gender"
                                    errors={errors}
                                />,
                                <Input
                                    key={4}
                                    label="Password"
                                    type="password"
                                    placeholder="Create a secure password"
                                    register={register}
                                    registerType="password"
                                    errors={errors}
                                />,
                                <Input
                                    key={5}
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm your password"
                                    register={register}
                                    registerType="confirmPassword"
                                    errors={errors}
                                />,
                                <Input
                                    key={6}
                                    label="Date of Birth"
                                    type="date"
                                    register={register}
                                    registerType="dob"
                                    errors={errors}
                                />,
                                <Input
                                    key={7}
                                    label="Address"
                                    type="textarea"
                                    placeholder="Auto-filled from location"
                                    register={register}
                                    registerType="address"
                                    errors={errors}
                                />
                            ]}
                        />
                        {mapLoaded && mapCoords.lat !== 0 && mapCoords.lng !== 0 && (<Map userPosition={mapCoords} />)} {/* Map Component */}
                        {/* Location Information Section */}
                        <FormSection
                            heading="Location Information"
                            input={[
                                <Input
                                    key={0}
                                    label="Latitude"
                                    type="text"
                                    placeholder="Auto-filled from location"
                                    register={register}
                                    registerType="lat"
                                    errors={errors}
                                />,
                                <Input
                                    key={1}
                                    label="Longitude"
                                    type="text"
                                    placeholder="Auto-filled from location"
                                    registerType="lng"
                                    register={register}
                                    errors={errors}
                                />
                            ]}
                        />
                        {/* System Information Section */}
                        <FormSection
                            heading="System Information"
                            input={[
                                <Input
                                    key={10}
                                    label="Browser Information"
                                    type="text"
                                    placeholder="Your browser"
                                    register={register}
                                    registerType="browserInfo"
                                    errors={errors}
                                />
                            ]}
                        />
                        <Button
                            type="submit"
                            text="Create Account"
                            textColor="text-white"
                            textSize="text-lg"
                            fontWeignt="font-medium"
                            Vpad="py-1.5"
                            borderLine="border-1"
                            borderColor="border-[#6b26d9]"
                            backgroundColor="bg-[#6b26d9]"
                            radius="rounded-md"
                            icon={<IoMdCheckmarkCircleOutline className="text-xl" />}
                            className="w-full hover:scale-103 transition-all"
                        />
                    </form>
                </div>
            </div>
        </main>
    );
}
