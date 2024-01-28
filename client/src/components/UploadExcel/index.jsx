import React, { useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Button, Grid } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';


const UploadExcel = () => {
  const [jsonData, setJsonData] = useState(null);
  const [selectedJson, setSelectedJson] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [allColumns, setAllColumns] = useState([]);

  //handle file upload
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      // Assuming the first sheet is the one you want to convert
      const sheetName = workbook.SheetNames[0];
      const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Extract column names
      const columns = Object.keys(json[0]);
      setAllColumns(columns);

      setJsonData(json);
    };

    reader.readAsBinaryString(file);
  };

  //handle column toggle
  const handleColumnToggle = (column) => {
    setSelectedColumns((prevSelectedColumns) => {
      if (prevSelectedColumns.includes(column)) {
        return prevSelectedColumns.filter((col) => col !== column);
      } else {
        return [...prevSelectedColumns, column];
      }
    });
  };

  //render column checkbox list
  const renderColumnCheckboxList = () => {
    return allColumns.map((column) => (
      <FormControlLabel
        key={column}
        control={
          <Checkbox
            checked={selectedColumns.includes(column)}
            onChange={() => handleColumnToggle(column)}
            value={column}
            sx={{
              color: 'primary.secondary',
              '&.Mui-checked': {
                color: 'neutral.light',
              },
              fontSize: '20px',
            }}
          />
        }
        label={column}
        sx={{ mb: 1, mt: 0, ml: 1, color: 'text.primary' }}
      />
    ));
  };

  //render userNames checkbox list

  //generate selected json data
  const generateSelectedJson = () => {
    const tempSelectedJson = jsonData.map((item) => {
      const selectedData = {};
      selectedColumns.forEach((column) => {
        selectedData[column] = item[column];
      });
      return selectedData;
    });
    setSelectedJson(tempSelectedJson);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box sx={{ mt: 5, p: 3 }}>
      {jsonData ? (
        <div>
          <div>
            <div>
              <Typography variant="h3" mt={3} mb={2}>
                Select Columns:
              </Typography>
              <Typography variant="h5" mt={3} mb={2}>
                {renderColumnCheckboxList()}
              </Typography>

            </div>
            <Button variant="contained" color="secondary" onClick={generateSelectedJson}>Add Columns</Button>
          </div>
          <div>
            <Typography variant='h3' mt={3} mb={2}>
              All User Names:
            </Typography>
            <Typography variant='h5' mt={3} mb={2}>

            </Typography>

          </div>

        </div>
      ) : (
        <div>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Upload Excel Sheet
          </Typography>

          <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <Typography>Drag & drop an Excel data file here, or click to select one</Typography>
          </div>
        </div>
      )}
    </Box>
  );
};

export default UploadExcel;
