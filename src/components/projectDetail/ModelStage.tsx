"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, Environment, Html, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} />;
}

export function ModelStage({ src }: { src: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 40 }}

      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 6]} intensity={2.4} />
      <directionalLight position={[-5, 2, -4]} intensity={0.9} color="#8ab4ff" />
      <Suspense
        fallback={
          <Html center>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
              Loading 3D
            </span>
          </Html>
        }
      >
        <Environment resolution={256}>
          <Lightformer intensity={2.4} position={[0, 4, 2]} scale={[8, 4, 1]} />
          <Lightformer intensity={1.1} position={[-4, 1, 2]} scale={[4, 6, 1]} color="#9ec8ff" />
          <Lightformer intensity={0.9} position={[4, 0, -2]} scale={[4, 6, 1]} color="#ffffff" />
        </Environment>
        <Bounds fit observe margin={1.15}>
          <Center>
            <Model src={src} />
          </Center>
        </Bounds>
      </Suspense>
      <OrbitControls

        makeDefault
        autoRotate
        autoRotateSpeed={0.9}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}
