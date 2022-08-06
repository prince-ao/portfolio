import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import { Mesh, Vector3, Spherical } from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Cloud, PerspectiveCamera, Sparkles, TrackballControls, Text } from '@react-three/drei';
import { Typescript, Javascript, Java, Spring, Python, CPlusPlus, Kotlin, Rust, ReactF, Svelte, Fastify } from '../components/sphericalObjects'
import { Container, Row, Col } from 'react-grid-system';
import { motion } from 'framer-motion'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Gallery from 'react-grid-gallery';
import axios from 'axios'

function Plant() {
  const plant = useGLTF('/3D-Objects/plant.glb', '/draco-gltf/')
  return <primitive object={plant.scene} />
}

interface IGetItemList {
  (groups: any[]): React.ReactElement[]
}

function UseGLTFScene() {
  return (
    <React.Suspense fallback={null}>
      <Plant />
      <Sparkles size={10} noise={100} scale={20} speed={2} count={100} color="blue" />
      <OrbitControls enableDamping={true} rotateSpeed={0.1} autoRotateSpeed={3} autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.2} />
    </React.Suspense>
  )
}

function Skill({ ch, ...props }: { ch: string, position: any }) {
  const objt = useGLTF(ch, '/draco-gltf/');
  return <primitive object={objt} {...props} />
}

function SkillGlobe({ radius = 20 }) {
  // typescript, javascript, java, spring boot, python, c++, react, svelte, fastify, kotlin
  const numOfObjects = 1;
  const objects = useMemo(() => {
    const object: string[] = [
      '/3D-Objects/typescript.glb'
    ]
    const temp: any[] = [];
    const spherical = new Spherical()
    const phiSpan = Math.PI / (numOfObjects + 1);
    const thetaSpan = (Math.PI * 2) / numOfObjects;
    for (let i = 1; i < numOfObjects + 1; i++)
      temp.push([new Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * i)), object[i]])
    return temp;
  }, [radius])
  const elements = objects.map(([pos, object], index) => <Skill ch={object} key={index} position={pos} />)

  return (
    <React.Suspense>
      <Skill ch={'/3D-Objects/typescript.glb'} position={new Vector3(0, 0, 0)} />
      <TrackballControls />
    </React.Suspense>
  )
}

