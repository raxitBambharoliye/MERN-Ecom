
function Banner() {
  return (
    <div>
      <section className="banner">
        <div className="container">
          <div className="d-flex align-center  position-relative">
            <div className="w-100  ">
              <div className="banner-titel">
                <p>up to 50% off almost everyitem</p>
                <h1>A BATTER WAY OF LIGHTING</h1>
                <button className="btn-them">SHOP NOW</button>
              </div>
            </div>
            <div className="w-100 homePageBannerImage ">
              <img src={'/image/banner.jpg'} alt={"banner Image"}  />
            </div>
          </div>
        </div>
      </section>

        </div>
  )
}

export default Banner
