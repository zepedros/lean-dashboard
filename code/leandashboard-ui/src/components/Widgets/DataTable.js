import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function DataTable({widget}) {
  
  console.log(widget)
  var keys = Object.keys(widget.data[0]);
  console.log(keys)
  const columns = () => {
      return keys.map(
        key=> {
          const aux = 
          {
            field: key,
            headerName: key,
            width: 150,
            editable:false
          }
          return aux
        }
      )
  }
  
  const rows = widget.data
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns()}
        pageSize={5}
        checkboxSelection={false}
      />
    </div>
  );
}