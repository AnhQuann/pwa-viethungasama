import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";

const useStyles = makeStyles({
  container: {
    margin: "10px 0px",
    maxWidth: "100%",
    padding: 0,
  }
});


export default function CarouselPage() {
  const classes = useStyles();
  return (
    <MDBContainer className={classes.container}>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://wallpaperplay.com/walls/full/1/2/3/195381.jpg"
                alt="First slide"
                style={{ height: 561 }}
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://wallpaperaccess.com/full/225325.jpg"
                alt="Second slide"
                style={{ height: 561 }}
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://wallpaperplay.com/walls/full/e/b/4/195408.jpg"
                alt="Third slide"
                style={{ height: 561 }}
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
}