"use client";

import { useState } from "react";
import { loginAction } from "../action";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await loginAction(username, password);

    if(!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    alert(result.message);
    setLoading(false);
  }

  return (
    //instead of configure timezone rules, language formats, and calendar in every date,time picker it wrap in this once 
    <LocalizationProvider dateAdapter={AdapterDayjs} > 
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-md font-medium text-gray-700">Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            className="block w-full border rounded-md border-gray-700 py-2 mt-1 mb-2"
          />
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700">Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="block w-full border rounded-md border-gray-700 py-2 mt-1 mb-2"
          />
        </div>

        <label className="block text-md font-medium text-gray-700">Password</label>
        <textarea placeholder="Enter description" rows={2}
        className="resize-none block w-full border rounded-md border-gray-700 py-2 mt-1 mb-2"/>

        <label className="block text-md font-medium text-gray-700">Date</label>
        <DatePicker 
              label="Select Date" 
              disablePast
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              className="w-full border rounded-md border-gray-700"
            />

        {error && <p className="text-red-500">*{error}</p>}

        <button type="submit" disabled={loading}
        className={loading ? "mt-5 bg-gray-300 w-full border rounded mt-3 py-2 text-gray-800" : 
        "mt-5 bg-green-600 w-full border rounded mt-3 py-2"}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </LocalizationProvider>
  );
}