import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import db from '../firebase';
import FormOne from './FormOne'; // Import your Form1 component
import PreviewOne from './PreviewOne'; // Import your PreviewForm1 component

const FormDetails = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const formsRef = ref(db, `${userId}`);

    onValue(formsRef, (snapshot) => {
      const data = snapshot.val();
      setFormData(data);
      console.log(formData);
    });
  }, [userId]);

  const isForm1Available = formData && formData.formType === 'Formone';
  const isForm2Available = formData && formData.formType === 'FormTwo';
  const bothForms = isForm1Available && isForm2Available;

  return (
    <div>
      <h1>Form Details Page</h1>
      <p>User ID: {userId}</p>

      {/* {isForm1Available && isForm2Available && (
        <p>Form 1 and Form 2 are available.</p>
      )}

      {isForm1Available && !isForm2Available && (
        <p>Form 1 is available, but Form 2 is not.</p>
      )}

      {!isForm1Available && isForm2Available && (
        <p>Form 1 is not available, but Form 2 is.</p>
      )}

      {!isForm1Available && !isForm2Available && (
        <p>Neither Form 1 nor Form 2 is available.</p>
      )} */}

      {/* return ( */}
      {/* <div> */}
      <h1>Form Details Page</h1>
      <p>User ID: {userId}</p>

      {/* {formData ? (
        <div>
          <p>Form Data:</p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      ) : (
        <p>No form data available.</p>
      )} */}

      <Link to={`/formOne/${userId}`}>
        {formData ? (
          <Link to={`/formOneView/${userId}`}>
            <button className="preview-two-button">Preview Form1</button>
          </Link>
        ) : (
          <Link to={`/formOne/${userId}`}>
            <button className="preview-two-button">Form1</button>
          </Link>
        )}
      </Link>

      <Link to={`/formTwo/${userId}`}>
        {formData ? (
          <Link to={`/formTwoView/${userId}`}>
            <button className="preview-two-button">Preview Form2</button>
          </Link>
        ) : (
          <Link to={`/formTwo/${userId}`}>
            <button className="preview-two-button">Form2</button>
          </Link>
        )}
      </Link>
      <Link to={`/preview/${userId}`}>
        {formData ? (
          <button className="preview-two-button">Preview</button>
        ) : (
          <button className="preview-two-button">Form1</button>
        )}
      </Link>
    </div>
  );
};

export default FormDetails;
