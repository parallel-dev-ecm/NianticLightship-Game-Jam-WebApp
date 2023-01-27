import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import {
  useFBX,
  useGLTF,
  Text3D,
  OrbitControls,
  Center,
  useAnimations,
} from "@react-three/drei";
import { gsap, Linear } from "gsap";
import { useAuth } from "../contexts/AuthContext";
import { FIREBASE_OBJECTS } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
const font = require("../fonts/helvetiker_regular.typeface.json");

const objects_paths = [
  "algodon.fbx",
  "beanie.fbx",
  "bigoye.fbx",
  "boina.fbx",
  "cincel.fbx",
  "corazon.fbx",
  "gorro.fbx",
];

//LOAD MODEL
function ModelLoader() {
  let fbx = useFBX("Breathing_Idle.fbx");
  const animations = fbx.animations;

  useEffect(() => {
    // action.play(clip);
    gsap.to(fbx.rotation, {
      y: "-=360",
      repeat: -1,
      duration: 500,
      ease: Linear.easeNone,
    });

    //action.play();
  }, []);
  return <primitive object={fbx} scale={0.0055} position={[0, 0, 0]} />;
}

function Scene_one() {
  const { currentUser } = useAuth();
  const [fs_user, set_fs_user] = useState();
  const state = useThree();
  const camera = state.camera;
  camera.position.set(0, 0, 9);

  async function handleFsUser(user_id) {
    const data = {
      Balance: 0,
      Email: currentUser.email,
      Friends: [],
      Materials: {
        Bricks: 0,
        Flowers: 0,
      },
    };
    const docRef = doc(FIREBASE_OBJECTS.firestore, "Users", user_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      set_fs_user(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      await setDoc(doc(FIREBASE_OBJECTS.firestore, "Users", user_id), data);
    }
  }

  function Brush(props) {
    const { scene } = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/paint-brush/model.gltf"
    );
    return <primitive object={scene} {...props} />;
  }

  function Base(props) {
    const { scene } = useGLTF("statue_base_round1.glb");
    return (
      <primitive
        object={scene}
        scale={0.3}
        position={[0, -0.25, 0]}
        {...props}
      />
    );
  }

  function LoadFBX(props) {
    let obj = useFBX(props.url);
    return <primitive object={obj} {...props} />;
  }

  function Car(props) {
    const { scene } = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf"
    );
    return <primitive object={scene} {...props} />;
  }

  function Wizard(props) {
    const { scene } = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/druid/model.gltf"
    );
    return <primitive object={scene} {...props} />;
  }

  function Goblin(props) {
    const { scene } = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/young-korrigan/model.gltf"
    );
    return <primitive object={scene} {...props} />;
  }

  function Duck(props) {
    const { scene } = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf"
    );
    return <primitive object={scene} {...props} />;
  }

  useEffect(() => {
    if (currentUser) {
      handleFsUser(currentUser.uid);
    }
  }, []);

  return (
    <>
      <group position={[0, 1, 0]} rotation={[0.3, 0, 0]}>
        <Center>
          {console.log(currentUser)}
          <ModelLoader />
          <Base />
          <Brush position={[-5, 0, 0]} rotation={[0, 4, 90]} scale={0.5} />
          <OrbitControls enablePan={false} enableZoom={false} />
          <Text3D font={font} size={0.3} height={0.09} position={[-2.5, 3, 0]}>
            <meshBasicMaterial color={0x948660} />
            {currentUser ? currentUser.email : "Hello"}
          </Text3D>
          <Text3D font={font} size={0.15} height={0.09} position={[0, 2.7, 0]}>
            <meshBasicMaterial color={0x948660} />
            {fs_user ? fs_user.Art_pieces + " " : "Hello"}
            Pieces published
          </Text3D>
          <Text3D font={font} size={0.3} height={0.09} position={[-1, -1, 0]}>
            <meshBasicMaterial color={0x948660} />
            {currentUser ? "Materials:" : console.log("no_user")}
          </Text3D>
          <Car position={[6, 0, -1]} scale={0.4} rotation={[0, -1, 0]} />
          <Goblin position={[6, 3, -1]} scale={2} />
          <Wizard position={[-5, 2, 0]} scale={1} />
          <Duck position={[0, 4, 0]} scale={0.3} />
          <Text3D
            font={font}
            size={0.4}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[-1, -2, 0]}
          >
            <meshBasicMaterial color={0x948660} />

            {fs_user ? fs_user.Balance : console.log("no_user")}
          </Text3D>
          <LoadFBX
            url="moneybag.fbx"
            scale={0.0025}
            position={[-1.5, -2, 0]}
            rotation={[0, 91.2, 0]}
          />
          <Text3D
            font={font}
            size={0.4}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[-1, -3.5, 0]}
          >
            <meshBasicMaterial color={0x948660} />

            {fs_user ? fs_user.Materials.Flowers : console.log("no_user")}
          </Text3D>
          |
          <LoadFBX url="margarita.fbx" scale={0.5} position={[-1.5, -3.5, 0]} />
          <Text3D
            font={font}
            size={0.4}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[1.5, -2, 0]}
          >
            <meshBasicMaterial color={0x948660} />

            {fs_user ? fs_user.Materials.Bricks : console.log("no_user")}
          </Text3D>
          <LoadFBX url="Mario_Brick.fbx" scale={0.0045} position={[1, -2, 0]} />
        </Center>
      </group>
    </>
  );
}

export default Scene_one;
