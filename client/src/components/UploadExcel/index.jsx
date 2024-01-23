import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

const UploadExcel = () => {
  const [jsonData, setJsonData] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      // Assuming the first sheet is the one you want to convert
      const sheetName = workbook.SheetNames[0];
      const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      setJsonData(json);
    };

    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box sx={{ mt: 5, p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Excel to JSON Converter
      </Typography>

      <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <Typography>Drag & drop an Excel file here, or click to select one</Typography>
      </div>

      {jsonData && (
        <div>
          <Typography variant="h6" mt={3} mb={2}>
            JSON Output:
          </Typography>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </Box>
  );
};

export default UploadExcel;
