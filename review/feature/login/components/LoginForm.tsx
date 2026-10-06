"use client";
import { useState } from "react";
import { loginAction } from "../action";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import {Eye, EyeOff} from "lucide-react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
  
  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    //instead of configure timezone rules, language formats, and calendar in every date,time picker it wrap in this once
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter Username" 
            className="block w-full border rounded-lg border-gray-300 bg-gray-100 p-2.5 mt-1.5 mb-4 text-sm text-gray-900 
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password" 
              className="block w-full border rounded-lg border-gray-300 bg-gray-100 p-2.5 pr-10 mt-1.5 mb-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
            /> 
            <button 
              type="button" 
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            > 
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />} 
            </button> 
          </div>

        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea 
            placeholder="Enter description" 
            rows={2} 
            className="resize-none block w-full border rounded-lg border-gray-300 bg-gray-100 p-2.5 mt-1.5 mb-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
          <DatePicker 
            label="Select Date" 
            disablePast 
            value={selectedDate} 
            onChange={(newValue) => setSelectedDate(newValue)} 
              slotProps={{
              textField: {
                size: 'small',
                className: "w-full bg-gray-100 rounded-lg",
              }
            }}
          />
        </div>

        {error && <p className="text-sm font-medium text-red-600 mb-2">*{error}</p>}
        
        <button 
          type="submit" 
          disabled={loading} 
          className={loading 
            ? "w-full border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed mt-2" 
            : "w-full border rounded-lg py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 mt-2"
          }
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </LocalizationProvider>
  );
}
