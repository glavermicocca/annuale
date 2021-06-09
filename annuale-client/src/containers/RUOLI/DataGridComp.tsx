import React, { useState } from 'react'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'
import { DataGrid } from 'tubular-react/dist/DataGrid'
import { useGridRefresh } from 'tubular-react-common'
import { LocalStorage } from 'tubular-common'

import CustomHttpClient from '../../utils/CustomHttpClient'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { columns } from './Columns'

import { ToolbarOptions } from 'tubular-react/dist/Toolbar'

import { CreateUpdate, Delete } from '../../actions/RUOLI'

import ButtonRefresh from '../../components/ui-items/ButtonRefresh'

import CustomTbRow from './components/row/CustomTbRow'
import CustomTbMobileRow from './components/row/CustomTbMobileRow'
import { datiFailure } from '../../actions/action-types'

const CustomTbRowHandler: React.FunctionComponent<TbRowProps> = (rowPros: TbRowProps) => {
  return CustomTbRow(rowPros)
}

const CustomTbMobileRowHandler = (rowProp: TbRowProps) => {
  return CustomTbMobileRow(rowProp)
}

export const DataGridComp = (props: any) => {
  const req = new CustomHttpClient(process.env.REACT_APP_BASE_URL_API + `/RUOLI`)

  const [refresh, forceRefresh] = useGridRefresh()

  const onRowClick = (row: any) => {
    props.CreateUpdate(row)
  }

  const toolbarOptions = new ToolbarOptions({
    customItems: ButtonRefresh(forceRefresh),
    advancePagination: false,
    exportButton: true,
    searchText: true,
    printButton: true,
    rowsPerPageOptions: [6, 12, 24, 48],
    itemsPerPage: 6,
    enablePagination: true,
    //advancePagination: false,
    actionsArea: ({ selection }) => {
      return (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => props.Delete(selection)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
    }
  })
  return (
    <>
      <DataGrid
        deps={[refresh]}
        // detailComponent={(ref: any) => {
        //   return <div>pippo + {ref.row.COD_ART}</div>
        // }}
        rowSelectionEnabled={true}
        gridName="DataGrid_RUOLI"
        columns={columns}
        dataSource={req}
        storage={new LocalStorage()}
        rowComponent={CustomTbRowHandler}
        rowMobileComponent={CustomTbMobileRowHandler}
        //footerComponent={tbFooter}
        onRowClick={onRowClick}
        toolbarOptions={toolbarOptions}
        onError={(error: any) => props.DatiFailure(error)}
      />
    </>
  )
}

const mapStateToProps = (state: any) => {
  const { open, result } = state.RUOLI
  return {
    open,
    result
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    CreateUpdate: (initialValues: any) => {
      dispatch(CreateUpdate(initialValues))
    },
    Delete: (selection: any) => {
      dispatch(Delete(selection))
    },
    DatiFailure: (error: any) => {
      dispatch(datiFailure(error))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGridComp)