const Home: NextPage = () => {

  const [imgHover, setImgHover] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });

  const [rVis, setRVis] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false
  });
  const [contact, setContact] = useState({
    email: "",
    subject: "",
    body: ""
  });

  const { email, subject, body } = contact;

  const [errors, setErrors] = useState({
    email: {
      error: false,
      message: ""
    },
    body: {
      error: false,
      message: ""
    }
  })

  const spherical = new Spherical()
  const temp: any[] = [];
  const numOfObjects = 4;
  const phiSpan = Math.PI / (numOfObjects + 1);
  const thetaSpan = (Math.PI * 2) / numOfObjects;
  const radius = 7;
  for (let i = 1; i < (numOfObjects + 1); i++)
    for (let j = 0; j < numOfObjects; j++) temp.push(new Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)));

  const IMAGES1 = [
    {
      src: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL1.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL1.png",
      thumbnailWidth: 100,
      thumbnailHeight: 200,
      isSelected: false,
      caption: "AnimeLazer front page(top)"
    },
    {
      src: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL2.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL2.png",
      thumbnailWidth: 50,
      thumbnailHeight: 100,
      isSelected: false,
      caption: "AnimeLazer front page(bottom)"
    },
    {
      src: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL3.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL3.png",
      thumbnailWidth: 50,
      thumbnailHeight: 100,
      isSelected: false,
      caption: "Search for anime 'Naruto'"
    },
    {
      src: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL4.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL4.png",
      thumbnailWidth: 50,
      thumbnailHeight: 100,
      isSelected: false,
      caption: "View anime page"
    },
    {
      src: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL5.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL5.png",
      thumbnailWidth: 50,
      thumbnailHeight: 100,
      isSelected: false,
      caption: "Favorite anime page"
    },
    {
      src: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL6.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL6.png",
      thumbnailWidth: 20,
      thumbnailHeight: 10,
      isSelected: false,
      caption: "Watching anime"
    },
    {
      src: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL7.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Screenshots/AL7.png",
      thumbnailWidth: 50,
      thumbnailHeight: 100,
      isSelected: false,
      caption: "Settings"
    }
  ]

  const IMAGES2 = [
    {
      src: "https://raw.githubusercontent.com/prince-ao/samizdat/main/assets/images/samizdat01.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/samizdat/main/assets/images/samizdat01.png",
      thumbnailWidth: 100,
      thumbnailHeight: 200,
      isSelected: false,
      caption: "samizdat home page"
    },
    {
      src: "https://raw.githubusercontent.com/prince-ao/samizdat/main/assets/images/samizdat02.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/samizdat/main/assets/images/samizdat02.png",
      thumbnailWidth: 100,
      thumbnailHeight: 200,
      isSelected: false,
      caption: "search page(search 'three body problem')"
    },
    {
      src: "https://raw.githubusercontent.com/prince-ao/samizdat/main/assets/images/samizdat03.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/samizdat/main/assets/images/samizdat03.png",
      thumbnailWidth: 100,
      thumbnailHeight: 200,
      isSelected: false,
      caption: "favorites page"
    },
    {
      src: "https://raw.githubusercontent.com/prince-ao/samizdat/main/assets/images/samizdat05.png",
      thumbnail: "https://raw.githubusercontent.com/prince-ao/samizdat/main/assets/images/samizdat05.png",
      thumbnailWidth: 100,
      thumbnailHeight: 200,
      isSelected: false,
      caption: "book view"
    },
  ]

  const onSubmit = async (e: any) => {
    e.preventDefault();
    let willReturn = false;
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(contact.email)) {
      setErrors({ ...errors, email: { error: true, message: "Invalid email input." } })
      willReturn = true;
    } else {
      setErrors({ ...errors, email: { error: false, message: "" } })
    }

    if (contact.body == "") {
      setErrors({ ...errors, body: { error: true, message: "Body is empty." } });
      willReturn = true;
    } else {
      setErrors({ ...errors, body: { error: false, message: "" } });
    }

    if (willReturn) return

    try {
      await fetch("https://pfolio-backend.herokuapp.com/send-email", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          subject,
          body
        })
      });
    } catch (err) {
      console.log(err)
    }
    setContact({ email: "", subject: "", body: "" });

    window.alert("Message Sent.");
  }

  return (
    <div>
      <Head>
        <title>Prince Addo</title>
        <meta name="description" content="Prince Addo's Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Rodal width={800} height={500} animation="rotate" visible={rVis.img1} onClose={() => setRVis({ ...rVis, img1: false })}>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <h1>AnimeLazer V3</h1>
            <a href="https://github.com/prince-ao/AnimeLazerV3" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                src="/images/github.png"
                height={50}
                width={50}
                alt="github logo"
              />
            </a>
          </div>
          <Gallery images={IMAGES1} />
        </Rodal>

        <Rodal width={800} height={500} animation="rotate" visible={rVis.img2} onClose={() => setRVis({ ...rVis, img2: false })}>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <h1>Consumet API</h1>
            <a href="https://github.com/consumet/consumet-api" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                src="/images/github.png"
                height={50}
                width={50}
                alt="github logo"
              />
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Image
              src="/images/projects/consumet_page.png"
              height={350}
              width={350}
              alt="Consumet api front page"
            />
          </div>
        </Rodal>

        <Rodal width={400} height={300} animation="rotate" visible={rVis.img3} onClose={() => setRVis({ ...rVis, img3: false })}>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <h1>Samizdat</h1>
            <a href="https://github.com/prince-ao/samizdat" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                src="/images/github.png"
                height={50}
                width={50}
                alt="github logo"
              />
            </a>
          </div>
          <Gallery images={IMAGES2} />
        </Rodal>

        <Rodal width={400} height={600} animation="rotate" visible={rVis.img4} onClose={() => setRVis({ ...rVis, img4: false })}>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <h1>YASC</h1>
            <a href="https://github.com/consumet/consumet-api" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                src="/images/github.png"
                height={50}
                width={50}
                alt="github logo"
              />
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Image
              src="https://raw.githubusercontent.com/prince-ao/YASC/main/assets/calc_gif.gif"
              height={450}
              width={300}
              alt="YASC demo"
            />
          </div>
        </Rodal>

        <div className={styles.headerLinks}>
          <nav className={styles.headerNav}>
            <Link href="#home">
              <h3>Home</h3>
            </Link>
            <Link href="#sandi">
              <h3>Skills & Interest</h3>
            </Link>
            <Link href="#project">
              <h3>Projects</h3>
            </Link>
            <Link href="#contact">
              <h3>Contact</h3>
            </Link>
          </nav>
          <div className={styles.headerBut}>
            <div className={styles.butImages}>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/prince-ao">
                <Image
                  src="/images/github.png"
                  height={40}
                  width={40}
                  alt="github logo"
                />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/prince-addo-bbb303a6" >
                <Image
                  src='/images/linkedin.png'
                  height={40}
                  width={40}
                  alt="linkedin logo"
                />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/user/show/35651372-prince">
                <Image
                  src="/images/goodreads.png"
                  height={40}
                  width={40}
                  alt="goodreads logo"
                />
              </a>
            </div>
            <Link href="/files/prince-addo-resume.pdf">
              <a><h2>Resume 📝</h2></a>
            </Link>
          </div>
        </div>
        <div id="home">
          <div>
            <h1>Hi!👋</h1>
            <h2>I am Prince,</h2>
            <h3>College Student/Software Engineer</h3>
          </div>
          <div className={styles.canvas}>
            <Canvas>
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Cloud position={[0, 15, 0]} speed={1} opacity={0.7} />
              <ambientLight intensity={0.5} />
              <PerspectiveCamera makeDefault position={new Vector3(15, 10, 25)} />
              <UseGLTFScene />
            </Canvas>
          </div>
        </div>
        <div id="sandi">
          <h1>Skills & Interest</h1>
          <div>
            <p>
              My expertise is full stack web development with a frontend frameworks like<br />
              React, Next.JS, Svelte and backend frameworks like Express, Fastify, Nest.JS,<br />
              Spring Boot.<br />
              The languages that I&apos;m proficient in are C++, Java, Python, Javascript, Typescript,<br />
              Kotlin, and Rust.<br />
              I&apos;m interested in full stack development, compiler design, operating systems,<br />
              and application layer network protocols.
            </p>
          </div>
          <div className={styles.canvas}>
            <Canvas>
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <ambientLight intensity={0.5} />
              <React.Suspense>
                <Typescript position={temp[0]} />
                <Javascript position={temp[1]} />
                <Java position={temp[2]} />
                <Spring position={temp[3]} />
                <Python position={temp[4]} />
                <CPlusPlus position={temp[5]} />
                <Kotlin position={temp[6]} />
                <Rust position={temp[7]} />
                <ReactF position={temp[8]} />
                <Svelte position={temp[9]} />
                <Fastify position={temp[10]} />
              </React.Suspense>
              <OrbitControls enableDamping={true} rotateSpeed={1} autoRotateSpeed={3} autoRotate />
            </Canvas>
          </div>
        </div>
        <div id="project">
          <h1>Projects</h1>
          <div>
            <Container fluid>
              <Row>
                <Col>
                  <motion.div
                    initial={{ opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    onMouseOver={() => setImgHover({ ...imgHover, img1: true })}
                    onMouseOut={() => setImgHover({ ...imgHover, img1: false })}
                    style={{ backgroundColor: "gray", display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}
                    className={styles.projectCont}
                    onClick={() => setRVis({ ...rVis, img1: true })}
                  >
                    <Image
                      src="https://raw.githubusercontent.com/prince-ao/AnimeLazerV3/main/assets/Logo2.png"
                      width={200}
                      height={200}
                      alt="animelazer logo"
                    />
                    {imgHover.img1
                      ?
                      <motion.div
                        transition={{ duration: 0.3 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ position: 'absolute', backgroundColor: 'blue', borderRadius: 100, width: 100, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}
                      >
                        <p>
                          click to view
                        </p>
                      </motion.div>
                      :
                      <></>}
                  </motion.div>
                </Col>
                <Col>
                  <motion.div
                    initial={{ opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    onMouseOver={() => setImgHover({ ...imgHover, img2: true })}
                    onMouseOut={() => setImgHover({ ...imgHover, img2: false })}
                    style={{ backgroundColor: "gray", display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}
                    className={styles.projectCont}
                    onClick={() => setRVis({ ...rVis, img2: true })}
                  >
                    <Image
                      src="https://consumet.org/images/consumetlogo.png"
                      width={200}
                      height={200}
                      alt="consumet api logo"
                    />
                    {imgHover.img2
                      ?
                      <motion.div
                        transition={{ duration: 0.3 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ position: 'absolute', backgroundColor: 'blue', borderRadius: 100, width: 100, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}
                      >
                        <p>
                          click to view
                        </p>
                      </motion.div>
                      :
                      <></>}
                  </motion.div>
                </Col>
                <Col>
                  <motion.div
                    initial={{ opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    onMouseOver={() => setImgHover({ ...imgHover, img3: true })}
                    onMouseOut={() => setImgHover({ ...imgHover, img3: false })}
                    style={{ backgroundColor: "gray", display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}
                    className={styles.projectCont}
                    onClick={() => setRVis({ ...rVis, img3: true })}
                  >
                    <Image
                      src="https://raw.githubusercontent.com/prince-ao/samizdat/main/assets/images/samizdat_logo.png"
                      width={200}
                      height={200}
                      alt="samizdat logo"
                    />
                    {imgHover.img3
                      ?
                      <motion.div
                        transition={{ duration: 0.3 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ position: 'absolute', backgroundColor: 'blue', borderRadius: 100, width: 100, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}
                      >
                        <p>
                          click to view
                        </p>
                      </motion.div>
                      :
                      <></>}
                  </motion.div>
                </Col>
                <Col>
                  <motion.div
                    initial={{ opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    onMouseOver={() => setImgHover({ ...imgHover, img4: true })}
                    onMouseOut={() => setImgHover({ ...imgHover, img4: false })}
                    style={{ backgroundColor: "gray", display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}
                    className={styles.projectCont}
                    onClick={() => setRVis({ ...rVis, img4: true })}
                  >
                    <Image
                      src="https://raw.githubusercontent.com/prince-ao/YASC/main/assets/calc.png"
                      width={200}
                      height={200}
                      alt="YASC logo"
                    />
                    {imgHover.img4
                      ?
                      <motion.div
                        transition={{ duration: 0.3 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ position: 'absolute', backgroundColor: 'blue', borderRadius: 100, width: 100, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}
                      >
                        <p>
                          click to view
                        </p>
                      </motion.div>
                      :
                      <></>}
                  </motion.div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div id="contact">
          <h1>Contact Me</h1>
          <div>
            <form onSubmit={onSubmit}>
              <input value={contact.email} type="email" onChange={(e) => setContact({ ...contact, email: e.target.value })} />
              {errors.email.error && <p>{errors.email.message}</p>}
              <input value={contact.subject} onChange={(e) => setContact({ ...contact, subject: e.target.value })} />
              <textarea value={contact.body} onChange={(e) => setContact({ ...contact, body: e.target.value })} />
              {errors.body.error && <p>{errors.body.message}</p>}
              <input type="submit" />
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
