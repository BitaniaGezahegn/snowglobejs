/**
 * Interactive Snow Effect Library
 * @version 1.1.0
 * @license MIT
 * @description A beautiful, customizable snow effect with multiple presets and mouse interaction
 */

(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global.addSnow = factory();
    }
}(typeof window !== 'undefined' ? window : this, function () {

    /**
     * Creates a snow effect instance
     * @param {HTMLElement} container - The container element
     * @param {Object|string} [options] - Options object or preset name
     * @returns {Object} Snow instance API
     */
    return function createSnowEffect(container, options = {}) {
        // Preset configurations
        const PRESETS = {
            // Gentle winter snowfall
            'winter': {
                speed: 4,
                interaction: 10,
                count: 60,
                size: 0.8,
                opacity: 0.7,
                color: '#ffffff',
                wind: false,
                windSpeed: 0,
                twinkle: true,
                shape: '•'
            },
            
            // Heavy snowstorm
            'blizzard': {
                speed: 15,
                interaction: 5,
                count: 200,
                size: 1.2,
                opacity: 0.9,
                color: '#ffffff',
                wind: true,
                windSpeed: 3,
                twinkle: false,
                shape: '❄'
            },
            
            // Light playful snow
            'frosty': {
                speed: 6,
                interaction: 20,
                count: 80,
                size: 0.6,
                opacity: 0.8,
                color: '#e6f7ff',
                wind: true,
                windSpeed: 1.5,
                twinkle: true,
                shape: '❅'
            },
            
            // Magical fairy-tale snow
            'enchanted': {
                speed: 3,
                interaction: 25,
                count: 100,
                size: 1,
                opacity: 0.9,
                color: '#f0f8ff',
                wind: false,
                windSpeed: 0,
                twinkle: true,
                shape: '✦'
            },
            
            // Fast, intense snowfall
            'avalanche': {
                speed: 18,
                interaction: 2,
                count: 150,
                size: 1.5,
                opacity: 0.95,
                color: '#ffffff',
                wind: true,
                windSpeed: 4,
                twinkle: false,
                shape: '❆'
            },
            
            // Light, barely-there snow
            'whisper': {
                speed: 2,
                interaction: 15,
                count: 40,
                size: 0.5,
                opacity: 0.4,
                color: '#f8f8f8',
                wind: false,
                windSpeed: 0,
                twinkle: true,
                shape: '·'
            },
            
            // Swirling snowstorm
            'snowdance': {
                speed: 8,
                interaction: 30,
                count: 120,
                size: 1,
                opacity: 0.8,
                color: '#ffffff',
                wind: true,
                windSpeed: 2.5,
                twinkle: false,
                shape: '❉'
            },
            
            // Christmas-themed snow
            'northpole': {
                speed: 5,
                interaction: 15,
                count: 90,
                size: 1.1,
                opacity: 0.85,
                color: '#fffafa',
                wind: true,
                windSpeed: 1,
                twinkle: true,
                shape: '❄'
            }
        };

        // If options is a string, use the preset
        if (typeof options === 'string' && PRESETS[options.toLowerCase()]) {
            options = PRESETS[options.toLowerCase()];
        }

        // Default settings
        const settings = {
            speed: 5,
            interaction: 15,
            count: 50,
            size: 1,
            opacity: 0.8,
            color: '#ffffff',
            wind: false,
            windSpeed: 1,
            twinkle: false,
            shape: '•',
            ...options
        };

        // Validate container
        if (!(container instanceof HTMLElement)) {
            console.error('Snow effect: Invalid container element');
            return null;
        }

        // Set up container
        container.style.position = 'relative';
        container.style.overflow = 'hidden';

        // State variables
        const snowflakes = [];
        let mouseX = container.clientWidth / 2;
        let mouseY = container.clientHeight / 2;
        const influenceRadius = 100;
        let animationId;
        let isRunning = true;

        // Track mouse position relative to container
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        container.addEventListener('mousemove', handleMouseMove);

        // Create a single snowflake
        function createSnowflake(initial = false) {
            const snowflake = document.createElement('div');
            snowflake.innerHTML = settings.shape;
            
            // Randomize properties within configured ranges
            const size = (Math.random() * settings.size * 0.8) + (settings.size * 0.4);
            const speed = (Math.random() * settings.speed * 0.3) + (settings.speed * 0.7);
            const opacity = (Math.random() * settings.opacity * 0.4) + (settings.opacity * 0.6);
            const left = Math.random() * container.clientWidth;
            const startY = initial ? Math.random() * container.clientHeight : -10;
            const drift = settings.wind ? 
                (Math.random() * settings.windSpeed * 0.5) + (settings.windSpeed * 0.5) :
                (Math.random() * 0.2 - 0.1);

            Object.assign(snowflake.style, {
                position: 'absolute',
                opacity: opacity,
                color: settings.color,
                fontSize: `${size}em`,
                left: `${left}px`,
                top: `${startY}px`,
                pointerEvents: 'none',
                userSelect: 'none',
                willChange: 'transform',
                zIndex: '100',
                textShadow: '0 0 1px rgba(255,255,255,0.3)'
            });

            container.appendChild(snowflake);

            const snowflakeObj = {
                element: snowflake,
                x: left,
                y: startY,
                speed: speed,
                baseX: left,
                drift: drift,
                opacity: opacity,
                size: size
            };

            snowflakes.push(snowflakeObj);

            // Twinkle effect if enabled
            if (settings.twinkle) {
                const twinkleInterval = setInterval(() => {
                    snowflake.style.opacity = Math.random() * opacity * 0.5 + opacity * 0.5;
                }, Math.random() * 3000 + 1000);

                snowflakeObj.twinkleInterval = twinkleInterval;
            }

            return snowflakeObj;
        }

        // Animation loop
        function animate() {
            if (!isRunning) return;
            
            snowflakes.forEach(flake => {
                // Apply base movement
                flake.y += flake.speed * 0.1;
                flake.x += flake.drift * 0.5;
                flake.baseX += flake.drift * 0.5;

                // Apply mouse interaction if enabled and interaction > 0
                if (settings.interaction > 0) {
                    const dx = mouseX - flake.x;
                    const dy = mouseY - flake.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < influenceRadius) {
                        const force = (influenceRadius - distance) / influenceRadius;
                        const angle = Math.atan2(dy, dx);
                        const interactionStrength = settings.interaction * 0.02;

                        flake.x -= Math.cos(angle) * force * interactionStrength * 5;
                        flake.y -= Math.sin(angle) * force * interactionStrength * 5;
                    } else {
                        // Return to natural position
                        flake.x += (flake.baseX - flake.x) * 0.01;
                    }
                }

                // Update position
                flake.element.style.transform = `translate(${flake.x - parseFloat(flake.element.style.left)}px, 0)`;
                flake.element.style.top = `${flake.y}px`;

                // Recycle when out of bounds
                if (flake.y > container.clientHeight) {
                    flake.y = -10;
                    flake.x = Math.random() * container.clientWidth;
                    flake.baseX = flake.x;
                }
            });

            animationId = requestAnimationFrame(animate);
        }

        // Initialize snowflakes
        for (let i = 0; i < settings.count; i++) {
            createSnowflake(true);
        }

        // Start animation
        animate();

        // Public API for controlling the effect
        return {
            /**
             * Update snow effect parameters
             * @param {Object} newOptions - New options to merge
             */
            updateOptions(newOptions) {
                if (typeof newOptions === 'string' && PRESETS[newOptions.toLowerCase()]) {
                    newOptions = PRESETS[newOptions.toLowerCase()];
                }
                
                Object.assign(settings, newOptions);
                
                // Update wind effect on existing flakes if changed
                if (newOptions.wind !== undefined || newOptions.windSpeed !== undefined) {
                    snowflakes.forEach(flake => {
                        flake.drift = settings.wind ? 
                            (Math.random() * settings.windSpeed * 0.5) + (settings.windSpeed * 0.5) :
                            (Math.random() * 0.2 - 0.1);
                    });
                }
                
                // Update twinkle effect if changed
                if (newOptions.twinkle !== undefined) {
                    snowflakes.forEach(flake => {
                        if (settings.twinkle && !flake.twinkleInterval) {
                            flake.twinkleInterval = setInterval(() => {
                                flake.element.style.opacity = Math.random() * flake.opacity * 0.5 + flake.opacity * 0.5;
                            }, Math.random() * 3000 + 1000);
                        } else if (!settings.twinkle && flake.twinkleInterval) {
                            clearInterval(flake.twinkleInterval);
                            flake.twinkleInterval = null;
                            flake.element.style.opacity = flake.opacity;
                        }
                    });
                }

                // Update shape if changed
                if (newOptions.shape !== undefined) {
                    snowflakes.forEach(flake => {
                        flake.element.innerHTML = settings.shape;
                    });
                }
            },

            /**
             * Switch to a named preset
             * @param {string} presetName - Name of preset to use
             * @returns {boolean} True if preset was applied
             */
            usePreset(presetName) {
                if (PRESETS[presetName.toLowerCase()]) {
                    this.updateOptions(PRESETS[presetName.toLowerCase()]);
                    return true;
                }
                console.warn(`Snow preset "${presetName}" not found. Available presets: ${this.getPresetNames().join(', ')}`);
                return false;
            },

            /**
             * Get list of available preset names
             * @returns {string[]} Array of preset names
             */
            getPresetNames() {
                return Object.keys(PRESETS);
            },

            /**
             * Get current settings
             * @returns {Object} Current settings object
             */
            getSettings() {
                return {...settings};
            },

            /**
             * Add more snowflakes
             * @param {number} count - Number of flakes to add
             */
            addFlakes(count) {
                for (let i = 0; i < count; i++) {
                    createSnowflake();
                }
            },

            /**
             * Remove snowflakes
             * @param {number} count - Number of flakes to remove
             */
            removeFlakes(count) {
                const removeCount = Math.min(count, snowflakes.length);
                for (let i = 0; i < removeCount; i++) {
                    const flake = snowflakes.pop();
                    if (flake.twinkleInterval) clearInterval(flake.twinkleInterval);
                    flake.element.remove();
                }
            },

            /**
             * Pause the animation
             */
            pause() {
                isRunning = false;
            },

            /**
             * Resume the animation
             */
            resume() {
                if (!isRunning) {
                    isRunning = true;
                    animate();
                }
            },

            /**
             * Destroy the snow effect and clean up
             */
            destroy() {
                this.pause();
                cancelAnimationFrame(animationId);
                container.removeEventListener('mousemove', handleMouseMove);
                
                snowflakes.forEach(flake => {
                    if (flake.twinkleInterval) clearInterval(flake.twinkleInterval);
                    flake.element.remove();
                });
                
                snowflakes.length = 0;
                container.style.overflow = '';
            }
        };
    };
}));