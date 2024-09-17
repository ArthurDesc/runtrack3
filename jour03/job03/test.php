<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple FPS Game</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
        #blocker {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        #instructions {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="blocker">
        <div id="instructions">
            <p style="font-size:36px">
                Cliquez pour jouer
            </p>
            <p>
                Déplacez-vous avec ZQSD<br>
                Regardez autour avec la souris
            </p>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.min.js"></script>

    <script>
        let camera, scene, renderer, controls;
        const objects = [];
        let raycaster;

        let moveForward = false;
        let moveBackward = false;
        let moveLeft = false;
        let moveRight = false;

        let prevTime = performance.now();
        const velocity = new THREE.Vector3();
        const direction = new THREE.Vector3();

        init();
        animate();

        function init() {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.y = 10;

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);
            scene.fog = new THREE.Fog(0xffffff, 0, 750);

            const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
            light.position.set(0.5, 1, 0.75);
            scene.add(light);

            controls = new THREE.PointerLockControls(camera, document.body);

            const blocker = document.getElementById('blocker');
            const instructions = document.getElementById('instructions');

            instructions.addEventListener('click', function () {
                controls.lock();
            });

            controls.addEventListener('lock', function () {
                instructions.style.display = 'none';
                blocker.style.display = 'none';
            });

            controls.addEventListener('unlock', function () {
                blocker.style.display = 'block';
                instructions.style.display = '';
            });

            scene.add(controls.getObject());

            const onKeyDown = function (event) {
                switch (event.code) {
                    case 'KeyW':
                    case 'KeyZ':
                        moveForward = true;
                        break;
                    case 'KeyA':
                    case 'KeyQ':
                        moveLeft = true;
                        break;
                    case 'KeyS':
                        moveBackward = true;
                        break;
                    case 'KeyD':
                        moveRight = true;
                        break;
                }
            };

            const onKeyUp = function (event) {
                switch (event.code) {
                    case 'KeyW':
                    case 'KeyZ':
                        moveForward = false;
                        break;
                    case 'KeyA':
                    case 'KeyQ':
                        moveLeft = false;
                        break;
                    case 'KeyS':
                        moveBackward = false;
                        break;
                    case 'KeyD':
                        moveRight = false;
                        break;
                }
            };

            document.addEventListener('keydown', onKeyDown);
            document.addEventListener('keyup', onKeyUp);

            raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);

            const floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
            floorGeometry.rotateX(- Math.PI / 2);

            const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });

            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            scene.add(floor);

            const geometry = new THREE.BoxGeometry(20, 20, 20);

            for (let i = 0; i < 500; i ++) {
                const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

                object.position.x = Math.random() * 1600 - 800;
                object.position.y = Math.random() * 20 + 10;
                object.position.z = Math.random() * 1600 - 800;

                object.rotation.x = Math.random() * 2 * Math.PI;
                object.rotation.y = Math.random() * 2 * Math.PI;
                object.rotation.z = Math.random() * 2 * Math.PI;

                object.scale.x = Math.random() + 0.5;
                object.scale.y = Math.random() + 0.5;
                object.scale.z = Math.random() + 0.5;

                scene.add(object);

                objects.push(object);
            }

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            window.addEventListener('resize', onWindowResize);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);

            const time = performance.now();

            if (controls.isLocked === true) {
                raycaster.ray.origin.copy(controls.getObject().position);
                raycaster.ray.origin.y -= 10;

                const intersections = raycaster.intersectObjects(objects, false);
                const onObject = intersections.length > 0;

                const delta = (time - prevTime) / 1000;

                velocity.x -= velocity.x * 10.0 * delta;
                velocity.z -= velocity.z * 10.0 * delta;
                velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

                direction.z = Number(moveForward) - Number(moveBackward);
                direction.x = Number(moveRight) - Number(moveLeft);
                direction.normalize(); // this ensures consistent movements in all directions

                if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
                if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

                if (onObject === true) {
                    velocity.y = Math.max(0, velocity.y);
                }

                controls.moveRight(- velocity.x * delta);
                controls.moveForward(- velocity.z * delta);

                controls.getObject().position.y += (velocity.y * delta); // new behavior

                if (controls.getObject().position.y < 10) {
                    velocity.y = 0;
                    controls.getObject().position.y = 10;
                }
            }

            prevTime = time;

            renderer.render(scene, camera);
        }
    </script>
</body>
</html>