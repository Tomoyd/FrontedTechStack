let scene,camera,renderer
function say(a) {
   scene = new THREE.Scene();
     camera = new THREE.OrthographicCamera( window.innerWidth/-30, window.innerWidth /30, window.innerHeight/30,window.innerHeight/-30, 0.1, 1000 );
     renderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true});
    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    document.body.appendChild( renderer.domElement );
    let geometry = new THREE.BoxGeometry( 3, 3, 3 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    let cube = new THREE.Mesh( geometry, material );
    camera.up.set(0, 0, 1)
    scene.add( cube );
    camera.position.z = 50;
    animate( scene, camera,renderer );
    controlInit(camera,renderer)
}
function animate() {
    renderer.render( scene, camera );
    requestAnimationFrame(animate);
}
const controlInit=(camera,renderer)=> {
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = camera.position;
    controls.minDistance = 0.01;
    controls.maxDistance = 5000;
    controls.enableRotate=false
}
const exportURL=()=>{
    let img=renderer.domElement.getContext("experimental-webgl", {preserveDrawingBuffer: true});
    let url=img.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href=url
}