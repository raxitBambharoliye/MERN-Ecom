import React from 'react'
import { Button, Input, TextArea } from '../../components/';
import {useForm} from 'react-hook-form'
function ContactUs() {
  const contactData = [
    { icon: "fa-solid fa-phone", text: '+91 9427741387' },
    { icon: "fa-solid fa-envelope", text: 'lemp.store@gmail.com' },
    { icon: "fa-solid fa-location-dot", text: '28 palediyam shoping, yogi chow,varacha-surat-231 456.' },
  ]

  const { register, handleSubmit,formState:{errors} } = useForm()
  

  const contactUsSubmit = async (data) => {
    try {
      
      console.log('data',data )
    } catch (error) {
      
    }
  }

  return (
    <section className='contactUs'>
      <div className="contactUsTitle text-center">
        <h2>Contact Us</h2>
        <h4>Any question or remarks? Just write us a message!</h4>
      </div>
      <div className="container">
        <div className="contactUsInner">
          <div className="row align-items-center">
            <div className="col-12 col-lg-5">
              <div className="contactUsLeft">
                <div className="contactUsLeftTitle ">
                  <h2 className='m-0'>Contact Information</h2>
                  <p>Say something to start a live chat!</p>
                </div>
                <div className="contactUsData">
                  {contactData.map((element , index)=> (
                     <div className="contactUsItem d-flex  align-items-center  " key={index}>
                    <div className="icon">
                      <i className={element.icon}/>
                    </div>
                    <div className="content">
                        <p className='m-0'>{element.text }</p>
                    </div>
                  </div>
                  ))}
                 
                 
                </div>
                <div className="contactUsLinks d-flex ">
                  <div className="LinkItem">
                  <i className="fa-brands fa-linkedin"></i>
                  </div>
                  <div className="LinkItem">
                  <i className="fa-brands fa-youtube"></i>
                  </div>
                  <div className="LinkItem">
                  <i className="fa-brands fa-instagram"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <div className="contactUsRight">
                <form action=" " onSubmit={handleSubmit(contactUsSubmit)}>
                  <Input label="Email" placeholder="Enter Your Email ... " className="input bd-bark text-dark"
                    {...register("email",{
                      required:"Please enter your email"
                    })}
                  />
                  {errors.email && (<p className="ValidationError">{errors.email.message}</p>)}
                  <Input label="User Name" placeholder="Enter Your User Name ... " className="input bd-bark text-dark"
                    {...register("userName",{
                      required:"Please enter your User Name"
                    })}
                  />
                  {errors.userName && (<p className="ValidationError">{errors.userName.message}</p>)}
                  <TextArea label="Message" className="input bd-bark" style={{ height: 100 }}
                  {...register("message",{
                    required:"Please enter your Message"
                  })}  
                  />
                  {errors.message && (<p className="ValidationError">{errors.message.message}</p>)}

                  <Button className="mt-5" type="submit" >Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
