import React, { useEffect, useState } from 'react';
import { JsonTextEditor } from './JsonTextEditor';
import { BackIcon, JsonIcon, SheetIcon, ThreeDot } from '../helpers/Icons';
import axios from 'axios';
import { TimelineItem } from './TimelineItem';
import DataField from './ui-elements/DataField';
import Loader from './ui-elements/Loader';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ControlledOpenSelect from './tempComps/FileViewSelect';

const ClaimDetails = ({ onBack, item }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState({});
  const [currData, setCurrData] = useState(null);
  const navigate = useNavigate();
  const [decodedJson, setDecodedJson] = useState('');
  const [decodedJson2, setDecodedJson2] = useState('');

  useEffect(() => {
    const fetchClaimDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.request({
          url: 'https://edi-api-demo.edix12pro.com/api//claimDetails',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            claimID: item,
          },
        });
        const decodedJson = JSON.parse(atob(response.data.json));
        const decodedJson2 = JSON.parse(atob(response.data.data['835_json']));
        setDecodedJson(decodedJson);
        setDecodedJson2(decodedJson2);
        setJsonData(decodedJson);
        setCurrData(response.data.data || []);
        setTimelineData((response.data.journey || []).reverse());
      } catch (error) {
        console.error('Error fetching claim details:', error);
      } finally {
        console.log(currData);
        setLoading(false);
      }
    };

    if (item) {
      fetchClaimDetails();
    }
  }, [item]);
  const handleSelectionChange = (selectedValue) => {
    console.log(selectedValue);
    if (selectedValue === '835') {
      setJsonData(decodedJson);
    }
    if (selectedValue === '837') {
      setJsonData(decodedJson2);
    }
  };

  return (
    <>
      <div className="">
        <a
          href="#"
          onClick={onBack}
          className="text-[#3A3541] inline-flex items-center flex-row gap-2 text-[24px] font-normal leading-[28.8px] mb-8 mt-4">
          <BackIcon />
          Go back to search results
        </a>
        {loading ? (
          <></>
        ) : (
          <>
            <div className="bg-white p-4 rounded-lg border border-[#E7E7E7] mb-4 flex justify-between items-center">
              <div className="grid grid-cols-6 gap-4 w-full">
                <DataField
                  label="Member Id"
                  value={
                    <button
                      className="text-blue-500 underline"
                      onClick={() => navigate(`/dashboard/claims?memberId=${currData?.pat_member_id}`)}>
                      {currData?.pat_member_id}
                    </button>
                  }
                />
                <DataField label="Date Received" value={currData?.pat_dob} />
                <DataField label="Date of Service" value={currData?.dos} />
                <DataField
                  label="Physician NPI"
                  value={
                    <button
                      className="text-blue-500 underline"
                      onClick={() => navigate(`/dashboard/physician?npi=${currData?.physicians_npi}`)}>
                      {currData?.physicians_npi}
                    </button>
                  }
                />
                <DataField label="Patient Last Name" value={currData?.pat_lname} />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center text-lg font-semibold mb-2">
              <div>Claim: {currData?.claimID}</div>
              <div>
                Filename:
                <button
                  className="text-blue-500 underline"
                  onClick={() => navigate(`/dashboard/files?filename=${currData?.filename}`)}>
                  {currData?.filename}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between p-2 border border-gray-300 w-full">
            <div className="flex items-center justify-between space-x-2 w-1/2">
              <div className="flex flex-row justify-center items-center">
                <JsonIcon />
                <span className="text-blue-500">JSON</span>
              </div>
              <div className="flex flex-row justify-center items-center max-w-7 max-h-5">
                <ControlledOpenSelect onSelectionChange={handleSelectionChange} />
              </div>
            </div>
            <div className="flex items-center space-x-4 pl-4 w-1/2">
              <SheetIcon />
              <span className="text-yellow-500 ">Claim History</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThreeDot />
            </div>
          </div>
          <div className="flex w-full border border-[#E7E7E7]">
            <div className="w-1/2 bg-white p-4 border-r border-gray-300">
              <JsonTextEditor jsonData={jsonData} />
            </div>
            <div className="px-2 py-8 h-screen w-1/2 overflow-y-auto mb-2 ">
              {currData && (
                <div className="mb-2 justify-start flex gap-2">
                  {currData['835_file'] && (
                    <a href={currData['835_file']} download target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" size="small" sx={{ background: '#6E39CB', color: 'white' }}>
                        Download 835
                      </Button>
                    </a>
                  )}
                </div>
              )}
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={index}
                  status={item.status}
                  details={item.msg}
                  date={item.date}
                  extra={item.extra}
                  statusColor={item.statusColor}
                  isLast={index === timelineData.length - 1}
                  isJson={currData}
                  isFile={currData}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ClaimDetails;
