import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  selector: 'app-bracelet-full-image',
  templateUrl: './bracelet-full-image.component.html',
  styleUrls: ['./bracelet-full-image.component.css']
})
export class BraceletFullImageComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private loader = new GLTFLoader();
  private controls!: OrbitControls;
  private model!: THREE.Object3D; // store loaded model
  private discoLight1!: THREE.PointLight;
  private discoLight2!: THREE.PointLight;
  private discoLight3!: THREE.PointLight;

  ngAfterViewInit() {
    this.initThree();
    this.animate();
  }

  initThree() {
    const modelPath = '2025-02-21-bracelet.glb';

    // Create scene and camera
    this.scene = new THREE.Scene();
    this.scene.background = null;

    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 2);

    // Create renderer with transparency & shadow support
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // transparent background
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Add lighting
    // NORMAL LIGHTING MODE
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 0.6);
    const dir = new THREE.DirectionalLight(0xffffff, 0.3);
    dir.position.set(5, 10, 5);
    dir.castShadow = true;
    this.scene.add(ambient, hemi, dir);
    // DISCO MODE
    /*
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(ambientLight);

    // Create three point lights that will change colors dynamically.
    this.discoLight1 = new THREE.PointLight(0xff0000, 4, 10);
    this.discoLight1.position.set(2, 2, 2);
    this.discoLight1.castShadow = true;
    this.scene.add(this.discoLight1);

    this.discoLight2 = new THREE.PointLight(0x00ff00, 4, 10);
    this.discoLight2.position.set(-2, 2, 2);
    this.discoLight2.castShadow = true;
    this.scene.add(this.discoLight2);

    this.discoLight3 = new THREE.PointLight(0x0000ff, 4, 10);
    this.discoLight3.position.set(0, -2, 2);
    this.discoLight3.castShadow = true;
    this.scene.add(this.discoLight3);
     */

    // Setup OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    // Load the model
    this.loader.load(modelPath, (gltf) => {
      const model = gltf.scene;

      // (Optional) Rotate model initially if desired

      // Center the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      // Setup a random twist animation on load:
      // Generate a random twist for y and slight random adjustments for x and z.
      const randomTwistY = THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(360, 360));
      const randomTwistX = THREE.MathUtils.degToRad(THREE.MathUtils.randFloatSpread(50)); // ±5°
      const randomTwistZ = THREE.MathUtils.degToRad(THREE.MathUtils.randFloatSpread(50)); // ±5°

      // Save the current rotation as the starting point.
      const initialRotation = model.rotation.clone();

      // Store animation parameters in userData
      // Store animation parameters in userData
      model.userData['animation'] = {
        initialRotation: initialRotation,
        targetRotationX: randomTwistX,
        targetRotationY: randomTwistY,
        targetRotationZ: randomTwistZ,
        duration: 2000, // duration in milliseconds
        startTime: performance.now()
      };

      // Enable shadow casting/receiving on meshes
      model.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      this.model = model;
      this.scene.add(model);
    });
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();

    // If our model has an ongoing animation, update its rotation.
    if (this.model && this.model.userData['animation']) {
      const anim = this.model.userData['animation'];
      const currentTime = performance.now();
      let elapsed = currentTime - anim.startTime;
      let t = Math.min(elapsed / anim.duration, 1);
      // Optional easing (ease-out quadratic)
      t = 1 - (1 - t) * (1 - t);

      // Interpolate rotations
      this.model.rotation.x = THREE.MathUtils.lerp(anim.initialRotation.x, anim.initialRotation.x + anim.targetRotationX, t);
      this.model.rotation.y = THREE.MathUtils.lerp(anim.initialRotation.y, anim.initialRotation.y + anim.targetRotationY, t);
      this.model.rotation.z = THREE.MathUtils.lerp(anim.initialRotation.z, anim.initialRotation.z + anim.targetRotationZ, t);

      // End animation once complete
      if (t >= 1) {
        delete this.model.userData['animation'];
      }
    }

    this.renderer.render(this.scene, this.camera);
  };
}
