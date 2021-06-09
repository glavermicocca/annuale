import { connect } from 'react-redux'

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

import { datiFailure } from '../../actions/action-types'
import { DataGridCard } from './components/row/DataGridCard'
import { DataGridCardReadOnly } from './components/row/DataGridCardReadOnly'
import { withRouter } from 'react-router-dom'

import CreateUpdateModal from './CreateUpdateModal'

const DataGridComp = (props: any) => {
  const reqValore = new CustomHttpClient(process.env.REACT_APP_BASE_URL_API + `/VALORE`)

  const [refresh, forceRefresh] = useGridRefresh()

  const onRowClick = (row: any) => {
    //props.CreateUpdate(row)
    props.history.push(`/${encodeURIComponent(row.val)}`)
  }

  const toolbarOptions = new ToolbarOptions({
    customItems: ButtonRefresh(forceRefresh),
    exportButton: false,
    searchText: true,
    printButton: false,
    rowsPerPageOptions: [],
    itemsPerPage: -1,
    enablePagination: false,
    advancePagination: false,
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
        mobileBreakpointWidth={50000}
        // detailComponent={(ref: any) => {
        //   return <div>pippo + {ref.row.COD_ART}</div>
        // }}
        rowSelectionEnabled={true}
        gridName="DataGrid_VALORE"
        columns={columns}
        dataSource={reqValore}
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
