let scene, camera, renderer,
    plane, renderDomRay,
    currentArr = [], rois = [],pcdNames=[],selectValue="无",selectionIndex=0,currentROI, cloudPoint,cubeID=-1,font=null,
    ringMaterial, spinner,tempSelect,isDbl=false,timeOuter=null,fileDir="",
    fontMeshList=[]
function init() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(window.innerWidth / -15, window.innerWidth / 15, window.innerHeight / 15,         window.innerHeight / -15, 1, 1000);
    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    document.body.appendChild(renderer.domElement);
    let geometry = new THREE.PlaneGeometry(10000, 10000, 0)
    let material = new THREE.MeshBasicMaterial({
        color: 0xff0000, transparent: true, opacity: 0, aoMapIntensity: 0,
        alphaTest: 0, wireframe: true
    })
    plane = new THREE.Mesh(geometry, material)
    plane.cubeID=-1
    camera.up.set(0, 0, 1)
    controlInit(camera, renderer)
    scene.add(plane);
    if (!renderDomRay) {
        renderDomRay = new THREE.Raycaster()
    }
    camera.position.z = 100;
    animate(scene, camera, renderer);

}
const commonMaterialInit=()=>{
    ringMaterial=new THREE.PointsMaterial({
        size: 5,
        opacity:1,
        vertexColors: true,
        sizeAttenuation: false,
        color: 0xFFFFFF,
    })
    let loader = new THREE.FontLoader()
                loader.load("/static/fonts/gentilis_bold.typeface.json", (fontMesh) => {
                      font = fontMesh
                  loader = null
                })
}

