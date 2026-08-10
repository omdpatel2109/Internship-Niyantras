import { useParams, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import type { User } from "../type/userType";
import {ArrowLeft, UserRound, Building2, Landmark, Bitcoin, MapPin, Bell} from "lucide-react";

export default function AllDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { fetchUserById, editProfile } = useUser();

    const [user, setUser] = useState<User>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            fetchUserById(Number(id)).then((data) => {
                setUser(data);

                if (data) {
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setPhone(data.phone);
                }
            });
        }
    }, [id]); //dependecy array-runs this when id changes

    function handleEdit() {
        setIsEditing(true);
    }

    function handleSave() {
        if (!user) return;

        editProfile(user.id, firstName, lastName, phone);

        setUser({
            ...user,
            firstName,
            lastName,
            phone,
        });

        setIsEditing(false);
    }

    function handleCancel() {
        if (!user) return;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhone(user.phone);

        setIsEditing(false);
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <header className="h-[58px] bg-white border-b border-gray-200 flex items-center justify-center relative">

                <h1 className="text-lg font-semibold text-gray-800">
                    User Profile
                </h1>
                <Bell className="ml-[1000px] h-5 w-5"></Bell>
                {user && (
                    <img
                        src={user.image}
                        alt={`${user.firstName}`}
                        className="w-7 h-7 ml-[5px]"
                    />
                    )
                }

            </header>


            <main className="mx-auto px-6 py-5">

                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6"
                >
                    <ArrowLeft size={14} />

                    Back to Users
                </button>

                {user && (
                    <>

                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex items-center gap-6">

                                <img
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="w-24 h-24 rounded-lg object-cover border border-gray-300"
                                />
                                {/* User Basic Information */}
                                <div className="">

                                    <div className="flex items-center gap-3">

                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {user.firstName} {user.lastName}
                                        </h2>

                                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                                            {user.company.title}
                                        </span>

                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        @{user.username} · {user.email}
                                    </p>

                                    {!isEditing && (
                                        <button
                                        onClick={handleEdit}
                                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                                        >
                                            Edit Profile
                                        </button>
                                    )}

                                </div>
                            </div>
                        </div>

                        {/* DETAILS GRID*/}       
                        {!isEditing ? 
                            (<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            {/* PERSONAL INFORMATION*/}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">
                                    <UserRound
                                        size={18}
                                        className="text-gray-600"
                                    />

                                    <h3 className="text-sm font-semibold text-gray-700">
                                        PERSONAL INFORMATION
                                    </h3>

                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Birth Date
                                        </span>

                                        <span className="text-gray-700">
                                            {user.birthDate}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Phone
                                        </span>

                                        <span className="text-gray-700">
                                            {user.phone}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Eye Color
                                        </span>

                                        <span className="text-gray-700">
                                            {user.eyeColor}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Hair
                                        </span>

                                        <span className="text-gray-700">
                                            {user.hair.color}, {user.hair.type}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Height / Weight
                                        </span>

                                        <span className="text-gray-700">
                                            {user.height} cm / {user.weight} kg
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/*  COMPANY  */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">

                                    <Building2
                                        size={18}
                                        className="text-gray-600"
                                    />

                                    <h3 className="text-sm font-semibold text-gray-700">
                                        COMPANY
                                    </h3>

                                </div>

                                <div className="space-y-3 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Company Name
                                        </span>

                                        <span className="text-gray-700">
                                            {user.company.name}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Title
                                        </span>

                                        <span className="text-gray-700">
                                            {user.company.title}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Department
                                        </span>

                                        <span className="text-gray-700">
                                            {user.company.department}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-3">

                                        <p className="text-gray-500 mb-1">
                                            Company Address
                                        </p>

                                        <p className="text-gray-700">
                                            {user.company.address.address}
                                        </p>

                                        <p className="text-gray-700">
                                            {user.company.address.city},{" "}
                                            {user.company.address.state}{" "}
                                            {user.company.address.postalCode}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/*  FINANCIAL INFORMATION*/}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">

                                <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">

                                    <Landmark
                                        size={18}
                                        className="text-gray-600"
                                    />

                                    <h3 className="text-sm font-semibold text-gray-700">
                                        FINANCIAL INFORMATION
                                    </h3>

                                </div>

                                <div className="space-y-3 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Card Number
                                        </span>

                                        <span className="text-gray-700">
                                            **** **** **** {user.bank.cardNumber.slice(-4)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Card Type
                                        </span>

                                        <span className="text-gray-700">
                                            {user.bank.cardType}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Card Expiry
                                        </span>

                                        <span className="text-gray-700">
                                            {user.bank.cardExpire}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            IBAN
                                        </span>

                                        <span className="text-gray-700">
                                            {user.bank.iban}
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* CRYPTO  */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">

                                <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">

                                    <Bitcoin
                                        size={18}
                                        className="text-gray-600"
                                    />

                                    <h3 className="text-sm font-semibold text-gray-700">
                                        CRYPTO
                                    </h3>

                                </div>

                                <div className="space-y-3 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Coin
                                        </span>

                                        <span className="text-gray-700">
                                            {user.crypto.coin}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-5">

                                        <span className="text-gray-500">
                                            Wallet
                                        </span>

                                        <span className="text-gray-700 text-right break-all">
                                            {user.crypto.wallet}
                                        </span>

                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Network
                                        </span>

                                        <span className="text-gray-700">
                                            {user.crypto.network}
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* HOME ADDRESS  */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">

                                <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">

                                    <MapPin
                                        size={18}
                                        className="text-gray-600"
                                    />

                                    <h3 className="text-sm font-semibold text-gray-700">
                                        HOME ADDRESS
                                    </h3>

                                </div>

                                <div className="text-sm space-y-3">

                                    <div>
                                        <p className="text-gray-500">
                                            Street Address
                                        </p>

                                        <p className="text-gray-700">
                                            {user.address.address}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">

                                        <div>
                                            <p className="text-gray-500">
                                                City
                                            </p>

                                            <p className="text-gray-700">
                                                {user.address.city}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">
                                                State/Province
                                            </p>

                                            <p className="text-gray-700">
                                                {user.address.state}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-2 gap-5">

                                        <div>
                                            <p className="text-gray-500">
                                                Postal Code
                                            </p>

                                            <p className="text-gray-700">
                                                {user.address.postalCode}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">
                                                Country
                                            </p>

                                            <p className="text-gray-700">
                                                {user.address.country}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>) : (
                            // EDIT FORM
                            <div className="bg-white border border-gray-200 rounded-lg p-6">

                                <h2 className="text-lg font-semibold text-gray-800 mb-5">
                                    Edit Profile
                                </h2>

                                <div className="space-y-4">

                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">
                                            Phone
                                        </label>

                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 mt-6">

                                    <button
                                        onClick={handleSave}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>
                        )}
                    </>
                )}
            </main>

        </div>
    );
}