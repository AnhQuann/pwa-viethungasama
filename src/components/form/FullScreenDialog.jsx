import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import { AddAPhoto, Cancel } from '@material-ui/icons';
import './FullScreenDialog.css';

import axios from 'axios';
import numeral from 'numeral';
import _ from 'lodash';

import { PRODUCTS_API, UPLOAD_API } from '../../urls';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    description: '',
    images: [],
  })
  
  const [submitted, setSubmitted] = React.useState(false);
  const [imgUrls, setImgUrls] = React.useState([]);
  const [hoverImage, setHoverImage] = React.useState(false);
  const uploadImageInput = React.useRef(null);

  const { openForm, handleOpenForm, editRow, refreshTable } = props;

  function handleDeleteImage(img) {
    setImgUrls(_.difference(imgUrls, [img]));
  }

  const renderImgUpload = () => {
    return imgUrls.map((img, index) => (
      <div
        key={index}
        style={{ marginRight: hoverImage ? "42px" : '25px', display: "flex" }}
        onMouseEnter={e => setHoverImage(true)}
        onMouseLeave={e => setHoverImage(false)}
        onTouchMove={e => setHoverImage(true)}
        onTouchEnd={e => setHoverImage(false)}
      >
        <div className="import-image-form" >
          <img src={img} alt="" className={`${hoverImage ? 'opacity-20' : ''}`} />
        </div>
          {hoverImage &&
            <Tooltip title="Xóa ảnh" className="tooltip-delete-image" onClick={e => handleDeleteImage(img)} >
              <IconButton aria-label="Xóa ảnh">
                <Cancel/>
              </IconButton>
            </Tooltip>
          }
      </div>
    ))
    
    
  }

  const handleChange = name => event => {
    if (name === 'imgUpload') {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImgUrls([...imgUrls, reader.result]);
      }
      if (file) {
        reader.readAsDataURL(file);
        setValues({ ...values, images: [...values.images, file]});
      }
    } else {
      setValues({ ...values, [name]: event.target.value });
    }
  };

  const handleForm = async e => {
    e.preventDefault();
    const imageFormData = new FormData();
    values.images.forEach((img) => imageFormData.append('image', img))    
    let imgUrls = await axios({
      method: 'post',
      url: UPLOAD_API,
      data: imageFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    axios({
      method: 'post',
      url: PRODUCTS_API,
      data: {
        title: values.name,
        price: !values.price ? 0 : values.price.match(/\d/g).join(''),
        category: values.category,
        brand: values.brand,
        description: values.description,
        productImage: imgUrls.data.map(imgLink => ({imageUrl: imgLink, productColor: ""})),
      }
    });
    setSubmitted(true);
  }

  const handleFormEdit = e => {
    e.preventDefault();
    axios({
      method: 'put',
      url: `${PRODUCTS_API}/${editRow._id}`,
      data: {
        title: values.name,
        price: !values.price ? 0 : (isNaN(values.price) ? (values.price.match(/\d/g).join('')) : values.price),
        category: values.category,
        brand: values.brand,
        description: values.description,
        productImage: values.images,
      }
    });
    setSubmitted(true);
  }

  const handleCloseSnackBar = () => {
    setSubmitted(false);
  }

  useEffect(() => {
    if (editRow) {
      setValues(editRow.productInfo);
    }
  }, [editRow])

  return (
    <div>
      <Dialog
        className="form-dialog"
        fullScreen open={openForm}
        onClose={e => handleOpenForm(false)}
        TransitionComponent={Transition}
        onScroll={e => {
          window.addEventListener("scroll",()=> {
            window.scrollTo(0, 0);
          });
        }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={e => {
                handleOpenForm(false);
                refreshTable();
              }}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Thêm xe vào kho
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper style={{margin: "1rem"}} className="form-dialog">
          <form className="form-dialog" style={{margin: "1rem"}} onSubmit={(e) => editRow ? handleFormEdit(e) : handleForm(e)} >
            <h3 style={{fontFamily:"'Roboto', 'Helvetica', 'Arial', sans-serif"}}>Phiếu nhập xe</h3>
            <TextField
              label="Tên xe"
              value={values.name}
              onChange={handleChange('name')}
              margin="normal"
              required
              fullWidth
            />
            <TextField
              label="Giá xe"
              value={numeral(values.price).format('($0,0)')}
              onChange={handleChange('price')}
              margin="normal"
              required
              fullWidth
            />
            <TextField
              label="Danh mục"
              value={values.category}
              onChange={handleChange('category')}
              margin="normal"
              required
              fullWidth
            />
            <TextField
              label="Hãng xe"
              value={values.brand}
              onChange={handleChange('brand')}
              margin="normal"
              required
              fullWidth
            />
            <TextField
              label="Mô tả"
              value={values.description}
              onChange={handleChange('description')}
              margin="normal"
              required
              fullWidth
            />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {renderImgUpload()}
              <div className="import-image-form" onClick={e => uploadImageInput.current.click()} >
                <AddAPhoto />
                <input type="file" onChange={handleChange('imgUpload')} ref={uploadImageInput} style={{ display: "none" }}/>
              </div>
            </div>
            <div style={{float: "right", margin: "1rem 0"}}>
              <Button
                onClick={() => {
                  !editRow 
                    ? setValues(
                        {
                          name: '',
                          price: '',
                          category: '',
                          brand: '',
                          description: '',
                          images: [],
                        }
                      )
                    : setValues(editRow.productInfo);
                }}
                style={{ marginRight: "1rem" }}
                size="large"
                variant="contained"
                color="primary"
              >Làm lại</Button>
              <Button type="submit" disabled={imgUrls.length > 0 ? false : true} size="large" variant="contained" color="secondary">Lưu</Button>
            </div>
          </form>
        </Paper>
      </Dialog>
      <Snackbar
        anchorOrigin={{vertical: "bottom", horizontal: "center" }}
        open={submitted}
        onClose={handleCloseSnackBar}
        message={<span>Lưu thành công</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={(e) => handleCloseSnackBar()}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}
