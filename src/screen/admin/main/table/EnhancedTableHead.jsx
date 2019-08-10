import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Refresh, Edit, Add } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullScreenDialog from '../../../../components/form/FullScreenDialog';

import axios from 'axios';
import _ from 'lodash';

import { PRODUCTS_API, ROOT_HOST } from '../../../../urls';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: 'title', numeric: false, label: 'Tên xe' },
  { id: 'image', numeric: false, label: 'Ảnh xe' },
  { id: 'price', numeric: false, label: 'Giá xe' },
  { id: 'category', numeric: false, label: 'Danh mục' },
  { id: 'brand', numeric: true, label: 'Hãng xe' },
  { id: 'description', numeric: true, label: 'Mô tả' },
  { id: 'edit', numeric: false, label: '  ' },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && (numSelected === rowCount)}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Select all desserts' }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align='left'
            padding='default'
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, itemSeleted, listenDeleted, refreshTable } = props;
  const [openForm, setOpenForm] = React.useState(false);
  
  function handleDelete(itemDeleted) {
    axios({
      method: 'delete',
      url: PRODUCTS_API,
      data: {_idList: _.map(itemDeleted, '_id')}
    });
    listenDeleted(itemDeleted);
  }

  function handleOpenForm(openForm) {
    setOpenForm(openForm);
  }

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
              <Typography variant="h6" id="tableTitle">
                Bike
              </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0
            ? (
            <Tooltip title="Xóa xe đã chọn" onClick={() => handleDelete(itemSeleted)}>
              <IconButton aria-label="Xóa xe đã chọn">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            )
            : (
              <div style={{ display: "flex" }}>
                <Tooltip title="Thêm mới xe" onClick={() => handleOpenForm(true)}>
                  <IconButton aria-label="Thêm mới xe">
                    <Add />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Tải lại dữ liệu" onClick={() => refreshTable()}>
                  <IconButton aria-label="Tải lại dữ liệu">
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </div>
            )}
        </div>
      </Toolbar>
      <FullScreenDialog
        handleOpenForm={handleOpenForm}
        openForm={openForm}
        refreshTable={refreshTable}
      />
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [editRow, setEditRow] = React.useState(null);
  const [openForm, setOpenForm] = React.useState(false);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function listenDeleted(itemDeleted) {
    setRows(_.difference(rows, itemDeleted));
    setSelected([]);
  }

  function handleEdit(editRow) {
    setEditRow({
      _id: editRow._id,
      productInfo: {
        name: editRow.title,
        price: editRow.price,
        category: editRow.category,
        brand: editRow.brand,
        description: editRow.description,
        images: editRow.productImage,
      }
    });
  };
  
  function handleOpenForm(openForm) {
    setOpenForm(openForm);
  }

  function refreshTable() {
    setLoading(true);
    axios.get(`${PRODUCTS_API}?_end=100`)
      .then((res)=>{
        setRows(res.data);
        setLoading(false);
      })
      .catch(err => console.log("ERR TABLE", err))
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    refreshTable();
  }, [])
  if (!rows) return "";
  // if (!rows[0]) return "";
  // console.log(rows[0].productImage.map(img => `${ROOT_HOST}/${img.imageUrl}`));
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          itemSeleted={selected}
          listenDeleted={listenDeleted}
          refreshTable={refreshTable}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {loading
              ? <TableBody>
                  <CircularProgress
                    size={30}
                    style={{
                      marginLeft: "1rem",
                      marginTop: "1rem",
                      marginBottom: "1rem"
                    }}
                  />
                </TableBody>
              : (
                rows.length > 0
                ? (
                    <TableBody>
                      {stableSort(rows, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          // console.log("ROw", row)
                          return (
                            <TableRow
                              hover
                              onClick={event => handleClick(event, row)}
                              style={{cursor: "pointer"}}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={`${row.id}_${index}`}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </TableCell>
                              <TableCell align="left" component="th" id={labelId} scope="row">
                                {row.title}
                              </TableCell>
                              <TableCell align="left">
                                  <img
                                    key={index}
                                    style={{
                                      width: 50,
                                      height: 50,
                                      border: "3px solid #AAA"
                                    }}
                                    src={`${ROOT_HOST}/${row.productImage[0].imageUrl}`}
                                    alt="ảnh xe"
                                  />
                              </TableCell>
                              <TableCell align="left">{row.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</TableCell>
                              <TableCell align="left">{row.category}</TableCell>
                              <TableCell align="left">{row.brand}</TableCell>
                              <TableCell align="left">{row.description.slice(0,50)}...</TableCell>
                              <TableCell align="left">
                              <Tooltip
                                title="Sửa thông tin xe"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(row);
                                  handleOpenForm(true);
                                }}
                              >
                                <IconButton aria-label="Sửa thông tin xe">
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      }
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  )
                : (
                    <TableBody>
                      <p style={{
                        marginLeft: "1rem",
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                        width: "150px"
                      }}>Không có dữ liệu.</p>
                    </TableBody>
                  )
              )
            }
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FullScreenDialog editRow={editRow} openForm={openForm} handleOpenForm={handleOpenForm} />
    </div>
  );
}