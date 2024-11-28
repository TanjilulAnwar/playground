import { useRef, useState } from 'react'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'
import { useControls } from 'leva'


const Cube = ({positon,size,color}) =>{
const ref = useRef()
  useFrame((state, delta)=>{

    ref.current.rotation.x += delta
    ref.current.rotation.y += delta *2.0
    ref.current.position.z = Math.sin(state.clock.elapsedTime) *3
    console.log(state.clock.elapsedTime)
   // console.log(state)
  })

return(
  <mesh position={positon} ref={ref} >
    <boxGeometry args = {size}/>
    <meshStandardMaterial color={color}/>
  </mesh>
)

}


const Sphere =({position,size,color})=>{

  const ref = useRef()

const[isHovered, setIsHovered] = useState(false)
const[isClicked, setIsClicked] = useState(false)
  useFrame((state, delta)=>{

const speed = isHovered? 2 : 0.2
    ref.current.rotation.y += delta * speed
        //ref.current.rotation.x += delta *1.2
    // ref.current.position.z = Math.sin(state.clock.elapsedTime) *3
    // console.log(state.clock.elapsedTime)
   // console.log(state)
  }) 
  return(
    <mesh position={position} ref={ref} 
    onPointerEnter={(event)=>(event.stopPropagation(),setIsHovered(true))}
    onPointerLeave={()=>setIsHovered(false)} 
    onClick={()=>setIsClicked(!isClicked)}
    scale={isClicked ? 1.5 :1}
    > 

      <sphereGeometry args={size}/>
      <meshStandardMaterial color={isHovered?"#FF10F0":color} wireframe/>
    </mesh>
  )
}
const Torus =({position,size,color})=>{
  return(
    <mesh position={position}>
      <torusGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const TorusKnot =({position,size})=>{

  const ref = useRef()

  const{color, radius} = useControls({
color:"lightgreen",
radius:{
  value:5,
  min:1,
  max:10,
  step:0.5
}

  })
  // useFrame((state, delta)=>{

  //   ref.current.rotation.x += delta
  //   ref.current.rotation.y += delta *2.0
  //   ref.current.position.z = Math.sin(state.clock.elapsedTime) *3
  //   console.log(state.clock.elapsedTime)
  //  // console.log(state)
  // })

  return(
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={[radius, ...size]}/>
      {/* <meshStandardMaterial color={color}/> */}
      <MeshWobbleMaterial factor={5} speed={2} color={color}/>
    </mesh>
  )
}


const Scene=()=>{

const directionalLightRef = useRef()
const {lightColor,lightIntensity} = useControls( {
  lightColor:'white',
  lightIntensity:{
    value:0.5,
    min:0,
    max:5
  }

})

useHelper(directionalLightRef, DirectionalLightHelper,0.5,"white")

  return(

    <>
<directionalLight
 position={[0,1,2]} 
 intensity={lightIntensity}
 ref={directionalLightRef}
 color={lightColor}
 />
<ambientLight intensity={0.1}/>


{/* <group position={[0,-1,0]}>
  <Cube positon={[1,0,0]} color={"green"} size={[1,1,1]}/>
<Cube positon={[-1,0,0]} color={"hotpink"} size={[1,1,1]}/>
<Cube positon={[-1,2,0]} color={"blue"} size={[1,1,1]}/>
<Cube positon={[1,2,0]} color={"orange"} size={[1,1,1]}/>
</group> */}


{/* <Cube positon={[0,0,0]} color={"orange"} size={[1,1,1]}/> */}

{/* <Sphere  positon={[0,0,0]} size={[1,30,30]} color={"#39FF14"}/> */}
{/* <Torus  position={[2,0,0]} size={[0.8,0.1,30,30]} color={"green"}/> */}
<TorusKnot 
 position={[0,0,0]} 
 size={[0.1,1000,50]} 
 />
 <OrbitControls
 enableZoom={false}
 />
</>
  )
}

const App=()=> {

  return (
<Canvas>
  <Scene/>
</Canvas>
  )
}

export default App
