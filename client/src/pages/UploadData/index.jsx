import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'
import UploadExcel from '../../components/UploadExcel'

const UploadData = () => {
  return (
    <Box m="20px">
      <Header title="Upload Data" subTitle="Upload data files and Select type" />
      <UploadExcel />
    </Box>
  )
}

export default UploadData
