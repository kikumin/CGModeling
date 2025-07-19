/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");


class ThreeJSContainer {
    scene;
    light;
    particles;
    gear;
    camera;
    newParticlesList = [];
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x1a103d));
        renderer.shadowMap.enabled = true;
        this.camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.copy(cameraPos);
        this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(this.camera, renderer.domElement);
        this.createScene();
        const render = () => {
            orbitControls.update();
            renderer.render(this.scene, this.camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        //初期のパーティクル
        const particleCount = 1500;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 100;
            const x = Math.cos(angle) * radius;
            const y = (Math.random() - 0.5) * 3;
            const z = Math.sin(angle) * radius;
            positions.set([x, y, z], i * 3);
        }
        const particlesGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        particlesGeometry.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(positions, 3));
        const particlesMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
            color: 0x88ccff,
            size: 0.1,
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
            depthWrite: false,
        });
        this.particles = new three__WEBPACK_IMPORTED_MODULE_1__.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
        //ブラックホール
        const blackHole = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(1.5, 64, 64), new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({
            color: 0x000000,
            metalness: 1,
            roughness: 0,
            emissive: new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x220044),
            emissiveIntensity: 0.7
        }));
        this.scene.add(blackHole);
        this.gear = blackHole;
        // ブラックホールオーラ用パーティクル
        const auraCount = 300;
        const auraPositions = new Float32Array(auraCount * 3);
        const auraSizes = [];
        for (let i = 0; i < auraCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.8 + Math.random() * 5.0;
            const x = Math.cos(angle) * radius;
            const y = (Math.random() - 0.5) * 1.5;
            const z = Math.sin(angle) * radius;
            auraPositions.set([x, y, z], i * 3);
            auraSizes.push(0.1 + Math.random() * 0.3);
        }
        const auraGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        auraGeometry.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(auraPositions, 3));
        const auraMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
            color: 0x8833aa,
            size: 0.5,
            transparent: true,
            opacity: 0.2,
            depthWrite: false,
            blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending
        });
        const auraParticles = new three__WEBPACK_IMPORTED_MODULE_1__.Points(auraGeometry, auraMaterial);
        this.scene.add(auraParticles);
        // 生成された球体リスト
        const fallingSpheres = [];
        // マウス座標格納用ベクトル
        const mouse = new three__WEBPACK_IMPORTED_MODULE_1__.Vector2();
        const raycaster = new three__WEBPACK_IMPORTED_MODULE_1__.Raycaster();
        // クリックイベント
        window.addEventListener("click", (event) => {
            const rect = event.target.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            // 交点を取得
            raycaster.setFromCamera(mouse, this.camera);
            const plane = new three__WEBPACK_IMPORTED_MODULE_1__.Plane(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0), 0); // y=0 平面
            const intersectPoint = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3();
            raycaster.ray.intersectPlane(plane, intersectPoint);
            // 球体作成
            const sphere = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.2, 16, 16), new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xff66ff, metalness: 0.5, roughness: 0.5 }));
            sphere.position.copy(intersectPoint);
            this.scene.add(sphere);
            const x = intersectPoint.x;
            const z = intersectPoint.z;
            const r = Math.sqrt(x * x + z * z);
            const theta = Math.atan2(z, x);
            // ランダムな色
            const auraColor = new three__WEBPACK_IMPORTED_MODULE_1__.Color().setHSL(Math.random(), 0.8, 0.65);
            fallingSpheres.push({
                mesh: sphere,
                r,
                theta,
                trail: [],
                auraColor: auraColor
            });
        });
        // 背景の星パーティクル
        const starCount = 2000;
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            const radius = 30 + Math.random() * 50; // 中央からの距離
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            starPositions.set([x, y, z], i * 3);
        }
        const starGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        starGeometry.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(starPositions, 3));
        const starTexture = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader().load('spark1.png');
        const starMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
            map: starTexture,
            color: 0x88ccff,
            size: 2.0,
            transparent: true,
            opacity: 1.0,
            depthWrite: false,
            blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
            sizeAttenuation: true,
        });
        const starParticles = new three__WEBPACK_IMPORTED_MODULE_1__.Points(starGeometry, starMaterial);
        this.scene.add(starParticles);
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        // 毎フレームのupdateを呼んで，更新
        const update = (time) => {
            const pos = this.particles.geometry.attributes.position;
            //パーティクル
            for (let i = 0; i < pos.count; i++) {
                let x = pos.getX(i);
                let y = pos.getY(i);
                let z = pos.getZ(i);
                // 回転
                const angle = Math.atan2(z, x);
                const radius = Math.sqrt(x * x + z * z);
                const newAngle = angle + 0.1; // 渦巻き度合い
                const newRadius = radius - 0.02; // 吸引
                x = Math.cos(newAngle) * newRadius;
                z = Math.sin(newAngle) * newRadius;
                y *= 0.97;
                pos.setXYZ(i, x, y, z);
            }
            pos.needsUpdate = true;
            // 球体をブラックホール方向へ移動
            for (let i = fallingSpheres.length - 1; i >= 0; i--) {
                const obj = fallingSpheres[i];
                obj.theta += 0.05;
                obj.r -= 0.02;
                const newX = Math.cos(obj.theta) * obj.r;
                const newZ = Math.sin(obj.theta) * obj.r;
                obj.mesh.position.set(newX, 0, newZ);
                // 残像 
                const trailPos = obj.mesh.position.clone();
                obj.trail.push(trailPos);
                if (obj.trail.length > 3)
                    obj.trail.shift();
                for (let j = 0; j < obj.trail.length; j++) {
                    const p = obj.trail[j];
                    const trailGeo = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry().setFromPoints([p]);
                    const color = obj.auraColor;
                    const trailMat = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
                        color: color,
                        size: 0.25,
                        transparent: true,
                        opacity: 0.3 * Math.pow(1 - j / obj.trail.length, 2),
                        depthWrite: false,
                        blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
                    });
                    const trailPoint = new three__WEBPACK_IMPORTED_MODULE_1__.Points(trailGeo, trailMat);
                    this.scene.add(trailPoint);
                    setTimeout(() => {
                        this.scene.remove(trailPoint);
                        trailGeo.dispose();
                        trailMat.dispose();
                    }, 700); // 残像の長さ
                }
                if (obj.r < 2.3) {
                    this.scene.remove(obj.mesh);
                    fallingSpheres.splice(i, 1);
                    //波動
                    createGravityWave.call(this, obj.auraColor);
                    // 消滅エフェクト
                    const explodeCount = 100;
                    const explodePositions = new Float32Array(explodeCount * 3);
                    for (let j = 0; j < explodeCount; j++) {
                        explodePositions.set([
                            newX + (Math.random() - 0.5) * 1.5,
                            (Math.random() - 0.5) * 0.5,
                            newZ + (Math.random() - 0.5) * 1.5
                        ], j * 3);
                    }
                    const geo = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
                    geo.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(explodePositions, 3));
                    const mat2 = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
                        color: 0xffaa00,
                        size: 0.08,
                        transparent: true,
                        opacity: 0.9,
                        blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
                    });
                    const newPart = new three__WEBPACK_IMPORTED_MODULE_1__.Points(geo, mat2);
                    this.scene.add(newPart);
                    this.newParticlesList.push(newPart);
                    // ブラックホールのスケール
                    const scaleSpeed = 0.0005; // 大きくなるスピード
                    this.gear.scale.x += scaleSpeed;
                    this.gear.scale.y += scaleSpeed;
                    this.gear.scale.z += scaleSpeed;
                }
            }
            for (let i = this.newParticlesList.length - 1; i >= 0; i--) {
                const part = this.newParticlesList[i];
                const geom = part.geometry;
                const posAttr = geom.attributes.position;
                const positions = [];
                for (let j = 0; j < posAttr.count; j++) {
                    const x = posAttr.getX(j);
                    const y = posAttr.getY(j);
                    const z = posAttr.getZ(j);
                    const dist = Math.sqrt(x * x + y * y + z * z);
                    if (dist < 0.7)
                        continue;
                    const dir = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-x, -y, -z).clone().normalize();
                    const pull = 0.015;
                    const nx = x + dir.x * dist * pull;
                    const ny = y + dir.y * dist * pull;
                    const nz = z + dir.z * dist * pull;
                    positions.push(nx, ny, nz);
                }
                const newPosArray = new Float32Array(positions);
                geom.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(newPosArray, 3));
                geom.attributes.position.needsUpdate = true;
                if (positions.length < 5) {
                    this.scene.remove(part);
                    part.geometry.dispose();
                    part.material.dispose();
                    this.newParticlesList.splice(i, 1);
                }
            }
            //モヤ
            auraParticles.rotation.y -= 0.01;
            const scalePulse = 0.05 * Math.sin(time * 0.002);
            auraParticles.scale.set(1 + scalePulse, 1 + scalePulse, 1 + scalePulse);
            //背景
            starParticles.rotation.y -= 0.0002;
            starParticles.rotation.x += 0.00005;
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
//波動
function createGravityWave(color) {
    const center = this.gear.position.clone(); // ブラックホールの中心
    const ring = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.RingGeometry(0.5, 0.6, 64), new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide,
        blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending
    }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.copy(center);
    this.scene.add(ring);
    const duration = 1.8;
    const maxScale = 12;
    const startTime = performance.now();
    const animate = () => {
        const elapsed = (performance.now() - startTime) / 1000;
        const t = Math.min(elapsed / duration, 1);
        const scale = 1 + t * maxScale;
        ring.scale.set(scale, scale, scale);
        ring.material.opacity = 0.4 * (1 - t);
        if (t < 1) {
            requestAnimationFrame(animate);
        }
        else {
            this.scene.remove(ring);
            ring.geometry.dispose();
            ring.material.dispose();
        }
    };
    animate();
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(8, 8, 8));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7Ozs7Ozs7VUNsWkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XG5cbmNsYXNzIFRocmVlSlNDb250YWluZXIge1xuICAgIHB1YmxpYyBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBwYXJ0aWNsZXM6IFRIUkVFLlBvaW50cztcbiAgICBwdWJsaWMgZ2VhcjogVEhSRUUuTWVzaDtcbiAgICBwcml2YXRlIGNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG4gICAgcHJpdmF0ZSBuZXdQYXJ0aWNsZXNMaXN0OiBUSFJFRS5Qb2ludHNbXSA9IFtdO1xuXG4gICAgcHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHgxYTEwM2QpKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwKTtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyh0aGlzLmNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTY2VuZSgpO1xuXG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH07XG5cblxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgICAvL+WIneacn+OBruODkeODvOODhuOCo+OCr+ODq1xuICAgICAgICBjb25zdCBwYXJ0aWNsZUNvdW50ID0gMTUwMDtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwYXJ0aWNsZUNvdW50ICogMyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiAxMDA7XG4gICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgY29uc3QgeSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDM7XG4gICAgICAgICAgICBjb25zdCB6ID0gTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgcG9zaXRpb25zLnNldChbeCwgeSwgel0sIGkgKiAzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJ0aWNsZXNHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBwYXJ0aWNsZXNHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xuICAgICAgICBjb25zdCBwYXJ0aWNsZXNNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjogMHg4OGNjZmYsXG4gICAgICAgICAgICBzaXplOiAwLjEsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IG5ldyBUSFJFRS5Qb2ludHMocGFydGljbGVzR2VvbWV0cnksIHBhcnRpY2xlc01hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5wYXJ0aWNsZXMpO1xuXG4gICAgICAgIC8v44OW44Op44OD44Kv44Ob44O844OrXG4gICAgICAgIGNvbnN0IGJsYWNrSG9sZSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICAgICAgbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDEuNSwgNjQsIDY0KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IDB4MDAwMDAwLFxuICAgICAgICAgICAgICAgIG1ldGFsbmVzczogMSxcbiAgICAgICAgICAgICAgICByb3VnaG5lc3M6IDAsXG4gICAgICAgICAgICAgICAgZW1pc3NpdmU6IG5ldyBUSFJFRS5Db2xvcigweDIyMDA0NCksIC8vIOOCj+OBmuOBi+OBq+WFieOCieOBm+OCi1xuICAgICAgICAgICAgICAgIGVtaXNzaXZlSW50ZW5zaXR5OiAwLjdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGJsYWNrSG9sZSk7XG4gICAgICAgIHRoaXMuZ2VhciA9IGJsYWNrSG9sZTtcblxuICAgICAgICAvLyDjg5bjg6njg4Pjgq/jg5vjg7zjg6vjgqrjg7zjg6nnlKjjg5Hjg7zjg4bjgqPjgq/jg6tcbiAgICAgICAgY29uc3QgYXVyYUNvdW50ID0gMzAwO1xuICAgICAgICBjb25zdCBhdXJhUG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShhdXJhQ291bnQgKiAzKTtcbiAgICAgICAgY29uc3QgYXVyYVNpemVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdXJhQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICBjb25zdCByYWRpdXMgPSAxLjggKyBNYXRoLnJhbmRvbSgpICogNS4wO1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cztcbiAgICAgICAgICAgIGNvbnN0IHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxLjU7XG4gICAgICAgICAgICBjb25zdCB6ID0gTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgYXVyYVBvc2l0aW9ucy5zZXQoW3gsIHksIHpdLCBpICogMyk7XG4gICAgICAgICAgICBhdXJhU2l6ZXMucHVzaCgwLjEgKyBNYXRoLnJhbmRvbSgpICogMC4zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF1cmFHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBhdXJhR2VvbWV0cnkuc2V0QXR0cmlidXRlKFwicG9zaXRpb25cIiwgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShhdXJhUG9zaXRpb25zLCAzKSk7XG4gICAgICAgIGNvbnN0IGF1cmFNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjogMHg4ODMzYWEsXG4gICAgICAgICAgICBzaXplOiAwLjUsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuMixcbiAgICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmdcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGF1cmFQYXJ0aWNsZXMgPSBuZXcgVEhSRUUuUG9pbnRzKGF1cmFHZW9tZXRyeSwgYXVyYU1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYXVyYVBhcnRpY2xlcyk7XG5cbiAgICAgICAgLy8g55Sf5oiQ44GV44KM44Gf55CD5L2T44Oq44K544OIXG4gICAgICAgIGNvbnN0IGZhbGxpbmdTcGhlcmVzOiB7XG4gICAgICAgICAgICBtZXNoOiBUSFJFRS5NZXNoLFxuICAgICAgICAgICAgcjogbnVtYmVyLFxuICAgICAgICAgICAgdGhldGE6IG51bWJlcixcbiAgICAgICAgICAgIHRyYWlsOiBUSFJFRS5WZWN0b3IzW10sXG4gICAgICAgICAgICBhdXJhQ29sb3I6IFRIUkVFLkNvbG9yXG4gICAgICAgIH1bXSA9IFtdO1xuXG4gICAgICAgIC8vIOODnuOCpuOCueW6p+aomeagvOe0jeeUqOODmeOCr+ODiOODq1xuICAgICAgICBjb25zdCBtb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgICAgIGNvbnN0IHJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKTtcblxuICAgICAgICAvLyDjgq/jg6rjg4Pjgq/jgqTjg5njg7Pjg4hcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbW91c2UueCA9ICgoZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCkgLyByZWN0LndpZHRoKSAqIDIgLSAxO1xuICAgICAgICAgICAgbW91c2UueSA9IC0oKGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCkgLyByZWN0LmhlaWdodCkgKiAyICsgMTtcblxuICAgICAgICAgICAgLy8g5Lqk54K544KS5Y+W5b6XXG4gICAgICAgICAgICByYXljYXN0ZXIuc2V0RnJvbUNhbWVyYShtb3VzZSwgdGhpcy5jYW1lcmEpO1xuICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksIDApOyAvLyB5PTAg5bmz6Z2iXG4gICAgICAgICAgICBjb25zdCBpbnRlcnNlY3RQb2ludCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgICAgICByYXljYXN0ZXIucmF5LmludGVyc2VjdFBsYW5lKHBsYW5lLCBpbnRlcnNlY3RQb2ludCk7XG5cbiAgICAgICAgICAgIC8vIOeQg+S9k+S9nOaIkFxuICAgICAgICAgICAgY29uc3Qgc3BoZXJlID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMiwgMTYsIDE2KSxcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhmZjY2ZmYsIG1ldGFsbmVzczogMC41LCByb3VnaG5lc3M6IDAuNSB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHNwaGVyZS5wb3NpdGlvbi5jb3B5KGludGVyc2VjdFBvaW50KTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHNwaGVyZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHggPSBpbnRlcnNlY3RQb2ludC54O1xuICAgICAgICAgICAgY29uc3QgeiA9IGludGVyc2VjdFBvaW50Lno7XG4gICAgICAgICAgICBjb25zdCByID0gTWF0aC5zcXJ0KHggKiB4ICsgeiAqIHopO1xuICAgICAgICAgICAgY29uc3QgdGhldGEgPSBNYXRoLmF0YW4yKHosIHgpO1xuXG4gICAgICAgICAgICAvLyDjg6njg7Pjg4Djg6DjgaroibJcbiAgICAgICAgICAgIGNvbnN0IGF1cmFDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpLnNldEhTTChNYXRoLnJhbmRvbSgpLCAwLjgsIDAuNjUpO1xuXG4gICAgICAgICAgICBmYWxsaW5nU3BoZXJlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBtZXNoOiBzcGhlcmUsXG4gICAgICAgICAgICAgICAgcixcbiAgICAgICAgICAgICAgICB0aGV0YSxcbiAgICAgICAgICAgICAgICB0cmFpbDogW10sXG4gICAgICAgICAgICAgICAgYXVyYUNvbG9yOiBhdXJhQ29sb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyDog4zmma/jga7mmJ/jg5Hjg7zjg4bjgqPjgq/jg6tcbiAgICAgICAgY29uc3Qgc3RhckNvdW50ID0gMjAwMDtcbiAgICAgICAgY29uc3Qgc3RhclBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkoc3RhckNvdW50ICogMyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFyQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gMzAgKyBNYXRoLnJhbmRvbSgpICogNTA7ICAvLyDkuK3lpK7jgYvjgonjga7ot53pm6JcbiAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgY29uc3QgcGhpID0gTWF0aC5hY29zKDIgKiBNYXRoLnJhbmRvbSgpIC0gMSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHggPSByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5jb3ModGhldGEpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHJhZGl1cyAqIE1hdGguc2luKHBoaSkgKiBNYXRoLnNpbih0aGV0YSk7XG4gICAgICAgICAgICBjb25zdCB6ID0gcmFkaXVzICogTWF0aC5jb3MocGhpKTtcbiAgICAgICAgICAgIHN0YXJQb3NpdGlvbnMuc2V0KFt4LCB5LCB6XSwgaSAqIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3Rhckdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIHN0YXJHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHN0YXJQb3NpdGlvbnMsIDMpKTtcblxuICAgICAgICBjb25zdCBzdGFyVGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZCgnc3BhcmsxLnBuZycpO1xuICAgICAgICBjb25zdCBzdGFyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgbWFwOiBzdGFyVGV4dHVyZSxcbiAgICAgICAgICAgIGNvbG9yOiAweDg4Y2NmZixcbiAgICAgICAgICAgIHNpemU6IDIuMCxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgb3BhY2l0eTogMS4wLFxuICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgICAgICAgIHNpemVBdHRlbnVhdGlvbjogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3RhclBhcnRpY2xlcyA9IG5ldyBUSFJFRS5Qb2ludHMoc3Rhckdlb21ldHJ5LCBzdGFyTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChzdGFyUGFydGljbGVzKTtcblxuICAgICAgICAvL+ODqeOCpOODiOOBruioreWumlxuICAgICAgICB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYpO1xuICAgICAgICBjb25zdCBsdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSkubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KGx2ZWMueCwgbHZlYy55LCBsdmVjLnopO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIzmm7TmlrBcbiAgICAgICAgY29uc3QgdXBkYXRlOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSB0aGlzLnBhcnRpY2xlcy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uIGFzIFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgICAgICAgICAgIC8v44OR44O844OG44Kj44Kv44OrXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvcy5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBwb3MuZ2V0WChpKTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHBvcy5nZXRZKGkpO1xuICAgICAgICAgICAgICAgIGxldCB6ID0gcG9zLmdldFooaSk7XG5cbiAgICAgICAgICAgICAgICAvLyDlm57ou6JcbiAgICAgICAgICAgICAgICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIoeiwgeCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gTWF0aC5zcXJ0KHggKiB4ICsgeiAqIHopO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0FuZ2xlID0gYW5nbGUgKyAwLjE7IC8vIOa4puW3u+OBjeW6puWQiOOBhFxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1JhZGl1cyA9IHJhZGl1cyAtIDAuMDI7IC8vIOWQuOW8lVxuXG4gICAgICAgICAgICAgICAgeCA9IE1hdGguY29zKG5ld0FuZ2xlKSAqIG5ld1JhZGl1cztcbiAgICAgICAgICAgICAgICB6ID0gTWF0aC5zaW4obmV3QW5nbGUpICogbmV3UmFkaXVzO1xuXG4gICAgICAgICAgICAgICAgeSAqPSAwLjk3O1xuXG4gICAgICAgICAgICAgICAgcG9zLnNldFhZWihpLCB4LCB5LCB6KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIOeQg+S9k+OCkuODluODqeODg+OCr+ODm+ODvOODq+aWueWQkeOBuOenu+WLlVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZhbGxpbmdTcGhlcmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gZmFsbGluZ1NwaGVyZXNbaV07XG4gICAgICAgICAgICAgICAgb2JqLnRoZXRhICs9IDAuMDU7XG4gICAgICAgICAgICAgICAgb2JqLnIgLT0gMC4wMjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBNYXRoLmNvcyhvYmoudGhldGEpICogb2JqLnI7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3WiA9IE1hdGguc2luKG9iai50aGV0YSkgKiBvYmoucjtcbiAgICAgICAgICAgICAgICBvYmoubWVzaC5wb3NpdGlvbi5zZXQobmV3WCwgMCwgbmV3Wik7XG5cbiAgICAgICAgICAgICAgICAvLyDmrovlg48gXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhaWxQb3MgPSBvYmoubWVzaC5wb3NpdGlvbi5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIG9iai50cmFpbC5wdXNoKHRyYWlsUG9zKTtcbiAgICAgICAgICAgICAgICBpZiAob2JqLnRyYWlsLmxlbmd0aCA+IDMpIG9iai50cmFpbC5zaGlmdCgpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvYmoudHJhaWwubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IG9iai50cmFpbFtqXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhaWxHZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKS5zZXRGcm9tUG9pbnRzKFtwXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBvYmouYXVyYUNvbG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWlsTWF0ID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDAuMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuMyAqIE1hdGgucG93KDEgLSBqIC8gb2JqLnRyYWlsLmxlbmd0aCwgMiksXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFpbFBvaW50ID0gbmV3IFRIUkVFLlBvaW50cyh0cmFpbEdlbywgdHJhaWxNYXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0cmFpbFBvaW50KTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHRyYWlsUG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhaWxHZW8uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhaWxNYXQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCA3MDApOyAvLyDmrovlg4/jga7plbfjgZVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob2JqLnIgPCAyLjMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUob2JqLm1lc2gpO1xuICAgICAgICAgICAgICAgICAgICBmYWxsaW5nU3BoZXJlcy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy/ms6Lli5VcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlR3Jhdml0eVdhdmUuY2FsbCh0aGlzLCBvYmouYXVyYUNvbG9yKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyDmtojmu4Xjgqjjg5Xjgqfjgq/jg4hcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwbG9kZUNvdW50ID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHBsb2RlUG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShleHBsb2RlQ291bnQgKiAzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBleHBsb2RlQ291bnQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwbG9kZVBvc2l0aW9ucy5zZXQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ggKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxLjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC41LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ogKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxLjVcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sIGogKiAzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICAgICAgICAgICAgICBnZW8uc2V0QXR0cmlidXRlKFwicG9zaXRpb25cIiwgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShleHBsb2RlUG9zaXRpb25zLCAzKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdDIgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IDB4ZmZhYTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMC4wOCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC45LFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXJ0ID0gbmV3IFRIUkVFLlBvaW50cyhnZW8sIG1hdDIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChuZXdQYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdQYXJ0aWNsZXNMaXN0LnB1c2gobmV3UGFydCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g44OW44Op44OD44Kv44Ob44O844Or44Gu44K544Kx44O844OrXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjYWxlU3BlZWQgPSAwLjAwMDU7IC8vIOWkp+OBjeOBj+OBquOCi+OCueODlOODvOODiVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlYXIuc2NhbGUueCArPSBzY2FsZVNwZWVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlYXIuc2NhbGUueSArPSBzY2FsZVNwZWVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlYXIuc2NhbGUueiArPSBzY2FsZVNwZWVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMubmV3UGFydGljbGVzTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQgPSB0aGlzLm5ld1BhcnRpY2xlc0xpc3RbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgZ2VvbSA9IHBhcnQuZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zQXR0ciA9IGdlb20uYXR0cmlidXRlcy5wb3NpdGlvbiBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcG9zQXR0ci5jb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBwb3NBdHRyLmdldFgoaik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBwb3NBdHRyLmdldFkoaik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHogPSBwb3NBdHRyLmdldFooaik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IDAuNykgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlyID0gbmV3IFRIUkVFLlZlY3RvcjMoLXgsIC15LCAteikubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHB1bGwgPSAwLjAxNTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnggPSB4ICsgZGlyLnggKiBkaXN0ICogcHVsbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnkgPSB5ICsgZGlyLnkgKiBkaXN0ICogcHVsbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnogPSB6ICsgZGlyLnogKiBkaXN0ICogcHVsbDtcblxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnMucHVzaChueCwgbnksIG56KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3NBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkocG9zaXRpb25zKTtcbiAgICAgICAgICAgICAgICBnZW9tLnNldEF0dHJpYnV0ZShcInBvc2l0aW9uXCIsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3UG9zQXJyYXksIDMpKTtcbiAgICAgICAgICAgICAgICBnZW9tLmF0dHJpYnV0ZXMucG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHBhcnQpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0Lmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgKHBhcnQubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdQYXJ0aWNsZXNMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v44Oi44OkXG4gICAgICAgICAgICBhdXJhUGFydGljbGVzLnJvdGF0aW9uLnkgLT0gMC4wMTtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlUHVsc2UgPSAwLjA1ICogTWF0aC5zaW4odGltZSAqIDAuMDAyKTtcbiAgICAgICAgICAgIGF1cmFQYXJ0aWNsZXMuc2NhbGUuc2V0KFxuICAgICAgICAgICAgICAgIDEgKyBzY2FsZVB1bHNlLFxuICAgICAgICAgICAgICAgIDEgKyBzY2FsZVB1bHNlLFxuICAgICAgICAgICAgICAgIDEgKyBzY2FsZVB1bHNlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvL+iDjOaZr1xuICAgICAgICAgICAgc3RhclBhcnRpY2xlcy5yb3RhdGlvbi55IC09IDAuMDAwMjtcbiAgICAgICAgICAgIHN0YXJQYXJ0aWNsZXMucm90YXRpb24ueCArPSAwLjAwMDA1O1xuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfTtcbn1cblxuLy/ms6Lli5VcbmZ1bmN0aW9uIGNyZWF0ZUdyYXZpdHlXYXZlKHRoaXM6IFRocmVlSlNDb250YWluZXIsIGNvbG9yOiBUSFJFRS5Db2xvcikge1xuICAgIGNvbnN0IGNlbnRlciA9IHRoaXMuZ2Vhci5wb3NpdGlvbi5jbG9uZSgpOyAvLyDjg5bjg6njg4Pjgq/jg5vjg7zjg6vjga7kuK3lv4NcblxuICAgIGNvbnN0IHJpbmcgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgbmV3IFRIUkVFLlJpbmdHZW9tZXRyeSgwLjUsIDAuNiwgNjQpLFxuICAgICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQsXG4gICAgICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmdcbiAgICAgICAgfSlcbiAgICApO1xuICAgIHJpbmcucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICByaW5nLnBvc2l0aW9uLmNvcHkoY2VudGVyKTtcbiAgICB0aGlzLnNjZW5lLmFkZChyaW5nKTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gMS44O1xuICAgIGNvbnN0IG1heFNjYWxlID0gMTI7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBjb25zdCBhbmltYXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGFwc2VkID0gKHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRUaW1lKSAvIDEwMDA7XG4gICAgICAgIGNvbnN0IHQgPSBNYXRoLm1pbihlbGFwc2VkIC8gZHVyYXRpb24sIDEpO1xuXG4gICAgICAgIGNvbnN0IHNjYWxlID0gMSArIHQgKiBtYXhTY2FsZTtcbiAgICAgICAgcmluZy5zY2FsZS5zZXQoc2NhbGUsIHNjYWxlLCBzY2FsZSk7XG4gICAgICAgIChyaW5nLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5vcGFjaXR5ID0gMC40ICogKDEgLSB0KTtcblxuICAgICAgICBpZiAodCA8IDEpIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHJpbmcpO1xuICAgICAgICAgICAgcmluZy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAocmluZy5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFuaW1hdGUoKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoOCwgOCwgOCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=