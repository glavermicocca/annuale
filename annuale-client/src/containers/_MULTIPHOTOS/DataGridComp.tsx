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
import { withRouter } from 'react-router-dom'

import CreateUpdateModal from './CreateUpdateModal'

const DataGridComp = (props: any) => {
  const sp = props.history.location.pathname.split('/')
  const val = decodeURIComponent(sp[1])
  const anno = decodeURIComponent(sp[2])
  const progr = decodeURIComponent(sp[3])

  const req = new CustomHttpClient(process.env.REACT_APP_BASE_URL_API + `/IMAGESList?val=${val}&anno=${anno}&progr=${progr}`)

  const [refresh, forceRefresh] = useGridRefresh()

  const onRowClick = (row: any) => {
    //props.CreateUpdate(row)
    //props.history.push(`/${encodeURIComponent(row.val)}`)
    //TODO
    //maybe DELETE
  }

  const toolbarOptions = new ToolbarOptions({
    customItems: ButtonRefresh(forceRefresh),
    exportButton: false,
    searchText: false,
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
        gridName="DataGrid_MULTIPHOTOS"
        columns={columns}
        dataSource={req}
        storage={new LocalStorage()}
        rowComponent={DataGridCard}
        rowMobileComponent={DataGridCard}
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
