

function Models() {
  return (
    <section className="models">
      <div className="container">
        <div className="row align-center justify-content-between">
          <div className="col-12 col-lg-4 mb-3 mb-lg-0">
            <div className="models-titel text-lg-start text-center">
              <h2>Latest Models</h2>
              <p>
                Lorem ipsum dolor sit amet elit. Ducimus,zamet .Ducimus
                sit,adipisicing zamet sit elit.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-8 d-flex  justify-content-around justify-content-lg-end">
            <div className="models-inner w-100">
              <div className="row  align-center  justify-content-between">
                {/* 1 */}
                <div className="col-3">
                  <div className=" models-item">
                    <img src="image/model-1.png" alt="" />
                    <h6>FLOOR LAMPS</h6>
                  </div>
                </div>

                {/* 2 */}
                <div className="col-3">
                  <div className=" models-item">
                    <img src="image/model-2.jpg" alt="" />
                    <h6>PENDANT</h6>
                  </div>
                </div>

                {/* 3 */}
                <div className="col-3">
                  <div className=" models-item">
                    <img src="image/model-3.jpg" alt="" />
                    <h6>HOME ACCENT</h6>
                  </div>
                </div>

                {/* 4 */}
                <div className="col-3">
                  <div className=" models-item">
                    <img src="image/model-4.jpg" alt="" />
                    <h6>TABLE LAMPS</h6>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Models
