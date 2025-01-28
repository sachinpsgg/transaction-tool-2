import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/ui-elements/Input';
// import DatePickerInput from '../components/ui-elements/Datepicker';
import ClaimDetails from '../components/ClaimDetails';
import Loader from '../components/ui-elements/Loader';
import SearchResults from '../components/SearchResults';
import axios from 'axios';
import { format } from 'date-fns';
import Select from 'react-select';
import DatePickerInput from '../components/tempComps/DatepickerMui';
import { useSearchParams } from 'react-router-dom';

const Physician = () => {
  const [searchParams] = useSearchParams();
  const [npi, setNpi] = useState('');
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

  useEffect(() => {
    const npiValue = searchParams.get('npi');
    if (npiValue) {
      setValue('physiciansNPI', npiValue); // Set the physiciansNPI input value
    }
  }, [searchParams, setValue]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [results, setResults] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [fetchingPhysicians, setFetchingPhysicians] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const fetchPhysicians = async () => {
    setFetchingPhysicians(true);
    try {
      const response = await axios.get('https://edi-api-demo.edix12pro.com/api/listPhysicians');
      const physiciansData = response.data.data;
      console.log(physiciansData);

      const data = Object.keys(physiciansData).map((key) => ({
        label: physiciansData[key],
        value: key,
      }));
      setPhysicians(data);
    } catch (error) {
      console.error('Error fetching physicians:', error);
    } finally {
      setFetchingPhysicians(false);
    }
  };

  const handleSelectChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedPhysician(selectedOption);
    setValue('physiciansNPI', selectedOption?.value || '');
  };

  const handleInputChange = (e) => {
    const npi = e.target.value;
    setValue('physiciansNPI', npi);

    const matchingOption = physicians.find((option) => option.value === npi);
    if (matchingOption) {
      setSelectedPhysician(matchingOption);
    } else {
      setSelectedPhysician(null);
    }
  };

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
          physicians_npi: data.physiciansNPI,
          pat_member_id: data.memberId,
          pat_dob: data.dateOfBirth,
          dos: data.dateOfService,
          pat_fname: data.pat_fname,
          physicians_state: data.state,
          physicians_zip: data.zipcode,
        },
      });

      const fetchedResults = response.data.data || [];
      setResults(fetchedResults);
      setFormData(null);
    } catch (error) {
      console.error('Error fetching claims:', error);
      setResults([]);
    } finally {
      console.log(results);
      setLoading(false);
      setShowComplete(true);
    }
  };

  const clearForm = () => {
    reset();
    setFormData(null);
  };

  const handleViewItem = (id) => {
    setSelectedItem(id);
  };

  const [selectedPhysician, setSelectedPhysician] = useState(null);

  useEffect(() => {
    fetchPhysicians();
  }, []);

  return (
    <main className="flex-1 p-8 overflow-auto">
      <h2 className="text-[24px] text-[#3A3541] font-semibold sticky">Claims Explorer</h2>
      <p className="text-[#89868D] text-[16px]">Explore all the claims and check their status</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-custom">
          <div className="grid gap-8 grid-cols-3">
            <div className="flex flex-col gap-2 col-span-1 w-full">
              <label className="block text-[#3A3541] text-[14px]">Physicians Name</label>
              <Select
                options={physicians}
                isLoading={fetchingPhysicians}
                loadingMessage={() => 'Loading physicians...'}
                noOptionsMessage={() => 'No physicians found'}
                isSearchable
                value={selectedPhysician}
                onChange={handleSelectChange}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    height: '44px',
                    borderRadius: '8px',
                    borderColor: '#DBDCDE',
                    backgroundColor: '#F4F5F9',
                  }),
                }}
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 w-full">
              <label className="block text-[#3A3541] text-[14px]">Physicians NPI</label>
              <Input
                placeholder="1760472146"
                value={watch('physiciansNPI')}
                onChange={handleInputChange}
                onClear={() => setValue('physiciansNPI', '')}
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 w-full">
              <label className="block text-[#3A3541] text-[14px]">MemberID</label>
              {/*<Input placeholder="8467382964" {...register('memberId')} />*/}
              <Input
                placeholder="XR6144696"
                value={watch('memberId')}
                onChange={(e) => setValue('memberId', e.target.value)}
                onClear={() => setValue('memberId', '')}
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 w-full">
              <label className="block text-[#3A3541] text-[14px]">Date of Service</label>
              <DatePickerInput
                value={watch('dateOfService')}
                onChange={(date) => {
                  const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : null;
                  setValue('dateOfService', formattedDate);
                }}
                name="dateOfService"
              />

              {/*<DatePickerInput*/}
              {/*  value={watch('dateOfService')}*/}
              {/*  onChange={(date) => {*/}
              {/*    const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : null;*/}
              {/*    setValue('dateOfService', formattedDate);*/}
              {/*  }}*/}
              {/*  name="dateOfService"*/}
              {/*  placeholder="13-01-2022"*/}
              {/*/>*/}
            </div>

            <div className="flex flex-col gap-2 col-span-1 w-full">
              <label className="block text-[#3A3541] text-[14px]">State</label>
              {/*<Input placeholder="" {...register('state')} />*/}
              <Input
                placeholder="TX"
                value={watch('state')}
                onChange={(e) => setValue('state', e.target.value)}
                onClear={() => setValue('state', '')}
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 w-full">
              <label className="block text-[#3A3541] text-[14px]">Zipcode</label>
              {/*<Input placeholder="" {...register('zipcode')} />*/}
              <Input
                placeholder="379092707"
                value={watch('zipcode')}
                onChange={(e) => setValue('zipcode', e.target.value)}
                onClear={() => setValue('zipcode', '')}
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
        {!loading && !selectedItem && showComplete && <SearchResults data={results} onViewItem={handleViewItem} />}
        {!loading && selectedItem && <ClaimDetails item={selectedItem} onBack={() => setSelectedItem(null)} />}
        {!loading && !formData && !showComplete && (
          <div className="flex flex-col items-center">
            <img src={require('../assets/img.png')} alt="Search for claims illustration" className="mb-4 h-56 w-72" />
            <h2 className="text-[32px] text-[#777777] sticky">Search for Physician</h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default Physician;