const addFontToCube=(cube)=> {
                let mesh = new THREE.Mesh(new THREE.ShapeBufferGeometry(font.generateShapes(String(cube.cubeID), 2)),
                new THREE.MeshBasicMaterial({
                    color: 0xFF0000,
                  }))
    cube.geometry.computeBoundingSphere()
            let {x,y,z}=cube.geometry.boundingSphere.center
    mesh.cubeID=cube.cubeID
            mesh.position.set(x,y,2)
    fontMeshList.push(mesh)
               scene.add(mesh)
}
const createRing=(x,y,z)=>{
    let geo=new THREE.Geometry(0.1,0.4,128)
    geo.vertices=[new THREE.Vector3(x,y,z)]
    geo.colors=[new THREE.Color(1,0,0)]
    return new THREE.Points(geo,ringMaterial)

}
const controlInit = (camera, renderer) => {
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.minDistance = 1;
    controls.maxDistance = 1000;
    controls.maxZoom = 1000
    controls.minZoom = 0.02
    controls.update()
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

const addNoOption=(selectionDom)=>{
    let option=document.createElement("option")
    option.innerText="无"
    selectionDom.appendChild(option)
}

const clearROI=(e)=>{
    clearScene(false)
     spinner.style.display="block"
    let param=new FormData()
    param.append("fileDir",fileDir)
    param.append("filename",selectValue)
    param.append("value","deleteAll")
    axios.post("/api/roi/delete",param,{headers: {'Content-Type': 'multipart/form-data;charset=utf-8'}}).then(res=>{
       spinner.style.display="none"
    }).catch(e=>{
        spinner.style.display="none"
    })
}
const clearScene=(clearPoint)=>{
    rois.forEach(item=>{
        disposeObject(item)
    })
    fontMeshList.forEach(item=>{
       disposeObject(item)
    })
    cubeID=-1
    rois = []
    fontMeshList=[]
    disposeObject(currentROI)
    if(clearPoint){
        disposeObject(cloudPoint)
        cloudPoint=null
    }

    currentROI=null

}
const createParticles = (pointData) => {
    let geom = new THREE.Geometry();
    let material = new THREE.PointsMaterial({
        size: 1,
        opacity:0.5,
        transparent: true,
        vertexColors: true,
        sizeAttenuation: false,
        color: 0xffffff,
    })
    let color = new THREE.Color(1, 0.8, 1)
    pointData.forEach(point => {
        geom.vertices.push({x: point[0], y: point[1], z: 0});
        // color.setHSL(point[3] / 100, 1, 0.5)
        geom.colors.push(color.clone());
    })
    return new THREE.Points(geom, material);
}
const createRois=(roiList)=>{
    roiList.forEach(item=>{
        currentArr=[]
        currentROI=null
        if(item.points.length>0){
            currentArr=item.points.map(point=>{
                return new THREE.Vector2(point[0],point[1])
            })
           shapeFun()
        }
        if(currentROI){
            currentROI.childList=currentArr
            currentROI.finished=true
            currentROI.cubeID=item.value
            currentROI.material.color.set(0xd5d5d5)
            addFontToCube(currentROI)
        }
        currentArr=[]
        currentROI=null
    })
}
const disposeObject=(obj)=>{
    if(obj){
         scene.remove(obj)
        obj.material.dispose()
        obj.geometry.dispose()
    }

}


const toFix5=(num)=>{
    return Math.round(num*100000)/100000
}

const getYamlInfo=()=>{
    let selection=document.getElementById("selection")
    let info={
        png_range:{},
        png_size:{},
        roi_range:{xmax:-10000,ymax:-10000,xmin:10000,ymin:10000},
        polygen:[],
        pcdName:selection.value.replace(".pcd","")
    }
    info.png_range.xmin=toFix5(getIntersect(-1,-1)[0].point.x)
    info.png_range.ymin=toFix5(getIntersect(-1,-1)[0].point.y)
    info.png_range.xmax=toFix5(getIntersect(1,1)[0].point.x)
    info.png_range.ymax=toFix5(getIntersect(1,1)[0].point.y)
    info.roi_value=currentROI.cubeID
    info.png_size.rows=document.documentElement.clientWidth
    info.png_size.cols=document.documentElement.clientHeight
    if(currentROI.children.length>0){
        currentROI.children.forEach(item=>{
        let {x,y}=item.geometry.vertices[0]
        x=toFix5(x)
        y=toFix5(y)
        info.roi_range.xmax=info.roi_range.xmax<x?x:info.roi_range.xmax
        info.roi_range.ymax=info.roi_range.ymax<y?y:info.roi_range.ymax
        info.roi_range.xmin=info.roi_range.xmin>x?x:info.roi_range.xmin
        info.roi_range.ymin=info.roi_range.ymin>y?y:info.roi_range.ymin
        info.polygen.push([x,y])
        })
    }else{
        currentROI.childList&&currentROI.childList.forEach(item=>{
        let {x,y}=item
        x=toFix5(x)
        y=toFix5(y)
        info.roi_range.xmax=info.roi_range.xmax<x?x:info.roi_range.xmax
        info.roi_range.ymax=info.roi_range.ymax<y?y:info.roi_range.ymax
        info.roi_range.xmin=info.roi_range.xmin>x?x:info.roi_range.xmin
        info.roi_range.ymin=info.roi_range.ymin>y?y:info.roi_range.ymin
        info.polygen.push([x,y])
    })
    }


    return info
}
const otherHidden=()=>{
    cloudPoint&&(cloudPoint.visible = false)
    rois.forEach(item=>{
        item.visible=false
    })
   fontMeshList.forEach(item=>{
       item.visible=false
   })
    if(currentROI){
         currentROI.children.forEach(item=>{
            item.visible=false
        })
        currentROI.visible=true
    }
}
const otherShow=()=>{
    cloudPoint&&(cloudPoint.visible = true)
    rois.forEach(item=>{
        item.visible=true
    })
    fontMeshList.forEach(item=>{
       item.visible=true
   })
    if(currentROI.children.length>0){
        currentROI.children.forEach(item=>{
            item.visible=true
        })
    }
}
const selectedCurrent=()=>{
    if(currentROI){
         currentArr=[]
        if(!currentROI.finished&&currentROI.children.length<3){
            scene.remove(currentROI)
            currentROI.material.dispose()
            currentROI.geometry.dispose()
            currentROI=null
        }else{
          currentROI.material.opacity=0.5
        currentROI.material.color.set(0x00FF00)
            if(!currentROI.finished){
              addFontToCube(currentROI)
            }

        currentROI.finished=true
        }
    }
}
const drawShape = () => {
    if(currentROI){
        currentROI.material.color.set(0xd5d5d5)
        if(currentROI.children.length>0){
        currentROI.children.forEach(item=>{
            item.visible=false
        })
    }
    }
    let shape = new THREE.Shape(currentArr)
    let geometry = new THREE.ShapeBufferGeometry(shape);
    let material = new THREE.MeshBasicMaterial({color: 0xff0000,opacity: 0.5,transparent:true});
    currentROI = new THREE.Mesh(geometry, material);
    cubeID+=1
    currentROI.cubeID=cubeID
    rois.push(currentROI)
    currentROI.position.z = 1
    scene.add(currentROI);
}
const changeShape = () => {
    let shape = new THREE.Shape(currentArr)
    currentROI.geometry = new THREE.ShapeBufferGeometry(shape);
}
const shapeFun = () => {
    if (currentROI&&currentArr.length>1) {
        changeShape()
    } else {
        drawShape()
    }
}

const loadPoint = () => {
     clearScene(true)
    let selectionDom=document.getElementById("selection")
    while (selectionDom.children.length>0){
            selectionDom.removeChild(selectionDom.children.item(0))
     }
    let input = document.getElementById("filepath")
    fileDir = input.value
    if(fileDir.trim()===""){
        let selection=document.getElementById("selection")
        addNoOption(selection)
        alert("请输入路径")
        return false
    }
     spinner.style.display="block"
    axios.get("/api/points/data", {
        params: {
            fileDir,
            timeout: Date.now()
        }
    }).then(res => {
        spinner.style.display="none"
        pcdNames=[]
        if (res.data.code === 200) {
            pcdNames=res.data.pcdNames
            if(pcdNames.length>0){
                selectValue=pcdNames[0]
                pcdNames.forEach(item=>{
                    let option=document.createElement("option")
                    option.innerText=item
                    selectionDom.appendChild(option)
                })
                cloudPoint = createParticles(res.data.points)
                createRois(res.data.rois)
                cubeID=res.data.maxValue
                scene.add(cloudPoint)
            }else{
                alert("无数据")
                addNoOption(selectionDom)
            }
        }else{
             spinner.style.display="none"
            addNoOption(selectionDom)
            alert("无数据")
        }
    }).catch(err=>{
        addNoOption(selectionDom)
        spinner.style.display="none"
    })
}
const fileChange=(value)=>{
    selectionIndex=pcdNames.findIndex(item=>{
        return item===value
    })
    selectValue=value
    clearScene(true)
    spinner.style.display="block"
    axios.get("/api/points/data",
        {
            params:{
                fileDir,
                pcdName:value,
                timeout: Date.now()
            }
        }).then(res=>{
            spinner.style.display="none"
            if(res.data.code===200){
                cloudPoint = createParticles(res.data.points)
                createRois(res.data.rois)
                cubeID=res.data.maxValue
                scene.add(cloudPoint)
            }else{
                alert("无数据")
            }
        }
    ).catch(err=>{
        spinner.style.display="none"
    })
}
const previous=()=>{
    if(pcdNames.length===0){
        alert("无数据")
        return false
    }
   if(selectionIndex-1>=0){
        selectionIndex--;
        let selection=document.getElementById("selection")
        selection.value=pcdNames[selectionIndex]
       fileChange(pcdNames[selectionIndex])
    }else{
       alert("已是第一帧")
    }
}
const next=()=>{
     if(pcdNames.length===0){
        alert("无数据")
        return false
    }
    if(pcdNames.length>(selectionIndex+1)){
        selectionIndex++;
        let selection=document.getElementById("selection")
        selection.value=pcdNames[selectionIndex]
        fileChange(pcdNames[selectionIndex])
    }else{
       alert("已是最后一帧")
    }

}
const exportURL = () => {
    let info=getYamlInfo()
    spinner.style.display="block"
     if(currentROI){
        currentROI.material.color.set(0xffffff)
        currentROI.material.opacity=1
     }
    setTimeout(() => {
        let img = renderer.domElement.getContext("experimental-webgl", {preserveDrawingBuffer: true});
        let url = img.canvas.toDataURL("image/png")
        let b64 = window.atob(url.substring(22))
        let bLength = b64.length
        const arr = []
        for (let i = 0; i < bLength; i++) {
            arr.push(b64.charCodeAt(i))
        }
        const blob = new Blob([new Uint8Array(arr), {type: "image/png"}])
        let param = new FormData()
        param.append("b64", blob)
        param.append("yamlInfo",JSON.stringify(info))
        param.append("fileDir", document.getElementById("filepath").value)
        axios.post("/api/upload/img",
            param, {headers: {'Content-Type': 'multipart/form-data;charset=utf-8'}}).then(res => {
            spinner.style.display="none"
            otherShow()
            selectedCurrent()
            if(res.data.code===200){
                 alert("导出成功")
            }else{
                alert(res.data.msg)
            }


        })
    }, 1000)
}


const getIntersect=(x,y)=>{
    let standardVector = new THREE.Vector3(x, y, 0.1)
    let worldVector = standardVector.unproject(camera)
    renderDomRay.set(camera.position, worldVector.sub(camera.position).normalize())
    renderDomRay.setFromCamera(new THREE.Vector2(x, y), camera)
    return renderDomRay.intersectObjects([plane,...rois])
}

const exportShape = () => {
    if(fileDir.trim()===""){
        alert("请输入路径")
        return false
    }
    currentArr = []
    if(currentROI){

        otherHidden()
        exportURL()
    }else{
        alert("没有要导出的数据")
    }
}
const keydownFunc=(e)=>{

    switch (e.which) {
        case 46:
            scene.remove(currentROI)
            currentArr=[]
            if(currentROI){
                spinner.style.display="block"
                let index=rois.findIndex(item=>{
                    return item.cubeID===currentROI.cubeID
                })
                if(index>-1){
                    rois.splice(index,1)
                }
             index=fontMeshList.findIndex(item=> {
                 return item.cubeID === currentROI.cubeID
             })

                if(index>-1){
                    scene.remove(fontMeshList[index])
                    fontMeshList[index].material.dispose()
                    fontMeshList[index].geometry.dispose()
                    fontMeshList.splice(index,1)
                }
                cubeID=cubeID>currentROI.cubeID?cubeID:currentROI.cubeID-1
                let param=new FormData()
                param.append("fileDir",fileDir)
                param.append("filename",selectValue)
                param.append("value",currentROI.cubeID)
                currentROI.geometry.dispose()&&currentROI.material.dispose()
                axios.post("/api/roi/delete",param,{headers: {'Content-Type': 'multipart/form-data;charset=utf-8'}}).then(res=>{
                    spinner.style.display="none"
                }).catch(e=>{
                    spinner.style.display="none"
                })
            }
            currentROI=null
            break;
        case 13:
            selectedCurrent()
            break;
        case 83:
            if(e.ctrlKey){
                 e.preventDefault()
                exportShape()
            }
            break;
        default:
            break;
    }
}
const inputKeypress=(e)=>{
    if(e.which===13){
        loadPoint()
        return false
    }
    return true
}
const moveEvent = (e) => {
    let getBoundingClientRect = renderer.domElement.getBoundingClientRect()
    let [x, y] = [0, 0]
    x = ((e.clientX - getBoundingClientRect.left) / renderer.domElement.offsetWidth) * 2 - 1
    y = -((e.clientY - getBoundingClientRect.top) / renderer.domElement.offsetHeight) * 2 + 1
    let intersects = getIntersect(x,y)
    if (intersects.length >= 1) {
        if(intersects[0].object.cubeID>-1){
            renderer.domElement.style.cursor="pointer"
            tempSelect=intersects[0].object
        }else{
            renderer.domElement.style.cursor="default"
            tempSelect=null
        }
        return [intersects[0].point.x, intersects[0].point.y]
    } else {
        return [0, 0]
    }
}
const clickShape=(e)=>{
    let [x, y] = moveEvent(e)
    let vet2=new THREE.Vector2(x, y)
    let ringMatch=currentArr.find(item=>{
        return vet2.distanceTo(item)<=1
    })
    if(ringMatch){
        currentArr=[]
        selectedCurrent()
    }else{
        currentArr.push(vet2)
        shapeFun()
        currentROI.attach(createRing(x, y,1))
    }
}
const mousedownEvent = (e) => {
    if(!cloudPoint){
        return false
    }
    if (e.ctrlKey) {
    } else {
        clearTimeout(timeOuter)
        if(isDbl){
            isDbl=false
          return false
        }
        timeOuter=setTimeout(()=>{
                if(document.activeElement.tagName!=="BODY"){
                document.activeElement.blur()
            }
                if(tempSelect&&tempSelect.finished){
                    return false
                }
                clickShape(e)
                clearTimeout(timeOuter)
            },200)


    }
}
const dblClickEvent=(e)=>{
    e.preventDefault()
    isDbl=true
    clearTimeout(timeOuter)
    currentROI&&(currentROI.material.color.set(0xd5d5d5))
    if(tempSelect){
        tempSelect.material.color.set(0x00ff00)
        currentROI=tempSelect
        currentArr=[]
    }else if(currentROI&&!currentROI.finished&&currentArr.length>=2){
        clickShape(e)
        selectedCurrent();
  }
 if(currentArr.length<=2){
       selectedCurrent();
    }
  let timerD=setTimeout(()=>{
      isDbl=false
      clearTimeout(timerD)
  },200)

}

window.onload = () => {
    init()
    commonMaterialInit()

    renderer.domElement.addEventListener("mousemove", moveEvent, false)
    renderer.domElement.addEventListener("click", mousedownEvent, false)
    renderer.domElement.addEventListener("dblclick", dblClickEvent, false)
    window.addEventListener("keydown",keydownFunc,false)
    window.onresize=(e)=>{
         renderer&&renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
        if(camera){
            camera.left=window.innerWidth / -15
            camera.right=window.innerWidth / 15
            camera.top=window.innerHeight / 15
            camera.bottom=window.innerHeight / -15
            camera.updateProjectionMatrix()
        }
    }

    spinner=document.getElementById("spinner")
}
window.onunload = () => {
    renderer.domElement.removeEventListener("mousemove", moveEvent, false)
    renderer.domElement.removeEventListener("mousedown", mousedownEvent, false)
    window.removeEventListener("keydown",keydownFunc,false)
    renderer.domElement.addEventListener("dblclick", dblClickEvent, false)
    camera = null
    renderer = null
    scene = null
    renderDomRay = null
    plane = null
}