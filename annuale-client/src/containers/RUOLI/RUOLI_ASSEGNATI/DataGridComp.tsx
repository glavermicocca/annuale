import React, { useState } from 'react'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'
import { DataGrid } from 'tubular-react/dist/DataGrid'
import { useGridRefresh } from 'tubular-react-common'
import { LocalStorage } from 'tubular-common'

import CustomHttpClient from '../../../utils/CustomHttpClient'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { columns as columnsDepositi } from './ColumnsDepositi'

import { ToolbarOptions } from 'tubular-react/dist/Toolbar'

import { Delete } from '../../../actions/RUOLI_ASSEGNATI'

import CustomTbRow from './components/row/CustomTbRow'
import CustomTbMobileRow from './components/row/CustomTbMobileRow'

import InsertRow from './InsertRow'

import { makeStyles } from '@material-ui/core/styles'
import { datiFailure } from '../../../actions/action-types'

const CustomTbRowHandler: React.FunctionComponent<TbRowProps> = (rowPros: TbRowProps) => {
  return CustomTbRow(rowPros)
}

const CustomTbMobileRowHandler = (rowProp: TbRowProps) => {
  return CustomTbMobileRow(rowProp)
}

export const DataGridComp = (props: any) => {
  const useStyles = makeStyles(theme => ({
    fifty: {
      width: '50%'
    }
  }))

  const classes = useStyles()

  const req = new CustomHttpClient(process.env.REACT_APP_BASE_URL_API + `/RUOLI_ASSEGNATI?id_ruolo=${props.row.id}&is_cliente=${props.is_cliente}`)

  const onRowClick = (row: any) => {
    //nothing
  }

  // const [refresh, forceRefresh] = useGridRefresh()

  // if (props.resultInsert.length > 0) {
  //   forceRefresh()
  // }

  const toolbarOptions = new ToolbarOptions({
    //customItems: ButtonRefresh(forceRefresh),
    customItems: <InsertRow {...props} />,
    advancePagination: false,
    //title: title,
    exportButton: false,
    searchText: true,
    printButton: false,
    rowsPerPageOptions: [12, 24, 48],
    itemsPerPage: 12,
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
        // deps={[refresh]}
        // detailComponent={(ref: any) => {
        //   return <div>pippo + {ref.row.COD_ART}</div>
        // }}
        //deps={[refresh]}
        rowSelectionEnabled={true}
        gridName="DataGrid_RUOLI_ASSEGNATI"
        columns={columnsDepositi}
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

const mapStateToProps = (state: any, props: any) => {
  const { open, result, rowsClienti, rowsDepositi, resultInsert } = state.RUOLI_ASSEGNATI

  return {
    open,
    result,
    resultInsert,
    rowsClienti,
    rowsDepositi,
    ...props
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    Delete: (selection: any) => {
      dispatch(Delete(selection))
    },
    DatiFailure: (error: any) => {
      dispatch(datiFailure(error))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGridComp)
