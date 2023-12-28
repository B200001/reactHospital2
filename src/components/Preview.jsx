import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import db from '../firebase';
import '../styles/preview.scss';

const Preview = () => {
  const { userId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const dbRef = ref(db, userId);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataFromDb = snapshot.val();
      setData(dataFromDb || {});
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const renderData = (data) => {
    
    const formKeysOrder = {
      'formOneData': [
        'name', 'age', 'area', 'location', 'education', 'educationLevel', 'smoking', 'alcohol',
      'bloodGroup', 'weight', 'height', 'caesarean', 'complication', 'complicationRemarks',
      'gravida', 'parity', 'mensuralDate', 'expectedDeliveryDate', 'gestationalAge', 'systolicBP',
      'diastolicBP', 'haemoglobin', 'fetalHeartRate', 'hypertension', 'highComplication',
      'highComplicationRemarks', 'hiv', 'syphilis', 'maleria', 'hepatitisB', 'activePlacita',
      'labourInduction', 'megasulfIinjection', 'oxytocinInjection', 'antibiotic', 'bloodTransfusion',
        // ... other FormOne fields
      ],
      'formTwoData': [
        'doctorsName', 'deliveryDateTime', 'deliveryType', 'statusOfWomen', 'numberOfDelivery',
        'birthType', 'vitaminK1', 'BCG', 'OPV', 'hepatitis', 'motherComplication', 'newBornComplication',
        'newBornFields', // Include the dynamic newborn fields array
        // ... other FormTwo fields
      ],
    };
  
    return Object.keys(formKeysOrder).map((formKey) => {
      return (
        <div key={formKey}>
          <h2>{formKey === 'formOneData' ? 'Form One Data' : 'Form Two Data'}</h2>
          <table>
            <tbody>
              {formKeysOrder[formKey].map((fieldName) => {
                const value = data[formKey]?.[fieldName];
  
                if (value !== undefined) {
                  return (
                    <tr key={`${formKey}-${fieldName}`}>
                      <td>{fieldName}</td>
                      <td>{typeof value === 'object' ? renderData(value) : value}</td>
                    </tr>
                  );
                }
  
                return null;
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div className="preview-container">
      <h1>Data Preview for User: {userId}</h1>
      <div className="data-container">
        <table>
          <tbody>
            {renderData(data)}
          </tbody>
        </table>
      </div>
      {/* Buttons */}
      <div className="preview-two-buttons">
        {/* No need to conditionally render FormTwo or FormTwoView component */}
        <Link to={`/formTwo/${userId}`}>
          <button className="preview-two-button">Go to FormTwo</button>
        </Link>
        <Link to={'/'}>
          <button className="preview-two-button">Exit</button>
        </Link>
      </div>
    </div>
  );
};

export default Preview;