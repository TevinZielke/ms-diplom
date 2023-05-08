import React from "react";
import { extend, useThree } from "@react-three/fiber";
import * as OC from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// extend({ OrbitControls });
// type thr = typeof __THREE & typeof OC;

// const controls: OC.OrbitControls = new THREE  

function Controls(props: any) {
    const { camera, gl } = useThree();

  //   return <OrbitControls attach={"orbitControls"}  args={[camera, gl.domElement]} />;
}

export default Controls;
