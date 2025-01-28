import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClaimDetails from '../components/ClaimDetails';
import Input from '../components/ui-elements/Input';
import Loader from '../components/ui-elements/Loader';
import axios from 'axios';
import SearchResults from '../components/SearchResults';
import { format } from 'date-fns';
import DatePickerInput from '../components/tempComps/DatepickerMui';
import { useSearchParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Claims = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [results, setResults] = useState([]);
  const [showComplete, setShowComplete] = useState(false);
  useEffect(() => {
    const npiValue = searchParams.get('memberId');
    if (npiValue) {
      setValue('pat_member_id', npiValue);
    }
  }, [searchParams, setValue]);
  const claimTypeOptions=['Accepted','Reversed','Rejected']
  const onSubmit = async (data) => {
    console.log('Submitting data:', data);
    setLoading(true);
    try {
      const response = await axios.request({
        url: 'https://edi-api-demo.edix12pro.com/api/listClaimsA',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          Cardholder_ID: data.Cardholder_ID,
          Pharmacy_NPI: data.Pharmacy_NPI,
          Date_Processed: data.Date_Processed,
          claim_status:data.status,
          Other_Coverage_Code:data.Other_Coverage_Code,
          Group_Number:data.Group_Number,

        },
      });

      const fetchedResults = response.data.data || [];
      setResults(fetchedResults);
      console.log(results);
      setFormData(null);
      console.log(fetchedResults);
    } catch (error) {
      console.error('Error fetching claims:', error);
      setResults([]);
    } finally {
      setLoading(false);
      setShowComplete(true);
    }
  };
  const handleViewItem = (id) => {
    setSelectedItem(id);
  };
  const clearForm = () => {
    reset();
    setFormData(null);
  };
  console.log(!loading && !selectedItem && formData);
  return (
    <main className="flex-1 p-8 overflow-auto">
      <h2 className="text-[24px] text-[#3A3541] font-semibold sticky">Claims Explorer</h2>
      <p className="text-[#89868D] text-[16px]">Explore all the claims and check their status</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-custom">
          <div className="grid gap-8 grid-cols-3">
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Member Id</label>
              {/*<Input placeholder="MEYERS" {...register('pat_lname')} />*/}
              <Input
                placeholder="MEYERS"
                value={watch('Cardholder_ID')}
                onChange={(e) => setValue('Cardholder_ID', e.target.value)}
                onClear={() => setValue('Cardholder_ID', '')}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Pharmacy NPI</label>
              {/*<Input placeholder="James" {...register('pat_fname')} />*/}
              <Input
                placeholder="JAMES"
                value={watch('Pharmacy_NPI')}
                onChange={(e) => setValue('Pharmacy_NPI', e.target.value)}
                onClear={() => setValue('Pharmacy_NPI', '')}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Claim Type</label>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Age"
                {...register('claim_status')} // Register the field in react-hook-form
                value={watch('claim_status') || ''} // Watch the current value
                onChange={(e) => setValue('claim_status', e.target.value)} // Update the value in react-hook-form

                sx={{
                  height: '45px',
                  background: '#F4F5F9',
                  borderRadius: '10px',
                }}>
                <MenuItem value="paid">Approved</MenuItem>
                <MenuItem value="reversed">Reversed</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Group Number</label>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                {...register('Group_Number')} // Register the field in react-hook-form
                value={watch('Group_Number') || ''} // Watch the current value
                onChange={(e) => setValue('Group_Number', e.target.value)} // Update the value in react-hook-form
                sx={{
                  height: '45px',
                  background: '#F4F5F9',
                  borderRadius: '10px',
                }}>
                <MenuItem value="100034">100034</MenuItem>
                <MenuItem value="100035">100035</MenuItem>
                <MenuItem value="100034C">100034C</MenuItem>
                <MenuItem value="100035C">100035C</MenuItem>
                <MenuItem value="100036">100036</MenuItem>
                <MenuItem value="100047">100047</MenuItem>
                <MenuItem value="100034B">100034B</MenuItem>
              </Select>

            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">OCC Code</label>
              {/*<Input placeholder="8934673327" {...register('pat_member_id')} />*/}
              <Input
                placeholder="XR6144696"
                value={watch('Other_Coverage_Code')}
                onChange={(e) => setValue('Other_Coverage_Code', e.target.value)}
                onClear={() => setValue('Other_Coverage_Code', '')}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Date Processed</label>
              <DatePickerInput
                {...register('Date_Processed')}
                value={watch('Date_Processed')}
                onChange={(date) => {
                  const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : null;
                  setValue('Date_Processed', formattedDate);
                }}
                name="Date_Processed"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end mr-1">
            <button
              type="button"
              className="bg-white text-gray-700 px-8 py-2 rounded-md border shadow-custom mr-2"
              onClick={clearForm}>
              Clear
            </button>
            <button
              type="submit"
              className={`${isValid ? 'bg-[#6E39CB]' : 'bg-purple-500'} text-white px-8 py-2 rounded-md`}>
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="mt-4">
        {loading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
        {!loading && !selectedItem && !results.length && showComplete && (
          <SearchResults data={results} onViewItem={handleViewItem} />
        )}
        {!loading && selectedItem && <ClaimDetails item={selectedItem} onBack={() => setSelectedItem(null)} />}
        {!loading && !formData && !showComplete && (
          <div className="flex flex-col items-center">
            <img src={require('../assets/img.png')} alt="Search for claims illustration" className="mb-4 h-56 w-72" />
            <h2 className="text-[32px] text-[#777777] sticky">Search for Claims</h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default Claims;
