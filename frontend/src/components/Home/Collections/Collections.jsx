import React from 'react'

function Collections() {
    return (
        <section className="collection">
            <div className="collection-titel">
                <h2>New Collection</h2>
            </div>
            <div className="collection-inner">
                <div className="container">
                    <div className="scroll-container">
                        <div className="d-flex">
                            {/* 1 */}
                            <div className="col-6 col-md-4 col-lg-3 scroll-item">
                                <div className="collection-item">
                                    <img src="image/collection1.jpg" alt="leamp1" />
                                    <div className="text">
                                        <h5>moke you smiple style</h5>
                                        <p>$44.40</p>
                                    </div>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col-6 col-md-4 col-lg-3 scroll-item">
                                <div className="collection-item">
                                    <img src="image/collection2.jpg" alt="leamp1" />
                                    <div className="text">
                                        <h5>moke you smiple style</h5>
                                        <p>$44.40</p>
                                    </div>
                                </div>
                            </div>
                            {/* 3 */}
                            <div className="col-6 col-md-4 col-lg-3 scroll-item">
                                <div className="collection-item">
                                    <img src="image/collection3.jpg" alt="leamp1" />
                                    <div className="text">
                                        <h5>moke you smiple style</h5>
                                        <p>$44.40</p>
                                    </div>
                                </div>
                            </div>
                            {/* 4 */}
                            <div className="col-6 col-md-4 col-lg-3 scroll-item">
                                <div className="collection-item">
                                    <img src="image/collection4.jpg" alt="leamp1" />
                                    <div className="text">
                                        <h5>moke you smiple style</h5>
                                        <p>$44.40</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn-them">SHOPE NOW</button>
                </div>
            </div>
        </section>

    )
}

export default Collections
