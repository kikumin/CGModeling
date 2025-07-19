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
//23FI033_菊地郁光


class ThreeJSContainer {
    scene;
    light;
    particles;
    gear;
    newParticles = null;
    camera;
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
                    this.newParticles = newPart;
                }
            }
            if (this.newParticles) {
                const geom = this.newParticles.geometry;
                const posAttr = geom.attributes.position;
                const positions = [];
                for (let i = 0; i < posAttr.count; i++) {
                    const x = posAttr.getX(i);
                    const y = posAttr.getY(i);
                    const z = posAttr.getZ(i);
                    const dist = Math.sqrt(x * x + y * y + z * z);
                    // 吸い込まれたパーティクルは削除
                    if (dist < 0.7)
                        continue;
                    const dir = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-x, -y, -z).clone().normalize();
                    const pull = 0.015;
                    const nx = x + dir.x * dist * pull;
                    const ny = y + dir.y * dist * pull;
                    const nz = z + dir.z * dist * pull;
                    positions.push(nx, ny, nz);
                }
                // 新しい頂点配列でgeometryを更新
                const newPosArray = new Float32Array(positions);
                geom.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(newPosArray, 3));
                geom.attributes.position.needsUpdate = true;
                // 全部吸い込まれて消えたらオブジェクト削除
                if (positions.length < 5) {
                    this.scene.remove(this.newParticles);
                    this.newParticles.geometry.dispose();
                    this.newParticles.material.dispose();
                    this.newParticles = null;
                }
                // ブラックホールのスケール
                const scaleSpeed = 0.0005; // 大きくなるスピード
                this.gear.scale.x += scaleSpeed;
                this.gear.scale.y += scaleSpeed;
                this.gear.scale.z += scaleSpeed;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLzIzRkkwMzNf6I+K5Zyw6YOB5YWJXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwdWJsaWMgc2NlbmU6IFRIUkVFLlNjZW5lO1xuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0O1xuICAgIHByaXZhdGUgcGFydGljbGVzOiBUSFJFRS5Qb2ludHM7XG4gICAgcHVibGljIGdlYXI6IFRIUkVFLk1lc2g7XG4gICAgcHJpdmF0ZSBuZXdQYXJ0aWNsZXM6IFRIUkVFLlBvaW50cyB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcblxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MWExMDNkKSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHModGhpcy5jYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcblxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTtcbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLm1hcmdpbiA9IFwiMTBweFwiO1xuICAgICAgICByZXR1cm4gcmVuZGVyZXIuZG9tRWxlbWVudDtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgICAgIC8v5Yid5pyf44Gu44OR44O844OG44Kj44Kv44OrXG4gICAgICAgIGNvbnN0IHBhcnRpY2xlQ291bnQgPSAxNTAwO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBhcnRpY2xlQ291bnQgKiAzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICBjb25zdCB5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMztcbiAgICAgICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICBwb3NpdGlvbnMuc2V0KFt4LCB5LCB6XSwgaSAqIDMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcnRpY2xlc0dlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIHBhcnRpY2xlc0dlb21ldHJ5LnNldEF0dHJpYnV0ZShcInBvc2l0aW9uXCIsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG4gICAgICAgIGNvbnN0IHBhcnRpY2xlc01hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgIGNvbG9yOiAweDg4Y2NmZixcbiAgICAgICAgICAgIHNpemU6IDAuMSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFydGljbGVzID0gbmV3IFRIUkVFLlBvaW50cyhwYXJ0aWNsZXNHZW9tZXRyeSwgcGFydGljbGVzTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLnBhcnRpY2xlcyk7XG5cbiAgICAgICAgLy/jg5bjg6njg4Pjgq/jg5vjg7zjg6tcbiAgICAgICAgY29uc3QgYmxhY2tIb2xlID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgICBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMS41LCA2NCwgNjQpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogMHgwMDAwMDAsXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAxLFxuICAgICAgICAgICAgICAgIHJvdWdobmVzczogMCxcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZTogbmV3IFRIUkVFLkNvbG9yKDB4MjIwMDQ0KSwgLy8g44KP44Ga44GL44Gr5YWJ44KJ44Gb44KLXG4gICAgICAgICAgICAgICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuN1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYmxhY2tIb2xlKTtcbiAgICAgICAgdGhpcy5nZWFyID0gYmxhY2tIb2xlO1xuXG4gICAgICAgIC8vIOODluODqeODg+OCr+ODm+ODvOODq+OCquODvOODqeeUqOODkeODvOODhuOCo+OCr+ODq1xuICAgICAgICBjb25zdCBhdXJhQ291bnQgPSAzMDA7XG4gICAgICAgIGNvbnN0IGF1cmFQb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KGF1cmFDb3VudCAqIDMpO1xuICAgICAgICBjb25zdCBhdXJhU2l6ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF1cmFDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IDEuOCArIE1hdGgucmFuZG9tKCkgKiA1LjA7XG4gICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgY29uc3QgeSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICBhdXJhUG9zaXRpb25zLnNldChbeCwgeSwgel0sIGkgKiAzKTtcbiAgICAgICAgICAgIGF1cmFTaXplcy5wdXNoKDAuMSArIE1hdGgucmFuZG9tKCkgKiAwLjMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXVyYUdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGF1cmFHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGF1cmFQb3NpdGlvbnMsIDMpKTtcbiAgICAgICAgY29uc3QgYXVyYU1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgIGNvbG9yOiAweDg4MzNhYSxcbiAgICAgICAgICAgIHNpemU6IDAuNSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgb3BhY2l0eTogMC4yLFxuICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZ1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYXVyYVBhcnRpY2xlcyA9IG5ldyBUSFJFRS5Qb2ludHMoYXVyYUdlb21ldHJ5LCBhdXJhTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChhdXJhUGFydGljbGVzKTtcblxuICAgICAgICAvLyDnlJ/miJDjgZXjgozjgZ/nkIPkvZPjg6rjgrnjg4hcbiAgICAgICAgY29uc3QgZmFsbGluZ1NwaGVyZXM6IHtcbiAgICAgICAgICAgIG1lc2g6IFRIUkVFLk1lc2gsXG4gICAgICAgICAgICByOiBudW1iZXIsXG4gICAgICAgICAgICB0aGV0YTogbnVtYmVyLFxuICAgICAgICAgICAgdHJhaWw6IFRIUkVFLlZlY3RvcjNbXSxcbiAgICAgICAgICAgIGF1cmFDb2xvcjogVEhSRUUuQ29sb3JcbiAgICAgICAgfVtdID0gW107XG5cbiAgICAgICAgLy8g44Oe44Km44K55bqn5qiZ5qC857SN55So44OZ44Kv44OI44OrXG4gICAgICAgIGNvbnN0IG1vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICAgICAgY29uc3QgcmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpO1xuXG4gICAgICAgIC8vIOOCr+ODquODg+OCr+OCpOODmeODs+ODiFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBtb3VzZS54ID0gKChldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIHJlY3Qud2lkdGgpICogMiAtIDE7XG4gICAgICAgICAgICBtb3VzZS55ID0gLSgoZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wKSAvIHJlY3QuaGVpZ2h0KSAqIDIgKyAxO1xuXG4gICAgICAgICAgICAvLyDkuqTngrnjgpLlj5blvpdcbiAgICAgICAgICAgIHJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKG1vdXNlLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgICAgICBjb25zdCBwbGFuZSA9IG5ldyBUSFJFRS5QbGFuZShuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSwgMCk7IC8vIHk9MCDlubPpnaJcbiAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdFBvaW50ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgICAgIHJheWNhc3Rlci5yYXkuaW50ZXJzZWN0UGxhbmUocGxhbmUsIGludGVyc2VjdFBvaW50KTtcblxuICAgICAgICAgICAgLy8g55CD5L2T5L2c5oiQXG4gICAgICAgICAgICBjb25zdCBzcGhlcmUgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4yLCAxNiwgMTYpLFxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweGZmNjZmZiwgbWV0YWxuZXNzOiAwLjUsIHJvdWdobmVzczogMC41IH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3BoZXJlLnBvc2l0aW9uLmNvcHkoaW50ZXJzZWN0UG9pbnQpO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoc3BoZXJlKTtcblxuICAgICAgICAgICAgY29uc3QgeCA9IGludGVyc2VjdFBvaW50Lng7XG4gICAgICAgICAgICBjb25zdCB6ID0gaW50ZXJzZWN0UG9pbnQuejtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBNYXRoLnNxcnQoeCAqIHggKyB6ICogeik7XG4gICAgICAgICAgICBjb25zdCB0aGV0YSA9IE1hdGguYXRhbjIoeiwgeCk7XG5cbiAgICAgICAgICAgIC8vIOODqeODs+ODgOODoOOBquiJslxuICAgICAgICAgICAgY29uc3QgYXVyYUNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCkuc2V0SFNMKE1hdGgucmFuZG9tKCksIDAuOCwgMC42NSk7XG5cbiAgICAgICAgICAgIGZhbGxpbmdTcGhlcmVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1lc2g6IHNwaGVyZSxcbiAgICAgICAgICAgICAgICByLFxuICAgICAgICAgICAgICAgIHRoZXRhLFxuICAgICAgICAgICAgICAgIHRyYWlsOiBbXSxcbiAgICAgICAgICAgICAgICBhdXJhQ29sb3I6IGF1cmFDb2xvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIOiDjOaZr+OBruaYn+ODkeODvOODhuOCo+OCr+ODq1xuICAgICAgICBjb25zdCBzdGFyQ291bnQgPSAyMDAwO1xuICAgICAgICBjb25zdCBzdGFyUG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShzdGFyQ291bnQgKiAzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByYWRpdXMgPSAzMCArIE1hdGgucmFuZG9tKCkgKiA1MDsgIC8vIOS4reWkruOBi+OCieOBrui3nembolxuICAgICAgICAgICAgY29uc3QgdGhldGEgPSBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEk7XG4gICAgICAgICAgICBjb25zdCBwaGkgPSBNYXRoLmFjb3MoMiAqIE1hdGgucmFuZG9tKCkgLSAxKTtcblxuICAgICAgICAgICAgY29uc3QgeCA9IHJhZGl1cyAqIE1hdGguc2luKHBoaSkgKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgICAgICAgICBjb25zdCB5ID0gcmFkaXVzICogTWF0aC5zaW4ocGhpKSAqIE1hdGguc2luKHRoZXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHogPSByYWRpdXMgKiBNYXRoLmNvcyhwaGkpO1xuICAgICAgICAgICAgc3RhclBvc2l0aW9ucy5zZXQoW3gsIHksIHpdLCBpICogMyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGFyR2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgc3Rhckdlb21ldHJ5LnNldEF0dHJpYnV0ZShcInBvc2l0aW9uXCIsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoc3RhclBvc2l0aW9ucywgMykpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJUZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCdzcGFyazEucG5nJyk7XG4gICAgICAgIGNvbnN0IHN0YXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICBtYXA6IHN0YXJUZXh0dXJlLFxuICAgICAgICAgICAgY29sb3I6IDB4ODhjY2ZmLFxuICAgICAgICAgICAgc2l6ZTogMi4wLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBvcGFjaXR5OiAxLjAsXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgICAgc2l6ZUF0dGVudWF0aW9uOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdGFyUGFydGljbGVzID0gbmV3IFRIUkVFLlBvaW50cyhzdGFyR2VvbWV0cnksIHN0YXJNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHN0YXJQYXJ0aWNsZXMpO1xuXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jOabtOaWsFxuICAgICAgICBjb25zdCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHRoaXMucGFydGljbGVzLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24gYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICAgICAgICAgICAgLy/jg5Hjg7zjg4bjgqPjgq/jg6tcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zLmNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBvcy5nZXRYKGkpO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gcG9zLmdldFkoaSk7XG4gICAgICAgICAgICAgICAgbGV0IHogPSBwb3MuZ2V0WihpKTtcblxuICAgICAgICAgICAgICAgIC8vIOWbnui7olxuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMih6LCB4KTtcbiAgICAgICAgICAgICAgICBjb25zdCByYWRpdXMgPSBNYXRoLnNxcnQoeCAqIHggKyB6ICogeik7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3QW5nbGUgPSBhbmdsZSArIDAuMTsgLy8g5rim5be744GN5bqm5ZCI44GEXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UmFkaXVzID0gcmFkaXVzIC0gMC4wMjsgLy8g5ZC45byVXG5cbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5jb3MobmV3QW5nbGUpICogbmV3UmFkaXVzO1xuICAgICAgICAgICAgICAgIHogPSBNYXRoLnNpbihuZXdBbmdsZSkgKiBuZXdSYWRpdXM7XG5cbiAgICAgICAgICAgICAgICB5ICo9IDAuOTc7XG5cbiAgICAgICAgICAgICAgICBwb3Muc2V0WFlaKGksIHgsIHksIHopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8g55CD5L2T44KS44OW44Op44OD44Kv44Ob44O844Or5pa55ZCR44G456e75YuVXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gZmFsbGluZ1NwaGVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSBmYWxsaW5nU3BoZXJlc1tpXTtcbiAgICAgICAgICAgICAgICBvYmoudGhldGEgKz0gMC4wNTtcbiAgICAgICAgICAgICAgICBvYmouciAtPSAwLjAyO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3WCA9IE1hdGguY29zKG9iai50aGV0YSkgKiBvYmoucjtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdaID0gTWF0aC5zaW4ob2JqLnRoZXRhKSAqIG9iai5yO1xuICAgICAgICAgICAgICAgIG9iai5tZXNoLnBvc2l0aW9uLnNldChuZXdYLCAwLCBuZXdaKTtcblxuICAgICAgICAgICAgICAgIC8vIOaui+WDjyBcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFpbFBvcyA9IG9iai5tZXNoLnBvc2l0aW9uLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgb2JqLnRyYWlsLnB1c2godHJhaWxQb3MpO1xuICAgICAgICAgICAgICAgIGlmIChvYmoudHJhaWwubGVuZ3RoID4gMykgb2JqLnRyYWlsLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9iai50cmFpbC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gb2JqLnRyYWlsW2pdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFpbEdlbyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpLnNldEZyb21Qb2ludHMoW3BdKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IG9iai5hdXJhQ29sb3I7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhaWxNYXQgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMC4yNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4zICogTWF0aC5wb3coMSAtIGogLyBvYmoudHJhaWwubGVuZ3RoLCAyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWlsUG9pbnQgPSBuZXcgVEhSRUUuUG9pbnRzKHRyYWlsR2VvLCB0cmFpbE1hdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRyYWlsUG9pbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUodHJhaWxQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFpbEdlby5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFpbE1hdC5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDcwMCk7IC8vIOaui+WDj+OBrumVt+OBlVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvYmouciA8IDIuMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZShvYmoubWVzaCk7XG4gICAgICAgICAgICAgICAgICAgIGZhbGxpbmdTcGhlcmVzLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICAvL+azouWLlVxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVHcmF2aXR5V2F2ZS5jYWxsKHRoaXMsIG9iai5hdXJhQ29sb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIOa2iOa7heOCqOODleOCp+OCr+ODiFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHBsb2RlQ291bnQgPSAxMDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4cGxvZGVQb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KGV4cGxvZGVDb3VudCAqIDMpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGV4cGxvZGVDb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBsb2RlUG9zaXRpb25zLnNldChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3WCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3WiArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEuNVxuICAgICAgICAgICAgICAgICAgICAgICAgXSwgaiAqIDMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgICAgICAgICAgICAgIGdlby5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGV4cGxvZGVQb3NpdGlvbnMsIDMpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0MiA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogMHhmZmFhMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiAwLjA4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjksXG4gICAgICAgICAgICAgICAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BhcnQgPSBuZXcgVEhSRUUuUG9pbnRzKGdlbywgbWF0Mik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKG5ld1BhcnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld1BhcnRpY2xlcyA9IG5ld1BhcnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5uZXdQYXJ0aWNsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnZW9tID0gdGhpcy5uZXdQYXJ0aWNsZXMuZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zQXR0ciA9IGdlb20uYXR0cmlidXRlcy5wb3NpdGlvbiBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb25zID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc0F0dHIuY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gcG9zQXR0ci5nZXRYKGkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gcG9zQXR0ci5nZXRZKGkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB6ID0gcG9zQXR0ci5nZXRaKGkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g5ZC444GE6L6844G+44KM44Gf44OR44O844OG44Kj44Kv44Or44Gv5YmK6ZmkXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgMC43KSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygteCwgLXksIC16KS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHVsbCA9IDAuMDE1O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBueCA9IHggKyBkaXIueCAqIGRpc3QgKiBwdWxsO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBueSA9IHkgKyBkaXIueSAqIGRpc3QgKiBwdWxsO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBueiA9IHogKyBkaXIueiAqIGRpc3QgKiBwdWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKG54LCBueSwgbnopO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIOaWsOOBl+OBhOmggueCuemFjeWIl+OBp2dlb21ldHJ544KS5pu05pawXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucyk7XG4gICAgICAgICAgICAgICAgZ2VvbS5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ld1Bvc0FycmF5LCAzKSk7XG4gICAgICAgICAgICAgICAgZ2VvbS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIOWFqOmDqOWQuOOBhOi+vOOBvuOCjOOBpua2iOOBiOOBn+OCieOCquODluOCuOOCp+OCr+ODiOWJiumZpFxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoIDwgNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZSh0aGlzLm5ld1BhcnRpY2xlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3UGFydGljbGVzLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMubmV3UGFydGljbGVzLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3UGFydGljbGVzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g44OW44Op44OD44Kv44Ob44O844Or44Gu44K544Kx44O844OrXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NhbGVTcGVlZCA9IDAuMDAwNTsgLy8g5aSn44GN44GP44Gq44KL44K544OU44O844OJXG4gICAgICAgICAgICAgICAgdGhpcy5nZWFyLnNjYWxlLnggKz0gc2NhbGVTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmdlYXIuc2NhbGUueSArPSBzY2FsZVNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2Vhci5zY2FsZS56ICs9IHNjYWxlU3BlZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v44Oi44OkXG4gICAgICAgICAgICBhdXJhUGFydGljbGVzLnJvdGF0aW9uLnkgLT0gMC4wMTtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlUHVsc2UgPSAwLjA1ICogTWF0aC5zaW4odGltZSAqIDAuMDAyKTtcbiAgICAgICAgICAgIGF1cmFQYXJ0aWNsZXMuc2NhbGUuc2V0KFxuICAgICAgICAgICAgICAgIDEgKyBzY2FsZVB1bHNlLFxuICAgICAgICAgICAgICAgIDEgKyBzY2FsZVB1bHNlLFxuICAgICAgICAgICAgICAgIDEgKyBzY2FsZVB1bHNlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvL+iDjOaZr1xuICAgICAgICAgICAgc3RhclBhcnRpY2xlcy5yb3RhdGlvbi55IC09IDAuMDAwMjtcbiAgICAgICAgICAgIHN0YXJQYXJ0aWNsZXMucm90YXRpb24ueCArPSAwLjAwMDA1O1xuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfTtcbn1cblxuLy/ms6Lli5VcbmZ1bmN0aW9uIGNyZWF0ZUdyYXZpdHlXYXZlKHRoaXM6IFRocmVlSlNDb250YWluZXIsIGNvbG9yOiBUSFJFRS5Db2xvcikge1xuICAgIGNvbnN0IGNlbnRlciA9IHRoaXMuZ2Vhci5wb3NpdGlvbi5jbG9uZSgpOyAvLyDjg5bjg6njg4Pjgq/jg5vjg7zjg6vjga7kuK3lv4NcblxuICAgIGNvbnN0IHJpbmcgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgbmV3IFRIUkVFLlJpbmdHZW9tZXRyeSgwLjUsIDAuNiwgNjQpLFxuICAgICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQsXG4gICAgICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmdcbiAgICAgICAgfSlcbiAgICApO1xuICAgIHJpbmcucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICByaW5nLnBvc2l0aW9uLmNvcHkoY2VudGVyKTtcbiAgICB0aGlzLnNjZW5lLmFkZChyaW5nKTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gMS44O1xuICAgIGNvbnN0IG1heFNjYWxlID0gMTI7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBjb25zdCBhbmltYXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGFwc2VkID0gKHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRUaW1lKSAvIDEwMDA7XG4gICAgICAgIGNvbnN0IHQgPSBNYXRoLm1pbihlbGFwc2VkIC8gZHVyYXRpb24sIDEpO1xuXG4gICAgICAgIGNvbnN0IHNjYWxlID0gMSArIHQgKiBtYXhTY2FsZTtcbiAgICAgICAgcmluZy5zY2FsZS5zZXQoc2NhbGUsIHNjYWxlLCBzY2FsZSk7XG4gICAgICAgIChyaW5nLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5vcGFjaXR5ID0gMC40ICogKDEgLSB0KTtcblxuICAgICAgICBpZiAodCA8IDEpIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHJpbmcpO1xuICAgICAgICAgICAgcmluZy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAocmluZy5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFuaW1hdGUoKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoOCwgOCwgOCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=