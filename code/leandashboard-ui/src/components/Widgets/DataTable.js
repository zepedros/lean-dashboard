import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function DataTable({ widget }) {

  console.log(widget)
  var keys = Object.keys(widget.data[0]);
  console.log(keys)
  const columns = () => {
    let columns = [{
      id: 'id',
      headerName: 'id',
      width: 150,
      editable: false,
      hide: true
    }]
    keys.map(
      key => {
        const aux =
        {
          field: key,
          headerName: key,
          width: 150,
          editable: false
        }
        columns.push(aux)
      }
    )
    return columns
  }

  const rows = () => {
    let rows = []
    let i = 1
    widget.data.map(data=>{
      let aux = {id: i}
      rows.push(Object.assign(aux,data))
      i++
    })
    return rows
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows()}
        columns={columns()}
        pageSize={5}
        checkboxSelection={false}
      />
    </div>
  );
}