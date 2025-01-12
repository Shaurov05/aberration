import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchDealerDetails, handleExportDealerData } from "../api";
import { useParams } from "react-router-dom";

const DealerData = ({ dealerName }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dealerDetails, setDealerDetails] = useState([]);

  let { dealerId, tabName } = useParams();

  const getDealershipDetails = useCallback(async () => {
    const data = await fetchDealerDetails(
      dealerId,
      tabName,
      startDate,
      endDate
    );
    if (data?.success) {
      setDealerDetails(data?.data);
    }
  }, [dealerId, tabName, startDate, endDate]);

  useEffect(() => {
    getDealershipDetails();
  }, [getDealershipDetails]);

  return (
    <div className="flex-1 bg-[#1a2a6c] text-white p-6 w-[82%]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-1">
          <h2 className="text-2xl font-bold">
            Available Inventory: {dealerName}
          </h2>
        </div>
        <div className="flex flex-1 justify-end space-x-4 items-center gap-4">
          <div className="h-[70px]">
            <label className="block text-sm mb-1">Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              className="bg-gray-700 text-white  rounded-3xl px-3 py-2 w-[120px] text-sm"
              popperClassName="custom-datepicker"
            />
          </div>
          <div className="h-[70px]">
            <label className="block text-sm mb-1">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                if (startDate && date < startDate) {
                  alert("End date should be greater than start date");
                  return;
                }
                setEndDate(date);
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              className="bg-gray-700 text-white rounded-3xl px-3 py-2 w-[120px] text-sm"
              popperClassName="custom-datepicker"
            />
          </div>
          <div className="h-[60px] flex items-end">
            <button
              onClick={() => {
                if (!startDate && !endDate) {
                  alert("Please select start date.");
                  return;
                }
                getDealershipDetails();
              }}
              className="bg-[#4e54c8] h-9 w-28 px-4 py-2 rounded-3xl hover:bg-[#7f83da] mb-1 text-lg leading-5"
            >
              Filter
            </button>
          </div>
          <div className="h-[60px] flex items-end justify-center">
            <button
              className="bg-[#4e54c8] h-9 w-32 px-4 py-2 content-center rounded-3xl hover:bg-[#7f83da] mb-1 text-lg leading-5"
              onClick={() => {
                handleExportDealerData(dealerId, tabName, startDate, endDate);
              }}
            >
              Export Data
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Static Table Header */}
        <div className="overflow-hidden">
          <table className="table-auto w-full text-left bg-gray-800 text-white rounded-md shadow-md">
            <thead className="bg-gray-700 sticky top-0">
              <tr>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Make</th>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2">VIN</th>
                <th className="px-4 py-2">Trim</th>
                <th className="px-4 py-2">Color</th>
                <th className="px-4 py-2">Mileage</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Lending Value</th>
                <th className="px-4 py-2">Date Added</th>
                <th className="px-4 py-2">Days in Stock</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable Table Body */}
        <div className="overflow-y-auto max-h-[400px]">
          <table className="table-auto w-full text-left bg-gray-800 text-white">
            <tbody>
              {dealerDetails?.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-700 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                  }`}
                >
                  <td className="px-4 py-2">{item.year}</td>
                  <td className="px-4 py-2">{item.make}</td>
                  <td className="px-4 py-2">{item.model}</td>
                  <td className="px-4 py-2">{item.vin}</td>
                  <td className="px-4 py-2">{item.trim}</td>
                  <td className="px-4 py-2">{item.color}</td>
                  <td className="px-4 py-2">{item.mileage}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item.lendingValue}</td>
                  <td className="px-4 py-2">{item.dateAdded}</td>
                  <td className="px-4 py-2">{item.daysInStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DealerData;
