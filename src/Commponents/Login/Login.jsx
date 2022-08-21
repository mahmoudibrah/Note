
import axios from 'axios';
import React, { useState , useCallback  } from 'react'
import {useNavigate} from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
export default function Login() {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);
    let navigate = useNavigate()
    const [isloading, setIsloading] = useState(false)
    const [erorr, setErorr] = useState('')
    let baseUrl = 'https://route-egypt-api.herokuapp.com/'
    const [user, setuser] = useState({
        email: '',
        password: 0
    })
    function getUserData(e) {
        setErorr('')
        setuser(   {...user , [e.target.name]: e.target.value  }       )
    console.log(user);
    }
    async function submit(e) {
        setIsloading(true)
    e.preventDefault()
    let {data} = await axios.post(baseUrl+"signin",user )    
    console.log(data);
    setIsloading(false)
    if(  data.message === 'success'   ) {
        // Navigate home
        navigate('/home');
        localStorage.setItem('token', data.token )
    }else {
        // show error
        console.log(data);
        // console.log(data);
        setErorr(data.message)
    }
    }
  return <>
  <div className='login vh-100 position-relative'>
  <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#24353f",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 2 },
                    },
                },
                detectRetina: true,
            }}
        />
    <div className="container position-absolute top-50 start-50 translate-middle">
        <div className="row">
            <div className="col-md-6 m-auto  text-center">
            <form onSubmit={submit}>
                <div className="from-group">
                <input onChange={getUserData} className='my-2 form-control' type="email" name="email" id="email"  placeholder='Enter Your Email'/></div>
                <div className="from-group">                <input onChange={getUserData} className='my-2 form-control' type="password" name="password" id="password"  placeholder='Enter Your password'/></div>
                <div className="from-group">
                { erorr&& <div className='alert alert-danger'>{erorr}</div>  }
                <button  type="submit" className={'btn btn-outline-info w-100 ' +  (isloading? 'disabled' : '') }>{isloading?<i className='fa-solid fa-spinner fa-spin'></i> :"Login" }</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  </div>
  </>
}