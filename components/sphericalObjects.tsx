import { useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { Text, TrackballControls } from '@react-three/drei'

function GenObject(file: string, position: any, url: any) {
  const obj = useGLTF(file, '/draco-gltf/')
  const [hovered, setHovered] = useState(false);

  const over = (e: any) => setHovered(true)
  const out = () => setHovered(false)

  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => { (document.body.style.cursor = 'auto') }
  }, [hovered])
  return <>
    <primitive onClick={() => window.open(url, '_blank')} onPointerOver={over} onPointerOut={out} object={obj.scene} position={position} />
  </>
}

export const Typescript = ({ position }: { position: any }) => {
  return GenObject('/3D-Objects/typescript.glb', position, 'https://www.typescriptlang.org/');
}

export const Javascript = ({ position }: { position: any }) => {
  return GenObject('/3D-Objects/javascript.glb', position, 'https://developer.mozilla.org/en-US/docs/Web/javascript')
}

export const Java = ({ position }: { position: any }) => {
  return GenObject('/3D-Objects/java.glb', position, 'https://dev.java/')
}

export const Spring = ({ position }: { position: any }) => {
  return GenObject('/3D-Objects/spring.glb', position, 'https://spring.io/projects/spring-boot')
}

export const Python = ({ position }: { position: any }) => {
  return GenObject('3D-Objects/python.glb', position, 'https://www.python.org/')
}

export const CPlusPlus = ({ position }: { position: any }) => {
  return GenObject('3D-Objects/c++.glb', position, 'https://cplusplus.com/')
}

export const Kotlin = ({ position }: { position: any }) => {
  return GenObject('/3D-Objects/kotlin.glb', position, 'https://kotlinlang.org/')
}

export const Rust = ({ position }: { position: any }) => {
  return GenObject('3D-Objects/rust.glb', position, 'https://www.rust-lang.org/')
}

export const ReactF = ({ position }: { position: any }) => {
  return GenObject('3D-Objects/react.glb', position, 'https://reactjs.org/')
}

export const Svelte = ({ position }: { position: any }) => {
  return GenObject('/3D-Objects/svelte.glb', position, 'https://svelte.dev/')
}

export const Fastify = ({ position }: { position: any }) => {
  return GenObject('3D-Objects/fastify.glb', position, 'https://www.fastify.io/')
}