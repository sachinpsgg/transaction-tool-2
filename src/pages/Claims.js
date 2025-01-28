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
        url: 'https://edi-api-demo.edix12pro.com/api/listClaims',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          pat_lname: data.pat_lname,
          physicians_npi: data.physicians_npi,
          pat_member_id: data.pat_member_id,
          pat_dob: data.pat_dob,
          dos: data.dos,
          pat_fname: data.pat_fname,
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
                value={watch('pat_lname')}
                onChange={(e) => setValue('pat_lname', e.target.value)}
                onClear={() => setValue('pat_lname', '')}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Pharmacy NPI</label>
              {/*<Input placeholder="James" {...register('pat_fname')} />*/}
              <Input
                placeholder="JAMES"
                value={watch('pat_fname')}
                onChange={(e) => setValue('pat_fname', e.target.value)}
                onClear={() => setValue('pat_fname', '')}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Claim Type</label>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Age"
                sx={{
                  height:'45px',
                  background:'#F4F5F9',
                  borderRadius:'10px'
                }}
              >
                <MenuItem value='Approved'>Approved</MenuItem>
                <MenuItem value='Reversed'>Reversed</MenuItem>
                <MenuItem value='Rejected'>Rejected</MenuItem>
              </Select>

            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">OCC Code</label>
              {/*<Input placeholder="8934673327" {...register('pat_member_id')} />*/}
              <Input
                placeholder="XR6144696"
                value={watch('pat_member_id')}
                onChange={(e) => setValue('pat_member_id', e.target.value)}
                onClear={() => setValue('pat_member_id', '')}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Date Received</label>
              <DatePickerInput
                {...register('dos')}
                value={watch('dos')}
                onChange={(date) => {
                  const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : null;
                  setValue('dos', formattedDate);
                }}
                name="dos"
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
