import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchDealerDetails, handleExportDealerData } from "../api";
import { useParams } from "react-router-dom";

const DealerData = ({ dealerName }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dealerDetails, setDealerDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let { dealerId, tabName } = useParams();

  const getDealershipDetails = useCallback(async () => {
    const data = await fetchDealerDetails(
      dealerId,
      tabName,
      startDate,
      endDate
    );
    setDealerDetails(data);
    setIsLoading(false);
  }, [dealerId, tabName, startDate, endDate]);

  useEffect(() => {
    setIsLoading(true);
    getDealershipDetails();
  }, [getDealershipDetails]);

  return (
    <div className="flex-1 bg-[#1a2a6c] text-white p-6 w-[82%]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-1">
          <h2 className="text-2xl font-bold">
            {tabName === "inventory"
              ? "Available Inventory"
              : tabName === "sold"
              ? "Sold Vehicles"
              : tabName === "added"
              ? "Added Vehicles"
              : ""}
            : {dealerName}
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
      {isLoading ? (
        <div className="flex h-[70%] w-full items-center justify-center">
          <div
            className="spinner-border w-[150px] h-[150px] text-[#4e54c8]"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table
                className="table-auto w-full min-w-[1000px] text-left bg-gray-800 text-white rounded-md shadow-md"
                style={{ tableLayout: "fixed" }}
              >
                <thead className="bg-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 w-[90px]">Year</th>
                    <th className="px-4 py-2 w-[140px]">Make</th>
                    <th className="px-4 py-2 w-[120px]">Model</th>
                    <th className="px-4 py-2 w-[240px]">VIN</th>
                    <th className="px-4 py-2 w-[250px]">Trim</th>
                    <th className="px-4 py-2 w-[150px]">Interior Color</th>
                    <th className="px-4 py-2 w-[150px]">Exterior Color</th>
                    <th className="px-4 py-2 w-[120px]">Mileage</th>
                    <th className="px-4 py-2 w-[120px]">Price</th>
                    <th className="px-4 py-2 w-[130px]">Date Added</th>
                    <th className="px-4 py-2 w-[140px]">Days in Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {dealerDetails?.map((item, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-700 ${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                      }`}
                    >
                      <td className="px-4 py-2 break-words w-[90px]">
                        {item.year}
                      </td>
                      <td className="px-4 py-2 break-words w-[140px]">
                        {item.make}
                      </td>
                      <td className="px-4 py-2 break-words w-[120px]">
                        {item.model}
                      </td>
                      <td className="px-4 py-2 break-words w-[240px]">
                        {item.vin}
                      </td>
                      <td className="px-4 py-2 break-words w-[450px]">
                        {item.trim}
                      </td>
                      <td className="px-4 py-2 break-words w-[150px]">
                        {item.interior_color}
                      </td>
                      <td className="px-4 py-2 break-words w-[150px]">
                        {item.exterior_color}
                      </td>
                      <td className="px-4 py-2 break-words w-[120px]">
                        {item.mileage}
                      </td>
                      <td className="px-4 py-2 break-words w-[120px]">
                        {item.price}
                      </td>
                      <td className="px-4 py-2 break-words w-[130px]">
                        {item.date_added}
                      </td>
                      <td className="px-4 py-2 break-words w-[140px]">
                        {item.days_in_stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DealerData;
