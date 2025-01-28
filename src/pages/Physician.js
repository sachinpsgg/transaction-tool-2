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
      setValue('Pharmacy_NPI', npiValue); // Set the physiciansNPI input value
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
      const response = await axios.get('https://edi-api-demo.edix12pro.com/api/listPharmacy');
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
    setValue('Pharmacy_NPI', selectedOption?.value || '');
  };

  const handleInputChange = (e) => {
    const npi = e.target.value;
    setValue('Pharmacy_NPI', npi);

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
        url: 'https://edi-api-demo.edix12pro.com/api/listClaimsA',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          Cardholder_ID: data.Cardholder_ID,
          Pharmacy_NPI: data.Pharmacy_NPI,
          Date_Processed: data.Date_Processed,
          Pharmacy_State:data.Pharmacy_State,
          Pharmacy_Zip_Code:data.Pharmacy_Zip_Code,
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
              <label className="block text-[#3A3541] text-[14px]">Pharmacy Name</label>
              <Select
                options={physicians}
                isLoading={fetchingPhysicians}
                loadingMessage={() => 'Loading pharmacy...'}
                noOptionsMessage={() => 'No pharmacy found'}
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
              <label className="block text-[#3A3541] text-[14px]">Pharmacy NPI</label>
              <Input
                placeholder="1760472146"
                value={watch('Pharmacy_NPI')}
                onChange={handleInputChange}
                onClear={() => setValue('Pharmacy_NPI', '')}
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 w-full">
              <label className="block text-[#3A3541] text-[14px]">MemberID</label>
              {/*<Input placeholder="8467382964" {...register('memberId')} />*/}
              <Input
                placeholder="XR6144696"
                value={watch('Cardholder_ID')}
                onChange={(e) => setValue('Cardholder_ID', e.target.value)}
                onClear={() => setValue('Cardholder_ID', '')}
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 w-full">
              <label className="block text-[#3A3541] text-[14px]">Date Processed</label>
              <DatePickerInput
                value={watch('Date_Processed')}
                onChange={(date) => {
                  const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : null;
                  setValue('Date_Processed', formattedDate);
                }}
                name="Date_Processed"
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
                value={watch('Pharmacy_State')}
                onChange={(e) => setValue('Pharmacy_State', e.target.value)}
                onClear={() => setValue('Pharmacy_State', '')}
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 w-full">
              <label className="block text-[#3A3541] text-[14px]">Zipcode</label>
              {/*<Input placeholder="" {...register('zipcode')} />*/}
              <Input
                placeholder="379092707"
                value={watch('Pharmacy_Zip_Code')}
                onChange={(e) => setValue('Pharmacy_Zip_Code', e.target.value)}
                onClear={() => setValue('Pharmacy_Zip_Code', '')}
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
            <h2 className="text-[32px] text-[#777777] sticky">Search for Pharmacy</h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default Physician;
