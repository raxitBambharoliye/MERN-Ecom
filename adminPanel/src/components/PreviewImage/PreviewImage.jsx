import React, { useEffect, useId, useState } from 'react'
import { useSelector } from 'react-redux';

function PreviewImage({
  imageWidth = "150px",
  imageHeight = "150px",
  src = "./image/dummy.jpg",
  alt = "profilePic",
  labelClass,
  ...props
}, ref) {
  const singleImage= useSelector((state)=>state.dataReducer.singlePreviewImage)
  const [preImage, setPreImage] = useState(singleImage);
  const Id = useId();
  const [removeImg, setRemoveImg] = useState(false);

  useEffect(() => {

    if (singleImage) {
      console.log('singleImage Preview ', singleImage)
      setPreImage(singleImage);
    } else {
      setPreImage("./image/dummy.jpg");
      
    }
  },[singleImage])

  const imageOnChangeHandler = (e) => {
    console.log(e.target.value)
    setPreImage(URL.createObjectURL(e.target.files[0]));
  }
  const removeImage = () => {
     document.getElementById(Id).value='';
    setPreImage('./image/dummy.jpg');
    setRemoveImg(true)
  }
  return (
    <div className='position-relative'>
      <label htmlFor={Id} id='previewImgLabel' className={`previewImageLabel ${labelClass}`} style={{ borderRadius: "8px" }}>
        <img src={preImage} alt={alt} style={{ width: imageWidth, height: imageHeight, }} />
        <i className="fa-solid fa-pen position-absolute top-50 start-50 translate-middle " />
        <button type='button' className="removeImgBtn" onClick={removeImage}><i className="fa-solid fa-xmark" /></button>
      </label>
      <input type="file" className='visually-hidden' id={Id} {...props} ref={ref} onChange={imageOnChangeHandler} />
    </div>
  )
}
export default React.forwardRef(PreviewImage);