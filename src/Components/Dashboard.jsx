import { Canvas } from "@react-three/fiber";
import React from "react";

import Scene_one from "./Scene_one";
function Dashboard() {
  return (
    <div className="three_js_scene" style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />

        <Scene_one />
      </Canvas>
    </div>
  );
}

export default Dashboard;
