import React from 'react'
import { connect } from 'react-redux'

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

import { CreateUpdate, Delete } from '../../actions/VALORE'

import ButtonRefresh from '../../components/ui-items/ButtonRefresh'

import CustomTbRow from './components/row/CustomTbRow'
import CustomTbMobileRow from './components/row/CustomTbMobileRow'
import { datiFailure } from '../../actions/action-types'
import { withRouter } from 'react-router-dom'

import CreateUpdateModal from './CreateUpdateModal'

export const DataGridComp = (props: any) => {
  const [refresh, forceRefresh] = useGridRefresh()

  const onRowClick = (row: any) => {
    //props.CreateUpdate(row)
    //props.history.push(`/${encodeURIComponent(row.val)}/${encodeURIComponent(row.anno)}/${encodeURIComponent(row.progr)}`)
  }

  const onRowClickDetail = (row: any) => {
    //props.CreateUpdate(row)
    props.history.push(`/${encodeURIComponent(row.val)}/${encodeURIComponent(row.anno)}/${encodeURIComponent(row.progr)}`)
  }

  const CustomTbRowHandler: React.FunctionComponent<TbRowProps> = (rowPros: TbRowProps) => {
    return CustomTbRow(rowPros.columns, rowPros.row, rowPros.onRowClick, rowPros.selection, rowPros.rowSelectionEnabled, onRowClickDetail)
  }

  const CustomTbMobileRowHandler: React.FunctionComponent<TbRowProps> = (rowPros: TbRowProps) => {
    return CustomTbMobileRow(rowPros)
  }

  const toolbarOptions = new ToolbarOptions({
    customItems: ButtonRefresh(forceRefresh),
    exportButton: false,
    searchText: true,
    printButton: false,
    //rowsPerPageOptions: [6, 12, 24, 48],
    //itemsPerPage: 6,
    enablePagination: true,
    advancePagination: true,
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

  const sp = props.history.location.pathname.split('/')
  const val = decodeURIComponent(sp[1])
  const anno = decodeURIComponent(sp[2])

  const reqProgressivo = new CustomHttpClient(process.env.REACT_APP_BASE_URL_API + `/PROGRESSIVO?val=${val}&anno=${anno}`)

  return (
    <>
      <DataGrid
        deps={[refresh]}
        // detailComponent={(ref: any) => {
        //   return <div>pippo + {ref.row.COD_ART}</div>
        // }}
        rowSelectionEnabled={true}
        gridName="DataGrid_PROGRESSIVO"
        columns={columns}
        dataSource={reqProgressivo}
        storage={new LocalStorage()}
        rowComponent={CustomTbRowHandler}
        rowMobileComponent={CustomTbMobileRowHandler}
        //footerComponent={tbFooter}
        onRowClick={onRowClick}
        toolbarOptions={toolbarOptions}
        onError={(error: any) => props.DatiFailure(error)}
      />
      {props.user !== null && <CreateUpdateModal />}
    </>
  )
}

const mapStateToProps = (state: any, props: any) => {
  const { auth } = state
  const { open, result } = state.VALORE

  return {
    user: auth ? auth.user : null,
    role: auth ? auth.role : null,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataGridComp))
