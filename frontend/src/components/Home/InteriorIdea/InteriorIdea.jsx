import { Link } from "react-router-dom"

function InteriorIdea() {
  return (
    <>
      {/* interior-idea */}
      <section className="interior-idea">
        <div className="container">
          <div className="interior-idea-titel">
            <h2>
              Because You deserve all the light <span>in the world</span> A bright
              idea, that will last
            </h2>
          </div>
          <div className="interior-idea-inner">
            <div className="row align-centers gx-0">
              <div className="col-12 col-lg-6">
                <div className="interior-idea-item">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <img src="image/idea-1.jfif" alt="" className="w-100 object-fit-contain object-fit-lg-cover" />
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="interior-item-conten">
                        <h3>reflect your interior</h3>
                        <p>
                          {" "}
                          consectetur adipisicing elit. Animi deserunt saepe
                          laudantium, iure fugiat voluptatibus facilis. Laborum, velit
                          vitae, ut rem doloribus aut quia consequatur magni nam
                          pariatur, a quos!
                        </p>
                        <Link href="javascript:voiid(0)">
                          Showe More <i className="fa-solid fa-arrow-right-long" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="interior-idea-item">
                  <div className="row  ">
                    <div className="col-12 col-lg-6">
                      <img src="image/idea-2.jpg" alt="" className="w-100 object-fit-contain object-fit-lg-cover" />
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="interior-item-conten">
                        <h3>reflect your interior</h3>
                        <p>
                          {" "}
                          consectetur adipisicing elit. Animi deserunt saepe
                          laudantium, iure fugiat voluptatibus facilis. Laborum, velit
                          vitae, ut rem doloribus aut quia consequatur magni nam
                          pariatur, a quos!
                        </p>
                        <Link href="javascript:voiid(0)">
                          Showe More <i className="fa-solid fa-arrow-right-long" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default InteriorIdea
