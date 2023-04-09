// must always set precision
precision mediump float;

// p5.js built-in uniform variables that are auto-filled
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

// p5.js built-in attribute variablesthat are auto-filled
attribute vec3 aPosition;

void main() {
    vec4 pos = vec4(aPosition, 1.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * pos;
}