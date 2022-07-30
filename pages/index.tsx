import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'
import { Mesh, Vector3 } from 'three';
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Plant: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

function Plant() {
  const plant = useGLTF('plant.glb', '/draco-gltf/')
  return <primitive object={plant.scene} />
}

function UseGLTFScene() {
  return (
    <React.Suspense fallback={null}>
      <Plant />
      <OrbitControls />
    </React.Suspense>
  )
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prince Addo</title>
        <meta name="description" content="Prince Addo's Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>Hi!👋</h1>
          <h2>I am Prince,</h2>
          <h3>College Student/Software Engineer</h3>
        </div>
        <div>
          <Canvas >
            <fog attach="fog" args={['#202030', 10, 25]} />
            <UseGLTFScene />
          </Canvas>
        </div>
      </main>
    </div>
  )
}

export default Home
