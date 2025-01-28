import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ClaimDetails from '../components/ClaimDetails';
import Input from '../components/ui-elements/Input';
import Loader from '../components/ui-elements/Loader';
import axios from 'axios';
import SearchResults from '../components/SearchResults';

const Payments = (props) => {
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

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [results, setResults] = useState([]);
  const [showComplete, setShowComplete] = useState(false);

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
          inbound_claim_id: data.inbound_claim_id,
          outbound_claim_id: data.outbound_claim_id,
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

  return (
    <main className="flex-1 p-8 overflow-auto">
      <h2 className="text-[24px] text-[#3A3541] font-semibold sticky">Claims Explorer</h2>
      <p className="text-[#89868D] text-[16px]">Explore all the claims and check their status</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-custom">
          <div className="grid gap-8  grid-cols-3">
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Inbound Claim ID</label>
              <Input
                placeholder=""
                value={watch('inbound_claim_id')}
                onChange={(e) => setValue('inbound_claim_id', e.target.value)}
                onClear={() => setValue('inbound_claim_id', '')}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label className="block text-[#3A3541] text-[14px]">Outbound Claim ID</label>
              <Input
                placeholder=""
                value={watch('outbound_claim_id')}
                onChange={(e) => setValue('outbound_claim_id', e.target.value)}
                onClear={() => setValue('outbound_claim_id', '')}
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
            <h2 className="text-[32px] text-[#777777] sticky">Search for Payments</h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default Payments;
