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
import { DataGridCard } from './components/row/DataGridCard'
import { DataGridCardReadOnly } from './components/row/DataGridCardReadOnly'

import { withRouter } from 'react-router-dom'

import CreateUpdateModal from './CreateUpdateModal'

const CustomTbRowHandler: React.FunctionComponent<TbRowProps> = (rowPros: TbRowProps) => {
  return CustomTbRow(rowPros)
}

const CustomTbMobileRowHandler = (rowProp: TbRowProps) => {
  return CustomTbMobileRow(rowProp)
}

export const DataGridComp = (props: any) => {
  const [refresh, forceRefresh] = useGridRefresh()

  const onRowClick = (row: any) => {
    //props.CreateUpdate(row)
    props.history.push(`/${encodeURIComponent(row.val)}/${encodeURIComponent(row.anno)}`)
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

  console.log(props.history.location.pathname.split('/'))

  const sp = props.history.location.pathname.split('/')
  const val = decodeURIComponent(sp[1])

  const reqAnnuale = new CustomHttpClient(process.env.REACT_APP_BASE_URL_API + `/ANNUALE?val=${val}`)

  return (
    <>
      <DataGrid
        mobileBreakpointWidth={50000}
        deps={[refresh]}
        // detailComponent={(ref: any) => {
        //   return <div>pippo + {ref.row.COD_ART}</div>
        // }}
        rowSelectionEnabled={true}
        gridName="DataGrid_VALORE"
        columns={columns}
        dataSource={reqAnnuale}
        storage={new LocalStorage()}
        rowComponent={props.user !== null ? DataGridCard : DataGridCardReadOnly}
        rowMobileComponent={props.user !== null ? DataGridCard : DataGridCardReadOnly}
        //footerComponent={tbFooter}
        onRowClick={onRowClick}
        toolbarOptions={toolbarOptions}
        onError={(error: any) => props.DatiFailure(error)}
      />
      {props.user !== null && <CreateUpdateModal />}
    </>
  )
}

const mapStateToProps = (state: any) => {
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
